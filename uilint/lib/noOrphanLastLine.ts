import type {ElemRef, GroupRef, LayoutConstraint, Violation} from '@uilint/core';

export type WordSnapshot = {
  text: string;
  left: number;
  top: number;
  width: number;
  right?: number;
};

export type LineSnapshot = {
  top: number;
  words: WordSnapshot[];
  left: number;
  right: number;
  width: number;
};

export type OrphanOptions = {
  minLastLineRatio?: number;
  topTolerance?: number;
};

export type OrphanEvaluation = {
  ok: boolean;
  reason: 'empty' | 'single-line' | 'multi-word-last-line' | 'wide-last-word' | 'orphan';
  lines: LineSnapshot[];
  lastLineRatio?: number;
};

function wordRight(word: WordSnapshot): number {
  return word.right ?? word.left + word.width;
}

export function groupWordsIntoLines(
  words: WordSnapshot[],
  topTolerance = 4,
): LineSnapshot[] {
  const sorted = [...words].sort((a, b) => a.top - b.top || a.left - b.left);
  const lines: LineSnapshot[] = [];

  for (const word of sorted) {
    const line = lines.find(candidate => Math.abs(candidate.top - word.top) <= topTolerance);

    if (line) {
      line.words.push(word);
      line.words.sort((a, b) => a.left - b.left);
      line.left = Math.min(line.left, word.left);
      line.right = Math.max(line.right, wordRight(word));
      line.width = line.right - line.left;
    } else {
      lines.push({
        top: word.top,
        words: [word],
        left: word.left,
        right: wordRight(word),
        width: word.width,
      });
    }
  }

  return lines.sort((a, b) => a.top - b.top);
}

export function evaluateNoOrphanLastLine(
  words: WordSnapshot[],
  containerWidth: number,
  options: OrphanOptions = {},
): OrphanEvaluation {
  const minLastLineRatio = options.minLastLineRatio ?? 0.25;
  const lines = groupWordsIntoLines(words, options.topTolerance ?? 4);

  if (lines.length === 0) {
    return {ok: true, reason: 'empty', lines};
  }

  if (lines.length === 1) {
    return {ok: true, reason: 'single-line', lines};
  }

  const lastLine = lines[lines.length - 1];

  if (lastLine.words.length >= 2) {
    return {ok: true, reason: 'multi-word-last-line', lines};
  }

  const lastLineRatio = containerWidth > 0 ? lastLine.width / containerWidth : 0;

  if (lastLineRatio >= minLastLineRatio) {
    return {ok: true, reason: 'wide-last-word', lines, lastLineRatio};
  }

  return {ok: false, reason: 'orphan', lines, lastLineRatio};
}

export function noOrphanLastLine(
  wordsRef: GroupRef,
  containerRef: ElemRef,
  options: OrphanOptions & {name?: string} = {},
): LayoutConstraint {
  return rt => {
    const container = rt.el(containerRef);
    const name = options.name ?? `${container.name}/no-orphan-last-line`;

    return {
      name,
      check() {
        const words = rt.group(wordsRef)
          .filter(word => word.visible)
          .map(word => ({
            text: word.text,
            left: word.left,
            top: word.top,
            right: word.right,
            width: word.width,
          }));

        if (words.length === 0) {
          return [{
            constraint: name,
            message: `${container.name} has no .bw word spans for orphan-line checking`,
            details: {reason: 'missing-balanced-word-spans'},
          }];
        }

        const evaluation = evaluateNoOrphanLastLine(words, container.width, options);

        if (evaluation.ok) {
          return [];
        }

        const violations: Violation[] = [{
          constraint: name,
          message: `${container.name} has an orphan last line: ${evaluation.lastLineRatio?.toFixed(3)} of container width`,
          details: {
            reason: evaluation.reason,
            lines: evaluation.lines.map(line => line.words.map(word => word.text).join(' ')),
          },
        }];

        return violations;
      },
    };
  };
}

export function centeredTextLine(
  wordsRef: GroupRef,
  containerRef: ElemRef,
  options: OrphanOptions & {name?: string; tolerance?: number} = {},
): LayoutConstraint {
  return rt => {
    const container = rt.el(containerRef);
    const name = options.name ?? `${container.name}/centered-text-line`;
    const tolerance = options.tolerance ?? 12;

    return {
      name,
      check() {
        const words = rt.group(wordsRef)
          .filter(word => word.visible)
          .map(word => ({
            text: word.text,
            left: word.left,
            top: word.top,
            right: word.right,
            width: word.width,
          }));

        if (words.length === 0) {
          return [{
            constraint: name,
            message: `${container.name} has no word spans for centered text-line checking`,
            details: {reason: 'missing-balanced-word-spans'},
          }];
        }

        const [firstLine] = groupWordsIntoLines(words, options.topTolerance ?? 4);

        if (!firstLine) {
          return [];
        }

        const leftGap = firstLine.left - container.left;
        const rightGap = container.right - firstLine.right;
        const gapDelta = Math.abs(leftGap - rightGap);

        return gapDelta <= tolerance
          ? []
          : [{
            constraint: name,
            message: `${container.name} first text line is not centered: left gap ${leftGap.toFixed(1)}, right gap ${rightGap.toFixed(1)}, expected delta <= ${tolerance}`,
            details: {
              line: firstLine.words.map(word => word.text).join(' '),
              leftGap,
              rightGap,
              gapDelta,
            },
          }];
      },
    };
  };
}

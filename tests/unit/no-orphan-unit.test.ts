import {
  evaluateNoOrphanLastLine,
  groupWordsIntoLines,
  type WordSnapshot,
} from '../../uilint/lib/noOrphanLastLine';

describe('noOrphanLastLine line grouping', () => {
  it('accepts a single-line heading', () => {
    const words: WordSnapshot[] = [
      {text: 'One', left: 0, top: 10, width: 40},
      {text: 'line', left: 48, top: 10, width: 45},
    ];

    expect(evaluateNoOrphanLastLine(words, 300).ok).toBe(true);
    expect(evaluateNoOrphanLastLine(words, 300).reason).toBe('single-line');
  });

  it('flags a narrow one-word last line', () => {
    const words: WordSnapshot[] = [
      {text: 'Find', left: 0, top: 10, width: 45},
      {text: 'vulnerabilities', left: 55, top: 10, width: 130},
      {text: 'fast', left: 0, top: 44, width: 42},
    ];

    expect(evaluateNoOrphanLastLine(words, 240).ok).toBe(false);
  });

  it('accepts a wide one-word last line', () => {
    const words: WordSnapshot[] = [
      {text: 'Find', left: 0, top: 10, width: 45},
      {text: 'bugs', left: 55, top: 10, width: 45},
      {text: 'vulnerabilities', left: 0, top: 44, width: 135},
    ];

    expect(evaluateNoOrphanLastLine(words, 240).reason).toBe('wide-last-word');
  });

  it('groups words whose top positions are within tolerance', () => {
    const lines = groupWordsIntoLines([
      {text: 'Savant', left: 0, top: 20, width: 60},
      {text: 'Chat', left: 66, top: 23, width: 40},
      {text: 'audits', left: 0, top: 54, width: 58},
    ]);

    expect(lines.map(line => line.words.map(word => word.text))).toEqual([
      ['Savant', 'Chat'],
      ['audits'],
    ]);
  });

  it('accepts an empty word group', () => {
    expect(evaluateNoOrphanLastLine([], 300)).toMatchObject({
      ok: true,
      reason: 'empty',
      lines: [],
    });
  });
});

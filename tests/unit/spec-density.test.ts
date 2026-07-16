import {existsSync, readFileSync, readdirSync, statSync} from 'node:fs';
import path from 'node:path';

const specsDir = path.resolve(process.cwd(), 'uilint/specs');
const sections = [
  'navbar',
  'hero',
  'trust-logos',
  'proof-stats',
  'pillars',
  'coverage',
  'comparison',
  'testimonials',
  'pricing',
  'calculator',
  'faq',
  'final-cta',
  'footer',
];

function specFiles(dir: string): string[] {
  return readdirSync(dir)
    .flatMap(entry => {
      const fullPath = path.join(dir, entry);

      if (statSync(fullPath).isDirectory()) {
        return specFiles(fullPath);
      }

      return fullPath.endsWith('.ts') ? [fullPath] : [];
    });
}

const sources = existsSync(specsDir)
  ? specFiles(specsDir).map(file => readFileSync(file, 'utf8')).join('\n')
  : '';

function namedConstraintStrings(): string[] {
  const knownCalls = [
    'inside',
    'below',
    'above',
    'leftOf',
    'rightOf',
    'near',
    'widthIn',
    'heightIn',
    'widthMatches',
    'heightMatches',
    'alignedHorizontally',
    'alignedHorizontallyTop',
    'alignedHorizEqualGap',
    'alignedVerticallyLeft',
    'alignedVerticallyEdges',
    'centered',
    'visible',
    'textMatches',
    'textDoesNotOverflow',
    'textLinesAtMost',
    'singleLineText',
    'countIs',
    'colorDistance',
    'noOverlap',
    'almostSquared',
    'noOrphanLastLine',
    'canvasWidthNoOverflow',
    'primaryCtaCanvasTopAtMost',
    'ctaGapAtLeast',
    'noHorizontalOverflow',
  ].join('|');
  const names: string[] = [];
  const callRegex = new RegExp(`(?:${knownCalls})\\s*\\((?<args>[\\s\\S]*?)\\)`, 'g');
  let match: RegExpExecArray | null;

  while ((match = callRegex.exec(sources)) !== null) {
    const args = match.groups?.args ?? '';
    const stringArgs = [...args.matchAll(/['"`]([^'"`]+)['"`]/g)].map(item => item[1]);
    const prefixed = stringArgs.find(value => sections.some(section => value.startsWith(`${section}/`)));

    if (prefixed) {
      names.push(prefixed);
    } else if (stringArgs.length > 0 && !stringArgs[0].startsWith('.') && !stringArgs[0].startsWith('[')) {
      names.push(stringArgs[stringArgs.length - 1]);
    }
  }

  return names;
}

const constraintNames = namedConstraintStrings();

describe('uilint spec density', () => {
  it('uses section/name prefixes for every named constraint', () => {
    const unprefixed = constraintNames.filter(name =>
      !sections.some(section => name.startsWith(`${section}/`)),
    );

    expect(unprefixed).toEqual([]);
  });

  test.each(sections)('%s has between 10 and 40 named constraints', section => {
    const count = constraintNames.filter(name => name.startsWith(`${section}/`)).length;

    expect(count).toBeGreaterThanOrEqual(10);
    expect(count).toBeLessThanOrEqual(40);
  });
});

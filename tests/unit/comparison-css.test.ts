import {existsSync, readFileSync} from 'node:fs';
import path from 'node:path';

const cssPaths = [
  'src/components/Comparison/styles.module.css',
  'src/components/Testimonials/styles.module.css',
].map(file => path.resolve(process.cwd(), file));

const existingCssPaths = cssPaths.filter(existsSync);
const css = existingCssPaths.map(file => readFileSync(file, 'utf8')).join('\n');

function extractRule(selector: string) {
  const escaped = selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const match = css.match(new RegExp(`${escaped}\\s*\\{(?<body>[^}]*)\\}`, 'm'));

  return match?.groups?.body?.replace(/\s+/g, ' ').trim() ?? '';
}

describe('comparison and testimonials css', () => {
  it('has component stylesheet files for comparison and testimonials', () => {
    expect(existingCssPaths.sort()).toEqual(cssPaths.sort());
  });

  it('visually distinguishes the Savant comparison column', () => {
    const rule = extractRule('.savantColumn');

    expect(rule).toContain('rgba(255, 107, 0, .06)');
    expect(rule).toContain('var(--site-accent)');
  });

  it('makes the comparison table scroll horizontally on mobile', () => {
    expect(css).toMatch(/@media[^{]+max-width:\s*996px[\s\S]*\.comparisonScroll\s*\{[\s\S]*overflow-x:\s*auto/);
  });

  // Quote cards were superseded by TweetCard (0483d9); surface-token styling
  // for testimonials is asserted in tweet-cards-css.test.ts.
});

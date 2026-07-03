import {existsSync, readFileSync} from 'node:fs';
import path from 'node:path';

const cssPaths = [
  'src/components/Pricing/styles.module.css',
  'src/components/Faq/styles.module.css',
  'src/components/FinalCta/styles.module.css',
].map(file => path.resolve(process.cwd(), file));

const existingCssPaths = cssPaths.filter(existsSync);
const css = existingCssPaths.map(file => readFileSync(file, 'utf8')).join('\n');

function extractRule(selector: string) {
  const escaped = selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const match = css.match(new RegExp(`${escaped}\\s*\\{(?<body>[^}]*)\\}`, 'm'));

  return match?.groups?.body?.replace(/\s+/g, ' ').trim() ?? '';
}

describe('pricing, FAQ, and final CTA css', () => {
  it('has component stylesheet files for pricing, FAQ, and final CTA', () => {
    expect(existingCssPaths.sort()).toEqual(cssPaths.sort());
  });

  it('uses an accent border for the highlighted pricing card', () => {
    expect(extractRule('.featuredCard')).toContain('border-color: var(--site-accent)');
  });

  it('styles the final CTA band with the accent token', () => {
    expect(extractRule('.finalCta')).toContain('background: var(--site-accent)');
  });

  it('makes FAQ summaries large enough to tap', () => {
    expect(extractRule('.summary')).toMatch(/(?:min-height:\s*44px|padding:\s*(?:1[2-9]|[2-9]\d)px)/);
  });

  it('defines a three-column pricing grid and one-column mobile grid', () => {
    expect(css).toMatch(/grid-template-columns:\s*repeat\(3,\s*(?:minmax\(0,\s*)?1fr\)?\)/);
    expect(css).toMatch(/@media[^{]+max-width:\s*996px[\s\S]*grid-template-columns:\s*1fr/);
  });
});

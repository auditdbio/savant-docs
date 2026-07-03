import {existsSync, readFileSync} from 'node:fs';
import path from 'node:path';

const cssPaths = [
  'src/pages/index.module.css',
  'src/components/TrustLogos/styles.module.css',
  'src/components/ProofStats/styles.module.css',
].map(file => path.resolve(process.cwd(), file));

const css = cssPaths
  .filter(existsSync)
  .map(file => readFileSync(file, 'utf8'))
  .join('\n');

function extractRule(selector: string) {
  const escaped = selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const match = css.match(new RegExp(`${escaped}\\s*\\{(?<body>[^}]*)\\}`, 'm'));

  return match?.groups?.body?.replace(/\s+/g, ' ').trim() ?? '';
}

describe('trust logos and proof stats css', () => {
  it('styles the proof band with the deep background token', () => {
    expect(extractRule('.proofStats')).toContain('background: var(--site-bg-deep)');
  });

  it('styles proof stat numbers with the main text token', () => {
    expect(extractRule('.statValue')).toMatch(/var\(--site-text\)/);
  });

  it('defines a three-column proof grid for desktop', () => {
    expect(css).toMatch(/grid-template-columns:\s*repeat\(3,\s*(?:minmax\(0,\s*)?1fr\)?\)/);
  });

  it('defines a one-column proof grid on mobile', () => {
    expect(css).toMatch(/@media[^{]+max-width:\s*996px[\s\S]*grid-template-columns:\s*1fr/);
  });
});

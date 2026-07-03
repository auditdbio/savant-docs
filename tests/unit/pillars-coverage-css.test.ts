import {existsSync, readFileSync} from 'node:fs';
import path from 'node:path';

const cssPaths = [
  'src/components/Pillars/styles.module.css',
  'src/components/Coverage/styles.module.css',
].map(file => path.resolve(process.cwd(), file));

const existingCssPaths = cssPaths.filter(existsSync);
const css = existingCssPaths.map(file => readFileSync(file, 'utf8')).join('\n');

function extractRule(selector: string) {
  const escaped = selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const match = css.match(new RegExp(`${escaped}\\s*\\{(?<body>[^}]*)\\}`, 'm'));

  return match?.groups?.body?.replace(/\s+/g, ' ').trim() ?? '';
}

describe('pillars and coverage css', () => {
  it('has component stylesheet files for pillars and coverage', () => {
    expect(existingCssPaths.sort()).toEqual(cssPaths.sort());
  });

  it('styles pillar cards on the surface token', () => {
    expect(extractRule('.pillarCard')).toContain('background: var(--site-surface)');
  });

  it('styles pillar indices with the accent token', () => {
    expect(extractRule('.pillarIndex')).toMatch(/var\(--site-accent(?:-text)?\)/);
  });

  it('defines a three-column desktop pillar grid and one-column mobile grid', () => {
    expect(css).toMatch(/grid-template-columns:\s*repeat\(3,\s*(?:minmax\(0,\s*)?1fr\)?\)/);
    expect(css).toMatch(/@media[^{]+max-width:\s*996px[\s\S]*grid-template-columns:\s*1fr/);
  });

  it('styles coverage chips as pill shapes', () => {
    expect(extractRule('.chip')).toContain('border-radius: 99px');
  });

  it('vertically centers the desktop coverage chip cloud', () => {
    expect(extractRule('.chips')).toMatch(/align-content:\s*center/);
  });
});

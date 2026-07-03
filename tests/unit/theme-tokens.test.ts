import {readFileSync} from 'node:fs';
import path from 'node:path';

const cssPath = path.resolve(process.cwd(), 'src/css/custom.css');
const css = readFileSync(cssPath, 'utf8');

function extractBlock(selector: string): string {
  const escapedSelector = selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const match = css.match(new RegExp(`${escapedSelector}\\s*\\{([\\s\\S]*?)\\}`, 'm'));
  return match?.[1] ?? '';
}

function parseCustomProperties(block: string): Map<string, string> {
  const declarations = new Map<string, string>();

  for (const match of block.matchAll(/(--[\w-]+)\s*:\s*([^;]+);/g)) {
    const [, name, rawValue] = match;
    declarations.set(name, normalizeCssValue(rawValue));
  }

  return declarations;
}

function normalizeCssValue(value: string): string {
  return value.trim().replace(/\s+/g, ' ');
}

function normalizeExpected(value: string): string {
  const normalized = normalizeCssValue(value);
  return normalized.startsWith('#') ? normalized.toLowerCase() : normalized;
}

function getToken(tokens: Map<string, string>, name: string): string | undefined {
  const value = tokens.get(name);
  return value?.startsWith('#') ? value.toLowerCase() : value;
}

const lightTokens = parseCustomProperties(extractBlock(':root'));
const darkTokens = parseCustomProperties(extractBlock("[data-theme='dark']"));

describe('theme CSS tokens', () => {
  test.each([
    ['--site-bg', '#ffffff'],
    ['--site-bg-alt', '#f9fafb'],
    ['--site-surface', '#ffffff'],
    ['--site-text', '#111827'],
    ['--site-text-secondary', '#4b5563'],
    ['--site-text-muted', '#6b7280'],
    ['--site-border', '#e5e7eb'],
    ['--site-accent', '#FF6B00'],
    ['--site-accent-hover', '#E65D00'],
    ['--site-accent-text', '#D05500'],
    ['--site-brand', '#52176D'],
    ['--site-on-brand', '#ffffff'],
    ['--site-hero-cta-bg', '#ffffff'],
  ])(':root defines %s', (token, expected) => {
    expect(getToken(lightTokens, token)).toBe(normalizeExpected(expected));
  });

  test.each([
    ['--site-bg', '#120C18'],
    ['--site-bg-alt', '#0C0810'],
    ['--site-surface', '#1E1528'],
    ['--site-text', '#F5F2F8'],
    ['--site-text-secondary', '#B3A9BF'],
    ['--site-accent', '#FF7B1A'],
    ['--site-accent-hover', '#FF8C33'],
    ['--site-brand', '#7A2FA3'],
    ['--site-brand-band', '#221030'],
    ['--ifm-color-primary', '#FF7B1A'],
  ])("[data-theme='dark'] defines %s", (token, expected) => {
    expect(getToken(darkTokens, token)).toBe(normalizeExpected(expected));
  });

  test.each(['#14110d', '#faf8f4', '#1b1712'])('does not contain retired v1 hex %s', oldHex => {
    expect(css.toLowerCase()).not.toContain(oldHex);
  });
});

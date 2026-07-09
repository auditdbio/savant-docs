import {existsSync, readFileSync} from 'node:fs';
import path from 'node:path';

const cssPath = path.resolve(process.cwd(), 'src/components/TweetCard/styles.module.css');
const css = existsSync(cssPath) ? readFileSync(cssPath, 'utf8') : '';

function normalize(value: string): string {
  return value.replace(/\s+/g, ' ').trim();
}

function extractRule(selectorPattern: RegExp): string {
  const match = css.match(new RegExp(`(?<selector>[^{}]*${selectorPattern.source}[^{}]*)\\{(?<body>[^}]*)\\}`, 'im'));

  return normalize(match?.groups?.body ?? '');
}

describe('tweet card css', () => {
  it('uses a 16px radius on tweet cards', () => {
    expect(css).toMatch(/border-radius:\s*16px/);
  });

  it('lifts tweet cards on hover', () => {
    expect(css).toMatch(/:hover\s*\{[^}]*transform:\s*translateY\(-4px\)/);
  });

  it('renders tweet avatars as circles', () => {
    expect(extractRule(/avatar/)).toMatch(/border-radius:\s*50%/);
  });
});

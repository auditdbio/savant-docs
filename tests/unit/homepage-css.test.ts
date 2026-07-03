import {readFileSync} from 'node:fs';
import path from 'node:path';

const cssPath = path.resolve(__dirname, '../../src/pages/index.module.css');
const css = readFileSync(cssPath, 'utf8');

function normalize(value: string) {
  return value.replace(/\s+/g, ' ').trim();
}

function extractRule(selector: string) {
  const escaped = selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const match = css.match(new RegExp(`${escaped}\\s*\\{(?<body>[^}]*)\\}`, 'm'));

  return match?.groups?.body ?? '';
}

function declarationsFor(selector: string) {
  return Object.fromEntries(
    extractRule(selector)
      .split(';')
      .map(part => part.trim())
      .filter(Boolean)
      .map(part => {
        const [property, ...value] = part.split(':');
        return [property.trim(), normalize(value.join(':'))];
      }),
  );
}

function extractMobileRule(selector: string) {
  const mediaMatch = css.match(/@media[^{]+max-width:\s*996px[\s\S]*?(?=@media|$)/);
  if (!mediaMatch) return '';
  const escaped = selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const match = mediaMatch[0].match(new RegExp(`${escaped}\\s*\\{(?<body>[^}]*)\\}`, 'm'));

  return match?.groups?.body ?? '';
}

describe('homepage hero css module', () => {
  it('styles the kicker with the mono font token', () => {
    const kicker = declarationsFor('.kicker');

    expect(kicker['font-family'] ?? '').toMatch(/Plex Mono|var\(--ifm-font-family-monospace\)/);
  });

  it('sets the kicker tracking to .14em', () => {
    const kicker = declarationsFor('.kicker');

    expect(kicker['letter-spacing']).toBe('.14em');
  });

  it('sets the hero title weight to 800', () => {
    const title = declarationsFor('.title');

    expect(title['font-weight']).toBe('800');
  });

  it('sets the hero title tracking to -0.03em', () => {
    const title = declarationsFor('.title');

    expect(title['letter-spacing']).toBe('-0.03em');
  });

  it('defines the CTA container class', () => {
    expect(extractRule('.ctas')).not.toBe('');
  });

  it('keeps hero primary CTA styling in the page module', () => {
    expect(extractRule('.primaryCta')).not.toBe('');
  });

  it('defines the 996px mobile hero media query', () => {
    expect(css).toMatch(/@media[^{]+max-width:\s*996px/);
  });

  it('sets mobile hero title size to approximately 34px for the three-line heading craft', () => {
    expect(normalize(extractMobileRule('.title'))).toMatch(/font-size:\s*(?:34px|2\.125rem|min\([^;]*2\.125rem[^;]*\))/);
  });
});

import {readFileSync} from 'node:fs';
import path from 'node:path';

const cssPath = path.resolve(__dirname, '../../src/pages/index.module.css');
const css = readFileSync(cssPath, 'utf8');

function normalize(value: string): string {
  return value.replace(/\s+/g, ' ').trim();
}

function extractRule(selector: string): string {
  const escaped = selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const match = css.match(new RegExp(`${escaped}\\s*\\{(?<body>[^}]*)\\}`, 'm'));

  return match?.groups?.body ?? '';
}

function declarationsFor(selector: string): Record<string, string> {
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

describe('homepage v2 hero band css', () => {
  it('uses the brand token for the light hero band', () => {
    expect(declarationsFor('.hero').background).toBe('var(--site-brand)');
  });

  it('uses the brand-band token for the dark hero band', () => {
    expect(css).toMatch(
      /\[data-theme=['"]dark['"]\]\s+\.hero\s*\{[^}]*background:\s*var\(--site-brand-band\)/,
    );
  });

  it('uses the logo amber color for the band kicker', () => {
    expect(declarationsFor('.kicker').color?.toLowerCase()).toBe('#fe9900');
  });

  it('uses the hero CTA background and purple text for the primary CTA', () => {
    const primaryCta = declarationsFor('.primaryCta');

    expect(primaryCta.background).toBe('var(--site-hero-cta-bg)');
    expect(primaryCta.color?.toLowerCase()).toBe('#52176d');
  });

  it('uses a translucent white border for the secondary CTA', () => {
    const secondaryCta = declarationsFor('.secondaryCta');

    expect(secondaryCta['border-color']).toBe('rgba(255,255,255,.85)');
  });
});

import {readFileSync} from 'node:fs';
import path from 'node:path';

const cssPath = path.resolve(__dirname, '../../src/pages/index.module.css');
const css = readFileSync(cssPath, 'utf8');

function normalize(value: string): string {
  return value.replace(/\s+/g, ' ').trim();
}

function extractRule(selector: string, source = css): string {
  const escaped = selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const match = source.match(new RegExp(`${escaped}\\s*\\{(?<body>[^}]*)\\}`, 'm'));

  return match?.groups?.body ?? '';
}

function declarationsFor(selector: string, source = css): Record<string, string> {
  return Object.fromEntries(
    extractRule(selector, source)
      .split(';')
      .map(part => part.trim())
      .filter(Boolean)
      .map(part => {
        const [property, ...value] = part.split(':');
        return [property.trim(), normalize(value.join(':'))];
      }),
  );
}

function extractMediaBlock(maxWidth: number): string {
  const match = css.match(new RegExp(`@media[^{}]*max-width:\\s*${maxWidth}px[^{}]*\\{([\\s\\S]*)\\n\\}`, 'm'));

  return match?.[1] ?? '';
}

describe('hero AnalysisDemo layout css', () => {
  it('uses a two-column hero grid on desktop', () => {
    const heroInner = declarationsFor('.heroInner');

    expect(heroInner.display).toBe('grid');
    expect(heroInner['grid-template-columns']).toMatch(/(repeat\(2,\s*minmax\(0,\s*1fr\)\)|minmax\(0,\s*1fr\)\s+minmax\(0,\s*1fr\))/);
  });

  it('stacks hero content on mobile', () => {
    const mobile = extractMediaBlock(996);
    const heroInner = declarationsFor('.heroInner', mobile);

    expect(heroInner['grid-template-columns']).toBe('1fr');
  });

  it('sets the demo panel desktop height to 494px', () => {
    expect(declarationsFor('.analysisDemo').height).toBe('494px');
  });

  it('sets the demo panel mobile height to 420px and full width', () => {
    const mobile = extractMediaBlock(996);
    const analysisDemo = declarationsFor('.analysisDemo', mobile);

    expect(analysisDemo.height).toBe('420px');
    expect(analysisDemo.width).toBe('100%');
  });

  it('rounds the demo panel to 14px', () => {
    expect(declarationsFor('.analysisDemo')['border-radius']).toBe('14px');
  });
});

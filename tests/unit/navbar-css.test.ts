import {readFileSync} from 'node:fs';
import path from 'node:path';

const cssPath = path.resolve(process.cwd(), 'src/css/custom.css');
const css = readFileSync(cssPath, 'utf8');

type Rule = {
  selector: string;
  declarations: Map<string, string>;
};

function normalizeCssValue(value: string): string {
  return value.trim().replace(/\s+/g, ' ');
}

function parseRules(source: string): Rule[] {
  const rules: Rule[] = [];

  for (const match of source.matchAll(/([^{}]+)\{([^{}]*)\}/g)) {
    const [, selectorBlock, declarationBlock] = match;
    const declarations = new Map<string, string>();

    for (const declaration of declarationBlock.matchAll(/([\w-]+)\s*:\s*([^;]+);/g)) {
      const [, property, value] = declaration;
      declarations.set(property, normalizeCssValue(value));
    }

    for (const selector of selectorBlock.split(',')) {
      rules.push({selector: selector.trim(), declarations});
    }
  }

  return rules;
}

function findRule(selector: string): Rule | undefined {
  return parseRules(css).find(rule => rule.selector === selector);
}

function selectorIncludes(selectorPart: string): Rule[] {
  return parseRules(css).filter(rule => rule.selector.includes(selectorPart));
}

describe('navbar and footer CSS', () => {
  it('gives the navbar a site border divider', () => {
    expect(findRule('.navbar')?.declarations.get('border-bottom')).toBe('1px solid var(--site-border)');
  });

  it('styles the navbar CTA as an outline control instead of a filled primary', () => {
    expect(
      selectorIncludes('navbar-cta').some(rule => rule.declarations.get('background') === 'var(--site-accent)'),
    ).toBe(false);
    expect(
      selectorIncludes('navbar-cta').some(rule => rule.declarations.get('border')?.includes('var(--site-border-btn)')),
    ).toBe(true);
  });

  it('uses the themed footer background token', () => {
    expect(['var(--ifm-footer-background-color)', 'var(--site-bg-deep)']).toContain(
      findRule('.footer')?.declarations.get('background'),
    );
  });
});

import {existsSync, readFileSync} from 'node:fs';
import path from 'node:path';

const customCssPath = path.resolve(process.cwd(), 'src/css/custom.css');
const indexCssPath = path.resolve(process.cwd(), 'src/pages/index.module.css');
const tweetCardCssPath = path.resolve(process.cwd(), 'src/components/TweetCard/styles.module.css');
const css = [customCssPath, indexCssPath, tweetCardCssPath]
  .filter(existsSync)
  .map(file => readFileSync(file, 'utf8'))
  .join('\n');

function normalize(value: string): string {
  return value.replace(/\s+/g, ' ').trim();
}

function extractRule(selector: string): string {
  const escaped = selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const match = css.match(new RegExp(`${escaped}\\s*\\{(?<body>[^}]*)\\}`, 'm'));

  return normalize(match?.groups?.body ?? '');
}

function extractMediaBlock(query: string): string {
  const start = css.indexOf(query);

  if (start === -1) {
    return '';
  }

  const openBrace = css.indexOf('{', start);
  let depth = 0;

  for (let index = openBrace; index < css.length; index += 1) {
    if (css[index] === '{') {
      depth += 1;
    }

    if (css[index] === '}') {
      depth -= 1;
    }

    if (depth === 0) {
      return css.slice(openBrace + 1, index);
    }
  }

  return '';
}

function extractRuleFromSource(source: string, selector: string): string {
  const escaped = selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const match = source.match(new RegExp(`${escaped}\\s*\\{(?<body>[^}]*)\\}`, 'm'));

  return normalize(match?.groups?.body ?? '');
}

describe('typography wrapping css', () => {
  test.each(['h1', 'h2'])('%s uses balanced wrapping', selector => {
    expect(extractRule(selector)).toMatch(/text-wrap:\s*balance/);
  });

  it('uses pretty wrapping for paragraphs', () => {
    expect(extractRule('p')).toMatch(/text-wrap:\s*pretty/);
  });

  it('uses pretty wrapping for hero lead text', () => {
    expect(extractRule('.lead')).toMatch(/text-wrap:\s*pretty/);
  });

  it('keeps BalancedHeading word spans inline', () => {
    expect(extractRule('.bw')).toMatch(/display:\s*inline/);
  });

  it('keeps blog list post title links text-colored with accent hover', () => {
    expect(css).toMatch(/\.blogPostTitleLink[^{]*\{[^}]*color:\s*var\(--site-text\)/);
    expect(css).toMatch(/\.blogPostTitleLink[^{]*:hover[^{]*\{[^}]*color:\s*var\(--site-accent-text\)/);
  });

  it('centers the hero text column in the mobile media query', () => {
    const mobileBlock = extractMediaBlock('@media screen and (max-width: 996px)');

    expect(extractRuleFromSource(mobileBlock, '.heroText')).toMatch(/text-align:\s*center/);
  });
});

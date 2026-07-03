import {readFileSync} from 'node:fs';
import path from 'node:path';

const cssPath = path.resolve(process.cwd(), 'src/css/custom.css');
const trustLogoCssPath = path.resolve(process.cwd(), 'src/components/TrustLogos/styles.module.css');
const logoDir = path.resolve(process.cwd(), 'src/components/TrustLogos/logos');
const css = readFileSync(cssPath, 'utf8');
const trustLogoCss = readFileSync(trustLogoCssPath, 'utf8');

const logoComponents = [
  'BgdLabsLogo.tsx',
  'GearboxLogo.tsx',
  'HexensLogo.tsx',
  'LidoLogo.tsx',
  'MixBytesLogo.tsx',
  'OneInchLogo.tsx',
  'OxorioLogo.tsx',
  'PessimisticLogo.tsx',
  'TonCoreLogo.tsx',
];

function extractBlock(selector: string): string {
  const escapedSelector = selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const match = css.match(new RegExp(`${escapedSelector}\\s*\\{([\\s\\S]*?)\\}`, 'm'));
  return match?.[1] ?? '';
}

function parseCustomProperties(block: string): Map<string, string> {
  const declarations = new Map<string, string>();

  for (const match of block.matchAll(/(--[\w-]+)\s*:\s*([^;]+);/g)) {
    declarations.set(match[1], match[2].trim().replace(/\s+/g, ' '));
  }

  return declarations;
}

function normalizeHex(value: string | undefined): string | undefined {
  return value?.startsWith('#') ? value.toLowerCase() : value;
}

const rootBlock = extractBlock(':root');
const lightBlock = extractBlock("[data-theme='light']");
const lightTokens = parseCustomProperties(lightBlock);
const darkBlock = extractBlock("[data-theme='dark']");

describe('partner logo original color tokens', () => {
  test.each([
    ['--logo-ink', '#111827'],
    ['--logo-pessimistic-plate', '#FFE500'],
    ['--logo-oxorio-dot', '#FF6C1A'],
    ['--logo-mixbytes-accent', '#29C278'],
    ['--logo-gearbox-accent', '#FF4C00'],
    ['--logo-gearbox-accent2', '#F4129A'],
    ['--logo-ton-circle', '#0098EA'],
    ['--logo-oxorio-dot-stop', '#FF6C1A'],
    ['--logo-mellow', '#111827'],
  ])("[data-theme='light'] defines %s", (token, expected) => {
    expect(normalizeHex(lightTokens.get(token))).toBe(expected.toLowerCase());
  });

  it('does not define partner logo original tokens in :root', () => {
    expect(rootBlock).not.toMatch(/--logo-/);
  });

  it('does not define partner logo original tokens in the dark block', () => {
    expect(darkBlock).not.toMatch(/--logo-/);
  });

  test.each(logoComponents)('%s routes fills through logo CSS variables', fileName => {
    const source = readFileSync(path.join(logoDir, fileName), 'utf8');

    expect(source).toContain('var(--logo-');
  });

  test.each(logoComponents)('%s avoids naked hex fills or strokes in JSX', fileName => {
    const source = readFileSync(path.join(logoDir, fileName), 'utf8');

    expect(source).not.toMatch(/\b(?:fill|stroke|stopColor)=["']#/);
  });

  it('colors the Mellow mask from the logo variable fallback', () => {
    expect(trustLogoCss).toMatch(/background(?:-color)?:\s*var\(--logo-mellow,\s*currentColor\)/);
  });

  it('does not use grayscale filters for the light partner logo row', () => {
    expect(trustLogoCss).not.toMatch(/filter:\s*grayscale/i);
  });
});

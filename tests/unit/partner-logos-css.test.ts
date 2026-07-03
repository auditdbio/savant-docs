import {existsSync, readFileSync} from 'node:fs';
import path from 'node:path';

const cssPath = path.resolve(process.cwd(), 'src/components/TrustLogos/styles.module.css');
const css = existsSync(cssPath) ? readFileSync(cssPath, 'utf8') : '';

function normalize(value: string): string {
  return value.replace(/\s+/g, ' ').trim();
}

function extractRule(selector: string): string {
  const escaped = selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const match = css.match(new RegExp(`${escaped}\\s*\\{(?<body>[^}]*)\\}`, 'm'));

  return normalize(match?.groups?.body ?? '');
}

describe('partner logo css', () => {
  it('colors partner logos with the muted text token in the base state', () => {
    expect(extractRule('.partnerLogo')).toMatch(/color:\s*var\(--site-text-muted\)/);
  });

  it('uses the main text token on hover', () => {
    expect(extractRule('.partnerLogo:hover')).toMatch(/color:\s*var\(--site-text\)/);
  });

  it('does not use per-asset filter hacks', () => {
    expect(css).not.toMatch(/filter\s*:/);
  });

  it('renders Mellow Finance through a currentColor CSS mask', () => {
    const mellowRule = extractRule('.mellowLogo');

    expect(mellowRule).toMatch(/mask-image:\s*url\(['"]?\/img\/partners\/mellow\.png['"]?\)/);
    expect(mellowRule).toMatch(/background:\s*currentColor|background-color:\s*currentColor/);
  });

  it('ships the Mellow Finance PNG mask asset', () => {
    const assetPath = path.resolve(process.cwd(), 'static/img/partners/mellow.png');

    expect(existsSync(assetPath)).toBe(true);
  });
});

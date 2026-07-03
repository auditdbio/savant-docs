// Design-audit screenshot collector.
// Usage: node tools/design-audit/collect.mjs <outDir> [--ours-only|--competitors-only] [--seed N]
// Takes, per site x viewport: 1 top shot + N_RANDOM shots at seeded-random scroll positions.
import { chromium } from '@playwright/test';
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const OUT = process.argv[2];
if (!OUT) { console.error('outDir required'); process.exit(1); }
const oursOnly = process.argv.includes('--ours-only');
const compOnly = process.argv.includes('--competitors-only');
const seedArg = process.argv.indexOf('--seed');
let seed = seedArg > -1 ? Number(process.argv[seedArg + 1]) : 42;
const rand = () => { seed = (seed * 1664525 + 1013904223) % 4294967296; return seed / 4294967296; };

const VIEWPORTS = {
  mobile: { width: 375, height: 667 },
  laptop: { width: 1280, height: 800 },
  widescreen: { width: 1920, height: 1080 },
};
const N_RANDOM = 2; // + top shot = 3 per site/viewport

const COMPETITORS = [
  ['octane', 'https://www.octane.security/'],
  ['auditagent', 'https://auditagent.nethermind.io/'],
  ['testmachine', 'https://testmachine.ai/'],
  ['grego', 'https://grego.ai/'],
  ['sherlock', 'https://sherlock.xyz/'],
  ['oneinch', 'https://1inch.io/'],
  ['lido', 'https://lido.fi/'],
  ['phantom', 'https://phantom.com/'],
];
const OURS = [
  ['ours-dark', 'http://localhost:3000/', 'dark'],
  ['ours-light', 'http://localhost:3000/', 'light'],
];

mkdirSync(OUT, { recursive: true });
const browser = await chromium.launch();
const manifest = [];

async function shoot(name, url, theme) {
  for (const [vpName, vp] of Object.entries(VIEWPORTS)) {
    const ctx = await browser.newContext({
      viewport: vp,
      userAgent: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
    });
    const page = await ctx.newPage();
    try {
      await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 25000 });
      await page.waitForTimeout(3500);
      if (theme) {
        const current = await page.evaluate(() => document.documentElement.dataset.theme);
        if (current !== theme) {
          await page.click('.navbar [class*=colorModeToggle] button').catch(() => {});
          await page.waitForTimeout(500);
        }
      }
      // dismiss common cookie banners best-effort
      for (const sel of ['button:has-text("Accept")', 'button:has-text("Agree")', '[aria-label="Close"]']) {
        await page.locator(sel).first().click({ timeout: 800 }).catch(() => {});
      }
      const docH = await page.evaluate(() => document.documentElement.scrollHeight);
      const positions = [0];
      for (let i = 0; i < N_RANDOM; i++) {
        positions.push(Math.floor(rand() * Math.max(1, docH - vp.height)));
      }
      for (let i = 0; i < positions.length; i++) {
        await page.evaluate(y => window.scrollTo(0, y), positions[i]);
        await page.waitForTimeout(900);
        const file = `${name}__${vpName}__pos${i}.png`;
        await page.screenshot({ path: join(OUT, file) });
        manifest.push({ site: name, viewport: vpName, pos: i, scrollY: positions[i], file });
      }
      console.log(`ok ${name} ${vpName}`);
    } catch (e) {
      console.log(`SKIP ${name} ${vpName}: ${String(e).slice(0, 100)}`);
    } finally {
      await ctx.close();
    }
  }
}

if (!oursOnly) for (const [name, url] of COMPETITORS) await shoot(name, url);
if (!compOnly) for (const [name, url, theme] of OURS) await shoot(name, url, theme);

writeFileSync(join(OUT, 'manifest.json'), JSON.stringify(manifest, null, 2));
await browser.close();
console.log(`done: ${manifest.length} screenshots`);

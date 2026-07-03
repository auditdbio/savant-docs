#!/usr/bin/env node
import {chromium} from '@playwright/test';

const url = process.argv[2];

if (!url) {
  console.error('Usage: node tools/design-audit/metrics.mjs <url>');
  process.exit(1);
}

const viewport = {width: 1280, height: 800};

function round(value, places = 3) {
  const factor = 10 ** places;
  return Math.round(value * factor) / factor;
}

const browser = await chromium.launch();
const context = await browser.newContext({
  viewport,
  userAgent:
    'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
});
const page = await context.newPage();

try {
  await page.goto(url, {waitUntil: 'domcontentloaded', timeout: 30000});
  await page.waitForLoadState('networkidle', {timeout: 12000}).catch(() => {});
  await page.waitForTimeout(1500);

  for (const selector of [
    'button:has-text("Accept")',
    'button:has-text("Agree")',
    'button:has-text("Got it")',
    '[aria-label="Close"]',
    '[aria-label="close"]',
  ]) {
    await page.locator(selector).first().click({timeout: 700}).catch(() => {});
  }

  const metrics = await page.evaluate(({viewport}) => {
    const maxTextSamples = 200;

    function isVisibleElement(element) {
      if (!(element instanceof Element)) return false;
      const style = getComputedStyle(element);
      const rect = element.getBoundingClientRect();

      return (
        style.display !== 'none' &&
        style.visibility !== 'hidden' &&
        Number(style.opacity || '1') > 0.01 &&
        rect.width > 0 &&
        rect.height > 0
      );
    }

    function parseRgb(value) {
      const match = value.match(/rgba?\(([^)]+)\)/i);
      if (!match) return null;
      const parts = match[1].split(',').map(part => part.trim());
      const [r, g, b] = parts.slice(0, 3).map(Number);
      const a = parts[3] === undefined ? 1 : Number(parts[3]);

      if ([r, g, b, a].some(channel => Number.isNaN(channel))) return null;
      return {r, g, b, a};
    }

    function composite(fg, bg) {
      const alpha = fg.a + bg.a * (1 - fg.a);
      if (alpha === 0) return {r: 255, g: 255, b: 255, a: 1};

      return {
        r: (fg.r * fg.a + bg.r * bg.a * (1 - fg.a)) / alpha,
        g: (fg.g * fg.a + bg.g * bg.a * (1 - fg.a)) / alpha,
        b: (fg.b * fg.a + bg.b * bg.a * (1 - fg.a)) / alpha,
        a: alpha,
      };
    }

    function effectiveBackground(element) {
      let current = element;
      let color = {r: 255, g: 255, b: 255, a: 1};
      const layers = [];

      while (current && current instanceof Element) {
        const parsed = parseRgb(getComputedStyle(current).backgroundColor);
        if (parsed && parsed.a > 0) layers.push(parsed);
        current = current.parentElement;
      }

      for (let index = layers.length - 1; index >= 0; index -= 1) {
        color = composite(layers[index], color);
      }

      return color;
    }

    function luminance(color) {
      const channels = [color.r, color.g, color.b].map(value => {
        const normalized = value / 255;
        return normalized <= 0.03928
          ? normalized / 12.92
          : ((normalized + 0.055) / 1.055) ** 2.4;
      });

      return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
    }

    function contrastRatio(fg, bg) {
      const l1 = luminance(fg);
      const l2 = luminance(bg);
      const lighter = Math.max(l1, l2);
      const darker = Math.min(l1, l2);

      return (lighter + 0.05) / (darker + 0.05);
    }

    function normalizeColor(value) {
      const parsed = parseRgb(value);
      if (!parsed || parsed.a === 0) return null;
      return `rgba(${Math.round(parsed.r)},${Math.round(parsed.g)},${Math.round(parsed.b)},${Math.round(parsed.a * 1000) / 1000})`;
    }

    const visibleElements = [...document.body.querySelectorAll('*')]
      .filter(element => isVisibleElement(element));
    const textElements = visibleElements
      .filter(element => element.textContent?.trim() && !['SCRIPT', 'STYLE', 'NOSCRIPT', 'SVG', 'IMG', 'VIDEO', 'CANVAS'].includes(element.tagName));

    const fontSizes = [...new Set(textElements
      .map(element => Number.parseFloat(getComputedStyle(element).fontSize))
      .filter(size => Number.isFinite(size) && size > 0)
      .map(size => Math.round(size * 10) / 10))]
      .sort((a, b) => a - b);
    const typeScaleRatios = fontSizes.slice(1).map((size, index) => Math.round((size / fontSizes[index]) * 1000) / 1000);
    const fontFamilies = [...new Set(textElements.map(element => getComputedStyle(element).fontFamily.trim()).filter(Boolean))].sort();

    const palette = new Set();
    for (const element of visibleElements) {
      if (['IMG', 'PICTURE', 'VIDEO', 'CANVAS', 'SOURCE'].includes(element.tagName)) continue;
      const style = getComputedStyle(element);
      const color = normalizeColor(style.color);
      const background = normalizeColor(style.backgroundColor);
      if (color) palette.add(`color:${color}`);
      if (background) palette.add(`bg:${background}`);
    }

    const main = document.querySelector('main') || document.body;
    const gapCounts = new Map();
    let gapTotal = 0;
    let gapMultipleOf4 = 0;
    const parents = [main, ...main.querySelectorAll('*')].filter(element => element.children.length > 1);

    for (const parent of parents) {
      const children = [...parent.children]
        .filter(child => isVisibleElement(child))
        .map(child => child.getBoundingClientRect())
        .filter(rect => rect.width > 0 && rect.height > 0)
        .sort((a, b) => a.top - b.top || a.left - b.left);

      for (let index = 0; index < children.length - 1; index += 1) {
        const current = children[index];
        const next = children[index + 1];
        const overlapsX = Math.min(current.right, next.right) - Math.max(current.left, next.left) > 0;
        const gap = next.top - current.bottom;

        if (!overlapsX || gap < 0 || gap > 320) continue;

        const roundedGap = Math.round(gap);
        gapCounts.set(roundedGap, (gapCounts.get(roundedGap) ?? 0) + 1);
        gapTotal += 1;
        if (Math.abs(roundedGap / 4 - Math.round(roundedGap / 4)) < 0.001) {
          gapMultipleOf4 += 1;
        }
      }
    }

    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        if (!node.textContent?.trim()) return NodeFilter.FILTER_REJECT;
        const parent = node.parentElement;
        if (!parent || !isVisibleElement(parent)) return NodeFilter.FILTER_REJECT;
        if (['SCRIPT', 'STYLE', 'NOSCRIPT'].includes(parent.tagName)) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      },
    });
    const textContrasts = [];
    let textNode = walker.nextNode();

    while (textNode && textContrasts.length < maxTextSamples) {
      const parent = textNode.parentElement;
      const range = document.createRange();
      range.selectNodeContents(textNode);
      const rect = range.getBoundingClientRect();

      if (parent && rect.width > 0 && rect.height > 0) {
        const style = getComputedStyle(parent);
        const fg = parseRgb(style.color);
        const bg = effectiveBackground(parent);
        if (fg) {
          textContrasts.push({
            text: textNode.textContent.trim().replace(/\s+/g, ' ').slice(0, 80),
            ratio: Math.round(contrastRatio(fg, bg) * 1000) / 1000,
            color: style.color,
            backgroundColor: `rgb(${Math.round(bg.r)}, ${Math.round(bg.g)}, ${Math.round(bg.b)})`,
          });
        }
      }

      textNode = walker.nextNode();
    }

    const ctaSelector = [
      'a[href]',
      'button',
      '[role="button"]',
      'input[type="button"]',
      'input[type="submit"]',
    ].join(',');
    const ctaElements = [...document.querySelectorAll(ctaSelector)].filter(element => {
      if (!isVisibleElement(element)) return false;
      const rect = element.getBoundingClientRect();
      const text = (element.textContent || element.getAttribute('aria-label') || element.getAttribute('value') || '').trim();
      const href = element.getAttribute('href') || '';
      const className = String(element.getAttribute('class') || '');
      const ctaText = /(start|sign|try|demo|audit|contact|get|book|launch|join|pricing|free|login|request)/i.test(text);
      const ctaClass = /(button|btn|cta)/i.test(className);
      const ctaHref = /(signup|login|contact|demo|pricing|dashboard|app)/i.test(href);

      return rect.top < viewport.height && rect.bottom > 0 && (ctaText || ctaClass || ctaHref);
    });

    const minContrast = textContrasts.length > 0
      ? textContrasts.reduce((min, item) => item.ratio < min.ratio ? item : min, textContrasts[0])
      : null;

    return {
      url: location.href,
      title: document.title,
      viewport,
      fontSizes,
      distinctFontSizeCount: fontSizes.length,
      typeScaleRatios,
      fontFamilies,
      distinctFontFamilyCount: fontFamilies.length,
      spacing: {
        sampleCount: gapTotal,
        multipleOf4Count: gapMultipleOf4,
        multipleOf4Share: gapTotal ? Math.round((gapMultipleOf4 / gapTotal) * 1000) / 1000 : null,
        distribution: Object.fromEntries([...gapCounts.entries()].sort((a, b) => Number(a[0]) - Number(b[0]))),
      },
      colorPalette: {
        distinctComputedColorBackgroundCount: palette.size,
        values: [...palette].sort(),
      },
      textContrast: {
        sampleCount: textContrasts.length,
        minRatio: minContrast?.ratio ?? null,
        minSample: minContrast ?? null,
      },
      ctaCountAboveFold: ctaElements.length,
    };
  }, {viewport});

  console.log(JSON.stringify(metrics, null, 2));
} catch (error) {
  console.log(JSON.stringify({
    url,
    error: String(error instanceof Error ? error.message : error),
  }, null, 2));
  process.exitCode = 2;
} finally {
  await context.close();
  await browser.close();
}

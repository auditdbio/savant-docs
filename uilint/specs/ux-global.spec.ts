import {
  MIN_ADJACENT_REGION_DISTANCE,
  MIN_TEXT_BG_DISTANCE,
  alignedHorizEqualGap,
  alignedHorizontally,
  alignedHorizontallyTop,
  alignedVerticallyEdges,
  alignedVerticallyLeft,
  almostSquared,
  below,
  centered,
  colorDistance,
  countIs,
  defineLayoutSpec,
  eq,
  forAll,
  gte,
  heightIn,
  inside,
  lte,
  noOverlap,
  rightOf,
  singleLineText,
  textDoesNotOverflow,
  textLinesAtMost,
  textMatches,
  visible,
  widthMatches,
  widthIn,
} from '@uilint/core';
import type {ElemRef, GroupRef, LayoutConstraint, RuntimeCtx, Violation} from '@uilint/core';
import {centeredTextLine, noOrphanLastLine} from '../lib/noOrphanLastLine';

function primaryCtaCanvasTopAtMost(target: ElemRef, maxTop: number, name: string): LayoutConstraint {
  return rt => {
    const el = rt.el(target);

    return {
      name,
      check() {
        return el.top <= maxTop
          ? []
          : [{
            constraint: name,
            message: `primary CTA starts too low in document: got ${el.top}, expected <= ${maxTop}`,
          }];
      },
    };
  };
}

function ctaGapAtLeast(group: GroupRef, minGap: number, name: string): LayoutConstraint {
  return (rt: RuntimeCtx) => {
    const buttons = rt.group(group).filter(button => button.visible).sort((a, b) => a.left - b.left);

    return {
      name,
      check() {
        if (buttons.length < 2) {
          return [{
            constraint: name,
            message: `expected at least two CTA buttons, got ${buttons.length}`,
          }];
        }

        const horizontalGap = buttons[1].left - buttons[0].right;
        const verticalGap = Math.max(buttons[1].top - buttons[0].bottom, buttons[0].top - buttons[1].bottom);
        const gap = Math.max(horizontalGap, verticalGap);
        return gap >= minGap
          ? []
          : [{
            constraint: name,
            message: `hero CTA gap too small: got ${gap}, expected >= ${minGap}`,
          }];
      },
    };
  };
}

function canvasWidthNoOverflow(target: ElemRef, name: string): LayoutConstraint {
  return rt => {
    const el = rt.el(target);

    return {
      name,
      check() {
        const violations: Violation[] = [];

        if (el.left < 0 || el.right > rt.view.width) {
          violations.push({
            constraint: name,
            message: `hero overflows horizontally: left ${el.left}, right ${el.right}, viewport ${rt.view.width}`,
          });
        }

        if (el.width > rt.view.width) {
          violations.push({
            constraint: name,
            message: `hero wider than viewport: got ${el.width}, expected <= ${rt.view.width}`,
          });
        }

        return violations;
      },
    };
  };
}

function widthAtLeastPercentOf(target: ElemRef, container: ElemRef, percent: number, name: string): LayoutConstraint {
  return rt => {
    const el = rt.el(target);
    const parent = rt.el(container);

    return {
      name,
      check() {
        const minWidth = parent.width * percent;

        return el.width >= minWidth
          ? []
          : [{
            constraint: name,
            message: `${el.name} width too small: got ${el.width}, expected >= ${minWidth}`,
          }];
      },
    };
  };
}

function centeredMaxWidthOnWidescreen(target: ElemRef, maxWidth: number, name: string): LayoutConstraint {
  return rt => {
    const el = rt.el(target);

    return {
      name,
      check() {
        if (rt.view.width < 1900) {
          return [];
        }

        const leftGap = el.left;
        const rightGap = rt.view.width - el.right;
        const violations: Violation[] = [];

        if (el.width > maxWidth) {
          violations.push({
            constraint: name,
            message: `${el.name} is too wide on widescreen: got ${el.width}, expected <= ${maxWidth}`,
          });
        }

        if (Math.abs(leftGap - rightGap) > 12) {
          violations.push({
            constraint: name,
            message: `${el.name} is not centered on widescreen: left gap ${leftGap}, right gap ${rightGap}`,
          });
        }

        return violations;
      },
    };
  };
}

function alignedHorizontallyOnWide(group: GroupRef, tolerance: number, name: string): LayoutConstraint {
  return rt => {
    const items = rt.group(group).filter(item => item.visible);

    return {
      name,
      check() {
        if (rt.view.width < 1440 || items.length < 2) {
          return [];
        }

        const baseline = (items[0].top + items[0].bottom) / 2;

        return items.flatMap((item, index) => {
          const centerY = (item.top + item.bottom) / 2;
          const delta = Math.abs(centerY - baseline);

          return delta <= tolerance
            ? []
            : [{
              constraint: `${name}[${index}]`,
              message: `${item.name} is not on the wide single-row baseline: centerY delta ${delta}, expected <= ${tolerance}`,
            }];
        });
      },
    };
  };
}

function heightAtLeastPercentOf(target: ElemRef, container: ElemRef, percent: number, name: string): LayoutConstraint {
  return rt => {
    const el = rt.el(target);
    const parent = rt.el(container);

    return {
      name,
      check() {
        if (rt.view.width < 1440) {
          return [];
        }

        const minHeight = parent.height * percent;

        return el.height >= minHeight
          ? []
          : [{
            constraint: name,
            message: `${el.name} height too short: got ${el.height}, expected >= ${minHeight}`,
          }];
      },
    };
  };
}

function defineUxGlobalSpec({
  includeLightLogoContrast,
  includeNavbarCtaContrast,
}: {
  includeLightLogoContrast: boolean;
  includeNavbarCtaContrast: boolean;
}) {
  return defineLayoutSpec(ctx => {
  const navbar = ctx.el('.navbar', 'navbar');
  const navbarCta = ctx.el('.navbar-cta', 'navbar CTA');
  const hero = ctx.el('[data-testid="hero"]', 'hero');
  const heroInner = ctx.el('[data-testid="hero"] > div', 'hero inner container');
  const kicker = ctx.el('[data-testid="hero-kicker"]', 'hero kicker');
  const title = ctx.el('[data-testid="hero-title"]', 'hero title');
  const lead = ctx.el('[data-testid="hero-lead"]', 'hero lead');
  const ctas = ctx.el('[data-testid="hero-ctas"]', 'hero CTAs');
  const note = ctx.el('[data-testid="hero-note"]', 'hero note');
  const analysisDemo = ctx.el('[data-testid="analysis-demo"]', 'analysis demo');
  const analysisDemoCanvas = ctx.el('[data-testid="analysis-demo"] canvas', 'analysis demo canvas');
  const analysisPanel = ctx.el('[data-testid="analysis-demo"] div[style*="position: absolute"]', 'analysis panel');
  const primaryCta = ctx.el('[data-testid="hero-ctas"] .button--primary', 'hero primary CTA');
  const trustLogos = ctx.el('[data-testid="trust-logos"]', 'trust logos');
  const trustLabel = ctx.el('[data-testid="trust-logos"] p', 'trust logos label');
  const proofStats = ctx.el('[data-testid="proof-stats"]', 'proof stats');
  const proofTitle = ctx.el('[data-testid="proof-stats"] h2', 'proof stats title');
  const pillars = ctx.el('[data-testid="pillars"]', 'pillars');
  const pillarsTitle = ctx.el('[data-testid="pillars"] h2', 'pillars title');
  const coverage = ctx.el('[data-testid="coverage"]', 'coverage');
  const coverageTitle = ctx.el('[data-testid="coverage"] h2', 'coverage title');
  const coverageLanguageColumn = ctx.el('[data-testid="coverage"] > div > div:first-child', 'coverage language column');
  const coverageChipCloud = ctx.el('[data-testid="coverage"] [aria-label="Vulnerability classes"]', 'coverage chip cloud');
  const comparison = ctx.el('[data-testid="comparison"]', 'comparison');
  const comparisonTitle = ctx.el('[data-testid="comparison"] h2', 'comparison title');
  const comparisonScroll = ctx.el('[data-testid="comparison-scroll"]', 'comparison scroll container');
  const comparisonSavantColumn = ctx.el('[data-testid="comparison-savant-column"]', 'Savant comparison column');
  const comparisonRegularColumn = ctx.el('[data-testid="comparison-regular-column"]', 'regular comparison column');
  const testimonials = ctx.el('[data-testid="testimonials"]', 'testimonials');
  const testimonialsTitle = ctx.el('[data-testid="testimonials"] h2', 'testimonials title');
  const pricing = ctx.el('[data-testid="pricing"]', 'pricing');
  const pricingTitle = ctx.el('[data-testid="pricing"] h2', 'pricing title');
  const firstPricingCard = ctx.el('[data-testid="pricing-card"]:nth-of-type(1)', 'first pricing card');
  const secondPricingCard = ctx.el('[data-testid="pricing-card"]:nth-of-type(2)', 'second pricing card');
  const thirdPricingCard = ctx.el('[data-testid="pricing-card"]:nth-of-type(3)', 'third pricing card');
  const featuredPricingCard = ctx.el('[data-testid="pricing-card-featured"]', 'featured pricing card');
  const faq = ctx.el('[data-testid="faq"]', 'FAQ');
  const faqTitle = ctx.el('[data-testid="faq"] h2', 'FAQ title');
  const finalCta = ctx.el('[data-testid="final-cta"]', 'final CTA');
  const finalCtaTitle = ctx.el('[data-testid="final-cta"] h2', 'final CTA title');
  const finalCtaButton = ctx.el('[data-testid="final-cta"] a', 'final CTA button');
  const footer = ctx.el('.footer', 'footer');
  const footerInner = ctx.el('.footer > .container', 'footer inner container');
  const partnerLogos = ctx.group('[data-testid="partner-logo"]', 'partner logos');
  const firstPartnerLogo = ctx.el('[data-testid="partner-logo"]:nth-of-type(1)', 'first partner logo');
  const secondPartnerLogo = ctx.el('[data-testid="partner-logo"]:nth-of-type(2)', 'second partner logo');
  const lastPartnerLogo = ctx.el('[data-testid="partner-logo"]:nth-of-type(10)', 'last partner logo');
  const statCards = ctx.group('[data-testid="stat-card"]', 'proof stat cards');
  const firstRowStatCards = ctx.group(
    '[data-testid="proof-stats"] [data-testid="stat-card"]:nth-of-type(-n+3)',
    'first row proof stat cards',
  );
  const pillarCards = ctx.group('[data-testid="pillar-card"]', 'pillar cards');
  const pillarCardTitles = ctx.group('[data-testid="pillar-card"] h3', 'pillar card titles');
  const firstPillarCard = ctx.el('[data-testid="pillar-card"]:nth-of-type(1)', 'first pillar card');
  const secondPillarCard = ctx.el('[data-testid="pillar-card"]:nth-of-type(2)', 'second pillar card');
  const thirdPillarCard = ctx.el('[data-testid="pillar-card"]:nth-of-type(3)', 'third pillar card');
  const firstPillarTitle = ctx.el(
    '[data-testid="pillar-card"]:nth-of-type(1) h3',
    'first pillar card title',
  );
  const coverageChips = ctx.group('[data-testid="coverage-chip"]', 'coverage chips');
  const firstCoverageChip = ctx.el('[data-testid="coverage-chip"]:nth-of-type(1)', 'first coverage chip');
  const highlightedCoverageChip = ctx.el('[data-testid="coverage-chip"]:last-of-type', 'highlighted coverage chip');
  const comparisonRows = ctx.group('[data-testid="comparison-row"]', 'comparison rows');
  const tweetCards = ctx.group('[data-testid="tweet-card"]', 'testimonial tweet cards');
  const tweetTexts = ctx.group('[data-testid="tweet-text"]', 'testimonial tweet text');
  const tweetAvatars = ctx.group('[data-testid="tweet-avatar"]', 'testimonial tweet avatars');
  const firstTweetCard = ctx.el('[data-testid="tweet-card"]:nth-of-type(1)', 'first tweet card');
  const secondTweetCard = ctx.el('[data-testid="tweet-card"]:nth-of-type(2)', 'second tweet card');
  const thirdTweetCard = ctx.el('[data-testid="tweet-card"]:nth-of-type(3)', 'third tweet card');
  const firstTweetHeader = ctx.el(
    '[data-testid="tweet-card"]:nth-of-type(1) [data-testid="tweet-header"]',
    'first tweet header',
  );
  const firstTweetText = ctx.el(
    '[data-testid="tweet-card"]:nth-of-type(1) [data-testid="tweet-text"]',
    'first tweet text',
  );
  const secondTweetHeader = ctx.el(
    '[data-testid="tweet-card"]:nth-of-type(2) [data-testid="tweet-header"]',
    'second tweet header',
  );
  const secondTweetText = ctx.el(
    '[data-testid="tweet-card"]:nth-of-type(2) [data-testid="tweet-text"]',
    'second tweet text',
  );
  const thirdTweetHeader = ctx.el(
    '[data-testid="tweet-card"]:nth-of-type(3) [data-testid="tweet-header"]',
    'third tweet header',
  );
  const thirdTweetText = ctx.el(
    '[data-testid="tweet-card"]:nth-of-type(3) [data-testid="tweet-text"]',
    'third tweet text',
  );
  const pricingCards = ctx.group('[data-testid="pricing-card"]', 'pricing cards');
  const pricingCardTitles = ctx.group('[data-testid="pricing-card"] h3', 'pricing card titles');
  const priceValues = ctx.group('[data-testid="pricing-price"]', 'pricing prices');
  const faqSummaries = ctx.group('[data-testid="faq-summary"]', 'FAQ summaries');
  const faqItems = ctx.group('[data-testid="faq-item"]', 'FAQ items');
  const firstFaqItem = ctx.el('[data-testid="faq-item"]:nth-of-type(1)', 'first FAQ item');
  const lastFaqItem = ctx.el('[data-testid="faq-item"]:nth-of-type(6)', 'last FAQ item');
  const heroButtons = ctx.group('[data-testid="hero-ctas"] a', 'hero CTA buttons');
  const heroPrimaryButtons = ctx.group('[data-testid="hero"] .button--primary', 'hero primary CTAs');
  const heroTextAndDemo = ctx.group(
    '[data-testid="hero-title"], [data-testid="hero-lead"], [data-testid="hero-ctas"], [data-testid="analysis-demo"]',
    'hero text and analysis demo',
  );
  const heroWords = ctx.group('[data-testid="hero-title"] .bw', 'hero title words');
  const proofTitleWords = ctx.group('[data-testid="proof-stats"] h2 .bw', 'proof title words');
  const pillarsTitleWords = ctx.group('[data-testid="pillars"] h2 .bw', 'pillars title words');
  const coverageTitleWords = ctx.group('[data-testid="coverage"] h2 .bw', 'coverage title words');
  const comparisonTitleWords = ctx.group('[data-testid="comparison"] h2 .bw', 'comparison title words');
  const testimonialsTitleWords = ctx.group('[data-testid="testimonials"] h2 .bw', 'testimonials title words');
  const pricingTitleWords = ctx.group('[data-testid="pricing"] h2 .bw', 'pricing title words');
  const faqTitleWords = ctx.group('[data-testid="faq"] h2 .bw', 'FAQ title words');
  const finalCtaTitleWords = ctx.group('[data-testid="final-cta"] h2 .bw', 'final CTA title words');
  const finalCtaLead = ctx.el('[data-testid="final-cta"] p', 'final CTA lead');
  const h2Titles = [
    proofTitle,
    pillarsTitle,
    coverageTitle,
    comparisonTitle,
    testimonialsTitle,
    pricingTitle,
    faqTitle,
    finalCtaTitle,
  ];

  ctx.must(
    textMatches(title, /Find Smart(?: |\u00a0)Contract Vulnerabilities/, 'hero/title-copy'),
    textMatches(primaryCta, /\$75/, 'hero/primary-cta-mentions-free-credit'),
    countIs(heroPrimaryButtons, eq(1), 'hero/primary-cta-count'),
    forAll(heroButtons, button => heightIn(button, gte(44)), 'hero/cta-height-min'),
    noOverlap(heroButtons, {tolerance: 0}, 'hero/ctas-do-not-overlap'),
    ctaGapAtLeast(heroButtons, 12, 'hero/cta-gap-min'),
    below(title, kicker, gte(0), 'hero/title-below-kicker'),
    below(lead, title, gte(0), 'hero/lead-below-title'),
    below(ctas, lead, gte(0), 'hero/ctas-below-lead'),
    below(note, ctas, gte(0), 'hero/note-below-ctas'),
    visible(analysisDemo, true, 'hero/analysis-demo-visible'),
    visible(analysisDemoCanvas, true, 'hero/analysis-demo-canvas-visible'),
    inside(analysisDemo, hero, undefined, 'hero/analysis-demo-inside'),
    heightIn(analysisDemo, gte(400), 'hero/analysis-demo-height-min'),
    heightIn(analysisDemo, lte(520), 'hero/analysis-demo-height-max'),
    noOverlap(heroTextAndDemo, {tolerance: 0}, 'hero/analysis-demo-no-overlap-text'),
    below(trustLogos, hero, gte(0), 'trust-logos/below-hero'),
    below(proofStats, trustLogos, gte(0), 'proof-stats/below-trust-logos'),
    below(pillars, proofStats, gte(0), 'pillars/below-proof-stats'),
    below(coverage, pillars, gte(0), 'coverage/below-pillars'),
    below(comparison, coverage, gte(0), 'comparison/below-coverage'),
    below(testimonials, comparison, gte(0), 'testimonials/below-comparison'),
    below(pricing, testimonials, gte(0), 'pricing/below-testimonials'),
    below(faq, pricing, gte(0), 'faq/below-pricing'),
    below(finalCta, faq, gte(0), 'final-cta/below-faq'),
    below(footer, finalCta, gte(0), 'footer/below-final-cta'),
    colorDistance(title, hero, gte(MIN_TEXT_BG_DISTANCE), undefined, 'hero/title-contrast'),
    colorDistance(lead, hero, gte(MIN_TEXT_BG_DISTANCE), undefined, 'hero/lead-contrast'),
    colorDistance(primaryCta, primaryCta, gte(MIN_TEXT_BG_DISTANCE), undefined, 'hero/primary-cta-contrast'),
    countIs(statCards, eq(6), 'proof-stats/card-count'),
    countIs(pillarCards, eq(3), 'pillars/card-count'),
    countIs(tweetCards, eq(3), 'testimonials/card-count'),
    countIs(pricingCards, eq(3), 'pricing/card-count'),
    textMatches(proofStats, /87–95%/, 'proof-stats/ctfbench-accuracy-copy'),
    textMatches(firstPillarTitle, /Deeper than a scanner/, 'pillars/first-card-title-copy'),
    textMatches(comparisonTitle, /Savant Chat vs the alternatives/, 'comparison/title-copy'),
    textMatches(pricingTitle, /Pay as you go\. Priced per line\./, 'pricing/title-copy'),
    visible(trustLogos, true, 'trust-logos/section-visible'),
    visible(trustLabel, true, 'trust-logos/label-visible'),
    textDoesNotOverflow(trustLabel, 'trust-logos/label-no-overflow'),
    widthIn(trustLabel, gte(120), 'trust-logos/label-width-min'),
    visible(firstPartnerLogo, true, 'trust-logos/first-logo-visible'),
    visible(secondPartnerLogo, true, 'trust-logos/second-logo-visible'),
    visible(lastPartnerLogo, true, 'trust-logos/last-logo-visible'),
    textDoesNotOverflow(lastPartnerLogo, 'trust-logos/last-logo-no-overflow'),
    heightIn(trustLogos, gte(80), 'trust-logos/section-height-min'),
    widthIn(trustLogos, gte(320), 'trust-logos/section-width-min'),
    heightIn(firstPartnerLogo, gte(20), 'trust-logos/first-logo-height-min'),
    heightIn(lastPartnerLogo, gte(20), 'trust-logos/last-logo-height-min'),
    widthIn(firstPartnerLogo, gte(20), 'trust-logos/first-logo-width-min'),
    widthIn(lastPartnerLogo, gte(20), 'trust-logos/last-logo-width-min'),
    visible(coverage, true, 'coverage/section-visible'),
    visible(firstCoverageChip, true, 'coverage/first-chip-visible'),
    visible(highlightedCoverageChip, true, 'coverage/highlight-chip-visible'),
    textMatches(coverageTitle, /Every major contract language/, 'coverage/title-copy'),
    textDoesNotOverflow(coverageTitle, 'coverage/title-no-overflow'),
    heightIn(coverage, gte(260), 'coverage/section-height-min'),
    widthIn(firstCoverageChip, gte(80), 'coverage/first-chip-width-min'),
    widthIn(highlightedCoverageChip, gte(120), 'coverage/highlight-chip-width-min'),
    visible(comparison, true, 'comparison/section-visible'),
    visible(comparisonScroll, true, 'comparison/scroll-visible'),
    visible(comparisonRegularColumn, true, 'comparison/regular-column-visible'),
    visible(comparisonSavantColumn, true, 'comparison/savant-column-visible'),
    countIs(comparisonRows, eq(7), 'comparison/row-count'),
    textDoesNotOverflow(comparisonTitle, 'comparison/title-no-overflow'),
    heightIn(comparison, gte(420), 'comparison/section-height-min'),
    widthIn(comparisonScroll, gte(300), 'comparison/scroll-width-min'),
    visible(faq, true, 'faq/section-visible'),
    visible(firstFaqItem, true, 'faq/first-item-visible'),
    visible(lastFaqItem, true, 'faq/last-item-visible'),
    countIs(faqItems, eq(6), 'faq/item-count'),
    textMatches(faqTitle, /Honest answers/, 'faq/title-copy'),
    textDoesNotOverflow(faqTitle, 'faq/title-no-overflow'),
    heightIn(faq, gte(360), 'faq/section-height-min'),
    visible(finalCta, true, 'final-cta/section-visible'),
    visible(finalCtaTitle, true, 'final-cta/title-visible'),
    visible(finalCtaLead, true, 'final-cta/lead-visible'),
    visible(finalCtaButton, true, 'final-cta/button-visible'),
    textMatches(finalCtaTitle, /\$75 free/, 'final-cta/title-copy'),
    textDoesNotOverflow(finalCtaTitle, 'final-cta/title-no-overflow'),
    textDoesNotOverflow(finalCtaLead, 'final-cta/lead-no-overflow'),
    heightIn(finalCtaButton, gte(44), 'final-cta/button-height-min'),
    colorDistance(
      comparisonSavantColumn,
      comparisonRegularColumn,
      gte(MIN_ADJACENT_REGION_DISTANCE),
      {from: 'backgroundColor', to: 'backgroundColor'},
      'comparison/savant-column-bg-distinct',
    ),
    colorDistance(
      featuredPricingCard,
      firstPricingCard,
      gte(MIN_ADJACENT_REGION_DISTANCE),
      {from: 'backgroundColor', to: 'backgroundColor'},
      'pricing/featured-card-bg-distinct',
    ),
    colorDistance(finalCtaButton, finalCtaButton, gte(MIN_TEXT_BG_DISTANCE), undefined, 'final-cta/button-contrast'),
    countIs(partnerLogos, eq(10), 'trust-logos/logo-count'),
    forAll(partnerLogos, logo => heightIn(logo, gte(18)), 'trust-logos/logo-height-min'),
    forAll(partnerLogos, logo => heightIn(logo, lte(36)), 'trust-logos/logo-height-max'),
    includeLightLogoContrast
      ? forAll(
        partnerLogos,
        logo => colorDistance(logo, trustLogos, gte(MIN_ADJACENT_REGION_DISTANCE)),
        'trust-logos/light-logo-bg-color-distance',
      )
      : [],
    alignedHorizontallyOnWide(partnerLogos, 2, 'trust-logos/wide-single-row'),
    noOverlap(partnerLogos, {tolerance: 0}, 'trust-logos/logos-no-overlap'),
    noOverlap(coverageChips, {tolerance: 0}, 'coverage/chips-no-overlap'),
    heightAtLeastPercentOf(coverageChipCloud, coverageLanguageColumn, 0.55, 'coverage/chip-cloud-height-wide'),
    forAll(pillarCards, card => textDoesNotOverflow(card), 'pillars/card-text-no-overflow'),
    below(firstTweetText, firstTweetHeader, gte(0), 'testimonials/first-text-below-header'),
    below(secondTweetText, secondTweetHeader, gte(0), 'testimonials/second-text-below-header'),
    below(thirdTweetText, thirdTweetHeader, gte(0), 'testimonials/third-text-below-header'),
    forAll(tweetAvatars, avatar => widthIn(avatar, gte(36)), 'testimonials/avatar-width-min'),
    forAll(tweetAvatars, avatar => widthIn(avatar, lte(44)), 'testimonials/avatar-width-max'),
    forAll(tweetAvatars, avatar => almostSquared(avatar, 0.1), 'testimonials/avatar-square'),
    forAll(tweetTexts, text => textDoesNotOverflow(text), 'testimonials/text-no-overflow'),
    noOverlap(tweetCards, {tolerance: 0}, 'testimonials/cards-no-overlap'),
    forAll(faqSummaries, summary => heightIn(summary, gte(44)), 'faq/summary-height-min'),
    forAll(priceValues, price => singleLineText(price), 'pricing/price-single-line'),
    textDoesNotOverflow(lead, 'hero/lead-text-no-overflow'),
    canvasWidthNoOverflow(hero, 'hero/no-horizontal-overflow'),
    canvasWidthNoOverflow(trustLogos, 'trust-logos/no-horizontal-overflow'),
    canvasWidthNoOverflow(proofStats, 'proof-stats/no-horizontal-overflow'),
    canvasWidthNoOverflow(pillars, 'pillars/no-horizontal-overflow'),
    canvasWidthNoOverflow(coverage, 'coverage/no-horizontal-overflow'),
    canvasWidthNoOverflow(comparison, 'comparison/no-horizontal-overflow'),
    canvasWidthNoOverflow(testimonials, 'testimonials/no-horizontal-overflow'),
    canvasWidthNoOverflow(pricing, 'pricing/no-horizontal-overflow'),
    canvasWidthNoOverflow(faq, 'faq/no-horizontal-overflow'),
    canvasWidthNoOverflow(finalCta, 'final-cta/no-horizontal-overflow'),
    textDoesNotOverflow(title, 'hero/title-text-does-not-overflow'),
    textDoesNotOverflow(analysisPanel, 'hero/analysis-panel-text-does-not-overflow'),
    textDoesNotOverflow(proofTitle, 'proof-stats/title-text-does-not-overflow'),
    textDoesNotOverflow(pillarsTitle, 'pillars/title-text-does-not-overflow'),
    textDoesNotOverflow(coverageTitle, 'coverage/title-text-does-not-overflow'),
    textDoesNotOverflow(comparisonTitle, 'comparison/title-text-does-not-overflow'),
    textDoesNotOverflow(testimonialsTitle, 'testimonials/title-text-does-not-overflow'),
    textDoesNotOverflow(pricingTitle, 'pricing/title-text-does-not-overflow'),
    textDoesNotOverflow(faqTitle, 'faq/title-text-does-not-overflow'),
    textDoesNotOverflow(finalCtaTitle, 'final-cta/title-text-does-not-overflow'),
    rt => (rt.viewportClass === 'desktop'
      ? [
        inside(navbar, ctx.view, undefined, 'navbar/above-fold-desktop'),
        includeNavbarCtaContrast
          ? colorDistance(navbarCta, navbar, gte(MIN_TEXT_BG_DISTANCE), undefined, 'navbar/cta-contrast')
          : [],
        inside(kicker, ctx.view, undefined, 'hero/kicker-above-fold-desktop'),
        inside(title, ctx.view, undefined, 'hero/title-above-fold-desktop'),
        inside(lead, ctx.view, undefined, 'hero/lead-above-fold-desktop'),
        inside(primaryCta, ctx.view, undefined, 'hero/primary-cta-above-fold-desktop'),
        inside(analysisDemo, hero, undefined, 'hero/analysis-demo-inside-desktop'),
        rightOf(analysisDemo, title, gte(0), 'hero/analysis-demo-right-of-title-desktop'),
        widthAtLeastPercentOf(analysisDemo, heroInner, 0.4, 'hero/analysis-demo-width-share-desktop'),
        widthIn(primaryCta, gte(160), 'hero/primary-cta-width-min-desktop'),
        textLinesAtMost(title, 3, 'hero/title-lines-desktop'),
        textLinesAtMost(title, 4, 'hero/title-lines-laptop'),
        noOrphanLastLine(heroWords, title, {name: 'hero/title-no-orphan-last-line'}),
        noOrphanLastLine(heroWords, title, {name: 'hero/title-no-orphan-last-line-laptop'}),
        noOrphanLastLine(proofTitleWords, proofTitle, {name: 'proof-stats/title-no-orphan-last-line'}),
        noOrphanLastLine(pillarsTitleWords, pillarsTitle, {name: 'pillars/title-no-orphan-last-line'}),
        noOrphanLastLine(coverageTitleWords, coverageTitle, {name: 'coverage/title-no-orphan-last-line'}),
        noOrphanLastLine(comparisonTitleWords, comparisonTitle, {name: 'comparison/title-no-orphan-last-line'}),
        noOrphanLastLine(testimonialsTitleWords, testimonialsTitle, {name: 'testimonials/title-no-orphan-last-line'}),
        noOrphanLastLine(pricingTitleWords, pricingTitle, {name: 'pricing/title-no-orphan-last-line'}),
        noOrphanLastLine(faqTitleWords, faqTitle, {name: 'faq/title-no-orphan-last-line'}),
        noOrphanLastLine(finalCtaTitleWords, finalCtaTitle, {name: 'final-cta/title-no-orphan-last-line'}),
        ...h2Titles.map((heading, index) =>
          textLinesAtMost(heading, 2, [
            'proof-stats/title-lines-desktop',
            'pillars/title-lines-desktop',
            'coverage/title-lines-desktop',
            'comparison/title-lines-desktop',
            'testimonials/title-lines-desktop',
            'pricing/title-lines-desktop',
            'faq/title-lines-desktop',
            'final-cta/title-lines-desktop',
          ][index]),
        ),
        forAll(pillarCardTitles, cardTitle => textLinesAtMost(cardTitle, 2), 'pillars/card-title-lines-desktop'),
        forAll(pricingCardTitles, cardTitle => textLinesAtMost(cardTitle, 2), 'pricing/card-title-lines-desktop'),
        alignedVerticallyLeft([kicker, title, lead, ctas], 2, 'hero/text-left-aligned-desktop'),
        alignedVerticallyLeft([proofTitle], 2, 'proof-stats/title-left-aligned-desktop'),
        alignedVerticallyLeft([pillarsTitle], 2, 'pillars/title-left-aligned-desktop'),
        alignedVerticallyLeft([coverageTitle], 2, 'coverage/title-left-aligned-desktop'),
        alignedVerticallyLeft([comparisonTitle], 2, 'comparison/title-left-aligned-desktop'),
        alignedVerticallyLeft([testimonialsTitle], 2, 'testimonials/title-left-aligned-desktop'),
        alignedVerticallyLeft([pricingTitle], 2, 'pricing/title-left-aligned-desktop'),
        alignedVerticallyLeft([faqTitle], 2, 'faq/title-left-aligned-desktop'),
        centered(finalCtaTitle, finalCta, {h: lte(2)}, 'final-cta/title-centered-desktop'),
        centered(finalCtaButton, finalCta, {h: lte(2)}, 'final-cta/button-centered-desktop'),
        widthIn(lead, lte(560), 'hero/lead-width-max-desktop'),
        widthIn(trustLogos, gte(900), 'trust-logos/desktop-container-width-min'),
        textDoesNotOverflow(trustLabel, 'trust-logos/desktop-label-no-overflow'),
        alignedHorizontallyTop(firstRowStatCards, 2, 'proof-stats/first-row-top-aligned-desktop'),
        alignedHorizEqualGap(firstRowStatCards, 4, 'proof-stats/first-row-equal-gaps-desktop'),
        widthMatches(secondPillarCard, firstPillarCard, {tolerance: 0.05}, 'pillars/second-card-width-match-desktop'),
        widthMatches(thirdPillarCard, firstPillarCard, {tolerance: 0.05}, 'pillars/third-card-width-match-desktop'),
        alignedHorizontallyTop(pillarCards, 2, 'pillars/card-grid-top-aligned-desktop'),
        alignedHorizEqualGap(pillarCards, 4, 'pillars/card-grid-equal-gap-desktop'),
        alignedHorizontallyTop(tweetCards, 2, 'testimonials/cards-top-aligned-desktop'),
        alignedHorizEqualGap(tweetCards, 4, 'testimonials/tweet-grid-equal-gap-desktop'),
        widthMatches(secondTweetCard, firstTweetCard, {tolerance: 0.05}, 'testimonials/second-card-width-match-desktop'),
        widthMatches(thirdTweetCard, firstTweetCard, {tolerance: 0.05}, 'testimonials/third-card-width-match-desktop'),
        widthMatches(secondPricingCard, firstPricingCard, {tolerance: 0.05}, 'pricing/second-card-width-match-desktop'),
        widthMatches(thirdPricingCard, firstPricingCard, {tolerance: 0.05}, 'pricing/third-card-width-match-desktop'),
        alignedHorizontallyTop(pricingCards, 2, 'pricing/card-grid-top-aligned-desktop'),
        alignedHorizEqualGap(pricingCards, 4, 'pricing/card-grid-equal-gap-desktop'),
        centeredMaxWidthOnWidescreen(heroInner, 1440, 'hero/container-centered-max-width-widescreen'),
        centeredMaxWidthOnWidescreen(proofStats, 1440, 'proof-stats/container-centered-max-width-widescreen'),
        centeredMaxWidthOnWidescreen(faq, 1440, 'faq/container-centered-max-width-widescreen'),
        centeredMaxWidthOnWidescreen(footerInner, 1440, 'footer/container-centered-max-width-widescreen'),
        widthIn(footerInner, gte(1152), 'footer/content-width-min-widescreen'),
        widthIn(comparison, gte(1152), 'comparison/content-width-min-widescreen'),
        widthIn(faq, gte(1152), 'faq/content-width-min-widescreen'),
      ]
      : [
        inside(title, ctx.view, undefined, 'hero/title-above-fold-mobile'),
        primaryCtaCanvasTopAtMost(primaryCta, 900, 'hero/primary-cta-top-mobile'),
        below(analysisDemo, note, gte(0), 'hero/analysis-demo-below-note-mobile'),
        widthMatches(analysisDemo, hero, {tolerance: 0.1}, 'hero/analysis-demo-full-width-mobile'),
        textLinesAtMost(title, 4, 'hero/title-lines-mobile'),
        noOrphanLastLine(heroWords, title, {name: 'hero/title-no-orphan-last-line-mobile'}),
        ...h2Titles.map((heading, index) =>
          textLinesAtMost(heading, 3, [
            'proof-stats/title-lines-mobile',
            'pillars/title-lines-mobile',
            'coverage/title-lines-mobile',
            'comparison/title-lines-mobile',
            'testimonials/title-lines-mobile',
            'pricing/title-lines-mobile',
            'faq/title-lines-mobile',
            'final-cta/title-lines-mobile',
          ][index]),
        ),
        centered(kicker, hero, {h: lte(2)}, 'hero/kicker-centered-mobile'),
        centered(title, hero, {h: lte(2)}, 'hero/title-centered-mobile'),
        centeredTextLine(heroWords, title, {name: 'hero/title-first-line-centered-mobile'}),
        centered(lead, hero, {h: lte(2)}, 'hero/lead-centered-mobile'),
        centered(ctas, hero, {h: lte(2)}, 'hero/ctas-centered-mobile'),
        centered(finalCtaTitle, finalCta, {h: lte(2)}, 'final-cta/title-centered-mobile'),
        centered(finalCtaButton, finalCta, {h: lte(2)}, 'final-cta/button-centered-mobile'),
        alignedVerticallyLeft(statCards, 2, 'proof-stats/cards-left-aligned-mobile'),
        alignedVerticallyLeft(pillarCards, 2, 'pillars/cards-left-aligned-mobile'),
        alignedVerticallyEdges(pricingCards, 2, 'pricing/cards-stack-mobile'),
        widthIn(comparisonScroll, lte(rt.view.width), 'comparison/scroll-fits-mobile-viewport'),
        alignedVerticallyEdges(tweetCards, 2, 'testimonials/cards-stack-mobile'),
      ]),
  );
  });
}

export const uxGlobalSpec = defineUxGlobalSpec({
  includeLightLogoContrast: false,
  includeNavbarCtaContrast: true,
});
export const uxGlobalLightSpec = defineUxGlobalSpec({
  includeLightLogoContrast: true,
  includeNavbarCtaContrast: false,
});

export const faqClosedSpec = defineLayoutSpec(ctx => {
  const firstAnswer = ctx.el(
    '[data-testid="faq-item"]:nth-of-type(1) [data-testid="faq-answer"]',
    'first FAQ answer',
  );

  ctx.must(visible(firstAnswer, false, 'faq/first-answer-hidden-before-click'));
});

export const faqOpenSpec = defineLayoutSpec(ctx => {
  const firstAnswer = ctx.el(
    '[data-testid="faq-item"]:nth-of-type(1) [data-testid="faq-answer"]',
    'first FAQ answer',
  );

  ctx.must(visible(firstAnswer, true, 'faq/first-answer-visible-after-click'));
});

export const pricingStickySpec = defineLayoutSpec(ctx => {
  const navbar = ctx.el('.navbar', 'navbar');

  ctx.must(inside(navbar, ctx.view, {top: gte(0)}, 'navbar/sticky-visible-at-pricing'));
});

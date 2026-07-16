import {
  alignedHorizontallyTop,
  below,
  defineLayoutSpec,
  gte,
  inside,
  noOverlap,
  textDoesNotOverflow,
  visible,
} from '@uilint/core';

export const pricingPageSpec = defineLayoutSpec(ctx => {
  const intro = ctx.el('[data-testid="pricing-page-intro"]');
  const pricing = ctx.el('[data-testid="pricing"]');
  const calculator = ctx.el('[data-testid="cost-calculator"]');
  const notes = ctx.el('[data-testid="pricing-page-notes"]');

  ctx.must(
    visible(intro, true, 'pricing/page-intro-visible'),
    visible(pricing, true, 'pricing/page-pricing-visible'),
    visible(calculator, true, 'pricing/page-calculator-visible'),
    visible(notes, true, 'pricing/page-notes-visible'),
    below(pricing, intro, gte(0), 'pricing/page-pricing-below-intro'),
    below(calculator, pricing, gte(0), 'pricing/page-calculator-below-pricing'),
    below(notes, calculator, gte(0), 'pricing/page-notes-below-calculator'),
  );
});

export const costCalculatorSpec = defineLayoutSpec(ctx => {
  const calculator = ctx.el('[data-testid="cost-calculator"]');
  const linesInput = ctx.el('[data-testid="calculator-lines"]');
  const tierSelect = ctx.el('[data-testid="calculator-tier"]');
  const savant = ctx.el('[data-testid="calculator-savant"]');
  const manual = ctx.el('[data-testid="calculator-manual"]');
  const savings = ctx.el('[data-testid="calculator-savings"]');

  ctx.must(
    visible(calculator, true, 'calculator/visible'),
    visible(linesInput, true, 'calculator/lines-input-visible'),
    visible(tierSelect, true, 'calculator/tier-select-visible'),
    inside(linesInput, calculator, undefined, 'calculator/lines-input-inside'),
    inside(tierSelect, calculator, undefined, 'calculator/tier-select-inside'),
    inside(savant, calculator, undefined, 'calculator/savant-card-inside'),
    inside(manual, calculator, undefined, 'calculator/manual-card-inside'),
    inside(savings, calculator, undefined, 'calculator/savings-card-inside'),
    below(savant, linesInput, gte(0), 'calculator/results-below-controls'),
    noOverlap([savant, manual, savings], {tolerance: 0}, 'calculator/result-cards-no-overlap'),
    textDoesNotOverflow(savant, 'calculator/savant-text-no-overflow'),
    textDoesNotOverflow(manual, 'calculator/manual-text-no-overflow'),
    textDoesNotOverflow(savings, 'calculator/savings-text-no-overflow'),
  );
});

export const costCalculatorDesktopSpec = defineLayoutSpec(ctx => {
  const linesInput = ctx.el('[data-testid="calculator-lines"]');
  const tierSelect = ctx.el('[data-testid="calculator-tier"]');
  const savant = ctx.el('[data-testid="calculator-savant"]');
  const manual = ctx.el('[data-testid="calculator-manual"]');
  const savings = ctx.el('[data-testid="calculator-savings"]');

  ctx.must(
    // Desktop: controls side by side, the three result cards on one row.
    alignedHorizontallyTop([linesInput, tierSelect], 2, 'calculator/controls-one-row-desktop'),
    alignedHorizontallyTop([savant, manual, savings], 2, 'calculator/results-one-row-desktop'),
  );
});

export const costCalculatorMobileSpec = defineLayoutSpec(ctx => {
  const linesInput = ctx.el('[data-testid="calculator-lines"]');
  const tierSelect = ctx.el('[data-testid="calculator-tier"]');
  const savant = ctx.el('[data-testid="calculator-savant"]');
  const manual = ctx.el('[data-testid="calculator-manual"]');
  const savings = ctx.el('[data-testid="calculator-savings"]');

  ctx.must(
    // Mobile: everything stacks into a single column.
    below(tierSelect, linesInput, gte(0), 'calculator/tier-below-lines-mobile'),
    below(manual, savant, gte(0), 'calculator/manual-below-savant-mobile'),
    below(savings, manual, gte(0), 'calculator/savings-below-manual-mobile'),
  );
});

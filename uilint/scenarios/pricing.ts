import {defineScenario} from '@uilint/cli';
import {footerSpec} from '../specs/footer.spec';
import {navbarSpec} from '../specs/navbar.spec';
import {
  costCalculatorDesktopSpec,
  costCalculatorMobileSpec,
  costCalculatorSpec,
  pricingPageSpec,
} from '../specs/pricing-page.spec';

export default defineScenario('pricing', async runtime => {
  await runtime.goto('/pricing/');
  await runtime.page.waitForSelector('#__docusaurus');
  await runtime.snapshot('pricing-page', pricingPageSpec);
  await runtime.snapshot('navbar', navbarSpec);

  const calculator = runtime.page.locator('[data-testid="cost-calculator"]');
  if (await calculator.count() > 0) {
    await calculator.evaluate(section => {
      section.scrollIntoView();
    });
  }
  await runtime.snapshot('cost-calculator', costCalculatorSpec);

  const viewportWidth = runtime.page.viewportSize()?.width ?? 0;
  if (viewportWidth >= 997) {
    await runtime.snapshot('cost-calculator-desktop', costCalculatorDesktopSpec);
  } else {
    await runtime.snapshot('cost-calculator-mobile', costCalculatorMobileSpec);
  }

  // Recompute with a larger scope before re-checking overflow behavior.
  await runtime.page.fill('[data-testid="calculator-lines"]', '250000');
  await runtime.page.selectOption('[data-testid="calculator-tier"]', 'pro');
  await runtime.snapshot('cost-calculator-large-numbers', costCalculatorSpec);

  await runtime.snapshot('footer', footerSpec);
});

import {defineScenario} from '@uilint/cli';
import {footerSpec} from '../specs/footer.spec';
import {navbarSpec} from '../specs/navbar.spec';
import {homeSmokeSpec} from '../specs/smoke.spec';
import {
  faqClosedSpec,
  faqOpenSpec,
  pricingStickySpec,
  uxGlobalLightSpec,
  uxGlobalSpec,
} from '../specs/ux-global.spec';

export default defineScenario('home', async runtime => {
  await runtime.goto('/');
  await runtime.page.waitForSelector('#__docusaurus');
  await runtime.snapshot('home-smoke', homeSmokeSpec);
  await runtime.snapshot('navbar', navbarSpec);
  await runtime.snapshot('ux-global-dark', uxGlobalSpec);
  await runtime.snapshot('faq-closed-dark', faqClosedSpec);
  const darkFaqSummary = runtime.page.locator('[data-testid="faq-summary"]').first();
  if (await darkFaqSummary.count() > 0) {
    await darkFaqSummary.evaluate(summary => {
      (summary as HTMLElement).click();
    });
  }
  await runtime.snapshot('faq-open-dark', faqOpenSpec);
  const darkPricing = runtime.page.locator('#pricing');
  if (await darkPricing.count() > 0) {
    await darkPricing.evaluate(pricing => {
      pricing.scrollIntoView();
    });
  }
  await runtime.snapshot('pricing-sticky-dark', pricingStickySpec);
  await runtime.goto('/');
  await runtime.page.waitForSelector('#__docusaurus');
  await runtime.page.locator('.navbar [class*=colorModeToggle] button').evaluate(button => {
    (button as HTMLButtonElement).click();
  });
  await runtime.snapshot('ux-global-light', uxGlobalLightSpec);
  await runtime.snapshot('faq-closed-light', faqClosedSpec);
  const lightFaqSummary = runtime.page.locator('[data-testid="faq-summary"]').first();
  if (await lightFaqSummary.count() > 0) {
    await lightFaqSummary.evaluate(summary => {
      (summary as HTMLElement).click();
    });
  }
  await runtime.snapshot('faq-open-light', faqOpenSpec);
  const lightPricing = runtime.page.locator('#pricing');
  if (await lightPricing.count() > 0) {
    await lightPricing.evaluate(pricing => {
      pricing.scrollIntoView();
    });
  }
  await runtime.snapshot('pricing-sticky-light', pricingStickySpec);
  await runtime.snapshot('footer', footerSpec);
});

import {render, screen} from '@testing-library/react';
import PricingPage from '../../src/pages/pricing';

describe('pricing page', () => {
  beforeEach(() => {
    render(<PricingPage />);
  });

  it('renders the keyword H1', () => {
    const heading = screen.getByRole('heading', {level: 1});

    expect(heading).toHaveTextContent('Smart Contract Audit Pricing');
  });

  it('renders intro, pricing cards, calculator, and billing notes in order', () => {
    const sections = [
      screen.getByTestId('pricing-page-intro'),
      screen.getByTestId('pricing'),
      screen.getByTestId('cost-calculator'),
      screen.getByTestId('pricing-page-notes'),
    ];
    const all = Array.from(document.body.querySelectorAll('[data-testid]'));

    for (let i = 1; i < sections.length; i += 1) {
      expect(all.indexOf(sections[i - 1])).toBeLessThan(all.indexOf(sections[i]));
    }
  });

  it('renders exactly three pricing cards on the standalone page too', () => {
    expect(screen.getAllByTestId('pricing-card')).toHaveLength(3);
  });
});

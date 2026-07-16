import {fireEvent, render, screen, within} from '@testing-library/react';
import CostCalculator from '../../src/components/CostCalculator';
import {
  DEFAULT_TIER_ID,
  HUMAN_AUDIT_RATE,
  PRICING_TIERS,
  SPEED_ADVANTAGE,
} from '../../src/config/pricing';

describe('pricing config', () => {
  it('matches the per-line prices published on the pricing cards', () => {
    expect(PRICING_TIERS.map(tier => [tier.name, tier.price])).toEqual([
      ['Lite', 0.07],
      ['Advanced', 0.12],
      ['Pro', 0.5],
    ]);
  });

  it('defaults to the recommended Advanced tier', () => {
    expect(DEFAULT_TIER_ID).toBe('advanced');
    expect(PRICING_TIERS.some(tier => tier.id === DEFAULT_TIER_ID)).toBe(true);
  });

  it('keeps the manual-audit anchor consistent with the site copy', () => {
    // A typical 2,000–5,000 line protocol lands in the published
    // "$40K–$100K (Sherlock)" manual-audit range.
    expect(2000 * HUMAN_AUDIT_RATE).toBe(40_000);
    expect(5000 * HUMAN_AUDIT_RATE).toBe(100_000);
    expect(SPEED_ADVANTAGE).toBe(300);
  });
});

describe('cost calculator', () => {
  beforeEach(() => {
    render(<CostCalculator />);
  });

  it('renders the section with its anchor id', () => {
    expect(screen.getByTestId('cost-calculator')).toHaveAttribute('id', 'calculator');
  });

  it('renders a labeled lines-of-code input defaulting to 1000', () => {
    const input = screen.getByLabelText(/lines of code/i);

    expect(input).toHaveValue(1000);
    expect(screen.getByTestId('calculator-lines')).toBe(input);
  });

  it('links the cloc counter from the input hint', () => {
    const link = screen.getByRole('link', {name: 'cloc'});

    expect(link).toHaveAttribute('href', 'https://github.com/AlDanial/cloc');
  });

  it('renders a tier select with all three tiers, Advanced preselected', () => {
    const select = screen.getByTestId('calculator-tier');

    expect(select).toHaveValue('advanced');
    expect(within(select as HTMLElement).getAllByRole('option').map(o => o.textContent)).toEqual([
      'Lite — $0.07/line',
      'Advanced — $0.12/line',
      'Pro — $0.50/line',
    ]);
  });

  it('computes the default estimate: 1000 lines on Advanced', () => {
    expect(screen.getByTestId('calculator-savant')).toHaveTextContent('$120');
    expect(screen.getByTestId('calculator-manual')).toHaveTextContent('$20,000');
    expect(screen.getByTestId('calculator-savings')).toHaveTextContent('$19,880');
    expect(screen.getByTestId('calculator-savings')).toHaveTextContent('167\u00d7 cheaper');
    expect(screen.getByTestId('calculator-savings')).toHaveTextContent('300\u00d7 faster');
  });

  it('recomputes when the lines of code change', () => {
    fireEvent.change(screen.getByTestId('calculator-lines'), {target: {value: '5000'}});

    expect(screen.getByTestId('calculator-savant')).toHaveTextContent('$600');
    expect(screen.getByTestId('calculator-manual')).toHaveTextContent('$100,000');
    expect(screen.getByTestId('calculator-savings')).toHaveTextContent('$99,400');
  });

  it('recomputes when the tier changes', () => {
    fireEvent.change(screen.getByTestId('calculator-tier'), {target: {value: 'pro'}});

    expect(screen.getByTestId('calculator-savant')).toHaveTextContent('$500');
    expect(screen.getByTestId('calculator-savings')).toHaveTextContent('40\u00d7 cheaper');

    fireEvent.change(screen.getByTestId('calculator-tier'), {target: {value: 'lite'}});

    expect(screen.getByTestId('calculator-savant')).toHaveTextContent('$70');
    expect(screen.getByTestId('calculator-savings')).toHaveTextContent('286\u00d7 cheaper');
  });

  it('shows <$1 for tiny scopes instead of $0', () => {
    fireEvent.change(screen.getByTestId('calculator-tier'), {target: {value: 'lite'}});
    fireEvent.change(screen.getByTestId('calculator-lines'), {target: {value: '10'}});

    expect(screen.getByTestId('calculator-savant')).toHaveTextContent('<$1');
    expect(screen.getByTestId('calculator-manual')).toHaveTextContent('$200');
  });

  it('treats cleared or invalid input as a single line', () => {
    fireEvent.change(screen.getByTestId('calculator-lines'), {target: {value: ''}});

    expect(screen.getByTestId('calculator-manual')).toHaveTextContent('$20');

    fireEvent.blur(screen.getByTestId('calculator-lines'));

    expect(screen.getByTestId('calculator-lines')).toHaveValue(1);
  });

  it('anchors the estimate to speed, not just price', () => {
    expect(screen.getByTestId('calculator-savant')).toHaveTextContent('10–30 minutes');
    expect(screen.getByTestId('calculator-manual')).toHaveTextContent('3–38 days');
  });

  it('discloses that final pricing is token-based', () => {
    expect(screen.getByTestId('cost-calculator')).toHaveTextContent(/final price is calculated from token count/i);
  });
});

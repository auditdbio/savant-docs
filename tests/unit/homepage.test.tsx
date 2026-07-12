import {render, screen, within} from '@testing-library/react';
import Home from '../../src/pages';

describe('homepage hero', () => {
  beforeEach(() => {
    render(<Home />);
  });

  test.each([
    'hero',
    'hero-kicker',
    'hero-title',
    'hero-lead',
    'hero-ctas',
    'hero-note',
  ])('renders %s', testId => {
    expect(screen.getByTestId(testId)).toBeInTheDocument();
  });

  it('renders analysis-demo', () => {
    expect(screen.queryByTestId('analysis-demo')).not.toBeNull();
  });

  it('renders the audit kicker text', () => {
    expect(screen.getByTestId('hero-kicker')).toHaveTextContent('AI SMART CONTRACT AUDITS');
  });

  it('renders the hero title as an H1', () => {
    const title = screen.getByTestId('hero-title');

    expect(title.tagName).toBe('H1');
    expect(title).toHaveTextContent('Find Smart Contract Vulnerabilities Before Attackers Do');
  });

  it('renders the savant.chat hero lead', () => {
    const lead = screen.getByTestId('hero-lead');

    expect(lead).toHaveTextContent('Deeper than a scanner');
    expect(lead).toHaveTextContent('Solidity, Vyper, and Rust');
  });

  it('renders the primary and secondary hero CTAs', () => {
    const ctas = within(screen.getByTestId('hero-ctas'));

    expect(ctas.getByRole('link', {name: 'Start Free — $75 in credits'}))
      .toHaveAttribute('href', 'https://savant.chat/dashboard/login');
    expect(ctas.getByRole('link', {name: 'See pricing'})).toHaveAttribute('href', '/#pricing');
  });

  it('renders the trust note', () => {
    const note = screen.getByTestId('hero-note');

    expect(note).toHaveTextContent('1inch, Lido');
    expect(note).toHaveTextContent('Sherlock');
  });

  it('does not render the old fake stats block', () => {
    expect(screen.queryByTestId('hero-stats')).not.toBeInTheDocument();
  });

  test.each(['Sentiel', '418', '$6.8B', '<48h'])('does not render %s', forbidden => {
    expect(document.body).not.toHaveTextContent(forbidden);
  });

  it('orders the hero content from kicker to title to lead to CTAs to note', () => {
    const hero = screen.getByTestId('hero');
    const order = [
      screen.getByTestId('hero-kicker'),
      screen.getByTestId('hero-title'),
      screen.getByTestId('hero-lead'),
      screen.getByTestId('hero-ctas'),
      screen.getByTestId('hero-note'),
      screen.queryByTestId('analysis-demo'),
    ];

    expect(order.every(element => element !== null && hero.contains(element))).toBe(true);
    const present = order.filter((element): element is HTMLElement => element !== null);
    if (present.length !== order.length) return;

    expect(present.map(element => Array.from(hero.querySelectorAll('[data-testid]')).indexOf(element)))
      .toEqual([0, 1, 2, 3, 4, 5]);
  });

  it('places the analysis demo inside the hero after the note', () => {
    const hero = screen.getByTestId('hero');
    const note = screen.getByTestId('hero-note');
    const demo = screen.queryByTestId('analysis-demo');
    const orderedTestIds = Array.from(hero.querySelectorAll('[data-testid]'));

    expect(demo).not.toBeNull();
    if (!demo) return;

    expect(hero).toContainElement(demo);
    expect(orderedTestIds.indexOf(demo)).toBeGreaterThan(orderedTestIds.indexOf(note));
  });
});

import {render, screen, within} from '@testing-library/react';
import Home from '../../src/pages';

const signupUrl = 'https://savant.chat/dashboard/login';

describe('pricing, FAQ, and final CTA sections', () => {
  beforeEach(() => {
    render(<Home />);
  });

  it('renders the pricing section at the navbar anchor', () => {
    expect(screen.getByTestId('pricing')).toBeInTheDocument();
    expect(screen.getByTestId('pricing')).toHaveAttribute('id', 'pricing');
  });

  it('renders exactly three pricing cards', () => {
    expect(screen.getAllByTestId('pricing-card')).toHaveLength(3);
  });

  test.each([
    ['Lite', '$0.07', 'line'],
    ['Advanced', '$0.12', 'line'],
    ['Pro', '$0.50', 'line'],
  ])('renders the %s price', (plan, price, unit) => {
    const card = screen
      .getAllByTestId('pricing-card')
      .find(item => item.textContent?.includes(plan));

    expect(card).toBeDefined();
    expect(card).toHaveTextContent(price);
    expect(card).toHaveTextContent(unit);
  });

  it('marks Advanced as recommended', () => {
    const advanced = screen
      .getAllByTestId('pricing-card')
      .find(item => item.textContent?.includes('Advanced'));

    expect(advanced).toHaveTextContent('RECOMMENDED');
  });

  it('links the Advanced CTA to the signup URL', () => {
    const advanced = screen
      .getAllByTestId('pricing-card')
      .find(item => item.textContent?.includes('Advanced'));

    expect(within(advanced as HTMLElement).getByRole('link', {name: /start free/i}))
      .toHaveAttribute('href', signupUrl);
  });

  it('renders the account tier note', () => {
    expect(screen.getByTestId('pricing')).toHaveTextContent('Basic $250/mo');
    expect(screen.getByTestId('pricing')).toHaveTextContent('Pro $2,500/mo');
    expect(screen.getByTestId('pricing')).toHaveTextContent('Enterprise');
  });

  it('renders the FAQ section at the navbar anchor', () => {
    expect(screen.getByTestId('faq')).toBeInTheDocument();
    expect(screen.getByTestId('faq')).toHaveAttribute('id', 'faq');
  });

  it('renders exactly eight FAQ details', () => {
    expect(screen.getAllByTestId('faq-item')).toHaveLength(8);
  });

  test.each([
    'Can AI really audit a smart contract?',
    'Does Savant only audit smart contracts?',
    'How is this different from Slither or Aderyn?',
    'How is this different from Semgrep, CodeQL, or Snyk?',
    'What about false positives?',
    'Do I still need a human audit?',
    'Is my code private?',
    'What does it cost?',
  ])('renders the FAQ question "%s"', question => {
    expect(screen.getByTestId('faq')).toHaveTextContent(question);
  });

  it('keeps the smart-contract question first and the scope question second', () => {
    const summaries = screen.getAllByTestId('faq-summary');

    expect(summaries[0]).toHaveTextContent('Can AI really audit a smart contract?');
    expect(summaries[1]).toHaveTextContent('Does Savant only audit smart contracts?');
  });

  it('renders the scoped-quote pricing note', () => {
    expect(screen.getByTestId('pricing-scope-note')).toHaveTextContent(/scoped quote/i);
  });

  it('answers the human audit question honestly', () => {
    const item = screen
      .getAllByTestId('faq-item')
      .find(faqItem => faqItem.textContent?.includes('Do I still need a human audit?'));
    const answer = within(item as HTMLElement).getByTestId('faq-answer');

    expect(answer.textContent?.trim()).toMatch(/^Yes\./);
  });

  it('states that private code is not stored', () => {
    const item = screen
      .getAllByTestId('faq-item')
      .find(faqItem => faqItem.textContent?.includes('Is my code private?'));

    expect(item).toHaveTextContent(/isn't stored or shared/i);
  });

  it('renders the final CTA section', () => {
    expect(screen.getByTestId('final-cta')).toBeInTheDocument();
  });

  it('renders the final CTA headline', () => {
    expect(screen.getByTestId('final-cta')).toHaveTextContent('$75 free. No card required.');
  });

  it('links the final CTA button to signup', () => {
    expect(
      within(screen.getByTestId('final-cta')).getByRole('link', {
        name: 'Start your first audit',
      }),
    ).toHaveAttribute('href', signupUrl);
  });

  it('orders testimonials before pricing before FAQ before final CTA', () => {
    const bodySections = Array.from(document.body.querySelectorAll('[data-testid]'));

    expect(bodySections.indexOf(screen.getByTestId('testimonials')))
      .toBeLessThan(bodySections.indexOf(screen.getByTestId('pricing')));
    expect(bodySections.indexOf(screen.getByTestId('pricing')))
      .toBeLessThan(bodySections.indexOf(screen.getByTestId('faq')));
    expect(bodySections.indexOf(screen.getByTestId('faq')))
      .toBeLessThan(bodySections.indexOf(screen.getByTestId('final-cta')));
  });
});

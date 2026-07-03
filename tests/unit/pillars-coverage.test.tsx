import {render, screen} from '@testing-library/react';
import Home from '../../src/pages';

describe('pillars and coverage sections', () => {
  beforeEach(() => {
    render(<Home />);
  });

  it('renders the pillars section at the navbar anchor', () => {
    expect(screen.getByTestId('pillars')).toBeInTheDocument();
    expect(screen.getByTestId('pillars')).toHaveAttribute('id', 'pillars');
  });

  it('renders exactly three pillar cards', () => {
    expect(screen.getAllByTestId('pillar-card')).toHaveLength(3);
  });

  test.each([
    'Deeper than a scanner',
    'Faster than a manual audit',
    'Trusted before the human audit',
  ])('renders the %s pillar title', title => {
    expect(screen.getByTestId('pillars')).toHaveTextContent(title);
  });

  it('explains the scanner-depth pillar', () => {
    const card = screen.getAllByTestId('pillar-card')[0];

    expect(card).toHaveTextContent('20,000');
    expect(card).toHaveTextContent('critic subagent');
  });

  it('explains the manual-audit speed pillar', () => {
    const card = screen.getAllByTestId('pillar-card')[1];

    expect(card).toHaveTextContent('$0.07/line');
    expect(card).toHaveTextContent('10–30 minutes');
  });

  it('frames Savant Chat as the second pair of eyes', () => {
    const card = screen.getAllByTestId('pillar-card')[2];

    expect(card).toHaveTextContent('1inch');
    expect(card).toHaveTextContent('not the last one');
  });

  it('renders the coverage section', () => {
    expect(screen.getByTestId('coverage')).toBeInTheDocument();
  });

  test.each([
    ['Solidity', 'Ethereum + EVM L2s'],
    ['Vyper', 'Curve-style DeFi'],
    ['Rust', 'Solana · NEAR'],
  ])('renders %s coverage with its scope', (language, scope) => {
    const coverage = screen.getByTestId('coverage');

    expect(coverage).toHaveTextContent(language);
    expect(coverage).toHaveTextContent(scope);
  });

  it('renders at least fourteen vulnerability-class chips', () => {
    expect(screen.getAllByTestId('coverage-chip').length).toBeGreaterThanOrEqual(14);
  });

  test.each([
    'Sandwich attacks',
    'Block-timestamp manipulation',
    'ZK-privacy leaks',
  ])('renders the %s coverage chip', label => {
    expect(screen.getByTestId('coverage')).toHaveTextContent(label);
  });

  it('highlights the full taxonomy chip', () => {
    expect(screen.getByTestId('coverage')).toHaveTextContent('200+ classes total');
  });

  it('orders proof stats before pillars before coverage', () => {
    const bodySections = Array.from(document.body.querySelectorAll('[data-testid]'));

    expect(bodySections.indexOf(screen.getByTestId('proof-stats')))
      .toBeLessThan(bodySections.indexOf(screen.getByTestId('pillars')));
    expect(bodySections.indexOf(screen.getByTestId('pillars')))
      .toBeLessThan(bodySections.indexOf(screen.getByTestId('coverage')));
  });
});

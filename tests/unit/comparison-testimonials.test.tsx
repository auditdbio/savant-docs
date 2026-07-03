import {render, screen} from '@testing-library/react';
import Home from '../../src/pages';

describe('comparison and testimonials sections', () => {
  beforeEach(() => {
    render(<Home />);
  });

  it('renders the comparison section', () => {
    expect(screen.getByTestId('comparison')).toBeInTheDocument();
  });

  test.each([
    'Slither/Mythril',
    'Manual audit firm',
    'AuditAgent',
    'Octane',
    'Savant Chat',
  ])('renders the %s comparison column', heading => {
    expect(screen.getByTestId('comparison')).toHaveTextContent(heading);
  });

  it('renders at least six comparison criteria', () => {
    expect(screen.getAllByTestId('comparison-row').length).toBeGreaterThanOrEqual(6);
  });

  it('frames the Savant benchmark honestly', () => {
    const cell = screen.getByTestId('comparison-savant-benchmark');

    expect(cell).toHaveTextContent('our open benchmark');
    expect(cell).toHaveTextContent('100% recall');
    expect(cell).not.toHaveTextContent(/independent/i);
  });

  it('keeps Octane wins in the Octane column', () => {
    expect(screen.getByTestId('comparison-octane-benchmark')).toHaveTextContent('Monad');
  });

  it('renders the comparison bottom line', () => {
    expect(screen.getByTestId('comparison')).toHaveTextContent('1–3%');
  });

  it('renders the testimonials section', () => {
    expect(screen.getByTestId('testimonials')).toBeInTheDocument();
  });

  test.each([
    'single clear false positive',
    'minutes, not days',
    'internal review',
  ])('renders testimonial phrase "%s"', phrase => {
    expect(screen.getByTestId('testimonials')).toHaveTextContent(phrase);
  });

  it('orders coverage before comparison before testimonials', () => {
    const bodySections = Array.from(document.body.querySelectorAll('[data-testid]'));

    expect(bodySections.indexOf(screen.getByTestId('coverage')))
      .toBeLessThan(bodySections.indexOf(screen.getByTestId('comparison')));
    expect(bodySections.indexOf(screen.getByTestId('comparison')))
      .toBeLessThan(bodySections.indexOf(screen.getByTestId('testimonials')));
  });

  it('does not overclaim replacement for human audits', () => {
    expect(document.body).not.toHaveTextContent(/replaces human audit/i);
  });
});

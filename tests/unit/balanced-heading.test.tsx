import path from 'node:path';
import {pathToFileURL} from 'node:url';
import type {ComponentType} from 'react';
import {render, screen} from '@testing-library/react';
import Home from '../../src/pages';

const balancedSectionHeadings = [
  'The numbers behind the name.',
  'Deeper. Faster. Trusted.',
  'Every major contract language. And everything around your contracts.',
  'Savant Chat vs the alternatives — at a glance.',
  'Used before senior auditors spend their time.',
  'Pay as you go. Priced per line.',
  'Honest answers to hard questions.',
  '$75 free. No card required.',
];
const balancedHeadingUrl = pathToFileURL(
  path.resolve(process.cwd(), 'src/components/BalancedHeading.tsx'),
).href;

describe('BalancedHeading', () => {
  it('loads the BalancedHeading component', async () => {
    const loaded = await import(/* @vite-ignore */ balancedHeadingUrl)
      .then(() => true)
      .catch(() => false);

    expect(loaded).toBe(true);
  });

  it('wraps every word in span.bw while preserving text and testid on the root', async () => {
    const module = await import(/* @vite-ignore */ balancedHeadingUrl)
      .catch(() => null);

    expect(module).not.toBeNull();
    if (!module) return;

    const BalancedHeading = (module as {default: ComponentType<Record<string, unknown>>}).default;
    render(
      <BalancedHeading as="h2" data-testid="balanced-test">
        Find Smart Contract Bugs
      </BalancedHeading>,
    );

    const heading = screen.getByTestId('balanced-test');
    const words = Array.from(heading.querySelectorAll('.bw')).map(word => word.textContent);

    expect(heading.tagName).toBe('H2');
    expect(heading).toHaveTextContent('Find Smart Contract Bugs');
    expect(words).toEqual(['Find', 'Smart', 'Contract', 'Bugs']);
  });

  it('uses BalancedHeading spans for the hero title', () => {
    render(<Home />);

    expect(screen.getByTestId('hero-title').querySelectorAll('.bw').length).toBeGreaterThan(0);
  });

  it('keeps mobile hero title compounds joined with non-breaking spaces', () => {
    render(<Home />);
    const title = screen.getByTestId('hero-title');
    const words = Array.from(title.querySelectorAll('.bw')).map(word => word.textContent);

    expect(title.textContent).toContain('Smart\u00a0Contract');
    expect(title.textContent).toContain('Attackers\u00a0Do');
    expect(words).toContain('Smart\u00a0Contract');
    expect(words).toContain('Attackers\u00a0Do');
  });

  test.each(balancedSectionHeadings)('uses BalancedHeading spans for "%s"', headingText => {
    render(<Home />);
    const heading = screen.getByRole('heading', {name: headingText});

    expect(heading.querySelectorAll('.bw').length).toBeGreaterThan(0);
  });

  it('balances the hero title and all eight section H2s', () => {
    render(<Home />);

    const balancedHeadings = Array.from(document.querySelectorAll('h1, h2'))
      .filter(heading => heading.querySelector('.bw'));

    expect(balancedHeadings).toHaveLength(9);
  });
});

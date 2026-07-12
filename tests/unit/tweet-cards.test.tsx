import {render, screen, within} from '@testing-library/react';
import Home from '../../src/pages';

const tweets = [
  {
    name: 'Pessimistic Security',
    handle: '@pessimistic_io',
    date: '5 Mar 2025',
    href: 'https://x.com/pessimistic_io/status/1897264142308008089',
    initials: 'PS',
    phrase: 'single clear false positive',
  },
  {
    name: '1inch',
    handle: '@1inch',
    date: '1 Jul 2025',
    href: 'https://x.com/1inch/status/1940035968125284690',
    initials: '1I',
    phrase: 'minutes, not days',
  },
  {
    name: 'Vasiliy Shapovalov',
    handle: '@_vshapovalov',
    date: '9 Oct 2025',
    href: 'https://x.com/_vshapovalov/status/1976320011850612884',
    initials: 'VS',
    phrase: 'internal review',
  },
];

function renderHome() {
  render(<Home />);
  return screen.queryAllByTestId('tweet-card');
}

describe('testimonial tweet cards', () => {
  it('renders exactly three tweet cards', () => {
    render(<Home />);

    expect(screen.queryAllByTestId('tweet-card')).toHaveLength(3);
  });

  test.each(tweets)('links the $name tweet card to the source X post', (tweet) => {
    const index = tweets.indexOf(tweet);
    const {href} = tweet;
    const cards = renderHome();
    const card = cards[index];

    expect(card).toBeDefined();
    if (!card) return;

    expect(card).toHaveAttribute('href', href);
    expect(card).toHaveAttribute('target', '_blank');
    expect(card).toHaveAttribute('rel', expect.stringContaining('noopener'));
  });

  test.each(tweets)('renders $name with the exact handle and date', (tweet) => {
    const index = tweets.indexOf(tweet);
    const {name, handle, date} = tweet;
    const cards = renderHome();
    const card = cards[index];

    expect(card).toBeDefined();
    if (!card) return;

    expect(card).toHaveTextContent(name);
    expect(card).toHaveTextContent(handle);
    expect(card).toHaveTextContent(date);
  });

  test.each(tweets)('renders the $name local avatar initials', (tweet) => {
    const index = tweets.indexOf(tweet);
    const {initials} = tweet;
    const cards = renderHome();
    const card = cards[index];

    expect(card).toBeDefined();
    if (!card) return;

    const avatar = within(card).queryByTestId('tweet-avatar');

    expect(avatar).not.toBeNull();
    if (!avatar) return;

    expect(avatar).toHaveTextContent(initials);
  });

  it('renders an X logo in every tweet header', () => {
    render(<Home />);

    expect(screen.queryAllByTestId('tweet-x-logo')).toHaveLength(3);
  });

  test.each(tweets)('preserves the $name quote phrase', (tweet) => {
    const index = tweets.indexOf(tweet);
    const {phrase} = tweet;
    const cards = renderHome();
    const card = cards[index];

    expect(card).toBeDefined();
    if (!card) return;

    const text = within(card).queryByTestId('tweet-text');

    expect(text).not.toBeNull();
    if (!text) return;

    expect(text).toHaveTextContent(phrase);
  });

  it('does not use external image sources for tweet assets', () => {
    render(<Home />);

    const externalImages = Array.from(document.querySelectorAll('img')).filter(img =>
      /^https:\/\/pbs\.twimg\.com\//.test(img.getAttribute('src') ?? ''),
    );

    expect(externalImages).toHaveLength(0);
  });
});

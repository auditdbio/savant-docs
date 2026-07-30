export type TweetTextSegment = {
  text: string;
  accent?: boolean;
};

export type TweetCardData = {
  name: string;
  handle: string;
  date: string;
  href: string;
  initials: string;
  text: TweetTextSegment[];
};

export const tweets: TweetCardData[] = [
  {
    name: '1inch',
    handle: '@1inch',
    date: '1 Jul 2025',
    href: 'https://x.com/1inch/status/1940035968125284690',
    initials: '1I',
    text: [
      {text: '1inch is evaluating '},
      {text: '@savantchat', accent: true},
      {
        text:
          ', aiming to catch and fix issues early — in development, not in production — in minutes, not days — at a fraction of the cost of a human audit — finding errors humans overlook.',
      },
    ],
  },
  {
    name: 'Vasiliy Shapovalov',
    handle: '@_vshapovalov',
    date: '9 Oct 2025',
    href: 'https://x.com/_vshapovalov/status/1976320011850612884',
    initials: 'VS',
    text: [
      {text: 'This checks with my impression, '},
      {text: '@savantchat', accent: true},
      {
        text:
          " does a great job of filtering false positives while finding issues. It's not an audit replacement — as faster, cheaper tool its place in developer pipeline is closer to an internal review or a heavier linter run.",
      },
    ],
  },
  {
    name: 'Pessimistic Security',
    handle: '@pessimistic_io',
    date: '5 Mar 2025',
    href: 'https://x.com/pessimistic_io/status/1897264142308008089',
    initials: 'PS',
    text: [
      {
        text:
          "We recently tested savant.chat and were pleasantly surprised! It correctly identified several findings on our test contract and didn't produce a single clear false positive. This is the first genuinely useful security tool we've come across in quite a while.",
      },
    ],
  },
  {
    name: 'OXORIO',
    handle: '@0xorio',
    date: '14 Apr 2025',
    href: 'https://x.com/0xorio/status/1911822312124330132',
    initials: 'OX',
    text: [
      {text: 'We recently tested '},
      {text: '@savantchat', accent: true},
      {
        text:
          ' — an AI-powered auditing tool — on a real DeFi project (~3k SLOC), previously audited by multiple top firms. The question: can AI surface anything meaningful post-audit? Spoiler: it can. And it made us rethink how automation can augment human…',
      },
    ],
  },
  {
    name: 'Petr Korolev',
    handle: '@skywinder',
    date: '27 Feb 2025',
    href: 'https://x.com/skywinder/status/1895228438237061588',
    initials: 'PK',
    text: [
      {text: 'I just put '},
      {text: 'savant.chat', accent: true},
      {
        text:
          ' to the test on a complex contract — and wow, what a game-changer! It uncovered a critical issue that many seasoned auditors overlooked, proving its ability to boost audit quality. This tool is set to redefine smart contract security!',
      },
    ],
  },
];

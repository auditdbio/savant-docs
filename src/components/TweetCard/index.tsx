import type {ReactNode} from 'react';

import styles from './styles.module.css';
import type {TweetCardData} from './tweets';

function XLogo(): ReactNode {
  return (
    <svg
      aria-hidden="true"
      className={styles.xIcon}
      data-testid="tweet-x-logo"
      focusable="false"
      viewBox="0 0 24 24"
    >
      <path
        d="M13.93 10.36 21.5 1.5h-1.8l-6.57 7.69L7.88 1.5H1.83l7.94 11.63-7.94 9.29h1.8l6.94-8.12 5.54 8.12h6.06l-8.24-12.06Zm-2.46 2.87-.8-1.16L4.27 2.86h2.75l5.16 7.43.8 1.16 6.72 9.68h-2.75l-5.48-7.9Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default function TweetCard({tweet}: {tweet: TweetCardData}): ReactNode {
  return (
    <a
      className={styles.card}
      data-testid="tweet-card"
      href={tweet.href}
      rel="noopener noreferrer"
      target="_blank"
    >
      <div className={styles.header} data-testid="tweet-header">
        <span className={styles.avatar} data-testid="tweet-avatar" aria-hidden="true">
          {tweet.initials}
        </span>
        <span className={styles.identity}>
          <span className={styles.name}>{tweet.name}</span>
          <span className={styles.meta}>
            {tweet.handle} · {tweet.date}
          </span>
        </span>
        <XLogo />
      </div>
      <p className={styles.text} data-testid="tweet-text">
        {tweet.text.map((segment, index) => (
          <span className={segment.accent ? styles.accent : undefined} key={`${segment.text}-${index}`}>
            {segment.text}
          </span>
        ))}
      </p>
    </a>
  );
}

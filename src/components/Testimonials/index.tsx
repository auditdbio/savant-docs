import type {ReactNode} from 'react';

import BalancedHeading from '../BalancedHeading';
import TweetCard from '../TweetCard';
import {tweets} from '../TweetCard/tweets';
import styles from './styles.module.css';

export default function Testimonials(): ReactNode {
  return (
    <section className={styles.testimonials} data-testid="testimonials">
      <div className={styles.header}>
        <p className={styles.kicker}>WHAT SECURITY TEAMS SAY</p>
        <BalancedHeading as="h2" className={styles.title}>
          Used before senior auditors spend their time.
        </BalancedHeading>
      </div>
      <div className={styles.grid}>
        {tweets.map(tweet => (
          <TweetCard key={tweet.href} tweet={tweet} />
        ))}
      </div>
    </section>
  );
}

import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';

import BalancedHeading from '../BalancedHeading';
import styles from './styles.module.css';

type FinalCtaProps = {
  signupUrl: string;
};

export default function FinalCta({signupUrl}: FinalCtaProps): ReactNode {
  return (
    <section className={styles.finalCta} data-testid="final-cta">
      <div className={styles.content}>
        <BalancedHeading as="h2" className={styles.title}>
          $75 free. No card required.
        </BalancedHeading>
        <p className={styles.lead}>
          Run a real audit on your codebase today — results in minutes.
        </p>
        <Link className={styles.button} to={signupUrl} target="_self">
          Start your first audit
        </Link>
      </div>
    </section>
  );
}

import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';

import BalancedHeading from '../BalancedHeading';
import styles from './styles.module.css';

type PricingProps = {
  signupUrl: string;
};

const plans = [
  {
    name: 'Lite',
    price: '$0.07',
    description: 'Efficient models. CI-friendly quick pass.',
    ctaStyle: 'secondary',
    features: [
      'Severity-ranked findings',
      'Confidence score on each issue',
      'GitHub/GitLab CI',
    ],
  },
  {
    name: 'Advanced',
    price: '$0.12',
    description: 'Comprehensive analysis. The default for pre-audit runs.',
    ctaStyle: 'primary',
    featured: true,
    features: [
      'Severity-ranked findings + confidence score',
      'PoC-validated by critic subagent',
      'GitHub/GitLab CI',
      'Report export',
    ],
  },
  {
    name: 'Pro',
    price: '$0.50',
    description: 'Highest-quality models for critical releases.',
    ctaStyle: 'secondary',
    features: [
      'Highest-quality model pass',
      'PoC-validated findings',
      'Report export',
      'Critical release review',
    ],
  },
];

export default function Pricing({signupUrl}: PricingProps): ReactNode {
  return (
    <section className={styles.pricing} data-testid="pricing" id="pricing">
      <div className={styles.header}>
        <p className={styles.kicker}>PRICING</p>
        <BalancedHeading as="h2" className={styles.title}>
          Pay as you go. Priced per line.
        </BalancedHeading>
        <p className={styles.subtitle}>
          $75 in free credits on signup — no card required. Credits never expire.
        </p>
      </div>
      <div className={styles.grid}>
        {plans.map(plan => (
          <article
            className={`${styles.pricingCard} ${plan.featured ? styles.featuredCard : ''}`}
            data-testid="pricing-card"
            key={plan.name}>
            {plan.featured ? (
              <span className={styles.featuredProbe} data-testid="pricing-card-featured" />
            ) : null}
            {plan.featured ? <span className={styles.badge}>RECOMMENDED</span> : null}
            <h3 className={styles.planName}>{plan.name}</h3>
            <div className={styles.priceRow}>
              <strong className={styles.price} data-testid="pricing-price">
                {plan.price}
              </strong>
              <span className={styles.unit}>/line</span>
            </div>
            <p className={styles.description}>{plan.description}</p>
            <ul className={styles.features}>
              {plan.features.map(feature => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
            <Link
              className={`button ${
                plan.ctaStyle === 'primary' ? 'button--primary' : 'button--secondary'
              } ${styles.planCta}`}
              to={signupUrl} target="_self">
              Start free
            </Link>
          </article>
        ))}
      </div>
      <p className={styles.tierNote}>
        Account tiers: Basic $250/mo · Pro $2,500/mo · Enterprise custom.
      </p>
      <p className={styles.scopeNote} data-testid="pricing-scope-note">
        The per-line pricing above applies to any code — no quote needed.
        Auditing a very large scope, like a full node client or a monorepo?{' '}
        <a href="mailto:hello@savant.chat">Contact us for a flat scoped quote</a>.
      </p>
    </section>
  );
}

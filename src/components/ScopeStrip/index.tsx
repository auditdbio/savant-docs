import type {ReactNode} from 'react';

import styles from './styles.module.css';

const domains = [
  'Smart contracts',
  'ZK circuits & cryptography',
  'Node clients & infrastructure',
  'Off-chain services & keepers',
];

const languages = [
  'Solidity',
  'Vyper',
  'Rust',
  'Circom',
  'Go',
  'C++',
  'TypeScript',
  'Python',
];

export default function ScopeStrip(): ReactNode {
  return (
    <section className={styles.scopeStrip} data-testid="scope-strip">
      <p className={styles.label}>YOUR CONTRACTS — AND EVERYTHING AROUND THEM</p>
      <div className={styles.domains} aria-label="Audit domains">
        {domains.map(domain => (
          <span className={styles.domain} data-testid="scope-domain" key={domain}>
            {domain}
          </span>
        ))}
      </div>
      <p className={styles.languages} data-testid="scope-languages">
        {languages.join(' · ')} — and any other language
      </p>
      <p className={styles.tagline}>
        One language-agnostic engine behind them all — proof published domain by
        domain.
      </p>
    </section>
  );
}

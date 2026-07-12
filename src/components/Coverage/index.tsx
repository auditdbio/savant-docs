import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';

import BalancedHeading from '../BalancedHeading';
import styles from './styles.module.css';

const contractLanguages = [
  {name: 'Solidity', scope: 'Ethereum + EVM L2s'},
  {name: 'Vyper', scope: 'Curve-style DeFi'},
  {name: 'Rust', scope: 'Solana · NEAR'},
  {name: 'Any contract language', scope: 'Move · Cairo · FunC · …'},
];

const contractChips = [
  'Cross-function reentrancy',
  'Read-only reentrancy',
  'Oracle manipulation',
  'Governance attacks',
  'MEV extraction',
  'Flash-loan vectors',
  'Cross-chain messaging',
  'Economic exploits',
  'Sandwich attacks',
  'Block-timestamp manipulation',
  'L2 bridge vulnerabilities',
];

const secondaryDomains = [
  {
    title: 'ZK circuits & cryptography',
    languages: 'Circom · Halo2 · Noir · arkworks · …',
    chips: [
      'Under-constrained circuits',
      'Soundness gaps',
      'Nonce reuse & key handling',
      'ZK-privacy leaks',
      'Signature malleability',
    ],
  },
  {
    title: 'Nodes & infrastructure',
    languages: 'Rust · Go · C++ · …',
    chips: ['Consensus edge cases', 'P2P & DoS vectors', 'State-sync corruption'],
  },
  {
    title: 'Off-chain code',
    languages: 'TypeScript · Python · Go · …',
    chips: [
      'Authorization bypass',
      'Injection & deserialization',
      'Supply-chain risks',
      'Business-logic edge cases',
    ],
  },
];

export default function Coverage(): ReactNode {
  return (
    <section className={styles.coverage} data-testid="coverage" id="coverage">
      <div className={styles.header}>
        <p className={styles.kicker}>COVERAGE</p>
        <BalancedHeading as="h2" className={styles.title}>
          Every major contract language. And everything around your contracts.
        </BalancedHeading>
        <p className={styles.subtitle}>
          Smart contracts are where we publish benchmarks and contest results.
          The engine underneath is language-agnostic — the same agents audit the
          node your chain runs on, the circuits your privacy depends on, and the
          backend that touches your keys.
        </p>
      </div>
      <div className={styles.flagship} data-testid="coverage-flagship">
        <div className={styles.flagshipInfo}>
          <h3 className={styles.domainTitle}>Smart contracts</h3>
          <p className={styles.domainBadge}>
            Sherlock Top-6 · CTFBench 87–95% · flagship domain
          </p>
          <div className={styles.languages}>
            {contractLanguages.map(language => (
              <div className={styles.languageRow} key={language.name}>
                <strong className={styles.languageName}>{language.name}</strong>
                <span className={styles.languageScope}>{language.scope}</span>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.chips} aria-label="Smart contract vulnerability classes">
          {contractChips.map(chip => (
            <span className={styles.chip} data-testid="coverage-chip" key={chip}>
              {chip}
            </span>
          ))}
          <span
            className={`${styles.chip} ${styles.highlightChip}`}
            data-testid="coverage-chip">
            200+ classes total
          </span>
        </div>
      </div>
      <div className={styles.domainGrid}>
        {secondaryDomains.map(domain => (
          <article
            className={styles.domainCard}
            data-testid="coverage-domain"
            key={domain.title}>
            <h3 className={styles.domainTitle}>{domain.title}</h3>
            <p className={styles.domainLanguages}>{domain.languages}</p>
            <div
              className={styles.chips}
              aria-label={`${domain.title} vulnerability classes`}>
              {domain.chips.map(chip => (
                <span className={styles.chip} data-testid="coverage-chip" key={chip}>
                  {chip}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
      <p className={styles.caption}>
        The same engine behind every domain above — and any other code you upload.{' '}
        <Link to="/docs/supported-languages">See the full matrix and upload formats →</Link>
      </p>
    </section>
  );
}

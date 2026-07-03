import type {ReactNode} from 'react';

import BalancedHeading from '../BalancedHeading';
import styles from './styles.module.css';

const languages = [
  {name: 'Solidity', scope: 'Ethereum + EVM L2s'},
  {name: 'Vyper', scope: 'Curve-style DeFi'},
  {name: 'Rust', scope: 'Solana · NEAR'},
];

const chips = [
  'Cross-function reentrancy',
  'Read-only reentrancy',
  'Oracle manipulation',
  'Governance attacks',
  'MEV extraction',
  'Flash-loan vectors',
  'Cross-chain messaging',
  'Business-logic edge cases',
  'Signature malleability',
  'L2 bridge vulnerabilities',
  'Economic exploits',
  'Sandwich attacks',
  'Block-timestamp manipulation',
  'ZK-privacy leaks',
];

export default function Coverage(): ReactNode {
  return (
    <section className={styles.coverage} data-testid="coverage">
      <div className={styles.content}>
        <div className={styles.languageColumn}>
          <p className={styles.kicker}>COVERAGE</p>
          <BalancedHeading as="h2" className={styles.title}>
            Every major contract language.
          </BalancedHeading>
          <div className={styles.languages}>
            {languages.map(language => (
              <div className={styles.languageRow} key={language.name}>
                <strong className={styles.languageName}>{language.name}</strong>
                <span className={styles.languageScope}>{language.scope}</span>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.chips} aria-label="Vulnerability classes">
          {chips.map(chip => (
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
    </section>
  );
}

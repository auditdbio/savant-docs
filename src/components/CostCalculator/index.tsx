import {useState, type ReactNode} from 'react';

import BalancedHeading from '../BalancedHeading';
import {
  DEFAULT_TIER_ID,
  HUMAN_AUDIT_RATE,
  PRICING_TIERS,
  SPEED_ADVANTAGE,
} from '../../config/pricing';
import styles from './styles.module.css';

function formatUsd(value: number): string {
  return value < 1 ? '<$1' : `$${Math.round(value).toLocaleString('en-US')}`;
}

export default function CostCalculator(): ReactNode {
  const [linesInput, setLinesInput] = useState('1000');
  const [tierId, setTierId] = useState(DEFAULT_TIER_ID);

  const lines = Math.max(1, Number.parseInt(linesInput, 10) || 1);
  const tier = PRICING_TIERS.find(t => t.id === tierId) ?? PRICING_TIERS[0];
  const savantCost = lines * tier.price;
  const manualCost = lines * HUMAN_AUDIT_RATE;
  const savings = manualCost - savantCost;
  const multiplier = Math.round(manualCost / savantCost);

  return (
    <section className={styles.calculator} data-testid="cost-calculator" id="calculator">
      <div className={styles.inner}>
        <div className={styles.header}>
          <p className={styles.kicker}>COST CALCULATOR</p>
          <BalancedHeading as="h2" className={styles.title}>
            Know the cost before you start.
          </BalancedHeading>
          <p className={styles.subtitle}>
            Use{' '}
            <a
              href="https://github.com/AlDanial/cloc"
              rel="noopener noreferrer"
              target="_blank">
              cloc
            </a>{' '}
            to count your lines, then pick a tier to estimate your price.
          </p>
        </div>
        <div className={styles.controls}>
          <label className={styles.field}>
            <span className={styles.fieldLabel}>Lines of code</span>
            <input
              className={styles.input}
              data-testid="calculator-lines"
              inputMode="numeric"
              min={1}
              onBlur={() => setLinesInput(String(lines))}
              onChange={event => setLinesInput(event.target.value)}
              type="number"
              value={linesInput}
            />
          </label>
          <label className={styles.field}>
            <span className={styles.fieldLabel}>Tier</span>
            <select
              className={styles.select}
              data-testid="calculator-tier"
              onChange={event => setTierId(event.target.value)}
              value={tierId}>
              {PRICING_TIERS.map(option => (
                <option key={option.id} value={option.id}>
                  {`${option.name} — $${option.price.toFixed(2)}/line`}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className={styles.results}>
          <article
            className={`${styles.resultCard} ${styles.accentCard}`}
            data-testid="calculator-savant">
            <span className={styles.resultLabel}>Savant Chat</span>
            <strong className={`${styles.resultValue} ${styles.accentValue}`}>
              {formatUsd(savantCost)}
            </strong>
            <span className={styles.resultNote}>10–30 minutes</span>
          </article>
          <article className={styles.resultCard} data-testid="calculator-manual">
            <span className={styles.resultLabel}>Manual audit</span>
            <strong className={styles.resultValue}>{formatUsd(manualCost)}</strong>
            <span className={styles.resultNote}>3–38 days</span>
          </article>
          <article
            className={`${styles.resultCard} ${styles.accentCard}`}
            data-testid="calculator-savings">
            <span className={styles.resultLabel}>You save</span>
            <strong className={`${styles.resultValue} ${styles.accentValue}`}>
              {formatUsd(savings)}
            </strong>
            <span className={styles.resultNote}>
              {`${multiplier}\u00d7 cheaper \u00b7 ${SPEED_ADVANTAGE}\u00d7 faster`}
            </span>
          </article>
        </div>
        <p className={styles.disclaimer}>
          Estimate based on lines of code; the final price is calculated from
          token count.
        </p>
      </div>
    </section>
  );
}

import type {ReactNode} from 'react';

import BalancedHeading from '../BalancedHeading';
import styles from './styles.module.css';

const pillars = [
  {
    index: '01',
    title: 'Deeper than a scanner',
    body:
      'Static analyzers pattern-match known bug shapes. Our multi-agent stack runs thousands of specialized LLM calls across 200+ vulnerability classes — each distilled from a real-world exploit in a 20,000-case smart contract reference book. On Advanced and Pro tiers, a critic subagent builds a proof-of-concept for every finding before it reaches your dashboard.',
  },
  {
    index: '02',
    title: 'Faster than a manual audit',
    body:
      'A manual smart contract audit costs $40K–$100K and takes 3–38 days. Savant Chat audits a typical codebase in 10–30 minutes, pay-as-you-go from $0.07/line — on every commit via GitHub and GitLab CI.',
  },
  {
    index: '03',
    title: 'Trusted before the human audit',
    body:
      "1inch, Lido, Pessimistic Security, OXORIO, and other security teams run Savant Chat first, so their auditors' time goes to the bugs AI can't yet see. Second pair of eyes — not the last one.",
  },
];

export default function Pillars(): ReactNode {
  return (
    <section className={styles.pillars} data-testid="pillars" id="pillars">
      <div className={styles.header}>
        <p className={styles.kicker}>WHY SAVANT CHAT</p>
        <BalancedHeading as="h2" className={styles.title}>
          Deeper. Faster. Trusted.
        </BalancedHeading>
      </div>
      <div className={styles.grid}>
        {pillars.map(pillar => (
          <article className={styles.pillarCard} data-testid="pillar-card" key={pillar.index}>
            <span className={styles.pillarIndex}>{pillar.index}</span>
            <h3 className={styles.cardTitle}>{pillar.title}</h3>
            <p className={styles.cardBody}>{pillar.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

import type {ReactNode} from 'react';

import BalancedHeading from '../BalancedHeading';
import styles from './styles.module.css';

const faqs = [
  {
    question: 'Can AI really audit a smart contract?',
    answer:
      'Yes — for the 200+ vulnerability classes our multi-agent stack covers, with PoC validation on every finding. No — for novel economic designs where the auditor needs to reason about incentives and cross-protocol invariants. The right model is AI first, human second.',
  },
  {
    question: 'How is this different from Slither or Aderyn?',
    answer:
      "Static scanners pattern-match known syntactic shapes. Savant Chat traces value flows, models attacker incentives, covers 200+ vulnerability classes, and uses a critic subagent to PoC each finding before it reaches you.",
  },
  {
    question: 'What about false positives?',
    answer:
      'Every finding has a severity rating and confidence score. A separate critic subagent builds a proof-of-concept exploit before the finding surfaces; if the PoC fails, the finding is discarded.',
  },
  {
    question: 'Do I still need a human audit?',
    answer:
      "Yes. Savant Chat is the second pair of eyes, not the last one. Use it before the manual audit so the human auditor's time goes to the bugs AI cannot yet see.",
  },
  {
    question: 'Is my code private?',
    answer:
      'Code is processed securely and not stored or shared beyond the request. We work with trusted AI providers under strict data-handling agreements.',
  },
  {
    question: 'What does it cost?',
    answer:
      'Pay as you go per token: Lite $0.07/line, Advanced $0.12/line, Pro $0.50/line. $75 free credit on signup, no credit card.',
  },
];

export default function Faq(): ReactNode {
  return (
    <section className={styles.faq} data-testid="faq" id="faq">
      <div className={styles.header}>
        <p className={styles.kicker}>FAQ</p>
        <BalancedHeading as="h2" className={styles.title}>
          Honest answers to hard questions.
        </BalancedHeading>
      </div>
      <div className={styles.items}>
        {faqs.map(faq => (
          <details className={styles.item} data-testid="faq-item" key={faq.question}>
            <summary className={styles.summary} data-testid="faq-summary">
              {faq.question}
            </summary>
            <div className={styles.answer} data-testid="faq-answer">
              {faq.answer}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}

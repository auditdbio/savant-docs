import type {ReactNode} from 'react';
import Head from '@docusaurus/Head';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';

import Pricing from '@site/src/components/Pricing';
import styles from './index.module.css';

type SiteConfigWithSignup = {
  customFields?: {
    signupUrl?: string;
  };
};

const pricingStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Savant Chat',
  applicationCategory: 'SecurityApplication',
  operatingSystem: 'Web',
  url: 'https://savant.chat/pricing/',
  offers: [
    {
      '@type': 'Offer',
      name: 'Free start',
      price: '0',
      priceCurrency: 'USD',
      description: '$75 in free credits on signup — no credit card required.',
    },
    {
      '@type': 'Offer',
      name: 'Lite',
      priceCurrency: 'USD',
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        price: 0.07,
        priceCurrency: 'USD',
        referenceQuantity: {'@type': 'QuantitativeValue', value: 1, unitText: 'line of code'},
      },
    },
    {
      '@type': 'Offer',
      name: 'Advanced',
      priceCurrency: 'USD',
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        price: 0.12,
        priceCurrency: 'USD',
        referenceQuantity: {'@type': 'QuantitativeValue', value: 1, unitText: 'line of code'},
      },
    },
    {
      '@type': 'Offer',
      name: 'Pro',
      priceCurrency: 'USD',
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        price: 0.5,
        priceCurrency: 'USD',
        referenceQuantity: {'@type': 'QuantitativeValue', value: 1, unitText: 'line of code'},
      },
    },
  ],
};

export default function PricingPage(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  const {customFields} = siteConfig as SiteConfigWithSignup;
  const signupUrl = customFields?.signupUrl ?? 'https://savant.chat/dashboard/login';

  return (
    <Layout
      title="Smart Contract Audit Pricing — $0.07/Line"
      description="Transparent per-line pricing for AI code audits: Lite $0.07, Advanced $0.12, Pro $0.50 per line. $75 free credits on signup — no card required.">
      <Head>
        <script type="application/ld+json">
          {JSON.stringify(pricingStructuredData)}
        </script>
      </Head>
      <main>
        <section className={styles.pageIntro} data-testid="pricing-page-intro">
          <h1 className={styles.pageIntroTitle}>
            Pay as you go. Priced per line of code.
          </h1>
          <p className={styles.pageIntroLead}>
            The same transparent pricing for every audit — smart contracts
            first, and the code around them. Costs are known before you start:
            lines of code × tier rate. No sales calls for standard audits.
          </p>
        </section>
        <Pricing signupUrl={signupUrl} />
        <section className={styles.pageIntro} data-testid="pricing-page-notes">
          <h2 className={styles.pageIntroSubtitle}>How billing works</h2>
          <ul className={styles.pageIntroList}>
            <li>
              Every new account starts with <strong>$75 in free credits</strong> —
              enough to audit a typical ERC-20 end-to-end. No credit card
              required, credits never expire.
            </li>
            <li>
              A typical smart contract audit completes in 10–30 minutes and
              costs roughly 1–3% of a manual audit engagement.
            </li>
            <li>
              Run audits on every commit via GitHub and GitLab CI — Lite tier is
              calibrated for CI passes, Advanced for pre-audit runs, Pro for
              critical releases.
            </li>
            <li>
              Upload guides and audit walkthroughs live in the{' '}
              <Link to="/docs/">documentation</Link>; for large off-chain
              repositories, node clients, or ZK circuits,{' '}
              <a href="mailto:hello@savant.chat">contact us for a flat scoped quote</a>.
            </li>
          </ul>
        </section>
      </main>
    </Layout>
  );
}

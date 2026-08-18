import type {ReactNode} from 'react';
import Head from '@docusaurus/Head';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';

import CostCalculator from '@site/src/components/CostCalculator';
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
  const signupUrl = customFields?.signupUrl ?? 'pathname:///dashboard/auth?mode=register';

  return (
    <Layout
      title="Smart Contract Audit Pricing — From $0.07/Line"
      description="Transparent per-line pricing for AI code audits: Lite $0.07, Advanced $0.12, Pro $0.50 per line. $75 free credits on signup — no card required.">
      <Head>
        <script type="application/ld+json">
          {JSON.stringify(pricingStructuredData)}
        </script>
      </Head>
      <main>
        <section className={styles.pageIntro} data-testid="pricing-page-intro">
          <h1 className={styles.pageIntroTitle}>Smart Contract Audit Pricing</h1>
          <p className={styles.pageIntroLead}>
            The same transparent per-line pricing for every audit — smart
            contracts or any other code. You know the cost before
            you start: lines of code × tier rate. No sales calls for standard
            audits.
          </p>
        </section>
        <Pricing signupUrl={signupUrl} />
        <CostCalculator />
        <section className={styles.pageIntro} data-testid="pricing-page-notes">
          <h2 className={styles.pageIntroSubtitle}>How billing works</h2>
          <ul className={styles.pageIntroList}>
            <li>
              Every new account starts with <strong>$75 in free credits</strong> —
              enough to audit a typical ERC-20 end-to-end. No credit card
              required, and credits never expire.
            </li>
            <li>
              A typical codebase is audited in 10–30 minutes — for smart
              contracts, that's roughly 1–3% of the cost of a manual audit.
            </li>
            <li>
              Run audits on every commit via GitHub and GitLab CI — Lite is
              calibrated for CI passes, Advanced for pre-audit runs, Pro for
              critical releases.
            </li>
            <li>
              Upload guides and audit walkthroughs are in the{' '}
              <Link to="/docs/">documentation</Link>; for very large scopes — a
              full node client, a monorepo of services —{' '}
              <a href="mailto:hello@savant.chat">contact us for a flat scoped quote</a>.
            </li>
          </ul>
        </section>
      </main>
    </Layout>
  );
}

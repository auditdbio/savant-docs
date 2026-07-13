import type {ReactNode} from 'react';
import Head from '@docusaurus/Head';
import Link from '@docusaurus/Link';
import useBrokenLinks from '@docusaurus/useBrokenLinks';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';

import AnalysisDemo from '@site/src/components/AnalysisDemo';
import BalancedHeading from '@site/src/components/BalancedHeading';
import Comparison from '@site/src/components/Comparison';
import Coverage from '@site/src/components/Coverage';
import Faq, {faqs} from '@site/src/components/Faq';
import FinalCta from '@site/src/components/FinalCta';
import Pillars from '@site/src/components/Pillars';
import Pricing from '@site/src/components/Pricing';
import ProofStats from '@site/src/components/ProofStats';
import ScopeStrip from '@site/src/components/ScopeStrip';
import Testimonials from '@site/src/components/Testimonials';
import TrustLogos from '@site/src/components/TrustLogos';
import styles from './index.module.css';

type SiteConfigWithSignup = {
  title: string;
  customFields?: {
    signupUrl?: string;
  };
};

function useRegisterHomeAnchors(): void {
  if (typeof useBrokenLinks !== 'function') {
    return;
  }

  const brokenLinks = useBrokenLinks();

  ['hero', 'pillars', 'proof', 'coverage', 'pricing', 'faq'].forEach(anchor => {
    brokenLinks.collectAnchor(anchor);
  });
}

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://savant.chat/#organization',
      name: 'Savant Chat',
      legalName: 'Novel Codes DMCC',
      url: 'https://savant.chat/',
      logo: 'https://savant.chat/img/savant-logo-512.png',
      sameAs: ['https://x.com/savantchat', 'https://github.com/auditdbio'],
      description:
        'AI code auditor. Smart contract audits for Solidity, Vyper, Rust, and any other contract language — and one language-agnostic engine for any code: ZK circuits, blockchain nodes, off-chain services.',
    },
    {
      '@type': 'WebSite',
      '@id': 'https://savant.chat/#website',
      url: 'https://savant.chat/',
      name: 'Savant Chat',
      publisher: {'@id': 'https://savant.chat/#organization'},
    },
    {
      '@type': 'SoftwareApplication',
      '@id': 'https://savant.chat/#software',
      name: 'Savant Chat',
      applicationCategory: 'SecurityApplication',
      operatingSystem: 'Web',
      url: 'https://savant.chat/',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
        description:
          'Start free with $75 in credits — no card required. Pay-as-you-go audits from $0.07 per line of code.',
      },
      publisher: {'@id': 'https://savant.chat/#organization'},
    },
    {
      '@type': 'FAQPage',
      '@id': 'https://savant.chat/#faq',
      mainEntity: faqs.map(faq => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {'@type': 'Answer', text: faq.answer},
      })),
    },
  ],
};

function HomepageHero({signupUrl}: {signupUrl: string}) {
  return (
    <section className={styles.hero} data-testid="hero" id="hero">
      <div className={styles.heroInner}>
        <div className={styles.heroText}>
          <p className={styles.kicker} data-testid="hero-kicker">
            AI SMART CONTRACT AUDITS — AND THE CODE AROUND THEM
          </p>
          <BalancedHeading as="h1" className={styles.title} data-testid="hero-title">
            {'Find Smart Contract Vulnerabilities Before Attackers Do'}
          </BalancedHeading>
          <p className={styles.lead} data-testid="hero-lead">
            Deeper than a scanner. Faster than a manual audit. AI security for
            smart contracts — Solidity, Vyper, Rust, or any other language — and
            for everything your protocol depends on: the circuits, the node, the
            backend that touches your keys.
          </p>
          <div className={styles.ctas} data-testid="hero-ctas">
            <Link
              className={`button button--primary ${styles.primaryCta}`}
              to={signupUrl} target="_self">
              Start free — $75 in credits
            </Link>
            <Link
              className={`button button--secondary ${styles.secondaryCta}`}
              to="/#pricing">
              See pricing
            </Link>
          </div>
          <p className={styles.note} data-testid="hero-note">
            <span>Trusted by 1inch, Lido, and Pessimistic Security</span>
            <span>Top-6 finish in a Sherlock audit contest</span>
          </p>
        </div>
        <AnalysisDemo className={styles.analysisDemo} />
      </div>
    </section>
  );
}

export default function Home(): ReactNode {
  useRegisterHomeAnchors();

  const {siteConfig} = useDocusaurusContext();
  const {customFields} = siteConfig as SiteConfigWithSignup;
  const signupUrl = customFields?.signupUrl ?? 'pathname:///dashboard/login';

  const homeTitle = 'Savant Chat — AI Smart Contract Auditor';

  return (
    <Layout
      description="AI smart contract audits for Solidity, Vyper, Rust & more — and one language-agnostic engine for any code: ZK circuits, nodes, backends. $75 free credits.">
      {/* Standalone title: overrides the "| site title" suffix, which would
          otherwise render the tautological "…Auditor | …Auditor". */}
      <Head>
        <title>{homeTitle}</title>
        <meta property="og:title" content={homeTitle} />
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Head>
      <main>
        <HomepageHero signupUrl={signupUrl} />
        <TrustLogos />
        <ScopeStrip />
        <ProofStats signupUrl={signupUrl} />
        <Pillars />
        <Coverage />
        <Comparison />
        <Testimonials />
        <Pricing signupUrl={signupUrl} />
        <Faq />
        <FinalCta signupUrl={signupUrl} />
      </main>
    </Layout>
  );
}

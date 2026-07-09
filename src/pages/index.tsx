import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import useBrokenLinks from '@docusaurus/useBrokenLinks';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';

import AnalysisDemo from '@site/src/components/AnalysisDemo';
import BalancedHeading from '@site/src/components/BalancedHeading';
import Comparison from '@site/src/components/Comparison';
import Coverage from '@site/src/components/Coverage';
import Faq from '@site/src/components/Faq';
import FinalCta from '@site/src/components/FinalCta';
import Pillars from '@site/src/components/Pillars';
import Pricing from '@site/src/components/Pricing';
import ProofStats from '@site/src/components/ProofStats';
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

  ['hero', 'pillars', 'proof', 'pricing', 'faq'].forEach(anchor => {
    brokenLinks.collectAnchor(anchor);
  });
}

function HomepageHero({signupUrl}: {signupUrl: string}) {
  return (
    <section className={styles.hero} data-testid="hero" id="hero">
      <div className={styles.heroInner}>
        <div className={styles.heroText}>
          <p className={styles.kicker} data-testid="hero-kicker">
            AI SMART CONTRACT AUDITS
          </p>
          <BalancedHeading as="h1" className={styles.title} data-testid="hero-title">
            {'Find Smart\u00a0Contract Vulnerabilities Before Attackers\u00a0Do'}
          </BalancedHeading>
          <p className={styles.lead} data-testid="hero-lead">
            Deeper than a scanner. Faster than a manual audit. AI security for
            Solidity, Vyper, and Rust smart contracts.
          </p>
          <div className={styles.ctas} data-testid="hero-ctas">
            <Link
              className={`button button--primary ${styles.primaryCta}`}
              to={signupUrl}>
              Start Free — $75 in credits
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
  const {title, customFields} = siteConfig as SiteConfigWithSignup;
  const signupUrl = customFields?.signupUrl ?? 'pathname:///dashboard/login';

  return (
    <Layout
      title={title}
      description="Find Smart Contract Vulnerabilities Before Attackers Do">
      <main>
        <HomepageHero signupUrl={signupUrl} />
        <TrustLogos />
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

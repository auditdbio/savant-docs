import React from 'react';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Head from '@docusaurus/Head';
import '../../pages/index.module.css';
import styles from './styles.module.css';

export default function Pricing() {
  const {siteConfig} = useDocusaurusContext();
  
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "PriceSpecification",
    "name": "Savant Chat Pricing",
    "description": "Smart Contract Security Audit Pricing",
    "price": "1.00",
    "priceCurrency": "USD",
    "validFrom": "2023-01-01",
    "priceComponent": [
      {
        "@type": "PriceSpecification",
        "name": "Pay-As-You-Go",
        "description": "Per line of code",
        "price": "1.00",
        "priceCurrency": "USD"
      },
      {
        "@type": "PriceSpecification",
        "name": "Basic Tier",
        "description": "Monthly Limit",
        "price": "500.00",
        "priceCurrency": "USD"
      },
      {
        "@type": "PriceSpecification",
        "name": "Pro Tier",
        "description": "Monthly Limit",
        "price": "5000.00",
        "priceCurrency": "USD"
      }
    ]
  };
  
  return (
    <Layout
      title={`Pricing - ${siteConfig.title}`}
      description="Pricing plans for Savant.Chat smart contract audit services">
      <Head>
        {/* JSON-LD для поисковых систем */}
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
        {/* Дополнительные мета-теги для SEO */}
        <meta name="description" content="See Savant.Chat pricing plans for smart contract security audits. Pay only for what you use, with flexible options for every need." />
        <meta property="og:title" content="Pricing - Savant Chat" />
        <meta property="og:description" content="Pricing plans for Savant.Chat smart contract audit services. Simple and transparent pricing." />
        <meta property="og:image" content="https://savant.chat/img/logo_short.svg" />
        <link rel="canonical" href="https://savant.chat/pricing" />
      </Head>
      <div className="container">
        <div className={`${styles.pricingContainer} space-y-12`}>
          {/* Hero Section */}
          <div className="text-center">
            <h1 className={`${styles.heroTitle} text-secondary mb-4`}>Simple, Transparent Pricing</h1>
            <p className={styles.heroSubtitle}>
              Pay only for what you use, with flexible options for every need
            </p>
          </div>

          {/* Per-Line Pricing */}
          <div className={styles.pricingSection}>
            <div className="text-center mb-8">
              <h2 className={`${styles.sectionTitle} text-secondary mb-4`}>Pay-As-You-Go Pricing</h2>
              <div className={styles.priceBadge}>
                <span className={styles.priceLarge}>$1</span>
                <div className={styles.priceUnit}>
                  <span>per</span>
                  <br />
                  <span>line of code</span>
                </div>
              </div>
              <p className={styles.pricingDescription}>
                Approximately $1/line, with final pricing based on actual token count after upload.
              </p>
            </div>
            
            <div className={styles.featureGrid}>
              <div className={styles.featureCard}>
                <div className={styles.featureIconContainer}>
                  <div className={styles.featureIcon}>
                    <svg className={styles.featureSvg} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                </div>
                <div className={styles.featureContent}>
                  <h3 className={styles.featureTitle}>Accelerate Your Audit Process</h3>
                  <p className={styles.featureDescription}>AI-powered analysis helps both auditors and development teams spot vulnerabilities faster and streamline their workflow</p>
                </div>
              </div>

              <div className={styles.featureCard}>
                <div className={styles.featureIconContainer}>
                  <div className={styles.featureIcon}>
                    <svg className={styles.featureSvg} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                </div>
                <div className={styles.featureContent}>
                  <h3 className={styles.featureTitle}>Instant Results</h3>
                  <p className={styles.featureDescription}>Get comprehensive analysis in minutes, not weeks, enabling rapid iteration and deployment</p>
                </div>
              </div>

              <div className={styles.featureCard}>
                <div className={styles.featureIconContainer}>
                  <div className={styles.featureIcon}>
                    <svg className={styles.featureSvg} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <div className={styles.featureContent}>
                  <h3 className={styles.featureTitle}>Transparent Pricing</h3>
                  <p className={styles.featureDescription}>See the exact price when you upload your contracts</p>
                </div>
              </div>
            </div>
          </div>

          {/* Account Tiers */}
          <div className={styles.pricingSection}>
            <h2 className={`${styles.sectionTitle} text-secondary mb-8 text-center`}>Account Tiers</h2>
            <div className={styles.tiersGrid}>
              {/* Basic Tier */}
              <div className={`${styles.tierCard} ${styles.basicTier}`}>
                <div className={styles.tierHeader}>
                  <span className={styles.tierBadgeBasic}>Basic</span>
                  <div className={styles.tierPricing}>
                    <p className={styles.tierLabel}>Monthly Limit</p>
                    <p className={styles.tierPrice}>$500</p>
                  </div>
                </div>
                <ul className={styles.tierFeatures}>
                  <li className={styles.tierFeature}>
                    <svg className={styles.checkIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Standard audit queue
                  </li>
                  <li className={styles.tierFeature}>
                    <svg className={styles.checkIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    150 lines welcome pack included for free
                  </li>
                  <li className={styles.tierFeature}>
                    <svg className={styles.checkIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    No KYC required
                  </li>
                </ul>
                <button className={styles.comingSoonButton} disabled>
                  Coming Soon
                </button>
              </div>

              {/* Pro Tier */}
              <div className={`${styles.tierCard} ${styles.proTier}`}>
                <div className={styles.tierHeader}>
                  <span className={styles.tierBadgePro}>Pro</span>
                  <div className={styles.tierPricing}>
                    <p className={styles.tierLabel}>Monthly Limit</p>
                    <p className={styles.tierPrice}>$5,000</p>
                  </div>
                </div>
                <ul className={styles.tierFeatures}>
                  <li className={styles.tierFeature}>
                    <svg className={styles.checkIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Priority audit processing
                  </li>
                  <li className={styles.tierFeature}>
                    <svg className={styles.checkIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Unlimited lines per request
                  </li>
                  <li className={styles.tierFeature}>
                    <svg className={styles.checkIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Priority support
                  </li>
                  <li className={styles.tierFeature}>
                    <svg className={styles.checkIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    KYC required
                  </li>
                </ul>
                <button className={styles.comingSoonButton} disabled>
                  Coming Soon
                </button>
              </div>

              {/* Enterprise Tier */}
              <div className={`${styles.tierCard} ${styles.enterpriseTier}`}>
                <div className={styles.tierHeader}>
                  <span className={styles.tierBadgeEnterprise}>Enterprise</span>
                  <div className={styles.tierPricing}>
                    <p className={styles.tierLabel}>Monthly Limit</p>
                    <p className={styles.tierPrice}>Custom</p>
                  </div>
                </div>
                <ul className={styles.tierFeatures}>
                  <li className={styles.tierFeature}>
                    <svg className={styles.checkIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Expedited audit pipeline
                  </li>
                  <li className={styles.tierFeature}>
                    <svg className={styles.checkIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Custom volume discounts
                  </li>
                  <li className={styles.tierFeature}>
                    <svg className={styles.checkIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Dedicated support
                  </li>
                  <li className={styles.tierFeature}>
                    <svg className={styles.checkIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Custom integration options
                  </li>
                </ul>
                <button className={styles.comingSoonButton} disabled>
                  Coming Soon
                </button>
              </div>
            </div>
          </div>

          {/* Subscription Options */}
          <div className={styles.pricingSection}>
            <h2 className={`${styles.sectionTitle} text-secondary mb-8 text-center`}>Subscription Plans</h2>
            <div className={styles.tiersGrid}>
              {/* Basic Subscription */}
              <div className={`${styles.subscriptionCard} ${styles.basicTier}`}>
                <div className={styles.subscriptionHeader}>
                  <span className={styles.tierBadgeBasic}>Basic Tier</span>
                  <div className={styles.subscriptionPricing}>
                    <span className={styles.tierPrice}>$350</span>
                    <p className={styles.subscriptionValue}>Get $500 worth of requests</p>
                  </div>
                </div>
                <ul className={styles.tierFeatures}>
                  <li className={styles.tierFeature}>
                    <svg className={styles.checkIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    30% savings on requests
                  </li>
                  <li className={styles.tierFeature}>
                    <svg className={styles.checkIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Monthly subscription
                  </li>
                </ul>
                <button className={styles.comingSoonButton} disabled>
                  Coming Soon
                </button>
              </div>

              {/* Pro Subscription */}
              <div className={`${styles.subscriptionCard} ${styles.proTier}`}>
                <div className={styles.subscriptionHeader}>
                  <span className={styles.tierBadgePro}>Pro Tier</span>
                  <div className={styles.subscriptionPricing}>
                    <span className={styles.tierPrice}>$3,500</span>
                    <p className={styles.subscriptionValue}>Get $5,000 worth of requests</p>
                  </div>
                </div>
                <ul className={styles.tierFeatures}>
                  <li className={styles.tierFeature}>
                    <svg className={styles.checkIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    30% savings on requests
                  </li>
                  <li className={styles.tierFeature}>
                    <svg className={styles.checkIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Monthly subscription
                  </li>
                </ul>
                <button className={styles.comingSoonButton} disabled>
                  Coming Soon
                </button>
              </div>

              {/* Enterprise Subscription */}
              <div className={`${styles.subscriptionCard} ${styles.enterpriseTier}`}>
                <div className={styles.subscriptionHeader}>
                  <span className={styles.tierBadgeEnterprise}>Enterprise</span>
                  <div className={styles.subscriptionPricing}>
                    <span className={styles.tierPrice}>Custom</span>
                    <p className={styles.subscriptionValue}>Contact us for custom pricing</p>
                  </div>
                </div>
                <ul className={styles.tierFeatures}>
                  <li className={styles.tierFeature}>
                    <svg className={styles.checkIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Custom volume discounts
                  </li>
                  <li className={styles.tierFeature}>
                    <svg className={styles.checkIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Annual billing available
                  </li>
                </ul>
                <button className={styles.comingSoonButton} disabled>
                  Contact Us
                </button>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className={styles.pricingSection}>
            <h2 className={`${styles.sectionTitle} mb-8 text-center`}>Frequently Asked Questions</h2>
            <div className={styles.faqGrid}>
              <div className={styles.faqItem}>
                <h3 className={styles.faqQuestion}>How is the price calculated?</h3>
                <p className={styles.faqAnswer}>While we show approximate pricing based on lines of code, the final price is calculated based on the actual token count in your smart contracts. You'll see the exact price when you upload your files.</p>
              </div>
              <div className={styles.faqItem}>
                <h3 className={styles.faqQuestion}>What payment methods do you accept?</h3>
                <p className={styles.faqAnswer}>Currently, we're working on implementing various payment methods. Please contact us for available options.</p>
              </div>
              <div className={styles.faqItem}>
                <h3 className={styles.faqQuestion}>Can I upgrade my tier later?</h3>
                <p className={styles.faqAnswer}>Yes, you can upgrade your tier at any time. Contact our support team for assistance with the upgrade process.</p>
              </div>
              <div className={styles.faqItem}>
                <h3 className={styles.faqQuestion}>What's included in the audit?</h3>
                <p className={styles.faqAnswer}>Our AI performs comprehensive security analysis of your Solidity smart contracts, focusing on identifying potential vulnerabilities and security issues.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
import React from 'react';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Head from '@docusaurus/Head';
import PricingCalculator from '../../components/PricingCalculator';
import { PRICING_PLANS } from '../../config/pricing';
import CTASection from '../../components/CTASection';

export default function Pricing() {
  const {siteConfig} = useDocusaurusContext();
  
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Savant Chat AI Smart Contract Audit",
    "description": "AI-powered security audits for smart contracts (Solidity, Vyper, Rust). Choose from flexible pay-as-you-go pricing or account tiers.",
    "brand": {
      "@type": "Brand",
      "name": "Savant Chat"
    },
    "offers": {
      "@type": "AggregateOffer",
      "priceCurrency": "USD",
      "lowPrice": "0.07",
      "highPrice": "2500.00",
      "offers": [
        ...PRICING_PLANS.map(plan => ({
          "@type": "Offer",
          "name": `Pay-As-You-Go: ${plan.name}`,
          "price": plan.price,
          "priceCurrency": "USD",
          "description": plan.description
        })),
        {
          "@type": "Offer",
          "name": "Basic Account Tier",
          "price": "250",
          "priceCurrency": "USD",
          "description": "Monthly spending limit with standard features."
        },
        {
          "@type": "Offer",
          "name": "Pro Account Tier",
          "price": "2500",
          "priceCurrency": "USD",
          "description": "Higher monthly limit with priority support and unlimited lines per request."
        }
      ]
    }
  };
  
  return (
    <Layout
      title="Smart Contract Audit Pricing & Plans"
      description="Transparent pricing for AI-powered smart contract security audits. Choose pay-as-you-go plans for smart contract code or flexible account tiers for your team.">
      <Head>
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
        <meta name="description" content="See Savant Chat pricing plans for smart contract security audits. Pay only for what you use, with flexible options for every need." />
        <meta property="og:title" content="Pricing - Savant Chat" />
        <meta property="og:description" content="Transparent pricing for AI-powered smart contract security audits. Choose pay-as-you-go or account tiers for your team." />
        <meta property="og:image" content="https://savant.chat/img/logo_short.svg" />
      </Head>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-12">
          {/* Hero Section */}
          <div className="text-center">
            <h1 className="text-4xl font-bold text-secondary mb-4">Simple, Transparent Pricing</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Pay only for what you use, with flexible options for every need
            </p>
          </div>

          {/* Pricing Calculator */}
          <PricingCalculator />

          {/* Per-Line Pricing */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="text-center mb-10">
              <h2 className="text-2xl font-bold text-secondary mb-3">Pay-As-You-Go AI Audit Pricing</h2>
              <p className="mb-4 text-gray-600 max-w-xl mx-auto">
                Final pricing is based on the actual token count of your smart contract code after upload.
              </p>
              <p className="mb-10 md:mb-8 text-sm text-gray-500 max-w-xl mx-auto">
                Supports Solidity, Vyper, and Rust (Near & Solana)
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 justify-center">
                {PRICING_PLANS.map((plan, index) => (
                  <div key={plan.id} className={`text-center ${index === 2 ? 'md:col-span-2 md:justify-self-center lg:col-span-1 lg:justify-self-auto' : ''}`}>
                    <h3 className="text-5xl font-bold text-secondary mb-2">${plan.price}</h3>
                    <p className="text-lg font-medium text-secondary mb-1">{plan.name}</p>
                    <p className="text-gray-600">{plan.description}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-50 rounded-lg p-6 flex items-start" role="img" aria-label="Shield with checkmark icon">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white">
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-secondary mb-2">Accelerate Your Audit Process</h3>
                  <p className="text-gray-600">AI-powered analysis helps both auditors and development teams spot vulnerabilities faster and streamline their workflow</p>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-6 flex items-start" role="img" aria-label="Lightning bolt icon">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white">
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-secondary mb-2">Instant Security Results</h3>
                  <p className="text-gray-600">Get a comprehensive vulnerability report in minutes, not weeks, enabling rapid iteration and deployment</p>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-6 flex items-start" role="img" aria-label="Price tag icon">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white">
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-secondary mb-2">Transparent Per-Token Pricing</h3>
                  <p className="text-gray-600">See the exact price for your smart contract audit when you upload your files</p>
                </div>
              </div>
            </div>
          </div>

          {/* Account Tiers */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-secondary mb-8 text-center">Account Tiers & Spending Limits</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Basic Tier */}
              <div className="border-2 border-gray-200 rounded-lg p-6 hover:border-primary transition-colors">
                <div className="text-center">
                  <span className="inline-block px-4 py-1 rounded-full text-sm bg-primary/10 text-primary">Basic</span>
                  <div className="mt-4">
                    <p className="text-gray-500">Monthly Limit</p>
                    <p className="text-4xl font-bold text-secondary">$250</p>
                  </div>
                </div>
                <ul className="mt-6 space-y-4">
                  <li className="flex items-center text-gray-600">
                    <svg className="h-5 w-5 text-primary mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" role="img" aria-label="Checkmark icon">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Standard audit queue
                  </li>
                  <li className="flex items-center text-gray-600">
                    <svg className="h-5 w-5 text-primary mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" role="img" aria-label="Checkmark icon">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    No KYC required
                  </li>
                  <li className="flex items-center text-gray-600">
                    <svg className="h-5 w-5 text-primary mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" role="img" aria-label="Checkmark icon">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Includes $75 welcome bonus
                  </li>
                </ul>
              </div>

              {/* Pro Tier */}
              <div className="border-2 border-gray-200 rounded-lg p-6 hover:border-secondary transition-colors">
                <div className="text-center">
                  <span className="inline-block px-4 py-1 rounded-full text-sm bg-secondary/10 text-secondary">Pro</span>
                  <div className="mt-4">
                    <p className="text-gray-500">Monthly Limit</p>
                    <p className="text-4xl font-bold text-secondary">$2,500</p>
                  </div>
                </div>
                <ul className="mt-6 space-y-4">
                  <li className="flex items-center text-gray-600">
                    <svg className="h-5 w-5 text-primary mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" role="img" aria-label="Checkmark icon">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Priority audit processing
                  </li>
                  <li className="flex items-center text-gray-600">
                    <svg className="h-5 w-5 text-primary mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" role="img" aria-label="Checkmark icon">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Unlimited lines per request
                  </li>
                  <li className="flex items-center text-gray-600">
                    <svg className="h-5 w-5 text-primary mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" role="img" aria-label="Checkmark icon">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Priority support
                  </li>
                  <li className="flex items-center text-gray-600">
                    <svg className="h-5 w-5 text-primary mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" role="img" aria-label="Checkmark icon">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    KYC required
                  </li>
                </ul>
              </div>

              {/* Enterprise Tier */}
              <div className="border-2 border-gray-200 rounded-lg p-6 hover:border-gray-900 transition-colors">
                <div className="text-center">
                  <span className="inline-block px-4 py-1 rounded-full text-sm bg-gray-100 text-gray-800">Enterprise</span>
                  <div className="mt-4">
                    <p className="text-gray-500">Monthly Limit</p>
                    <p className="text-4xl font-bold text-secondary">Custom</p>
                  </div>
                </div>
                <ul className="mt-6 space-y-4">
                  <li className="flex items-center text-gray-600">
                    <svg className="h-5 w-5 text-primary mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" role="img" aria-label="Checkmark icon">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Expedited audit pipeline
                  </li>
                  <li className="flex items-center text-gray-600">
                    <svg className="h-5 w-5 text-primary mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" role="img" aria-label="Checkmark icon">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Custom volume discounts
                  </li>
                  <li className="flex items-center text-gray-600">
                    <svg className="h-5 w-5 text-primary mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" role="img" aria-label="Checkmark icon">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Dedicated support
                  </li>
                  <li className="flex items-center text-gray-600">
                    <svg className="h-5 w-5 text-primary mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" role="img" aria-label="Checkmark icon">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Custom integration options
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <CTASection
        title="Ready to Secure Your Smart Contracts?"
        description="Get started with a free AI security audit and see the results for yourself"
      />
    </Layout>
  );
}

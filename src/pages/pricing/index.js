import React from 'react';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Head from '@docusaurus/Head';

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
      title="Pricing"
      description="Pricing plans for Savant Chat smart contract audit services">
      <Head>
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
        <meta name="description" content="See Savant Chat pricing plans for smart contract security audits. Pay only for what you use, with flexible options for every need." />
        <meta property="og:title" content="Pricing - Savant Chat" />
        <meta property="og:description" content="Pricing plans for Savant Chat smart contract audit services. Simple and transparent pricing." />
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

          {/* Per-Line Pricing */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-secondary mb-4">Pay-As-You-Go Pricing</h2>
              <div className="flex items-center justify-center space-x-2">
                <span className="text-5xl font-bold text-primary">$1</span>
                <div className="text-left">
                  <span className="text-gray-600">per</span>
                  <br />
                  <span className="text-gray-600">line of code</span>
                </div>
              </div>
              <p className="mt-4 text-gray-600 max-w-xl mx-auto">
                Approximately $1/line, with final pricing based on actual token count after upload.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="bg-gray-50 rounded-lg p-6 flex items-start">
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

              <div className="bg-gray-50 rounded-lg p-6 flex items-start">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white">
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-secondary mb-2">Instant Results</h3>
                  <p className="text-gray-600">Get comprehensive analysis in minutes, not weeks, enabling rapid iteration and deployment</p>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-6 flex items-start">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white">
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-secondary mb-2">Transparent Pricing</h3>
                  <p className="text-gray-600">See the exact price when you upload your contracts</p>
                </div>
              </div>
            </div>
          </div>

          {/* Account Tiers */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-secondary mb-8 text-center">Account Tiers</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Basic Tier */}
              <div className="border-2 border-gray-200 rounded-lg p-6 hover:border-primary transition-colors">
                <div className="text-center">
                  <span className="inline-block px-4 py-1 rounded-full text-sm bg-primary/10 text-primary">Basic</span>
                  <div className="mt-4">
                    <p className="text-gray-500">Monthly Limit</p>
                    <p className="text-4xl font-bold text-secondary">$500</p>
                  </div>
                </div>
                <ul className="mt-6 space-y-4">
                  <li className="flex items-center text-gray-600">
                    <svg className="h-5 w-5 text-primary mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Standard audit queue
                  </li>
                  <li className="flex items-center text-gray-600">
                    <svg className="h-5 w-5 text-primary mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    150 lines welcome pack included for free
                  </li>
                  <li className="flex items-center text-gray-600">
                    <svg className="h-5 w-5 text-primary mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    No KYC required
                  </li>
                </ul>
                <button className="w-full mt-6 py-2 px-4 bg-gray-100 text-gray-500 rounded-lg font-medium cursor-not-allowed" disabled>
                  Coming Soon
                </button>
              </div>

              {/* Pro Tier */}
              <div className="border-2 border-gray-200 rounded-lg p-6 hover:border-secondary transition-colors">
                <div className="text-center">
                  <span className="inline-block px-4 py-1 rounded-full text-sm bg-secondary/10 text-secondary">Pro</span>
                  <div className="mt-4">
                    <p className="text-gray-500">Monthly Limit</p>
                    <p className="text-4xl font-bold text-secondary">$5,000</p>
                  </div>
                </div>
                <ul className="mt-6 space-y-4">
                  <li className="flex items-center text-gray-600">
                    <svg className="h-5 w-5 text-primary mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Priority audit processing
                  </li>
                  <li className="flex items-center text-gray-600">
                    <svg className="h-5 w-5 text-primary mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Unlimited lines per request
                  </li>
                  <li className="flex items-center text-gray-600">
                    <svg className="h-5 w-5 text-primary mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Priority support
                  </li>
                  <li className="flex items-center text-gray-600">
                    <svg className="h-5 w-5 text-primary mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    KYC required
                  </li>
                </ul>
                <button className="w-full mt-6 py-2 px-4 bg-gray-100 text-gray-500 rounded-lg font-medium cursor-not-allowed" disabled>
                  Coming Soon
                </button>
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
                    <svg className="h-5 w-5 text-primary mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Expedited audit pipeline
                  </li>
                  <li className="flex items-center text-gray-600">
                    <svg className="h-5 w-5 text-primary mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Custom volume discounts
                  </li>
                  <li className="flex items-center text-gray-600">
                    <svg className="h-5 w-5 text-primary mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Dedicated support
                  </li>
                  <li className="flex items-center text-gray-600">
                    <svg className="h-5 w-5 text-primary mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Custom integration options
                  </li>
                </ul>
                <button className="w-full mt-6 py-2 px-4 bg-gray-100 text-gray-500 rounded-lg font-medium cursor-not-allowed" disabled>
                  Coming Soon
                </button>
              </div>
            </div>
          </div>

          {/* Subscription Options */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-secondary mb-8 text-center">Subscription Plans</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Basic Subscription */}
              <div className="border-2 border-gray-200 rounded-lg p-6 hover:border-primary transition-colors flex flex-col h-full">
                <div className="text-center mb-4">
                  <span className="inline-block px-4 py-1 rounded-full text-sm bg-primary/10 text-primary">Basic Tier</span>
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-secondary">$350</span>
                  </div>
                  <p className="text-gray-500 mt-2">Get $500 worth of requests</p>
                </div>
                <ul className="mt-6 space-y-4 flex-grow">
                  <li className="flex items-center text-gray-600">
                    <svg className="h-5 w-5 text-primary mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    30% savings on requests
                  </li>
                  <li className="flex items-center text-gray-600">
                    <svg className="h-5 w-5 text-primary mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Monthly subscription
                  </li>
                </ul>
                <button className="w-full mt-6 py-2 px-4 bg-gray-100 text-gray-500 rounded-lg font-medium cursor-not-allowed" disabled>
                  Coming Soon
                </button>
              </div>

              {/* Pro Subscription */}
              <div className="border-2 border-gray-200 rounded-lg p-6 hover:border-secondary transition-colors flex flex-col h-full">
                <div className="text-center mb-4">
                  <span className="inline-block px-4 py-1 rounded-full text-sm bg-secondary/10 text-secondary">Pro Tier</span>
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-secondary">$3,500</span>
                  </div>
                  <p className="text-gray-500 mt-2">Get $5,000 worth of requests</p>
                </div>
                <ul className="mt-6 space-y-4 flex-grow">
                  <li className="flex items-center text-gray-600">
                    <svg className="h-5 w-5 text-primary mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    30% savings on requests
                  </li>
                  <li className="flex items-center text-gray-600">
                    <svg className="h-5 w-5 text-primary mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Monthly subscription
                  </li>
                </ul>
                <button className="w-full mt-6 py-2 px-4 bg-gray-100 text-gray-500 rounded-lg font-medium cursor-not-allowed" disabled>
                  Coming Soon
                </button>
              </div>

              {/* Enterprise Subscription */}
              <div className="border-2 border-gray-200 rounded-lg p-6 hover:border-gray-900 transition-colors flex flex-col h-full">
                <div className="text-center mb-4">
                  <span className="inline-block px-4 py-1 rounded-full text-sm bg-gray-100 text-gray-800">Enterprise</span>
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-secondary">Custom</span>
                  </div>
                  <p className="text-gray-500 mt-2">Contact us for custom pricing</p>
                </div>
                <ul className="mt-6 space-y-4 flex-grow">
                  <li className="flex items-center text-gray-600">
                    <svg className="h-5 w-5 text-primary mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Custom volume discounts
                  </li>
                  <li className="flex items-center text-gray-600">
                    <svg className="h-5 w-5 text-primary mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Annual billing available
                  </li>
                </ul>
                <button className="w-full mt-6 py-2 px-4 bg-gray-100 text-gray-500 rounded-lg font-medium cursor-not-allowed" disabled>
                  Contact Us
                </button>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Frequently Asked Questions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">How is the price calculated?</h3>
                <p className="text-gray-600">While we show approximate pricing based on lines of code, the final price is calculated based on the actual token count in your smart contracts. You'll see the exact price when you upload your files.</p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">What payment methods do you accept?</h3>
                <p className="text-gray-600">Currently, we're working on implementing various payment methods. Please contact us for available options.</p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Can I upgrade my tier later?</h3>
                <p className="text-gray-600">Yes, you can upgrade your tier at any time. Contact our support team for assistance with the upgrade process.</p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">What's included in the audit?</h3>
                <p className="text-gray-600">Our AI performs comprehensive security analysis of your Solidity smart contracts, focusing on identifying potential vulnerabilities and security issues.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

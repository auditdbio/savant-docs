import React, { type ReactElement, useEffect } from "react";
import Layout from "@theme/Layout";
import Head from "@docusaurus/Head";
import CTASection from "../../components/CTASection";

export default function UseCases(): ReactElement {
  // Instant anchor scrolling - no animation, immediate jump
  useEffect(() => {
    const handleAnchorScroll = () => {
      const hash = window.location.hash;
      if (hash) {
        // Remove the # symbol
        const elementId = hash.substring(1);
        const element = document.getElementById(elementId);
        
        if (element) {
          // Instant scroll without animation
          element.scrollIntoView({
            behavior: 'auto',
            block: 'start',
            inline: 'nearest'
          });
        }
      }
    };

    // Immediate scroll on load - no delay
    handleAnchorScroll();

    // Also try to scroll immediately in case DOM isn't ready
    const hash = window.location.hash;
    if (hash) {
      const elementId = hash.substring(1);
      // Try to scroll multiple times to catch the element as soon as it's available
      const attempts = [0, 10, 50];
      attempts.forEach(delay => {
        setTimeout(() => {
          const element = document.getElementById(elementId);
          if (element) {
            element.scrollIntoView({
              behavior: 'auto',
              block: 'start',
              inline: 'nearest'
            });
          }
        }, delay);
      });
    }

    // Handle hash changes (if user clicks another anchor link)
    window.addEventListener('hashchange', handleAnchorScroll);

    // Cleanup
    return () => {
      window.removeEventListener('hashchange', handleAnchorScroll);
    };
  }, []);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Use Cases - Savant Chat",
    description: "Discover how Savant Chat serves developers, audit companies, investors, and enterprises with AI-powered smart contract security",
    url: "https://savant.chat/use-cases",
  };

  return (
    <Layout
      title="Smart Contract Security Use Cases & Solutions"
      description="Discover how Savant Chat serves developers, audit companies, investors, and enterprises with AI-powered smart contract security"
    >
      <Head>
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Head>

      <div className="bg-white">
        {/* Hero Section */}
        <section className="bg-secondary text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Use Cases
            </h1>
            <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto">
              Tailored AI-powered smart contract security solutions for every role
            </p>
          </div>
        </section>

        {/* Developers Section */}
        <section id="developers" className="py-20 bg-gradient-to-br from-blue-50 to-blue-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-blue-500 text-white mx-auto mb-6">
                <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/>
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">For Developers</h2>
              <p className="text-xl text-gray-600">Integrate security into your development workflow</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow border-l-4 border-blue-500">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Pre-Deployment Security Check</h3>
                <p className="text-gray-600 mb-4">
                  Run a comprehensive security audit before deploying your smart contracts to mainnet. 
                  Catch vulnerabilities early and save on gas costs from redeployments.
                </p>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Automated vulnerability scanning</li>
                  <li>• Gas optimization recommendations</li>
                  <li>• Best practices compliance</li>
                </ul>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow border-l-4 border-blue-500">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Continuous Security Monitoring</h3>
                <p className="text-gray-600 mb-4">
                  Integrate with your CI/CD pipeline to automatically scan every pull request and code change. 
                  Maintain security standards throughout your development lifecycle.
                </p>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• GitHub Actions integration</li>
                  <li>• Pull request security checks</li>
                  <li>• Team collaboration features</li>
                </ul>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow border-l-4 border-blue-500">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Learning Tool</h3>
                <p className="text-gray-600 mb-4">
                  Learn about smart contract security patterns and anti-patterns. 
                  Get detailed explanations of potential issues and how to fix them.
                </p>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Educational security insights</li>
                  <li>• Code improvement suggestions</li>
                  <li>• Industry best practices</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Audit Companies Section */}
        <section id="audit-companies" className="py-20 bg-gradient-to-br from-green-50 to-green-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-green-500 text-white mx-auto mb-6">
                <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">For Audit Companies</h2>
              <p className="text-xl text-gray-600">Enhance your audit workflow with AI assistance</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow border-l-4 border-green-500">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Pre-Audit Screening</h3>
                <p className="text-gray-600 text-sm">
                  Quickly assess project complexity and find low-hanging fruit before starting a manual review.
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow border-l-4 border-green-500">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">AI-Powered Audit Acceleration</h3>
                <p className="text-gray-600 text-sm">
                  Let our AI audit tool handle routine checks while your experts focus on complex business logic.
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow border-l-4 border-green-500">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Quality Assurance</h3>
                <p className="text-gray-600 text-sm">
                  Use AI as a second opinion to ensure comprehensive coverage and reduce false negatives.
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow border-l-4 border-green-500">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Client Value-Add</h3>
                <p className="text-gray-600 text-sm">
                  Offer clients additional AI-powered insights and faster turnaround times.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Investors Section */}
        <section id="investors" className="py-20 bg-gradient-to-br from-purple-50 to-purple-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-purple-500 text-white mx-auto mb-6">
                <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">For Investors</h2>
              <p className="text-xl text-gray-600">Make informed investment decisions with AI security insights</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow border-l-4 border-purple-500">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Due Diligence Security Scan</h3>
                <p className="text-gray-600 text-sm">
                  Quickly assess the security posture of potential Web3 investments before you commit.
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow border-l-4 border-purple-500">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Portfolio Monitoring</h3>
                <p className="text-gray-600 text-sm">
                  Continuously monitor your portfolio companies' smart contract security health.
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow border-l-4 border-purple-500">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Risk Assessment</h3>
                <p className="text-gray-600 text-sm">
                  Understand technical risks and potential security vulnerabilities in your investments.
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow border-l-4 border-purple-500">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Competitive Analysis</h3>
                <p className="text-gray-600 text-sm">
                  Compare security standards across different projects and protocols in your sector.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Enterprise Section */}
        <section id="enterprise" className="py-20 bg-gradient-to-br from-orange-50 to-orange-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-orange-500 text-white mx-auto mb-6">
                <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">For Enterprise</h2>
              <p className="text-xl text-gray-600">Scale security across your organization</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow border-l-4 border-orange-500">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Regular Security Reviews</h3>
                <p className="text-gray-600 mb-4">
                  Implement regular security assessments across all your smart contract deployments. 
                  Maintain consistent security standards organization-wide.
                </p>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Automated security reporting</li>
                  <li>• Compliance tracking</li>
                  <li>• Multi-project management</li>
                </ul>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow border-l-4 border-orange-500">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Custom Security Policies</h3>
                <p className="text-gray-600 mb-4">
                  Define and enforce organization-specific security policies and standards. 
                  Get customized reports aligned with your governance requirements.
                </p>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Custom rule configurations</li>
                  <li>• Enterprise-grade reporting</li>
                  <li>• Team collaboration tools</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <CTASection 
          title="Ready to Get Started?"
          description="Join thousands of users who trust Savant Chat for their smart contract security needs"
        />
      </div>
    </Layout>
  );
} 
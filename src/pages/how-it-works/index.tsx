import React, { type ReactElement } from "react";
import Layout from "@theme/Layout";
import Head from "@docusaurus/Head";
import CTASection from "../../components/CTASection";

export default function HowItWorks(): ReactElement {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "How It Works - Savant Chat",
    description: "Learn how Savant Chat's AI-powered smart contract security analysis works step by step",
    url: "https://savant.chat/how-it-works",
  };

  return (
    <Layout
      title="How AI Smart Contract Security Analysis Works"
      description="Learn how Savant Chat's AI-powered smart contract security analysis works step by step"
    >
      <Head>
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Head>

      <div className="bg-white">
        {/* Hero Section */}
        <section className="bg-secondary text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              How Savant.chat's AI Audit Works
            </h1>
            <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto">
              Get an AI-powered smart contract security audit in 3 simple steps
            </p>
          </div>
        </section>

                {/* Process Steps */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                How Savant.chat Works
              </h2>
              <p className="text-xl text-gray-600">
                Get comprehensive security analysis in just 3 simple steps
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              
              {/* Step 1 */}
              <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-shadow">
                <div className="flex items-center mb-6">
                  <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-primary text-white text-xl font-bold mr-4">
                    1
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">Upload Your Contract</h3>
                </div>
                <div className="flex items-center justify-center mb-4">
                  <svg className="h-8 w-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
                  </svg>
                </div>
                <p className="text-gray-600 leading-relaxed text-center">
                  Drag and drop your Solidity files or connect a GitHub repository.
                </p>
              </div>

              {/* Step 2 */}
              <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-shadow">
                <div className="flex items-center mb-6">
                  <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-primary text-white text-xl font-bold mr-4">
                    2
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">AI Analysis Begins</h3>
                </div>
                <div className="flex items-center justify-center mb-4">
                  <svg className="h-8 w-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
                  </svg>
                </div>
                <p className="text-gray-600 leading-relaxed text-center">
                  Our multi-agent system deploys thousands of parallel LLM calls with different models to analyze your code from every angle.
                </p>
              </div>

              {/* Step 3 */}
              <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-shadow">
                <div className="flex items-center mb-6">
                  <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-primary text-white text-xl font-bold mr-4">
                    3
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">Get Comprehensive Results</h3>
                </div>
                <div className="flex items-center justify-center mb-4">
                  <svg className="h-8 w-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                  </svg>
                </div>
                <p className="text-gray-600 leading-relaxed text-center">
                  Receive a detailed report identifying security vulnerabilities, from common exploits to complex logic flaws and architectural weaknesses.
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* What You Get */}
        <section className="bg-gray-50 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                What You Get
              </h2>
              <p className="text-xl text-gray-600">
                Comprehensive security analysis powered by AI
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              
              <div className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-red-100 text-red-600 mx-auto mb-6">
                  <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Vulnerability Detection</h3>
                <p className="text-gray-600">
                  Identifies security issues, gas optimizations, and complex logic flaws.
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 text-blue-600 mx-auto mb-6">
                  <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Detailed Reports</h3>
                <p className="text-gray-600">
                  Professional reports in Markdown or PDF format, ready for sharing and analysis
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-green-100 text-green-600 mx-auto mb-6">
                  <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Multi-Agent Analysis</h3>
                <p className="text-gray-600">
                  Thousands of parallel LLM calls with different specialized models
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* CTA Section */}
        <CTASection 
          title="Ready to Experience the Future of Smart Contract Security?"
          description="Join thousands of developers and auditors who trust Savant Chat"
        />
      </div>
    </Layout>
  );
} 
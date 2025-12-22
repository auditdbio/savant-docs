import React, { type ReactElement } from "react";
import Layout from "@theme/Layout";
import Head from "@docusaurus/Head";
import CTASection from "../../components/CTASection";

export default function HowItWorks(): ReactElement {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How Savant.chat's AI Smart Contract Audit Works",
    "description": "Get a comprehensive AI-powered smart contract security audit for your project in 3 simple steps.",
    "step": [
      {
        "@type": "HowToStep",
        "name": "Upload Your Contract",
        "text": "Drag and drop your smart contract files or connect a GitHub repository.",
        "url": "https://savant.chat/how-it-works#step1"
      },
      {
        "@type": "HowToStep",
        "name": "AI Analysis Begins",
        "text": "Our multi-agent system deploys thousands of parallel LLM calls to analyze your code.",
        "url": "https://savant.chat/how-it-works#step2"
      },
      {
        "@type": "HowToStep",
        "name": "Get Comprehensive Results",
        "text": "Receive a detailed security report identifying vulnerabilities, from common exploits to complex logic flaws.",
        "url": "https://savant.chat/how-it-works#step3"
      }
    ]
  };

  return (
    <Layout
      title="How AI Smart Contract Security Audits Work"
      description="Learn how Savant Chat's AI-powered security audit works: upload your smart contract code, let our AI analyze it, and get a comprehensive vulnerability report in minutes."
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
            <p className="text-base md:text-lg text-white/70 max-w-2xl mx-auto mt-4">
              Supporting Solidity, Vyper, and Rust (Near & Solana)
            </p>
          </div>
        </section>

                {/* Process Steps */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                How Our AI Audit Works
              </h2>
              <p className="text-xl text-gray-600">
                Get comprehensive security analysis in just 3 simple steps
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              
              {/* Step 1 */}
              <div id="step1" className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-shadow">
                <div className="flex items-center mb-6">
                  <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-primary text-white text-xl font-bold mr-4">
                    1
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">Upload Your Smart Contract Project</h3>
                </div>
                <div className="flex items-center justify-center mb-4" role="img" aria-label="Cloud upload icon">
                  <svg className="h-8 w-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
                  </svg>
                </div>
                <p className="text-gray-600 leading-relaxed text-center">
                  Drag and drop your smart contract files (Solidity, Vyper, or Rust) or connect a GitHub repository.
                </p>
              </div>

              {/* Step 2 */}
              <div id="step2" className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-shadow">
                <div className="flex items-center mb-6">
                  <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-primary text-white text-xl font-bold mr-4">
                    2
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">AI Vulnerability Analysis</h3>
                </div>
                <div className="flex items-center justify-center mb-4" role="img" aria-label="AI brain icon">
                  <svg className="h-8 w-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
                  </svg>
                </div>
                <p className="text-gray-600 leading-relaxed text-center">
                  Our multi-agent system deploys thousands of parallel LLM calls with different models to analyze your code from every angle.
                </p>
              </div>

              {/* Step 3 */}
              <div id="step3" className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-shadow">
                <div className="flex items-center mb-6">
                  <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-primary text-white text-xl font-bold mr-4">
                    3
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">Receive Your Security Report</h3>
                </div>
                <div className="flex items-center justify-center mb-4" role="img" aria-label="Document report icon">
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
                What Your AI Audit Report Includes
              </h2>
              <p className="text-xl text-gray-600">
                A comprehensive overview of your smart contract's security posture
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              
              <div className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-secondary/10 text-secondary mx-auto mb-6" role="img" aria-label="Alert icon">
                  <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Vulnerability Detection & Gas Optimization</h3>
                <p className="text-gray-600">
                  Identifies security issues, gas optimizations, and complex logic flaws.
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-secondary/10 text-secondary mx-auto mb-6" role="img" aria-label="Document icon">
                  <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Detailed PDF & Markdown Reports</h3>
                <p className="text-gray-600">
                  Professional reports in Markdown or PDF format, ready for sharing and analysis
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-secondary/10 text-secondary mx-auto mb-6" role="img" aria-label="Brain icon">
                  <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Multi-Agent AI Analysis</h3>
                <p className="text-gray-600">
                  Thousands of parallel LLM calls with different specialized models
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* CTA Section */}
        <CTASection 
          title="Ready to Secure Your Smart Contract Project?"
          description="Get started with a free AI security audit and see the results for yourself"
        />
      </div>
    </Layout>
  );
} 
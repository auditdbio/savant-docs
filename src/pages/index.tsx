import React, { type ReactElement } from "react";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import Head from "@docusaurus/Head";
import PerformanceGraph from "@site/static/img/performance_graph.svg";
import TweetCarousel from "../components/TweetCarousel";
import useGlobalData from "@docusaurus/useGlobalData";
import clsx from "clsx";
import AnalysisDemo from "../components/AnalysisDemo/AnalysisDemo";
import HeroCTAButtons from "../components/HeroCTAButtons";
import CTASection from "../components/CTASection";

interface GlobalData {
  "docusaurus-plugin-tweets"?: {
    default: {
      tweetIds: string[];
    };
  };
}

export default function Home(): ReactElement {
  const { siteConfig } = useDocusaurusContext();
  const globalData = useGlobalData() as GlobalData;
  console.log("Global data in Home:", globalData);

  const tweetIds =
    globalData["docusaurus-plugin-tweets"]?.default?.tweetIds || [];
  console.log("Tweet IDs in Home:", tweetIds);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Savant Chat",
    description:
      "AI-powered smart contract security analysis and vulnerability detection",
    url: "https://savant.chat",
  };

  return (
    <Layout
      title="AI Smart Contract Security Audit Platform"
      description="Comprehensive analysis, real-time monitoring, and automated vulnerability detection for your blockchain projects"
    >
      <Head>
        {/* JSON-LD for search engines */}
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Head>

      <div>
        {/* Hero Section */}
        <div className="text-white bg-secondary">
          <div className="flex flex-col lg:flex-row justify-between items-center mx-auto max-w-[1920px] min-h-[494px] py-0 space-y-12 lg:space-y-0">
            <div className="flex flex-col lg:w-1/2 text-center lg:text-left space-y-8 py-20 lg:py-0 px-6 lg:px-8 xl:px-12">
              <h1 className="text-4xl md:text-5xl lg:text-4xl xl:text-5xl text-center font-bold leading-tight">
                <span className="text-white/90">Smart Contract Security</span>
                <br />
                <span className="text-white">Powered by Advanced AI</span>
              </h1>
              <p className="text-xl md:text-2xl lg:text-xl xl:text-2xl text-white/80 text-center max-w-3xl mx-auto lg:mx-0 leading-relaxed self-center">
                Automated vulnerability scanning, real-time monitoring, and AI-powered
                security analysis for your Solidity smart contracts
              </p>
              <div className="pb-6">
                <HeroCTAButtons />
              </div>
            </div>
            <div className="lg:w-1/2 w-full h-[465px] lg:h-[494px] flex justify-center lg:justify-end bg-white">
              <div className="w-full">
                <AnalysisDemo />
              </div>
            </div>
          </div>
        </div>

        {/* What is Savant Chat Section */}
        <section className="bg-gray-50 py-20">
          <div className="max-w-7xl mx-auto px-0 md:px-4 lg:px-8">
            <div className="text-center mb-16 px-4 md:px-0">
              <h2 className="text-4xl font-bold text-gray-900">
                What is Savant Chat?
              </h2>
              <p className="mt-4 text-xl text-secondary font-semibold">
                Next-Gen Audit Collaboration Tool
              </p>
            </div>

            <div className="max-w-4xl mx-auto px-0 md:px-4">
              <div className="relative">
                {/* Decorative Elements - hidden on mobile */}
                <div className="hidden md:block absolute -top-4 -left-4 w-24 h-24 bg-primary/5 rounded-full"></div>
                <div className="hidden md:block absolute -bottom-4 -right-4 w-32 h-32 bg-secondary/5 rounded-full"></div>

                {/* Main Content */}
                <div className="relative bg-gradient-to-br from-white to-gray-50 p-4 md:p-12 rounded-none md:rounded-2xl shadow-lg border-0 md:border border-gray-100">
                  <div className="space-y-8">
                    {/* Description */}
                    <div className="text-center px-2 md:px-0">
                      <p className="text-lg text-gray-700 leading-relaxed max-w-4xl mx-auto">
                        Savant.chat provides more than a simple code scan. It's a sophisticated multi-agent AI system that performs a deep security audit, coordinating thousands of parallel LLM calls across specialized models to detect a wide range of vulnerability classes.
                      </p>
                    </div>

                    {/* Video Player */}
                    <div className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] md:w-full md:left-auto md:right-auto md:ml-0 md:mr-0 md:relative">
                      <div className="relative rounded-none md:rounded-lg overflow-hidden shadow-lg bg-black">
                        <video 
                          controls 
                          className="w-full h-auto"
                          poster="/img/video-poster.jpg"
                        >
                          <source src="/video/SavantChatCICD.mp4" type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* For Teams Section */}
        <section className="bg-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900">
                Built for Your Team
              </h2>
              <p className="mt-4 text-xl text-secondary font-semibold">
                Tailored Solutions for Every Role
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {/* For Developers */}
              <a 
                href="/use-cases#developers" 
                className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-all hover:border-primary/30 border-2 border-gray-100 hover:scale-105 cursor-pointer group"
              >
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                    <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/>
                    </svg>
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 group-hover:text-primary transition-colors">
                    For Developers
                  </h4>
                </div>
              </a>

              {/* For Audit Companies */}
              <a 
                href="/use-cases#audit-companies" 
                className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-all hover:border-primary/30 border-2 border-gray-100 hover:scale-105 cursor-pointer group"
              >
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                    <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                    </svg>
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 group-hover:text-primary transition-colors">
                    For Audit Companies
                  </h4>
                </div>
              </a>

              {/* For Investors */}
              <a 
                href="/use-cases#investors" 
                className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-all hover:border-primary/30 border-2 border-gray-100 hover:scale-105 cursor-pointer group"
              >
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                    <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>
                    </svg>
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 group-hover:text-primary transition-colors">
                    For Investors
                  </h4>
                </div>
              </a>

              {/* For Enterprise */}
              <a 
                href="/use-cases#enterprise" 
                className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-all hover:border-primary/30 border-2 border-gray-100 hover:scale-105 cursor-pointer group"
              >
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                    <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
                    </svg>
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 group-hover:text-primary transition-colors">
                    For Enterprise
                  </h4>
                </div>
              </a>
            </div>
          </div>
        </section>

        {/* Why Choose Savant Chat Section */}
        <section className="bg-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900">
                Why Choose Savant Chat?
              </h2>
              <p className="text-xl text-secondary mt-4 font-semibold">
                Next-Level Security for Web3 Innovators
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex flex-col items-center text-center">
                  <div className="flex-shrink-0 mb-4">
                    <div className="flex items-center justify-center h-16 w-16 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 text-white">
                      <svg
                        className="h-8 w-8"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                        />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      CI/CD Guardrail
                    </h3>
                    <p className="text-gray-600">
                      Seamless integration for continuous smart contract security monitoring in your CI/CD pipeline
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex flex-col items-center text-center">
                  <div className="flex-shrink-0 mb-4">
                    <div className="flex items-center justify-center h-16 w-16 rounded-full bg-gradient-to-br from-red-500 to-red-600 text-white">
                      <svg
                        className="h-8 w-8"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                        />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      Catch Bugs Early
                    </h3>
                    <p className="text-gray-600">
                      Identify vulnerabilities before deployment when they're easier and cheaper to fix
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex flex-col items-center text-center">
                  <div className="flex-shrink-0 mb-4">
                    <div className="flex items-center justify-center h-16 w-16 rounded-full bg-gradient-to-br from-green-500 to-green-600 text-white">
                      <svg
                        className="h-8 w-8"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13 10V3L4 14h7v7l9-11h-7z"
                        />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      Accelerate Manual Audits
                    </h3>
                    <p className="text-gray-600">
                      Free up your team to focus on complex logic by automating routine vulnerability checks
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex flex-col items-center text-center">
                  <div className="flex-shrink-0 mb-4">
                    <div className="flex items-center justify-center h-16 w-16 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 text-white">
                      <svg
                        className="h-8 w-8"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                        />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      Secure Data Handling
                    </h3>
                    <p className="text-gray-600">
                      Enterprise-grade privacy with data transformation and trusted AI providers
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Performance Metrics Section */}
        <section className="bg-gray-50 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900">
                Industry-Leading Performance
              </h2>
              <p className="text-xl text-secondary mt-4 font-semibold">
                Proven Excellence in Smart Contract Security
              </p>
            </div>

            <div className="grid md:grid-cols-1 gap-12 items-center max-w-5xl mx-auto">
              <div className="relative">
                <div className="rounded-lg shadow-lg bg-white p-4">
                  <PerformanceGraph />
                </div>
                <div className="text-center mt-4">
                  <a
                    href="https://ctfbench.com"
                    className="text-primary hover:text-primary/80 underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View on CTFBench
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tweet Carousel */}
        <TweetCarousel tweetIds={tweetIds} />

        {/* CTA Section */}
        <CTASection />
      </div>
    </Layout>
  );
}

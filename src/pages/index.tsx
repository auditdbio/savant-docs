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
      title="AI Smart Contract Auditor Agent"
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
            <div className="flex flex-col lg:w-1/2 text-center lg:text-left space-y-8 py-20 lg:py-0 px-0 lg:px-8 xl:px-12">
              <h1 className="text-4xl md:text-5xl lg:text-4xl xl:text-5xl text-center font-bold leading-tight">
                <span className="text-white/90">Smart Contract Security</span>
                <br />
                <span className="text-white">Powered by Advanced AI</span>
              </h1>
              <p className="text-xl md:text-2xl lg:text-xl xl:text-2xl text-white/80 text-center max-w-3xl mx-auto lg:mx-0 leading-relaxed self-center">
                Comprehensive analysis, real-time monitoring, and automated
                vulnerability detection for your blockchain projects
              </p>
              <div className="flex justify-center space-x-4 px-4">
                <a
                  href="/dashboard/login"
                  className="inline-flex items-center bg-white text-secondary px-4 xs:px-8 py-3 rounded-lg font-semibold text-md xs:text-lg hover:bg-gray-100 transition-colors shadow-lg"
                >
                  Get Started
                </a>
                <Link
                  href="/pricing"
                  className="inline-flex items-center bg-secondary text-white border-2 border-white px-4 xs:px-8 py-3 rounded-lg font-semibold text-md xs:text-lg hover:bg-secondary-hover transition-colors shadow-lg"
                >
                  View Pricing
                </Link>
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
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900">
                What is Savant Chat?
              </h2>
              <p className="mt-4 text-xl text-secondary font-semibold">
                Next-Gen Audit Collaboration Tool
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="relative">
                {/* Decorative Elements */}
                <div className="absolute -top-4 -left-4 w-24 h-24 bg-primary/5 rounded-full"></div>
                <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-secondary/5 rounded-full"></div>

                {/* Main Content */}
                <div className="relative bg-gradient-to-br from-white to-gray-50 p-12 rounded-2xl shadow-lg border border-gray-100">
                  <div className="grid md:grid-cols-2 gap-8">
                    {/* Left Column */}
                    <div className="space-y-6">
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0">
                          <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-primary/10 text-primary">
                            <svg
                              className="h-6 w-6"
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
                        <h3 className="text-xl font-semibold text-gray-900">
                          Smart & Efficient
                        </h3>
                      </div>
                      <p className="text-gray-700 leading-relaxed">
                        Savant Chat is a next-gen audit collaboration tool
                        designed for blockchain auditors, developers, and
                        security teams. Whether you're auditing smart contracts
                        or securing your decentralized product, we streamline
                        the process—fast, transparent, and efficient.
                      </p>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-6">
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0">
                          <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-secondary/10 text-secondary">
                            <svg
                              className="h-6 w-6"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                              />
                            </svg>
                          </div>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900">
                          AI-Powered Security
                        </h3>
                      </div>
                      <p className="text-gray-700 leading-relaxed">
                        Our advanced AI agent understands both code patterns and
                        business logic, identifying vulnerabilities traditional
                        tools miss. Tested on hundreds of audited contracts and
                        real-world exploits.
                      </p>
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

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* For Auditors */}
              <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow border-2 border-gray-100 hover:border-primary/20">
                <div className="flex items-center mb-6">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white">
                      <svg
                        className="h-6 w-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                        />
                      </svg>
                    </div>
                  </div>
                  <h4 className="text-xl font-semibold text-gray-900 ml-4">
                    For Auditors
                  </h4>
                </div>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <svg
                      className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-gray-700">
                      Automate security checks & streamline reports
                    </span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-gray-700">
                      Collaborate with teams in real-time
                    </span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-gray-700">
                      On-chain audit tracking & verifiable reports
                    </span>
                  </li>
                </ul>
              </div>

              {/* For Builders */}
              <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow border-2 border-gray-100 hover:border-primary/20">
                <div className="flex items-center mb-6">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white">
                      <svg
                        className="h-6 w-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                        />
                      </svg>
                    </div>
                  </div>
                  <h4 className="text-xl font-semibold text-gray-900 ml-4">
                    For Builders
                  </h4>
                </div>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <svg
                      className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-gray-700">
                      Ensure security before launch
                    </span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-gray-700">
                      Fix vulnerabilities faster
                    </span>
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-gray-700">
                      Catch the bugs in the earlier stage of development
                    </span>
                  </li>
                </ul>
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

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex items-start space-x-4 flex-row md:flex-col lg:flex-row items-start md:items-center lg:items-start">
                  <div className="flex-shrink-0 mb-3">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-secondary text-white">
                      <svg
                        className="h-6 w-6"
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
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Faster & More Accurate Audits
                    </h3>
                    <p className="text-gray-600">
                      Leverage AI & automation for rapid security checks.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex items-start space-x-4 flex-row md:flex-col lg:flex-row items-start md:items-center lg:items-start">
                  <div className="flex-shrink-0 mb-3">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-secondary text-white">
                      <svg
                        className="h-6 w-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                        />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Full Transparency
                    </h3>
                    <p className="text-gray-600">
                      Track and verify audits on-chain, ensuring trust.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex items-start space-x-4 flex-row md:flex-col lg:flex-row items-start md:items-center lg:items-start">
                  <div className="flex-shrink-0 mb-3">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-secondary text-white">
                      <svg
                        className="h-6 w-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                        />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Designed for Web3 Teams
                    </h3>
                    <p className="text-gray-600">
                      From startups to enterprises, we fit into your workflow.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}

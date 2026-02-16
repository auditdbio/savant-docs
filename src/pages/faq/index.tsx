import React, { type ReactElement, useState } from "react";
import Layout from "@theme/Layout";
import Head from "@docusaurus/Head";
import CTASection from "../../components/CTASection";
import { DISCORD_URL } from "../../config/constants";
import clsx from "clsx";

interface FAQItem {
  question: string;
  answer: string | React.ReactNode;
}

interface FAQCategory {
  id: string;
  name: string;
  icon: string;
  faqs: FAQItem[];
}

const faqCategories: FAQCategory[] = [
  {
    id: "getting-started",
    name: "Getting Started",
    icon: "📋",
    faqs: [
      {
        question: "What exactly is Savant Chat?",
        answer:
          "Savant Chat is an AI-powered co-pilot for smart-contract security. It reviews smart contract code in real time, flags exploits before they hit mainnet, and stores audit proofs on-chain. Using a sophisticated multi-agent AI system, Savant Chat analyzes code across 200+ vulnerability classes—the most comprehensive coverage in the industry.",
      },
      {
        question: "How do I get started?",
        answer:
          '1) Sign up at savant.chat and receive $75 in free credits (no credit card required), 2) Upload your smart contract code as .zip, .sol files, or connect your GitHub repository, 3) Select the audit scope and click "Audit", 4) Receive a detailed security report with actionable recommendations in minutes.',
      },
      {
        question: "Is there a free tier?",
        answer:
          "Yes. Every new account gets $75 USD in free credits, enough to audit a medium-sized smart contract from start to finish. No credit card required.",
      },
      {
        question: "How does it work?",
        answer:
          "Upload your project, select the audit scope, and let our AI vulnerability scanner go to work. Our multi-agent system deploys thousands of specialized AI agents in parallel, each focusing on specific vulnerability classes. In minutes, you'll receive a detailed security report across 200+ vulnerability classes.",
      },
    ],
  },
  {
    id: "pricing",
    name: "Pricing & Plans",
    icon: "💰",
    faqs: [
      {
        question: "How much does Savant Chat cost?",
        answer:
          "Average human audit costs around $20 per line of code. Savant Chat pricing varies from $0.07 to $0.5 per line of code. New users get $75 in free credits.",
      },
      {
        question: "How does it compare to manual audit costs?",
        answer:
          "Manual audits: $20K-$100K+, take 2-4 weeks. Savant Chat: ~80% less cost, results in minutes. Best practice: use both together.",
      },
      {
        question: "Do you accept crypto payments?",
        answer:
          "Yes! We accept stablecoins (USDC) and traditional payment methods.",
      },
      {
        question: "Do you offer enterprise pricing?",
        answer:
          "Yes. Custom enterprise plans with volume pricing, dedicated support, priority processing, custom integrations, and SLA guarantees. Contact us for details.",
      },
    ],
  },
  {
    id: "technical",
    name: "Technical & Integration",
    icon: "🔧",
    faqs: [
      {
        question: "What programming languages do you support?",
        answer:
          "Solidity (Ethereum, BSC, Polygon, all EVM chains), Vyper (DeFi protocols), and Rust (Solana, Near). Same 200+ vulnerability coverage across all languages.",
      },
      {
        question: "How can I integrate into my development workflow?",
        answer:
          "Add our GitHub Action or GitLab CI step into your pipeline. Savant Chat will scan each pull request diff and label issues by severity. Also available via API.",
      },
      {
        question: "Can I use it in CI/CD?",
        answer:
          "Yes. Seamless integration through GitHub Actions, GitLab CI, and API access. Every commit can be audited across 200+ vulnerability classes automatically.",
      },
      {
        question: "How long does an audit take?",
        answer:
          "It depends on the specific request and project scale — ranging from minutes to a couple of hours for larger projects.",
      },
    ],
  },
  {
    id: "comparisons",
    name: "Comparisons",
    icon: "⚖️",
    faqs: [
      {
        question: "How is Savant Chat different from general AI models?",
        answer:
          "General AI models lack specific smart contract security context. Savant Chat uses a specialized multi-agent architecture with thousands of AI agents trained specifically for vulnerability detection across 200+ security classes.",
      },
      {
        question: "What makes you different from free tools like Slither?",
        answer:
          "Free tools: 15-20 patterns, high false positives, pattern-matching only. Savant Chat: 200+ vulnerability classes, semantic understanding, low false positives. Use free tools for first pass, Savant Chat for comprehensive coverage.",
      },
      {
        question: "What is the 200+ vulnerability class coverage?",
        answer:
          "We analyze across 200+ distinct vulnerability classes—the most comprehensive in the industry. Includes common ones (reentrancy, overflow) plus 180+ additional classes like oracle manipulation, flash loans, MEV vulnerabilities, governance exploits, etc.",
      },
      {
        question: "How do you compare to manual audits?",
        answer:
          "Speed: Minutes vs 2-4 weeks. Cost: ~80% less. Best practice: use both. AI for exhaustive detection, humans for complex business logic.",
      },
      {
        question: "Can I rely on Savant Chat alone without human audit?",
        answer:
          'No. Think of it as a "first-pass reviewer." AI finds edge cases; humans understand context. Strongest security = AI + human together.',
      },
    ],
  },
  {
    id: "security",
    name: "Security & Privacy",
    icon: "🔒",
    faqs: [
      {
        question: "How secure is my data?",
        answer:
          "We transform and chunk your data before processing. We only work with AI providers that do NOT train on your data. All transmissions encrypted. Enterprise-grade security practices.",
      },
      {
        question: "Is my code stored or shared?",
        answer:
          "No. Your code is processed securely and not stored or shared. We work with trusted AI providers under strict agreements. After processing, your code is not retained.",
      },
      {
        question: "Can you audit private/proprietary code?",
        answer:
          "Yes. All code remains private and confidential. Enterprise plans available for additional security guarantees and custom SLAs.",
      },
    ],
  },
  {
    id: "accuracy",
    name: "Accuracy & Performance",
    icon: "📊",
    faqs: [
      {
        question: "How accurate is Savant Chat?",
        answer:
          "Proven detection rates on independent CTFBench benchmarks. Outperforms other AI auditors and traditional tools. 200+ vulnerability coverage (vs 15-20 for free tools). Significantly lower false positives.",
      },
      {
        question: "What's in the audit report?",
        answer:
          "Severity ratings, detailed explanations, affected code locations, recommended fixes, confidence scores, vulnerability class classification, attack scenarios, estimated impact.",
      },
    ],
  },
  {
    id: "support",
    name: "Support & Community",
    icon: "🤝",
    faqs: [
      {
        question: "Where can I get support?",
        answer: (
          <>
            Join our Discord:{" "}
            <a
              href={DISCORD_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-primary/80 underline"
            >
              discord.gg/pHfxVh9WSc
            </a>
            . Enterprise clients get dedicated support with SLA guarantees.
          </>
        ),
      },
      {
        question: "Do you have a community?",
        answer: (
          <>
            Yes! Join our{" "}
            <a
              href={DISCORD_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-primary/80 underline"
            >
              Discord
            </a>{" "}
            to connect with builders, share feedback, get help, and stay
            updated.
          </>
        ),
      },
      {
        question: "How can I invite friends?",
        answer:
          'Go to "Referrals" in settings and share your unique link. You\'ll both receive bonuses.',
      },
    ],
  },
];

export default function FAQ(): ReactElement {
  const [activeCategory, setActiveCategory] =
    useState<string>("getting-started");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleCategoryChange = (categoryId: string) => {
    setActiveCategory(categoryId);
    setOpenIndex(null);
  };

  const currentCategory =
    faqCategories.find((cat) => cat.id === activeCategory) || faqCategories[0];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqCategories.flatMap((category) =>
      category.faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text:
            typeof faq.answer === "string"
              ? faq.answer
              : faq.question.includes("support") ||
                  faq.question.includes("community")
                ? "Join our Discord community at discord.gg/pHfxVh9WSc for support and to connect with other builders."
                : String(faq.answer),
        },
      })),
    ),
  };

  return (
    <Layout
      title="Smart Contract Security FAQ & Help"
      description="Frequently asked questions about Savant Chat's AI-powered smart contract security analysis"
    >
      <Head>
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Head>

      <div className="bg-white">
        {/* Hero Section */}
        <section className="bg-secondary text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Frequently Asked Questions
            </h1>
            <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto">
              Everything you need to know about Savant Chat's AI-powered smart
              contract security
            </p>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Category Tabs */}
            <div className="mb-10">
              <div className="flex flex-wrap justify-center gap-2 md:gap-3">
                {faqCategories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => handleCategoryChange(category.id)}
                    className={clsx(
                      "px-4 py-2 md:px-5 md:py-3 rounded-full text-sm md:text-base font-medium transition-all duration-200",
                      {
                        "bg-primary text-white shadow-lg":
                          activeCategory === category.id,
                        "bg-gray-100 text-gray-700 hover:bg-gray-200":
                          activeCategory !== category.id,
                      },
                    )}
                  >
                    <span className="mr-2">{category.icon}</span>
                    {category.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Category Title */}
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                {currentCategory.icon} {currentCategory.name}
              </h2>
            </div>

            {/* FAQ Items */}
            <div className="space-y-4">
              {currentCategory.faqs.map((faq, index) => (
                <div key={index} className="border border-gray-200 rounded-lg">
                  <button
                    className="w-full px-6 py-4 text-left focus:outline-none focus:bg-gray-50 hover:bg-gray-50 transition-colors"
                    onClick={() => toggleFAQ(index)}
                    aria-expanded={openIndex === index}
                    aria-controls={`faq-answer-${index}`}
                  >
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-semibold text-gray-900 pr-4">
                        {faq.question}
                      </h3>
                      <div className="flex-shrink-0">
                        <svg
                          className={`h-5 w-5 text-gray-500 transition-transform ${
                            openIndex === index ? "transform rotate-180" : ""
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </div>
                    </div>
                  </button>
                  <div
                    id={`faq-answer-${index}`}
                    className={clsx(
                      "overflow-hidden transition-all duration-500 ease-in-out",
                      {
                        "max-h-screen opacity-100": openIndex === index,
                        "max-h-0 opacity-0": openIndex !== index,
                      },
                    )}
                    aria-hidden={openIndex !== index}
                  >
                    <div className="px-6 pb-4 pt-2">
                      <div className="text-gray-600 leading-relaxed">
                        {faq.answer}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Have More Questions */}
            <div className="mt-12 text-center p-8 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-xl border border-primary/10">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Have more questions?
              </h3>
              <p className="text-gray-600 mb-4">
                Reach out to our support team anytime!
              </p>
              <a
                href={DISCORD_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition-colors"
              >
                Join our Discord
              </a>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <CTASection className="bg-white" />
      </div>
    </Layout>
  );
}

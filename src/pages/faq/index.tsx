import React, { type ReactElement, useState } from "react";
import Layout from "@theme/Layout";
import Head from "@docusaurus/Head";
import CTASection from "../../components/CTASection";
import { DISCORD_URL, DISCORD_COMMUNITY_NAME } from "../../config/constants";

interface FAQItem {
  question: string;
  answer: string | React.ReactNode;
}

const faqs: FAQItem[] = [
  {
    question: "What exactly is Savant Chat?",
    answer: "Savant Chat is an AI‑powered co‑pilot for smart‑contract security. It reviews Solidity code in real time, flags exploits before they hit mainnet, and stores audit proofs on‑chain so anyone can verify the work later."
  },
  {
    question: "Can I rely on Savant Chat alone instead of a human audit?",
    answer: "No. Think of it as a \"first‑pass reviewer.\" It automates the repetitive scanning and frees human auditors to focus on edge‑case logic, economic modeling, and spec alignment."
  },
  {
    question: "How can I integrate Savant Chat into my development workflow?",
    answer: "The easiest way to keep this safety net always on is to drop our GitHub Action (or GitLab CI step) into your pipeline. Savant Chat will scan each pull request diff, label issues by severity."
  },
  {
    question: "Is there a free tier?",
    answer: "Absolutely. Every new account is credited with a welcome balance of 75 USD, enough to audit a medium‑sized smart contract from start to finish. You can spend this credit on any feature in any plan."
  },
  {
    question: "How is this different from using a generic LLM like ChatGPT?",
    answer: "We use different LLMs and combine their strengths. Powerful, generic models lack the specific context of your project and often provide outdated or generalized information. A Savant assistant is trained exclusively on your private, up-to-date knowledge base. This ensures every answer is accurate, context-aware, and aligned with your project's single source of truth."
  },
  {
    question: "How does it work?",
    answer: "It's simple. Upload your project (as a .zip, .sol files, or from a GitHub repository), select the audit scope, and let our AI vulnerability scanner go to work. In minutes, you'll receive a detailed security report with actionable recommendations."
  },
  {
    question: "How secure is my data?",
    answer: "Security is our top priority. Your code is processed through multiple privacy-preserving layers: we transform and chunk your data, often rephrase it, and embed it into specialized prompts before sending to our AI providers. Crucially, we only work with inference providers that explicitly do NOT train their models on your data. All transmissions are encrypted, and we follow enterprise-grade security practices throughout the entire pipeline."
  },
  {
    question: "Where can I get support if I run into an issue?",
    answer: <>The best place to get help is by joining our official <a href={DISCORD_URL} target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary/80 underline">Discord server</a>. We have dedicated support channels where our team and the community can answer your questions. For enterprise clients, we offer dedicated support plans.</>
  },
  {
    question: "Do you have a community I can join?",
    answer: <>Absolutely. Community is at the heart of Web3, and it's at the heart of Savant.chat. We encourage you to join our <a href={DISCORD_URL} target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary/80 underline">Discord</a> to connect with other builders, share feedback, and help shape the future of the platform.</>
  },
  {
    question: "Do you accept payments in crypto?",
    answer: "Yes! We are a Web3-native company and proudly accept payments in stablecoins (like USDC) and traditional payment methods (card payment)."
  },
  {
    question: "How can I invite friends to join Savant Chat?",
    answer: "Go to \"Referrals\" in settings and share your unique referral link to grow your network on Savant Chat and get bonuses."
  }
];

export default function FAQ(): ReactElement {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    name: "FAQ - Savant Chat",
    description: "Frequently asked questions about Savant Chat's AI-powered smart contract security analysis",
    url: "https://savant.chat/faq",
    mainEntity: faqs.map(faq => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: typeof faq.answer === 'string' 
          ? faq.answer 
          : faq.question.includes("support") 
            ? "The best place to get help is by joining our official Discord server. We have dedicated support channels where our team and the community can answer your questions. For enterprise clients, we offer dedicated support plans."
            : "Absolutely. Community is at the heart of Web3, and it's at the heart of Savant.chat. We encourage you to join our Discord to connect with other builders, share feedback, and help shape the future of the platform."
      }
    }))
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
              Everything you need to know about Savant Chat's AI-powered smart contract security
            </p>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="border border-gray-200 rounded-lg">
                  <button
                    className="w-full px-6 py-4 text-left focus:outline-none focus:bg-gray-50 hover:bg-gray-50 transition-colors"
                    onClick={() => toggleFAQ(index)}
                  >
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-semibold text-gray-900 pr-4">
                        {faq.question}
                      </h3>
                      <div className="flex-shrink-0">
                        <svg
                          className={`h-5 w-5 text-gray-500 transition-transform ${
                            openIndex === index ? 'transform rotate-180' : ''
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
                  {openIndex === index && (
                    <div className="px-6 pb-4">
                      <div className="text-gray-600 leading-relaxed">
                        {faq.answer}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            {/* Have More Questions */}
            <div className="mt-12 text-center p-8 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-xl border border-primary/10">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Have more questions?
              </h3>
              <p className="text-gray-600">
                Reach out to our support team anytime!
              </p>
            </div>
          </div>
        </section>



        {/* CTA Section */}
        <CTASection className="bg-white" />
      </div>
    </Layout>
  );
} 
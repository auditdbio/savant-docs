import type { IconName } from "@site/src/components/ui/Icon";

export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQCategory {
  id: string;
  name: string;
  icon: IconName;
  faqs: FAQItem[];
}

export const faqCategories: FAQCategory[] = [
  {
    id: "getting-started",
    name: "Getting Started",
    icon: "ClipboardList",
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
    icon: "Wallet",
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
        answer: "Yes! We accept stablecoins (USDC) and traditional payment methods.",
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
    icon: "Wrench",
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
    icon: "Scale",
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
    icon: "Lock",
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
    icon: "ChartColumn",
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
    icon: "Handshake",
    faqs: [
      {
        question: "Where can I get support?",
        answer:
          "Join our Discord: discord.gg/pHfxVh9WSc. Enterprise clients get dedicated support with SLA guarantees.",
      },
      {
        question: "Do you have a community?",
        answer:
          "Yes! Join our Discord at discord.gg/pHfxVh9WSc to connect with builders, share feedback, get help, and stay updated.",
      },
      {
        question: "How can I invite friends?",
        answer:
          'Go to "Referrals" in settings and share your unique link. You\'ll both receive bonuses.',
      },
    ],
  },
];

import type { Metadata } from "next";
import { Card } from "@/components/ui/Card";
import { Icon, type IconName } from "@/components/ui/Icon";
import { CTASection } from "@/components/marketing/CTASection";

export const metadata: Metadata = {
  title: "How AI Smart Contract Security Audits Work",
  description:
    "Learn how Savant Chat's AI-powered security audit works: upload your smart contract code, let our AI analyze it, and get a comprehensive vulnerability report in minutes.",
  alternates: { canonical: "/how-it-works/" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Audit Your Smart Contract with Savant Chat",
  description:
    "Step-by-step guide to running an AI-powered security audit on your smart contract using Savant Chat. Supports Solidity, Vyper, and Rust.",
  step: [
    {
      "@type": "HowToStep",
      name: "Sign up for free",
      text: "Create a free account at savant.chat. New accounts receive $75 in free credits to start auditing immediately.",
      url: "https://savant.chat/dashboard/login",
    },
    {
      "@type": "HowToStep",
      name: "Submit your smart contract",
      text: "Upload or paste your smart contract code. Savant Chat supports Solidity, Vyper, and Rust (for Solana and NEAR networks).",
    },
    {
      "@type": "HowToStep",
      name: "AI multi-agent analysis runs",
      text: "Savant Chat's multi-agent AI system coordinates thousands of parallel LLM calls across specialized models to scan for vulnerabilities, gas optimization issues, and security best practices.",
    },
    {
      "@type": "HowToStep",
      name: "Review your audit report",
      text: "Receive a detailed security report with vulnerability findings, severity ratings, and remediation recommendations. Each finding includes an explanation and suggested fix.",
    },
    {
      "@type": "HowToStep",
      name: "Integrate into CI/CD (optional)",
      text: "Set up GitHub Actions integration to automatically run security scans on every pull request, catching vulnerabilities before they reach production.",
    },
  ],
  tool: { "@type": "SoftwareApplication", name: "Savant Chat", url: "https://savant.chat" },
  totalTime: "PT30M",
  estimatedCost: { "@type": "MonetaryAmount", currency: "USD", value: "0" },
};

const steps: { n: number; title: string; icon: IconName; body: string }[] = [
  {
    n: 1,
    title: "Upload your smart contract project",
    icon: "CloudUpload",
    body: "Drag and drop your smart contract files (Solidity, Vyper, or Rust) or connect a GitHub repository.",
  },
  {
    n: 2,
    title: "AI vulnerability analysis",
    icon: "BrainCircuit",
    body: "Our multi-agent system deploys thousands of parallel LLM calls with different models to analyze your code from every angle.",
  },
  {
    n: 3,
    title: "Receive your security report",
    icon: "FileText",
    body: "Receive a detailed report identifying security vulnerabilities, from common exploits to complex logic flaws and architectural weaknesses.",
  },
];

const includes: { icon: IconName; title: string; body: string }[] = [
  {
    icon: "TriangleAlert",
    title: "Vulnerability detection & gas optimization",
    body: "Identifies security issues, gas optimizations, and complex logic flaws.",
  },
  {
    icon: "FileText",
    title: "Detailed PDF & Markdown reports",
    body: "Professional reports in Markdown or PDF format, ready for sharing and analysis.",
  },
  {
    icon: "Zap",
    title: "Multi-agent AI analysis",
    body: "Thousands of parallel LLM calls with different specialized models.",
  },
];

export default function HowItWorks() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero */}
      <section className="container-max py-13 text-center">
        <p className="eyebrow mb-3">How it works</p>
        <h1 className="text-balance text-4xl font-extrabold tracking-tight text-text-strong md:text-5xl">
          How Savant.chat&apos;s AI audit works
        </h1>
        <p className="mx-auto mt-4 max-w-3xl text-xl text-text-muted">
          Get an AI-powered smart contract security audit in 3 simple steps
        </p>
        <p className="mx-auto mt-3 text-text-subtle">Supporting Solidity, Vyper, and Rust (Near &amp; Solana)</p>
      </section>

      {/* Steps */}
      <section className="border-t border-[var(--border-subtle)] bg-surface-card">
        <div className="container-max py-12">
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-3">
            {steps.map((s) => (
              <Card key={s.n} hoverable id={`step${s.n}`}>
                <div className="mb-6 flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-flame-500 text-xl font-bold text-white">
                    {s.n}
                  </div>
                  <h3 className="text-md font-semibold text-text-strong">{s.title}</h3>
                </div>
                <div className="mb-4 flex justify-center text-flame-500">
                  <Icon name={s.icon} size={32} />
                </div>
                <p className="text-center leading-relaxed text-text-muted">{s.body}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* What you get */}
      <section className="container-max py-12">
        <div className="mb-9 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-text-strong">What your AI audit report includes</h2>
          <p className="mt-3 text-xl text-text-muted">A comprehensive overview of your smart contract&apos;s security posture</p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {includes.map((f) => (
            <Card key={f.title} hoverable className="text-center">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-plum-50 text-plum-600">
                <Icon name={f.icon} size={32} />
              </div>
              <h3 className="mb-4 text-md font-semibold text-text-strong">{f.title}</h3>
              <p className="text-text-muted">{f.body}</p>
            </Card>
          ))}
        </div>
      </section>

      <CTASection
        title="Ready to secure your smart contract project?"
        description="Get started with a free AI security audit and see the results for yourself."
      />
    </>
  );
}

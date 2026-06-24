import type { Metadata } from "next";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Icon, type IconName } from "@/components/ui/Icon";
import { PricingCalculator } from "@/components/PricingCalculator";
import { CTASection } from "@/components/marketing/CTASection";
import { PRICING_PLANS } from "@/config/pricing";

export const metadata: Metadata = {
  title: "Smart Contract Audit Pricing & Plans",
  description:
    "Transparent pricing for AI-powered smart contract security audits. Choose pay-as-you-go plans for smart contract code or flexible account tiers for your team.",
  alternates: { canonical: "/pricing/" },
  openGraph: {
    title: "Pricing - Savant Chat",
    description:
      "Transparent pricing for AI-powered smart contract security audits. Choose pay-as-you-go or account tiers for your team.",
    images: ["https://savant.chat/img/logo_short.svg"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Savant Chat AI Smart Contract Audit",
  description:
    "AI-powered security audits for smart contracts (Solidity, Vyper, Rust). Choose from flexible pay-as-you-go pricing or account tiers.",
  brand: { "@type": "Brand", name: "Savant Chat" },
  offers: {
    "@type": "AggregateOffer",
    priceCurrency: "USD",
    lowPrice: "0.07",
    highPrice: "2500.00",
    offers: [
      ...PRICING_PLANS.map((plan) => ({
        "@type": "Offer",
        name: `Pay-As-You-Go: ${plan.name}`,
        price: plan.price,
        priceCurrency: "USD",
        description: plan.description,
      })),
      {
        "@type": "Offer",
        name: "Basic Account Tier",
        price: "250",
        priceCurrency: "USD",
        description: "Monthly spending limit with standard features.",
      },
      {
        "@type": "Offer",
        name: "Pro Account Tier",
        price: "2500",
        priceCurrency: "USD",
        description: "Higher monthly limit with priority support and unlimited lines per request.",
      },
    ],
  },
};

const perLineFeatures: { icon: IconName; title: string; body: string }[] = [
  {
    icon: "ShieldCheck",
    title: "Accelerate your audit process",
    body: "AI-powered analysis helps both auditors and development teams spot vulnerabilities faster and streamline their workflow.",
  },
  {
    icon: "Zap",
    title: "Instant security results",
    body: "Get a comprehensive vulnerability report in minutes, not weeks, enabling rapid iteration and deployment.",
  },
  {
    icon: "Receipt",
    title: "Transparent per-token pricing",
    body: "See the exact price for your smart contract audit when you upload your files.",
  },
];

const tiers: { name: string; tone: "flame" | "plum" | "neutral"; limit: string; features: string[] }[] = [
  {
    name: "Basic",
    tone: "flame",
    limit: "$250",
    features: ["Standard audit queue", "No KYC required", "Includes $75 welcome bonus"],
  },
  {
    name: "Pro",
    tone: "plum",
    limit: "$2,500",
    features: ["Priority audit processing", "Unlimited lines per request", "Priority support", "KYC required"],
  },
  {
    name: "Enterprise",
    tone: "neutral",
    limit: "Custom",
    features: ["Expedited audit pipeline", "Custom volume discounts", "Dedicated support", "Custom integration options"],
  },
];

export default function Pricing() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="container-max py-13">
        <div className="mb-10 text-center">
          <p className="eyebrow mb-3">Pricing</p>
          <h1 className="text-balance text-4xl font-extrabold tracking-tight text-text-strong md:text-5xl">
            Simple, transparent pricing
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-xl text-text-muted">
            Pay only for what you use, with flexible options for every need.
          </p>
        </div>

        <PricingCalculator />

        {/* Per-line pricing */}
        <div className="mt-12">
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-bold text-text-strong">Pay-as-you-go AI audit pricing</h2>
            <p className="mx-auto mt-3 max-w-xl text-text-muted">
              Final pricing is based on the actual token count of your smart contract code after upload.
            </p>
            <p className="mx-auto mt-2 text-sm text-text-subtle">Supports Solidity, Vyper, and Rust (Near &amp; Solana)</p>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {PRICING_PLANS.map((plan) => (
              <div key={plan.id} className="text-center">
                <h3 className="text-5xl font-extrabold tracking-tight text-flame-500">${plan.price}</h3>
                <p className="mt-2 text-lg font-semibold text-text-strong">{plan.name}</p>
                <p className="mt-1 text-text-muted">{plan.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
            {perLineFeatures.map((f) => (
              <Card key={f.title} className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-flame-500 text-white">
                  <Icon name={f.icon} size={22} />
                </div>
                <div>
                  <h3 className="mb-1 text-md font-semibold text-text-strong">{f.title}</h3>
                  <p className="text-[14px] text-text-muted">{f.body}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Account tiers */}
        <div className="mt-12">
          <h2 className="mb-8 text-center text-2xl font-bold text-text-strong">Account tiers &amp; spending limits</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {tiers.map((t) => (
              <Card key={t.name} hoverable>
                <div className="text-center">
                  <Badge tone={t.tone}>{t.name}</Badge>
                  <p className="mt-4 text-text-muted">Monthly limit</p>
                  <p className="text-4xl font-bold text-text-strong">{t.limit}</p>
                </div>
                <ul className="mt-6 space-y-3">
                  {t.features.map((feat) => (
                    <li key={feat} className="flex items-center gap-2 text-text-body">
                      <Icon name="Check" size={18} className="shrink-0 text-flame-500" />
                      {feat}
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Ready to secure your smart contracts?"
        description="Get started with a free AI security audit and see the results for yourself."
      />
    </>
  );
}

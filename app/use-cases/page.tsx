import type { Metadata } from "next";
import { Card } from "@/components/ui/Card";
import { Icon, type IconName } from "@/components/ui/Icon";
import { CTASection } from "@/components/marketing/CTASection";
import { AnchorScroll } from "@/components/marketing/AnchorScroll";

export const metadata: Metadata = {
  title: "Smart Contract Security Use Cases & Solutions",
  description:
    "Discover how Savant Chat serves developers, audit companies, investors, and enterprises with AI-powered smart contract security",
  alternates: { canonical: "/use-cases/" },
};

type Tone = "flame" | "plum";
interface UseCaseItem {
  title: string;
  description: string;
  features: string[];
}
interface UseCaseSection {
  id: string;
  title: string;
  subtitle: string;
  icon: IconName;
  tone: Tone;
  items: UseCaseItem[];
}

const sections: UseCaseSection[] = [
  {
    id: "developers",
    title: "For Developers",
    subtitle: "Integrate security into your development workflow",
    icon: "Code",
    tone: "flame",
    items: [
      {
        title: "Pre-deployment security audit",
        description:
          "Run a comprehensive security audit before deploying your smart contracts to mainnet. Catch vulnerabilities early and save on gas costs from redeployments. Works with Solidity, Vyper, and Rust (Near & Solana).",
        features: ["Automated vulnerability scanning", "Gas optimization recommendations", "Best practices compliance", "Multi-language support"],
      },
      {
        title: "Continuous security in your CI/CD pipeline",
        description:
          "Integrate with your CI/CD pipeline to automatically scan every pull request and code change. Maintain security standards throughout your development lifecycle.",
        features: ["GitHub Actions integration", "Pull request security checks", "Team collaboration features"],
      },
      {
        title: "Security learning tool for Web3 developers",
        description:
          "Learn about smart contract security patterns and anti-patterns. Get detailed explanations of potential issues and how to fix them.",
        features: ["Educational security insights", "Code improvement suggestions", "Industry best practices"],
      },
    ],
  },
  {
    id: "audit-companies",
    title: "For Audit Companies",
    subtitle: "Enhance your audit workflow with AI assistance",
    icon: "ShieldCheck",
    tone: "plum",
    items: [
      { title: "Pre-audit screening", description: "Quickly assess project complexity and find low-hanging fruit before starting a manual review.", features: [] },
      { title: "AI-powered audit acceleration", description: "Let our AI audit tool handle routine checks while your experts focus on complex business logic.", features: [] },
      { title: "Quality assurance", description: "Use AI as a second opinion to ensure comprehensive coverage and reduce false negatives.", features: [] },
      { title: "Client value-add", description: "Offer clients additional AI-powered insights and faster turnaround times.", features: [] },
    ],
  },
  {
    id: "investors",
    title: "For Investors",
    subtitle: "Make informed investment decisions with AI security insights",
    icon: "TrendingUp",
    tone: "flame",
    items: [
      { title: "Due diligence security scan", description: "Quickly assess the security posture of potential Web3 investments before you commit.", features: [] },
      { title: "Portfolio monitoring", description: "Continuously monitor your portfolio companies' smart contract security health.", features: [] },
      { title: "Risk assessment", description: "Understand technical risks and potential security vulnerabilities in your investments.", features: [] },
      { title: "Competitive analysis", description: "Compare security standards across different projects and protocols in your sector.", features: [] },
    ],
  },
  {
    id: "enterprise",
    title: "For Enterprise",
    subtitle: "Scale security across your organization",
    icon: "Building2",
    tone: "plum",
    items: [
      {
        title: "Regular security reviews",
        description:
          "Implement regular security assessments across all your smart contract deployments. Maintain consistent security standards organization-wide.",
        features: ["Automated security reporting", "Compliance tracking", "Multi-project management"],
      },
      {
        title: "Custom security policies",
        description:
          "Define and enforce organization-specific security policies and standards. Get customized reports aligned with your governance requirements.",
        features: ["Custom rule configurations", "Enterprise-grade reporting", "Team collaboration tools"],
      },
    ],
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Smart Contract Security Use Cases & Solutions - Savant Chat",
  description:
    "Discover how Savant Chat serves developers, audit companies, investors, and enterprises with AI-powered smart contract security",
  url: "https://savant.chat/use-cases",
  mainEntity: {
    "@type": "ItemList",
    itemListElement: sections.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: s.title,
      description: s.subtitle,
    })),
  },
};

const toneTile: Record<Tone, string> = {
  flame: "bg-flame-500 text-white",
  plum: "bg-plum-600 text-white",
};

export default function UseCases() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <AnchorScroll />

      <section className="container-max py-13 text-center">
        <p className="eyebrow mb-3">Use cases</p>
        <h1 className="text-balance text-4xl font-extrabold tracking-tight text-text-strong md:text-5xl">
          Smart contract security use cases
        </h1>
        <p className="mx-auto mt-4 max-w-3xl text-xl text-text-muted">
          Tailored AI-powered smart contract security solutions for every role
        </p>
      </section>

      {sections.map((section, idx) => (
        <section
          key={section.id}
          id={section.id}
          className={`scroll-mt-20 border-t border-[var(--border-subtle)] ${idx % 2 === 0 ? "bg-surface-card" : "bg-surface-page"}`}
        >
          <div className="container-max py-12">
            <div className="mb-9 text-center">
              <div className={`mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full ${toneTile[section.tone]}`}>
                <Icon name={section.icon} size={32} />
              </div>
              <h2 className="text-3xl font-bold tracking-tight text-text-strong">{section.title}</h2>
              <p className="mt-3 text-xl text-text-muted">{section.subtitle}</p>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {section.items.map((item) => (
                <Card key={item.title} hoverable>
                  <h3 className="mb-3 text-md font-semibold text-text-strong">{item.title}</h3>
                  <p className="mb-4 text-[14px] text-text-muted">{item.description}</p>
                  {item.features.length > 0 && (
                    <ul className="space-y-2 text-[14px] text-text-muted">
                      {item.features.map((f) => (
                        <li key={f} className="flex items-start gap-2">
                          <Icon name="Check" size={16} className="mt-[2px] shrink-0 text-flame-500" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  )}
                </Card>
              ))}
            </div>
          </div>
        </section>
      ))}

      <CTASection
        title="Ready to get started?"
        description="Join thousands of users who trust Savant Chat for their smart contract security needs."
      />
    </>
  );
}

import type { Metadata } from "next";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Icon, type IconName } from "@/components/ui/Icon";
import { CTAButtons } from "@/components/marketing/CTAButtons";
import { CTASection } from "@/components/marketing/CTASection";
import { BlockscoutBanner } from "@/components/marketing/BlockscoutBanner";
import { Section } from "@/components/marketing/Section";
import { ReportPreview } from "@/components/marketing/ReportPreview";
import { StatBand } from "@/components/marketing/StatBand";
import { LogoStrip } from "@/components/marketing/LogoStrip";
import AnalysisDemo from "@/components/AnalysisDemo/AnalysisDemo";

export const metadata: Metadata = {
  title: "AI Smart Contract Auditing | Find Vulnerabilities Before Attackers Do",
  description:
    "Savant Chat provides AI-powered security audits for smart contracts (Solidity, Vyper, Rust). Find vulnerabilities, optimize gas, and integrate security into your CI/CD pipeline.",
  alternates: { canonical: "/" },
};

const homeJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Savant Chat",
  alternateName: "SavantChat AI Smart Contract Auditor",
  url: "https://savant.chat",
  applicationCategory: "DeveloperApplication",
  applicationSubCategory: "Smart Contract Security Audit Tool",
  operatingSystem: "Web-based (SaaS)",
  description:
    "AI-powered smart contract security platform that uses a multi-agent architecture to perform deep vulnerability scanning across 200+ vulnerability classes. Supports Solidity, Vyper, and Rust (Solana & NEAR). Placed 6th in a Sherlock DeFi audit contest against human auditors.",
  featureList: [
    "Multi-agent AI vulnerability scanning",
    "Solidity smart contract auditing",
    "Vyper smart contract auditing",
    "Rust smart contract auditing (Solana & NEAR)",
    "CI/CD pipeline integration via GitHub Actions",
    "Real-time security monitoring",
    "Gas optimization suggestions",
    "Automated proof-of-concept generation",
  ],
  screenshot: "https://savant.chat/img/video-poster.jpg",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
    description: "Free tier with $75 in credits. Paid plans available.",
    url: "https://savant.chat/pricing",
  },
  creator: { "@type": "Organization", name: "Novel Codes DMCC", url: "https://savant.chat" },
  review: [
    {
      "@type": "Review",
      author: { "@type": "Organization", name: "Pessimistic Security", url: "https://pessimistic.io" },
      reviewBody:
        "We recently tested savant.chat and were pleasantly surprised! It correctly identified several findings on our test contract and didn't produce a single clear false positive. This is the first genuinely useful security tool we've come across in quite a while.",
      datePublished: "2025-03-05",
    },
    {
      "@type": "Review",
      author: { "@type": "Organization", name: "OXORIO", url: "https://oxor.io" },
      reviewBody:
        "We recently tested @savantchat — an AI-powered auditing tool — on a real DeFi project (~3k SLOC), previously audited by multiple top firms. The question: can AI surface anything meaningful post-audit? Spoiler: it can. And it made us rethink how automation can augment human.",
      datePublished: "2025-04-14",
    },
    {
      "@type": "Review",
      author: { "@type": "Person", name: "Petr Korolev", url: "https://x.com/skywinder" },
      reviewBody:
        "I just put Savant.Chat to the test on a complex contract — and wow, what a game-changer! It uncovered a critical issue that many seasoned auditors overlooked, proving its ability to boost audit quality. This tool is set to redefine smart contract security!",
      datePublished: "2025-02-27",
    },
    {
      "@type": "Review",
      author: { "@type": "Organization", name: "1inch", url: "https://1inch.io" },
      reviewBody:
        "Our friends @savantchat built a multi-agent AI system to find vulnerabilities fast - with high reliability and much lower costs. This kind of new development is helping 1inch scale at speed.",
      datePublished: "2025-07-01",
    },
  ],
};

const stats = [
  { value: "87–95%", label: "CTFBench detection accuracy" },
  { value: "Top 6", label: "Sherlock DeFi audit contest vs. humans" },
  { value: "200+", label: "vulnerability classes covered" },
  { value: "3", label: "languages: Solidity, Vyper, Rust" },
];

const partners = [
  { src: "/img/1inch/1inch_horizontal.svg", alt: "1inch" },
  { src: "/img/lido/lido_horizontal.svg", alt: "Lido" },
  { src: "/img/pessimistic/pessimistic_horizontal.svg", alt: "Pessimistic" },
  { src: "/img/oxorio/oxorio_horizontal.svg", alt: "Oxorio" },
  { src: "/img/mixbytes/mixbytes_horizontal.svg", alt: "MixBytes" },
  { src: "/img/gearbox/gearbox_horizontal.svg", alt: "Gearbox" },
  { src: "/img/hexens/hexens_horizontal.svg", alt: "Hexens" },
  { src: "/img/bgd/bgd_black_logo.svg", alt: "BGD Labs" },
];

const features: { icon: IconName; title: string; body: string }[] = [
  { icon: "ScanSearch", title: "Deep multi-agent analysis", body: "Thousands of parallel LLM calls across specialized models detect re-entrancy, access control, oracle manipulation, unchecked math and 200+ vulnerability classes." },
  { icon: "Zap", title: "Minutes, not weeks", body: "Get a full security report in minutes so you can iterate and ship — not wait on a manual audit queue." },
  { icon: "GitBranch", title: "Repo & CI/CD native", body: "Connect GitHub, scope contracts file-by-file, and gate every pull request with an automated audit in your pipeline." },
  { icon: "FileCheck2", title: "Actionable reports", body: "Every finding ships with a severity, the offending lines, an attack scenario and a concrete recommendation." },
  { icon: "Lock", title: "Secure data handling", body: "Your code is transformed and chunked, processed by providers that never train on it, and never retained after the audit." },
  { icon: "Users", title: "Built for teams", body: "Organizations, shared balances, roles and a private AuditDB community on Discord." },
];

const teams: { href: string; label: string; icon: IconName }[] = [
  { href: "/use-cases#developers", label: "Developers", icon: "Code" },
  { href: "/use-cases#audit-companies", label: "Audit companies", icon: "ShieldCheck" },
  { href: "/use-cases#investors", label: "Investors", icon: "TrendingUp" },
  { href: "/use-cases#enterprise", label: "Enterprise", icon: "Building2" },
];

const reportPoints: { icon: IconName; title: string; body: string }[] = [
  { icon: "ShieldAlert", title: "Severity-first", body: "Findings are ranked critical → gas so you fix what matters most, first." },
  { icon: "Code", title: "The exact lines", body: "Each issue points to the file and lines, with the vulnerable code highlighted." },
  { icon: "Lightbulb", title: "A concrete fix", body: "Every finding ends with an actionable recommendation, never a dead end." },
];

const testimonials = [
  { logo: "/img/pessimistic/pessimistic_horizontal.svg", name: "Pessimistic Security", href: "https://x.com/pessimistic_io/status/1897264142308008089", quote: "We recently tested savant.chat and were pleasantly surprised! It correctly identified several findings on our test contract and didn't produce a single clear false positive. This is the first genuinely useful security tool we've come across in quite a while." },
  { logo: "/img/oxorio/oxorio_horizontal.svg", name: "OXORIO", href: "https://x.com/0xorio/status/1911822312124330132", quote: "We tested @savantchat on a real DeFi project (~3k SLOC), previously audited by multiple top firms. Can AI surface anything meaningful post-audit? Spoiler: it can. And it made us rethink how automation can augment human." },
  { logo: "/img/1inch/1inch_horizontal.svg", name: "1inch", href: "https://x.com/1inch/status/1940035965059309746", quote: "Our friends @savantchat built a multi-agent AI system to find vulnerabilities fast - with high reliability and much lower costs. This kind of new development is helping 1inch scale at speed." },
  { initials: "PK", name: "Petr Korolev", handle: "@skywinder", href: "https://x.com/skywinder/status/1895228438237061588", quote: "I just put Savant.Chat to the test on a complex contract — and wow, what a game-changer! It uncovered a critical issue that many seasoned auditors overlooked. This tool is set to redefine smart contract security!" },
  { logo: "/img/lido/lido_horizontal.svg", name: "Vasiliy Shapovalov, Lido", href: "https://x.com/_vshapovalov/status/1976320011850612884", quote: "@savantchat does a great job of filtering false positives while finding issues. As a faster, cheaper tool its place in the developer pipeline is closer to an internal review or a heavier linter run." },
];

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(homeJsonLd) }} />
      <BlockscoutBanner />

      {/* Hero */}
      <section className="relative overflow-hidden">
        {/* soft plum/flame ambient tints */}
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-32 left-1/2 h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-flame-50 blur-3xl" />
        </div>
        <div className="container-max pt-13 pb-10 text-center">
          <Badge tone="flame" dot className="mb-5">AI-powered security · live</Badge>
          <h1 className="mx-auto max-w-[16ch] text-balance text-[40px] font-extrabold leading-[1.04] tracking-tight text-text-strong md:text-7xl">
            Find smart contract vulnerabilities before attackers do
          </h1>
          <p className="mx-auto mt-6 max-w-[600px] text-lg text-text-muted md:text-xl">
            Deeper than a scanner. Faster than a manual audit. AI security for Solidity, Vyper, and
            Rust — surfacing re-entrancy, access-control and gas issues in minutes.
          </p>
          <div className="mt-8">
            <CTAButtons />
          </div>

          <div
            className="mx-auto mt-12 max-w-[1000px] overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-surface-card shadow-xl"
            role="img"
            aria-label="Savant Chat AI analyzing a smart contract for vulnerabilities"
          >
            <div className="flex items-center gap-2 border-b border-[var(--border-subtle)] bg-surface-sunken px-4 py-3">
              <span className="flex gap-[6px]">
                <span className="h-[11px] w-[11px] rounded-full bg-[#ff5f57]" />
                <span className="h-[11px] w-[11px] rounded-full bg-[#febc2e]" />
                <span className="h-[11px] w-[11px] rounded-full bg-[#28c840]" />
              </span>
              <span className="ml-2 font-mono text-[12px] text-text-muted">MinimalLending.sol — live AI analysis</span>
              <Badge tone="flame" dot size="sm" className="ml-auto">Scanning</Badge>
            </div>
            <div className="bg-white">
              <AnalysisDemo />
            </div>
          </div>
        </div>
      </section>

      <LogoStrip eyebrow="Trusted across DeFi teams" logos={partners} />

      {/* Proof numbers */}
      <Section
        eyebrow="Proven performance"
        title="Benchmarked against humans — and winning"
        description="Savant Chat v0.2 outperformed GPT o3-mini, Grok 3 and every other AI auditor on the public CTFBench leaderboard."
      >
        <StatBand stats={stats} />
        <div className="mt-12 grid items-center gap-8 lg:grid-cols-2">
          <Card variant="elevated" padding={16}>
            { }
            <img
              src="/img/performance_graph.svg"
              alt="Graph showing Savant Chat's performance compared to other tools on CTFBench"
              className="w-full"
            />
          </Card>
          <div className="lg:pl-4">
            <h3 className="text-2xl font-bold tracking-tight text-text-strong">
              87–95% accuracy on CTFBench
            </h3>
            <p className="mt-3 text-text-muted">
              An independent benchmark of smart-contract exploit detection. Savant Chat tops the
              leaderboard and was the first AI to place in the top 10 of a Sherlock DeFi audit
              contest — competing directly against human security auditors.
            </p>
            <a
              href="https://ctfbench.com"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-1 font-semibold text-text-link hover:underline"
            >
              View on CTFBench <Icon name="ArrowUpRight" size={16} />
            </a>
          </div>
        </div>
      </Section>

      {/* Features */}
      <Section
        surface
        eyebrow="Why Savant"
        title="Security that keeps pace with shipping"
        description="A sophisticated multi-agent system — not a pattern-matching scanner — that reads your code the way a senior auditor does."
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <Card key={f.title} hoverable>
              <div className="mb-[14px] flex h-11 w-11 items-center justify-center rounded-xl bg-flame-50 text-flame-600">
                <Icon name={f.icon} size={21} />
              </div>
              <h3 className="mb-[6px] text-md font-semibold text-text-strong">{f.title}</h3>
              <p className="text-[14px] leading-relaxed text-text-muted">{f.body}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* Report preview — asymmetric */}
      <Section>
        <div className="grid items-center gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="eyebrow mb-3">The deliverable</p>
            <h2 className="text-balance text-3xl font-bold tracking-tight text-text-strong md:text-4xl">
              A report you can act on, not a wall of warnings
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-text-muted">
              Every audit returns a severity-ranked report. Each finding names the contract and
              lines, explains the attack, and ends with a concrete fix.
            </p>
            <ul className="mt-6 space-y-4">
              {reportPoints.map((p) => (
                <li key={p.title} className="flex gap-3">
                  <span className="mt-[2px] flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-plum-50 text-plum-600">
                    <Icon name={p.icon} size={17} />
                  </span>
                  <span>
                    <span className="font-semibold text-text-strong">{p.title}.</span>{" "}
                    <span className="text-text-muted">{p.body}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <ReportPreview />
        </div>
      </Section>

      {/* Multi-agent + video */}
      <Section
        surface
        eyebrow="How it works"
        title="Deep audits, powered by multi-agent AI"
        description="Savant coordinates thousands of parallel LLM calls across specialized models to analyze your contracts semantically — across Solidity, Vyper and Rust (Near & Solana)."
      >
        <div className="mx-auto max-w-4xl overflow-hidden rounded-2xl bg-ink-900 shadow-lg">
          <video controls className="h-auto w-full" poster="/img/video-poster.jpg">
            <source src="/video/SavantChatCICD.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <div className="mt-8 text-center">
          <a href="/how-it-works" className="inline-flex items-center gap-1 font-semibold text-text-link hover:underline">
            See the full process <Icon name="ArrowRight" size={16} />
          </a>
        </div>
      </Section>

      {/* For teams */}
      <Section eyebrow="For your whole team" title="One platform, every role" description="From developers shipping features to funds running due diligence.">
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {teams.map((t) => (
            <a key={t.href} href={t.href} className="group">
              <Card hoverable className="flex h-full flex-col items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-flame-50 text-flame-600 transition-colors group-hover:bg-flame-500 group-hover:text-white">
                  <Icon name={t.icon} size={24} />
                </div>
                <h3 className="text-md font-semibold text-text-strong group-hover:text-flame-600">{t.label}</h3>
                <span className="mt-auto inline-flex items-center gap-1 text-sm font-medium text-text-muted group-hover:text-flame-600">
                  Explore <Icon name="ArrowRight" size={14} />
                </span>
              </Card>
            </a>
          ))}
        </div>
      </Section>

      {/* Testimonials */}
      <Section surface eyebrow="What industry leaders say" title="Trusted by top security firms and Web3 teams">
        <div className="mx-auto grid max-w-5xl gap-4 md:grid-cols-2">
          {testimonials.map((t) => (
            <Card key={t.name} className="relative flex flex-col">
              <a
                href={t.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${t.name} on X`}
                className="absolute right-5 top-5 text-text-subtle transition-colors hover:text-flame-600"
              >
                <Icon name="Twitter" size={18} />
              </a>
              <Icon name="Quote" size={22} className="mb-3 text-flame-300" />
              <p className="flex-1 text-[15px] leading-relaxed text-text-body">{t.quote}</p>
              <div className="mt-5 flex items-center gap-3 border-t border-[var(--border-subtle)] pt-4">
                {t.logo ? (
                   
                  <img src={t.logo} alt={t.name} className="h-7 w-auto object-contain" />
                ) : (
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-plum-600 text-sm font-bold text-white">
                    {t.initials}
                  </span>
                )}
                <span className="text-sm font-semibold text-text-strong">{t.handle ?? t.name}</span>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      {/* Pricing teaser */}
      <Section eyebrow="Pricing" title="Simple, transparent pricing" description="Pay only for what you use — final price is shown before you run.">
        <div className="mx-auto max-w-xl text-center">
          <div className="flex items-baseline justify-center gap-2">
            <span className="text-sm text-text-muted">from</span>
            <span className="font-mono text-7xl font-extrabold tracking-tight text-flame-500">$0.07</span>
            <span className="text-left text-md text-text-muted">per line<br />of code</span>
          </div>
          <div className="mt-7 flex flex-wrap justify-center gap-x-6 gap-y-3">
            {["No subscription", "No KYC on Basic", "$75 welcome bonus", "Exact price before you run"].map((t) => (
              <span key={t} className="inline-flex items-center gap-2 text-[15px] text-text-body">
                <Icon name="Check" size={16} className="text-success" /> {t}
              </span>
            ))}
          </div>
          <div className="mt-8">
            <CTAButtons primaryText="Start your first audit" secondaryText="See full pricing" showCredits={false} />
          </div>
        </div>
      </Section>

      <CTASection />
    </>
  );
}

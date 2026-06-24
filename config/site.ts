/** Central site configuration: URLs, navigation, footer, SEO. */

export const SITE_URL = "https://savant.chat";

/** Primary product entry points (served on the same domain in production). */
export const DASHBOARD_URL = "/dashboard";
export const SIGNUP_URL = "/dashboard/login";

export const SITE = {
  name: "Savant Chat",
  title: "Savant Chat - AI Smart Contract Security",
  tagline: "Smart Contract Security Powered by Advanced AI",
  description:
    "AI-powered smart contract security platform with multi-agent vulnerability detection across 200+ vulnerability classes. Supports Solidity, Vyper and Rust.",
  url: SITE_URL,
  ogImage: `${SITE_URL}/img/logo_short.png`,
  twitter: "https://x.com/savantchat",
  keywords:
    "smart contract, security, audit, blockchain, AI, ethereum, solidity, vyper, rust, near, solana, web3, defi",
};

/** Top navigation (mirrors the previous site). */
export const NAV_LINKS: { to: string; label: string }[] = [
  { to: "/use-cases", label: "Use Cases" },
  { to: "/how-it-works", label: "How It Works" },
  { to: "/pricing", label: "Pricing" },
  { to: "/ecosystem", label: "Ecosystem" },
  { to: "/faq", label: "FAQ" },
  { to: "/blog", label: "Blog" },
];

/** Footer columns (real links from the previous site). */
export const FOOTER_COLUMNS: { heading: string; links: { label: string; href: string; external?: boolean }[] }[] = [
  {
    heading: "Company",
    links: [
      { label: "Imprint", href: "/imprint" },
      { label: "Contact", href: "mailto:hello@savant.chat", external: true },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Terms of Service", href: "/terms-of-service" },
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Cookie Policy", href: "/cookie-policy" },
      { label: "Refund Policy", href: "/refund-policy" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { label: "Pricing", href: "/pricing" },
      { label: "How It Works", href: "/how-it-works" },
      { label: "Use Cases", href: "/use-cases" },
      { label: "Blog", href: "/blog" },
    ],
  },
];

/** JSON-LD structured data carried over verbatim from the previous site. */
export const SOFTWARE_APPLICATION_JSONLD = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Savant Chat",
  alternateName: ["SavantChat", "Savant.chat"],
  applicationCategory: "SecurityApplication",
  operatingSystem: "Web",
  url: "https://savant.chat",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
    description: "Free tier with $75 credits",
  },
  featureList: [
    "AI-powered smart contract security audits",
    "Multi-agent vulnerability detection with 87-95% CTFBench accuracy",
    "CI/CD pipeline integration via GitHub Actions",
    "Solidity, Vyper, and Rust (Near & Solana) support",
    "Real-time monitoring and gas optimization",
    "Low false-positive rate validated by Pessimistic and Oxorio",
  ],
  screenshot: "https://savant.chat/img/video-poster.jpg",
  softwareVersion: "0.2",
  creator: {
    "@type": "Organization",
    name: "Novel Codes DMCC",
    url: "https://savant.chat",
  },
};

export const ORGANIZATION_JSONLD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Savant Chat",
  url: "https://savant.chat",
  logo: "https://savant.chat/img/logo_short.svg",
  description:
    "AI-powered smart contract security platform with multi-agent vulnerability detection. First AI to achieve Top 6 in Sherlock DeFi Audit Contest, matching human expert auditors. Trusted by 1inch, Lido, and leading audit firms.",
  foundingDate: "2024",
  sameAs: [
    "https://twitter.com/savantchat",
    "https://www.linkedin.com/company/savantchat",
    "https://discord.gg/pHfxVh9WSc",
    "https://ethglobal.com/showcase/savant-chat-hh0ua",
    "https://medium.com/savantchat",
    "https://ctfbench.com",
  ],
  knowsAbout: [
    "Smart Contract Security",
    "Blockchain Auditing",
    "AI Security Analysis",
    "DeFi Security",
    "Solidity Auditing",
    "Vyper Security",
    "Rust Smart Contracts",
    "Near Protocol",
    "Solana Security",
  ],
};

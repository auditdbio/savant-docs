/** Site nav/footer/URL config for the visual layer (SEO lives in docusaurus.config.ts). */

export const SITE_URL = "https://savant.chat";
export const DASHBOARD_URL = "/dashboard";
export const SIGNUP_URL = "/dashboard/login";

export const SITE = {
  name: "Savant Chat",
  tagline: "Smart Contract Security Powered by Advanced AI",
  url: SITE_URL,
  twitter: "https://x.com/savantchat",
};

export const NAV_LINKS: { to: string; label: string }[] = [
  { to: "/use-cases", label: "Use Cases" },
  { to: "/how-it-works", label: "How It Works" },
  { to: "/pricing", label: "Pricing" },
  { to: "/ecosystem", label: "Ecosystem" },
  { to: "/faq", label: "FAQ" },
  { to: "/blog", label: "Blog" },
];

export const FOOTER_COLUMNS: {
  heading: string;
  links: { label: string; href: string; external?: boolean }[];
}[] = [
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

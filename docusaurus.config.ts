import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";
import tailwindPlugin from "./plugins/tailwind-config.cjs";
// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

// Extending Config type to support serverMiddleware
type EnhancedConfig = Config & {
  serverMiddleware?: () => Promise<any[]>;
};

const config: EnhancedConfig = {
  title: "Savant Chat - AI Smart Contract Security",
  tagline: "Smart Contract Security Powered by Advanced AI",
  favicon: "img/savant-favicon.svg",

  // Set the production url of your site here
  url: "https://savant.chat",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/",

  // Custom fields for configuration
  customFields: {
    proxyUrl: process.env.PROXY_URL || "",
    // Enable local cache usage
    useLocalTweetCache: true,
    // Always enable strict mode for tweets (only preloaded ones)
    strictTweetLoading: true,
    // Proxy settings for StaticTweet
    useProxy: process.env.USE_PROXY === "true",
    envProxyUrl: process.env.PROXY_URL || "",
    reactTweetApi: "https://react-tweet.vercel.app/api/tweet",
  },

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "auditdbio", // Usually your GitHub org/user name.
  projectName: "savant-docs", // Usually your repo name.

  onBrokenLinks: "warn",
  onBrokenMarkdownLinks: "warn",

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  // SEO optimization plugins
  plugins: [
    // The sitemap plugin is commented out because it's already included in the classic preset
    // Uncomment and give it a unique ID if you need custom configuration different from the preset
    /*
    [
      '@docusaurus/plugin-sitemap',
      {
        id: 'custom-sitemap', // Unique ID to avoid conflicts
        changefreq: 'weekly',
        priority: 0.5,
        ignorePatterns: ['/tags/**'],
        filename: 'sitemap.xml',
      },
    ],
    */
    tailwindPlugin,
    [
      "./src/plugins/docusaurus-plugin-tweets/index.mjs",
      {
        // Add any plugin options if needed
      },
    ],
  ],

  presets: [
    [
      "classic",
      {
        docs: false,
        blog: {
          path: "blog",
          blogTitle: "Blog",
          blogDescription: "Smart Contract Security Insights",
          blogSidebarCount: 5,
          blogSidebarTitle: "Recent Posts",
          routeBasePath: "blog",
          postsPerPage: 10,
          showReadingTime: true,
          feedOptions: {
            type: "all",
            title: "Savant Chat Blog",
            description: "Smart Contract Security Insights and Updates",
            copyright: `Copyright © ${new Date().getFullYear()} Novel Codes DMCC`,
          },
        },
        theme: {
          customCss: "./src/css/custom.css",
        },
        // SEO settings
        sitemap: {
          changefreq: "daily",
          priority: 0.5,
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Open Graph and Twitter metadata
    metadata: [
      {
        name: "keywords",
        content:
          "smart contract, security, audit, blockchain, AI, ethereum, solidity, vyper, rust, near, solana, web3, defi",
      },
      { name: "twitter:card", content: "summary" },
      {
        name: "twitter:title",
        content: "Savant Chat - AI Smart Contract Auditor Agent",
      },
      {
        name: "twitter:description",
        content: "Smart Contract Security Powered by Advanced AI",
      },
      { property: "og:type", content: "website" },
      {
        property: "og:title",
        content: "Savant Chat - AI Smart Contract Auditor Agent",
      },
      {
        property: "og:description",
        content: "Smart Contract Security Powered by Advanced AI",
      },
      {
        property: "og:image",
        content: "https://savant.chat/img/logo_short.png",
      },
      { property: "og:url", content: "https://savant.chat" },
      { property: "og:site_name", content: "Savant Chat" },
    ],
    // Replace with your project's social card
    image: "img/logo_short.png",
    navbar: {
      title: "Savant Chat",
      logo: {
        alt: "Savant Chat Logo",
        src: "img/logo_short.svg",
      },
      items: [
        { to: "/use-cases", label: "Use Cases", position: "left" },
        { to: "/how-it-works", label: "How It Works", position: "left" },
        { to: "/pricing", label: "Pricing", position: "left" },
        { to: "/ecosystem", label: "Ecosystem", position: "left" },
        { to: "/faq", label: "FAQ", position: "left" },
        { to: "/blog", label: "Blog", position: "left" },
        {
          href: "https://x.com/savantchat",
          className: "header-x-link",
          "aria-label": "Savant Chat on X",
          position: "right",
        },
        {
          type: "custom-SignInButton",
          position: "right",
        },
      ],
    },
    footer: {
      style: "light",
      logo: {
        alt: "Savant Chat Logo",
        src: "img/logo_short.svg",
        href: "/",
        width: 32,
        height: 32,
      },
      copyright: `Copyright © ${new Date().getFullYear()} Novel Codes DMCC. All rights reserved.`,
    },
    colorMode: {
      disableSwitch: true,
      defaultMode: "light",
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,

  headTags: [
    {
      tagName: "meta",
      attributes: {
        name: "viewport",
        content: "width=device-width, initial-scale=1.0",
      },
    },
    {
      tagName: "link",
      attributes: {
        rel: "manifest",
        href: "/manifest.json",
      },
    },
    {
      tagName: "link",
      attributes: {
        rel: "icon",
        type: "image/png",
        sizes: "48x48",
        href: "/img/savant-favicon.png",
      },
    },
    {
      tagName: "link",
      attributes: {
        rel: "shortcut icon",
        href: "/img/savant-favicon.png",
      },
    },
    {
      tagName: "link",
      attributes: {
        rel: "apple-touch-icon",
        sizes: "180x180",
        href: "/img/savant-apple-touch-icon.png",
      },
    },
    {
      tagName: "meta",
      attributes: {
        name: "msapplication-TileImage",
        content: "/img/logo_short.svg",
      },
    },
    {
      tagName: "meta",
      attributes: {
        name: "msapplication-TileColor",
        content: "#FF6B00",
      },
    },
    {
      tagName: "meta",
      attributes: {
        name: "theme-color",
        content: "#FF6B00",
      },
    },
    {
      tagName: "script",
      attributes: {},
      innerHTML: `
        var _paq = window._paq = window._paq || [];
        /* tracker methods like "setCustomDimension" should be called before "trackPageView" */
        _paq.push(['trackPageView']);
        _paq.push(['enableLinkTracking']);
        (function() {
        var u="//analytics.savant.chat/";
        _paq.push(['setTrackerUrl', u+'matomo.php']);
        _paq.push(['setSiteId', '2']);
        var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
        g.async=true; g.src=u+'matomo.js'; s.parentNode.insertBefore(g,s);
        })();
      `,
    },
    {
      tagName: "script",
      attributes: {
        type: "application/ld+json",
      },
      innerHTML: JSON.stringify({
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
      }),
    },
    {
      tagName: "script",
      attributes: {
        type: "application/ld+json",
      },
      innerHTML: JSON.stringify({
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
      }),
    },
  ],
};

export default config;

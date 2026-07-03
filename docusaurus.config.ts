import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const signupUrl = '/dashboard/login';

const config = {
  title: 'Savant Chat — AI Smart Contract Auditor',
  tagline: 'Find Smart Contract Vulnerabilities Before Attackers Do',
  favicon: 'img/savant-favicon.png',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://savant.chat',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  customFields: {
    signupUrl,
  },

  headTags: [
    {
      tagName: 'link',
      attributes: {
        rel: 'preconnect',
        href: 'https://fonts.googleapis.com',
      },
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossorigin: 'anonymous',
      },
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Archivo:wght@500;600;700;800&family=IBM+Plex+Mono:wght@400;500;600&display=swap',
      },
    },
  ],

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'facebook', // Usually your GitHub org/user name.
  projectName: 'docusaurus', // Usually your repo name.

  onBrokenLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          remarkPlugins: [remarkMath],
          rehypePlugins: [rehypeKatex],
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: {
          showReadingTime: true,
          remarkPlugins: [remarkMath],
          rehypePlugins: [rehypeKatex],
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: false,
      respectPrefersColorScheme: false,
    },
    navbar: {
      title: 'savant.chat',
      hideOnScroll: false,
      logo: {
        alt: 'savant.chat logo',
        src: 'img/logo_short.svg',
        srcDark: 'img/logo_short_dark.svg',
      },
      items: [
        {to: '/#pillars', label: 'How it works', position: 'left'},
        {to: '/#proof', label: 'Proof', position: 'left'},
        {to: '/#pricing', label: 'Pricing', position: 'left'},
        {to: '/#faq', label: 'FAQ', position: 'left'},
        {to: '/blog', label: 'Blog', position: 'left'},
        {
          to: signupUrl,
          label: 'Start free',
          position: 'right',
          className: 'navbar-cta',
        },
      ],
    },
    footer: {
      links: [
        {
          title: 'PRODUCT',
          items: [
            {label: 'Pricing', href: '/#pricing'},
            {label: 'FAQ', href: '/#faq'},
            {label: 'Blog', href: '/blog'},
          ],
        },
        {
          title: 'RESOURCES',
          items: [
            {label: 'GitHub', href: 'https://github.com/auditdbio'},
            {label: 'X', href: 'https://x.com/savantchat'},
            {label: 'CTFBench', href: 'https://github.com/auditdbio/ctfbench'},
          ],
        },
        {
          title: 'COMPANY',
          items: [
            {label: 'Imprint', href: 'https://savant.chat/imprint'},
            {label: 'Privacy', href: 'https://savant.chat/privacy-policy'},
            {label: 'Terms', href: 'https://savant.chat/terms-of-service'},
          ],
        },
      ],
      copyright: '© 2026 Novel Codes DMCC · Savant Chat',
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
} satisfies Config;

export default config;

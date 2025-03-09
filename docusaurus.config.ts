import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'Savant Chat',
  tagline: 'Smart Contract Security Powered by Advanced AI',
  favicon: 'img/savant-favicon.svg',

  // Set the production url of your site here
  url: 'https://savant.chat',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'savant', // Usually your GitHub org/user name.
  projectName: 'savant-docs', // Usually your repo name.

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
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
  ],

  presets: [
    [
      'classic',
      {
        docs: false, 
        blog: false, 
        theme: {
          customCss: './src/css/custom.css',
        },
        // SEO settings
        sitemap: {
          changefreq: 'weekly',
          priority: 0.5,
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Open Graph and Twitter metadata
    metadata: [
      {name: 'keywords', content: 'smart contract, security, audit, blockchain, AI, ethereum, solidity, web3, defi'},
      {name: 'twitter:card', content: 'summary_large_image'},
      {name: 'twitter:title', content: 'Savant Chat - Smart Contract Security Powered by Advanced AI'},
      {name: 'twitter:description', content: 'Comprehensive analysis, real-time monitoring, and automated vulnerability detection for your blockchain projects'},
      {name: 'og:type', content: 'website'},
      {name: 'og:title', content: 'Savant Chat - Smart Contract Security'},
      {name: 'og:description', content: 'AI-powered smart contract security analysis and auditing'},
      {name: 'og:image', content: 'https://savant.chat/img/logo_short.svg'},
      {name: 'og:url', content: 'https://savant.chat'},
      {name: 'og:site_name', content: 'Savant Chat'},
    ],
    // Replace with your project's social card
    image: 'img/logo_short.svg',
    navbar: {
      title: 'Savant Chat',
      logo: {
        alt: 'Savant Chat Logo',
        src: 'img/logo_short.svg',
      },
      items: [
        {to: '/pricing', label: 'Pricing', position: 'left'},
        {
          type: 'html',
          position: 'right',
          value: '<a href="/login" class="sign-in-button">Sign In</a>',
        },
      ],
    },
    footer: {
      style: 'light',
      logo: {
        alt: 'Savant Chat Logo',
        src: 'img/logo_short.svg',
        href: '/',
        width: 32,
        height: 32,
      },
      copyright: `Copyright © ${new Date().getFullYear()} Novel Codes DMCC. All rights reserved.`,
    },
    colorMode: {
      disableSwitch: true,
      defaultMode: 'light',
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,

  headTags: [
    {
      tagName: 'meta',
      attributes: {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1.0',
      },
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'canonical',
        href: 'https://savant.chat',
      },
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'manifest',
        href: '/manifest.json',
      },
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'apple-touch-icon',
        href: '/img/logo_short.svg',
      },
    },
    {
      tagName: 'meta',
      attributes: {
        name: 'msapplication-TileImage',
        content: '/img/logo_short.svg',
      },
    },
    {
      tagName: 'meta',
      attributes: {
        name: 'msapplication-TileColor',
        content: '#FF6B00',
      },
    },
    {
      tagName: 'meta',
      attributes: {
        name: 'theme-color',
        content: '#FF6B00',
      },
    },
  ],
};

export default config;

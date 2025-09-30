import React from 'react';
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';

export default function Ecosystem(): React.ReactElement {
  return (
    <Layout
      title="Ecosystem & Integrations"
      description="Discover curated tools and applications that enhance your web3 development and security workflow. Our ecosystem features trusted partners and complementary solutions."
    >
      <Head>
        <meta name="robots" content="index,follow" />
        <link rel="canonical" href="https://savant.chat/ecosystem" />
        <meta property="og:title" content="Ecosystem & Integrations - Savant Chat" />
        <meta property="og:description" content="Discover curated tools and applications that enhance your web3 development and security workflow. Our ecosystem features trusted partners and complementary solutions." />
        <meta property="og:image" content="https://savant.chat/img/logo_short.svg" />
        <meta name="twitter:card" content="summary" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Ecosystem & Integrations - Savant Chat",
          description: "Discover curated tools and applications that enhance your web3 development and security workflow. Our ecosystem features trusted partners and complementary solutions.",
          url: "https://savant.chat/ecosystem",
          mainEntity: {
            "@type": "ItemList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Blockscout",
                url: "https://blockscout.com/"
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "1inch",
                url: "https://1inch.io/"
              },
              {
                "@type": "ListItem",
                position: 3,
                name: "Lido",
                url: "https://lido.fi/"
              },
              {
                "@type": "ListItem",
                position: 4,
                name: "MixBytes",
                url: "https://mixbytes.io/"
              },
              {
                "@type": "ListItem",
                position: 5,
                name: "Pessimistic",
                url: "https://pessimistic.io/"
              },
              {
                "@type": "ListItem",
                position: 6,
                name: "Oxorio",
                url: "https://oxor.io/"
              }
            ]
          }
        })}</script>
      </Head>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-secondary">Ecosystem & Integrations</h1>
          <p className="mt-4 text-lg text-gray-600">
            Discover curated tools and applications that enhance your web3 development and security workflow. Our ecosystem features trusted partners and complementary solutions to help you build safer, more efficient decentralized applications.
          </p>
        </div>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-gray-900">Partners & Ecosystem</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="group bg-white rounded-lg border-2 border-gray-100 hover:border-primary/40 hover:shadow-md transition-all p-6 flex space-x-4">
              <img src="/img/blockscout/SVG/v_Color_BS_logo.svg" alt="Blockscout" className="h-10 w-10" />
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary">Blockscout</h3>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary">Partner</span>
                </div>
                <p className="text-gray-700 text-sm mt-2">
                  Blockscout is an open-source blockchain explorer and analytics platform used across many EVM networks. It provides contract verification, rich transaction views, and ecosystem integrations for developers and users.
                </p>
                <div className="mt-3 flex items-center space-x-4">
                  <a href="https://blockscout.com/" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary/80 text-sm underline">Visit Blockscout</a>
                </div>
              </div>
            </div>

            <div className="group bg-white rounded-lg border-2 border-gray-100 hover:border-primary/40 hover:shadow-md transition-all p-6 flex space-x-4">
              <img src="/img/1inch/1inch_without_text.svg" alt="1inch" className="h-10 w-10" />
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary">1inch</h3>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary">Partner</span>
                </div>
                <p className="text-gray-700 text-sm mt-2">
                  A decentralized exchange aggregator that sources liquidity from various exchanges to offer users the best possible trading rates across multiple DEXs.
                </p>
                <div className="mt-3 flex items-center space-x-4">
                  <a href="https://1inch.io/" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary/80 text-sm underline">Visit 1inch</a>
                </div>
              </div>
            </div>

            <div className="group bg-white rounded-lg border-2 border-gray-100 hover:border-primary/40 hover:shadow-md transition-all p-6 flex space-x-4">
              <img src="/img/lido/Lido_Staked_ETH_stETH_Logo.svg" alt="Lido" className="h-10 w-10" />
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary">Lido</h3>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary">Partner</span>
                </div>
                <p className="text-gray-700 text-sm mt-2">
                  A liquid staking solution that allows users to stake their assets while maintaining liquidity through tokenized representations of staked assets.
                </p>
                <div className="mt-3 flex items-center space-x-4">
                  <a href="https://lido.fi/" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary/80 text-sm underline">Visit Lido</a>
                </div>
              </div>
            </div>

            <div className="group bg-white rounded-lg border-2 border-gray-100 hover:border-primary/40 hover:shadow-md transition-all p-6 flex space-x-4">
              <img src="/img/mixbytes/Logo-mixBytes-vertic.svg" alt="MixBytes" className="h-10 w-10" />
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary">MixBytes</h3>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary">Partner</span>
                </div>
                <p className="text-gray-700 text-sm mt-2">
                  A blockchain security and development firm specializing in smart contract audits and the development of decentralized applications.
                </p>
                <div className="mt-3 flex items-center space-x-4">
                  <a href="https://mixbytes.io/" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary/80 text-sm underline">Visit MixBytes</a>
                </div>
              </div>
            </div>

            <div className="group bg-white rounded-lg border-2 border-gray-100 hover:border-primary/40 hover:shadow-md transition-all p-6 flex space-x-4">
              <img src="/img/pessimistic/pessimistic.svg" alt="Pessimistic" className="h-10 w-10" />
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary">Pessimistic</h3>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary">Partner</span>
                </div>
                <p className="text-gray-700 text-sm mt-2">
                  A security auditing company focused on identifying vulnerabilities in blockchain protocols and smart contracts to ensure maximum security.
                </p>
                <div className="mt-3 flex items-center space-x-4">
                  <a href="https://pessimistic.io/" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary/80 text-sm underline">Visit Pessimistic</a>
                </div>
              </div>
            </div>

            <div className="group bg-white rounded-lg border-2 border-gray-100 hover:border-primary/40 hover:shadow-md transition-all p-6 flex space-x-4">
              <img src="/img/oxorio/logo-mobile-orange.svg" alt="Oxorio" className="h-10 w-10" />
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary">Oxorio</h3>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary">Partner</span>
                </div>
                <p className="text-gray-700 text-sm mt-2">
                  A blockchain security firm providing comprehensive audits and security assessments for decentralized applications and protocols.
                </p>
                <div className="mt-3 flex items-center space-x-4">
                  <a href="https://oxor.io/" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary/80 text-sm underline">Visit Oxorio</a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}



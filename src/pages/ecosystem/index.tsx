import React from 'react';
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';

export default function Ecosystem(): React.ReactElement {
  return (
    <Layout
      title="Ecosystem & Integrations"
      description="Explore Savant Chat's ecosystem: integrations, listings, and partners including Blockscout."
    >
      <Head>
        <meta name="robots" content="index,follow" />
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
          </div>
        </section>
      </div>
    </Layout>
  );
}



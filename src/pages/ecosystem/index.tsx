import React from "react";
import Layout from "@theme/Layout";
import Head from "@docusaurus/Head";
import { Card } from "@site/src/components/ui/Card";
import { Badge } from "@site/src/components/ui/Badge";
import { Icon } from "@site/src/components/ui/Icon";

const PAGE_TITLE = "Ecosystem & Integrations";
const PAGE_DESC =
  "Discover curated tools and applications that enhance your web3 development and security workflow. Our ecosystem features trusted partners and complementary solutions.";

const partners = [
  {
    name: "Blockscout",
    logo: "/img/blockscout/SVG/v_Color_BS_logo.svg",
    url: "https://blockscout.com/",
    description:
      "Blockscout is an open-source blockchain explorer and analytics platform used across many EVM networks. It provides contract verification, rich transaction views, and ecosystem integrations for developers and users.",
  },
  {
    name: "MixBytes",
    logo: "/img/mixbytes/mixbytes_vertical.svg",
    url: "https://mixbytes.io/",
    description:
      "A blockchain security and development firm specializing in smart contract audits and the development of decentralized applications.",
  },
  {
    name: "Pessimistic",
    logo: "/img/pessimistic/pessimistic_icon.svg",
    url: "https://pessimistic.io/",
    description:
      "A security auditing company focused on identifying vulnerabilities in blockchain protocols and smart contracts to ensure maximum security.",
  },
  {
    name: "Oxorio",
    logo: "/img/oxorio/oxorio_icon.svg",
    url: "https://oxor.io/",
    description:
      "A blockchain security firm providing comprehensive audits and security assessments for decentralized applications and protocols.",
  },
  {
    name: "Bored Ghosts",
    logo: "/img/bgd/bgd_black_onlyGhost_logo.svg",
    url: "https://bgdlabs.com/",
    description:
      "A collective of former Aave contributors focused on protocol engineering, governance, and consulting for DeFi protocols, including core work on Aave v3 and Aave DAO upgrades.",
  },
  {
    name: "BugBlow",
    logo: "/img/bugblow/bugblow_logo.png",
    url: "https://bugblow.com/",
    description:
      "BugBlow specializes in identifying and addressing bugs, vulnerabilities, and threats to safeguard businesses from hackers. Ph.D.-level security professionals with one goal: protect Web3 from cyber threats and attacks.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Ecosystem & Integrations - Savant Chat",
  description:
    "Discover curated tools and applications that enhance your web3 development and security workflow. Our ecosystem features trusted partners and complementary solutions.",
  url: "https://savant.chat/ecosystem",
  mainEntity: {
    "@type": "ItemList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Blockscout", url: "https://blockscout.com/" },
      { "@type": "ListItem", position: 2, name: "MixBytes", url: "https://mixbytes.io/" },
      { "@type": "ListItem", position: 3, name: "Pessimistic", url: "https://pessimistic.io/" },
      { "@type": "ListItem", position: 4, name: "Oxorio", url: "https://oxor.io/" },
    ],
  },
};

export default function Ecosystem() {
  return (
    <Layout title={PAGE_TITLE} description={PAGE_DESC}>
      <Head>
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Head>
      <div className="savant-page">
        <section className="container-max py-12">
          <div className="mb-12 text-center">
            <p className="eyebrow mb-3">Ecosystem</p>
            <h1 className="text-balance text-4xl font-extrabold tracking-tight text-text-strong md:text-5xl">Ecosystem &amp; integrations</h1>
            <p className="mx-auto mt-4 max-w-3xl text-lg text-text-muted">
              Discover curated tools and applications that enhance your web3 development and security workflow. Our
              ecosystem features trusted partners and complementary solutions to help you build safer, more efficient
              decentralized applications.
            </p>
          </div>

          <h2 className="mb-6 text-2xl font-semibold text-text-strong">Partners &amp; ecosystem</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {partners.map((p) => (
              <Card key={p.name} hoverable className="flex gap-4">
                { }
                <img src={p.logo} alt={p.name} className="h-10 w-10 shrink-0 object-contain" />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-md font-semibold text-text-strong">{p.name}</h3>
                    <Badge tone="flame" size="sm">Partner</Badge>
                  </div>
                  <p className="mt-2 text-sm text-text-muted">{p.description}</p>
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-text-link hover:underline"
                  >
                    Visit {p.name}
                    <Icon name="ArrowUpRight" size={14} />
                  </a>
                </div>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </Layout>
  );
}

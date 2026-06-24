import React from "react";
import Layout from "@theme/Layout";
import Head from "@docusaurus/Head";
import { FaqClient } from "@site/src/components/marketing/FaqClient";
import { CTASection } from "@site/src/components/marketing/CTASection";
import { faqCategories } from "@site/src/config/faq-data";

const PAGE_TITLE = "Smart Contract Security FAQ & Help";
const PAGE_DESC = "Frequently asked questions about Savant Chat's AI-powered smart contract security analysis";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqCategories.flatMap((category) =>
    category.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  ),
};

export default function FAQ() {
  return (
    <Layout title={PAGE_TITLE} description={PAGE_DESC}>
      <Head>
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Head>
      <div className="savant-page">
        <section className="container-max py-13 text-center">
          <p className="eyebrow mb-3">FAQ</p>
          <h1 className="text-balance text-4xl font-extrabold tracking-tight text-text-strong md:text-5xl">
            Frequently asked questions
          </h1>
          <p className="mx-auto mt-4 max-w-3xl text-xl text-text-muted">
            Everything you need to know about Savant Chat&apos;s AI-powered smart contract security
          </p>
        </section>

        <section className="container-max pb-12">
          <FaqClient />
        </section>

        <CTASection />
      </div>
    </Layout>
  );
}

import type { Metadata } from "next";
import { FaqClient } from "@/components/marketing/FaqClient";
import { CTASection } from "@/components/marketing/CTASection";
import { faqCategories } from "@/config/faq-data";

export const metadata: Metadata = {
  title: "Smart Contract Security FAQ & Help",
  description: "Frequently asked questions about Savant Chat's AI-powered smart contract security analysis",
  alternates: { canonical: "/faq/" },
};

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
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

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
    </>
  );
}

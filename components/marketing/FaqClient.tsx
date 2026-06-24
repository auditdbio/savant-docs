"use client";

import { useState } from "react";
import { clsx } from "clsx";
import { Icon } from "@/components/ui/Icon";
import { faqCategories } from "@/config/faq-data";
import { DISCORD_URL } from "@/config/constants";

/** Renders an answer, turning the discord.gg link into a real anchor. */
function Answer({ text }: { text: string }) {
  const token = "discord.gg/pHfxVh9WSc";
  if (!text.includes(token)) return <>{text}</>;
  const [before, after] = text.split(token);
  return (
    <>
      {before}
      <a href={DISCORD_URL} target="_blank" rel="noopener noreferrer" className="font-medium text-text-link hover:underline">
        {token}
      </a>
      {after}
    </>
  );
}

export function FaqClient() {
  const [activeCategory, setActiveCategory] = useState(faqCategories[0].id);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const current = faqCategories.find((c) => c.id === activeCategory) ?? faqCategories[0];

  return (
    <div className="mx-auto max-w-5xl">
      {/* Category pills */}
      <div className="mb-10 flex flex-wrap justify-center gap-2 md:gap-3">
        {faqCategories.map((cat) => {
          const active = cat.id === activeCategory;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => {
                setActiveCategory(cat.id);
                setOpenIndex(null);
              }}
              className={clsx(
                "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors duration-fast md:px-5 md:py-3 md:text-base focus-visible:outline-none focus-visible:shadow-focus",
                active ? "bg-flame-500 text-white shadow-sm" : "bg-neutral-100 text-text-body hover:bg-neutral-150",
              )}
            >
              <Icon name={cat.icon} size={16} />
              {cat.name}
            </button>
          );
        })}
      </div>

      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold text-text-strong md:text-3xl">{current.name}</h2>
      </div>

      {/* Accordion */}
      <div className="space-y-3">
        {current.faqs.map((faq, index) => {
          const open = openIndex === index;
          return (
            <div key={index} className="overflow-hidden rounded-lg border border-[var(--border-subtle)] bg-surface-card">
              <button
                type="button"
                className="flex w-full items-center justify-between gap-4 px-6 py-4 text-left transition-colors hover:bg-surface-hover focus-visible:outline-none focus-visible:bg-surface-hover"
                onClick={() => setOpenIndex(open ? null : index)}
                aria-expanded={open}
                aria-controls={`faq-answer-${index}`}
              >
                <h3 className="text-md font-semibold text-text-strong">{faq.question}</h3>
                <Icon
                  name="ChevronDown"
                  size={20}
                  className={clsx("shrink-0 text-text-subtle transition-transform duration-base", open && "rotate-180")}
                />
              </button>
              <div
                id={`faq-answer-${index}`}
                className={clsx("grid transition-all duration-base ease-out", open ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}
                aria-hidden={!open}
              >
                <div className="overflow-hidden">
                  <div className="px-6 pb-4 pt-1 leading-relaxed text-text-muted">
                    <Answer text={faq.answer} />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Have more questions */}
      <div className="mt-12 rounded-xl border border-flame-200 bg-flame-50 p-8 text-center">
        <h3 className="mb-2 text-xl font-semibold text-text-strong">Have more questions?</h3>
        <p className="mb-4 text-text-muted">Reach out to our support team anytime!</p>
        <a
          href={DISCORD_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center rounded-lg bg-flame-500 px-6 py-3 font-semibold text-white transition-colors hover:bg-flame-600"
        >
          Join our Discord
        </a>
      </div>
    </div>
  );
}

export default FaqClient;

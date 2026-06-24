import React from "react";
import Link from "@docusaurus/Link";
import { FOOTER_COLUMNS } from "@site/src/config/site";
import { DISCORD_URL, DISCORD_COMMUNITY_NAME } from "@site/src/config/constants";

/** Swizzled Docusaurus footer — Savant design-system footer. */
export default function Footer(): React.ReactElement {
  const year = new Date().getFullYear();
  return (
    <footer className="savant-page border-t border-[var(--border-subtle)] bg-surface-page">
      <div className="container-max grid grid-cols-1 gap-8 py-13 pb-7 md:grid-cols-[1.4fr_1fr_1fr_1fr] md:py-12">
        <div>
          <div className="mb-3 flex items-center gap-[10px]">
            <img src="/img/logo-mark.svg" alt="" className="h-6 w-auto" />
            <span className="text-[17px] font-extrabold text-text-strong">Savant</span>
          </div>
          <p className="max-w-[240px] text-[13px] leading-normal text-text-muted">
            AI smart-contract security audits. Operated by Novel Codes DMCC.
          </p>
          <p className="mt-4 text-[13px] text-text-muted">
            Questions? Join our{" "}
            <a
              href={DISCORD_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-text-link hover:underline"
            >
              {DISCORD_COMMUNITY_NAME}
            </a>{" "}
            on Discord.
          </p>
        </div>

        {FOOTER_COLUMNS.map((col) => (
          <div key={col.heading}>
            <h4 className="mb-4 text-[12px] font-semibold uppercase tracking-caps text-text-muted">
              {col.heading}
            </h4>
            <ul className="flex list-none flex-col gap-[10px] p-0">
              {col.links.map((link) =>
                link.external ? (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[14px] text-text-body no-underline transition-colors hover:text-text-strong"
                    >
                      {link.label}
                    </a>
                  </li>
                ) : (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-[14px] text-text-body no-underline transition-colors hover:text-text-strong hover:no-underline"
                    >
                      {link.label}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </div>
        ))}
      </div>

      <div className="container-max pb-8">
        <div className="border-t border-[var(--border-subtle)] pt-5 text-center">
          <p className="text-[13px] text-text-subtle">© {year} Novel Codes DMCC. All rights reserved.</p>
          <div className="mt-4 flex items-center justify-center gap-2">
            <img src="/img/visa_mastercard_unionpay.jpg" alt="Visa, Mastercard, UnionPay" className="h-4" />
          </div>
        </div>
      </div>
    </footer>
  );
}

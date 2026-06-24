import React, { useEffect, useState } from "react";
import { useLocation } from "@docusaurus/router";
import Link from "@docusaurus/Link";
import { useColorMode } from "@docusaurus/theme-common";
import { clsx } from "clsx";
import { Button } from "@site/src/components/ui/Button";
import { Icon } from "@site/src/components/ui/Icon";
import { appendUTMToUrl } from "@site/src/utils/utm";
import { NAV_LINKS, SITE, SIGNUP_URL } from "@site/src/config/site";

/** Swizzled Docusaurus navbar — renders the Savant design-system top nav. */
export default function Navbar(): React.ReactElement {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = useLocation().pathname;
  const { colorMode, setColorMode } = useColorMode();
  const isDark = colorMode === "dark";
  const toggleTheme = () => setColorMode(isDark ? "light" : "dark");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={clsx(
        // Keep Infima's `navbar` class so Docusaurus TOC scroll-spy can measure height.
        "navbar savant-page sticky top-0 z-30 bg-[rgba(250,250,251,0.8)] backdrop-blur-md transition-shadow duration-base",
        scrolled ? "border-b border-[var(--border-subtle)] shadow-sm" : "border-b border-transparent",
      )}
    >
      <div className="container-max flex h-16 items-center gap-7">
        <Link to="/" className="flex items-center gap-[10px]" aria-label="Savant Chat home">
          <img src="/img/logo-mark.svg" alt="" className="h-[26px] w-auto" />
          <span className="text-[19px] font-extrabold tracking-tight text-text-strong">Savant</span>
        </Link>

        <div className="ml-3 hidden items-center gap-[22px] md:flex">
          {NAV_LINKS.map((l) => {
            const active = pathname === l.to || pathname?.startsWith(l.to + "/");
            return (
              <Link
                key={l.to}
                to={l.to}
                className={clsx(
                  "relative text-[14px] font-medium no-underline transition-colors duration-fast hover:text-text-strong hover:no-underline",
                  active ? "text-text-strong" : "text-text-muted",
                )}
              >
                {l.label}
                {active && (
                  <span className="absolute -bottom-[21px] left-0 right-0 hidden h-[2px] rounded bg-flame-500 md:block" />
                )}
              </Link>
            );
          })}
        </div>

        <div className="ml-auto flex items-center gap-4">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
            className="inline-flex h-9 w-9 items-center justify-center rounded-md text-text-muted transition-colors hover:bg-surface-hover hover:text-text-strong"
          >
            <Icon name={isDark ? "Sun" : "Moon"} size={18} />
          </button>
          <a
            href={SITE.twitter}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Savant Chat on X"
            className="hidden text-text-muted transition-colors hover:text-text-strong sm:inline-flex"
          >
            <Icon name="Twitter" size={18} />
          </a>
          <a
            href={appendUTMToUrl("/dashboard/login")}
            className="hidden text-[14px] font-semibold text-text-body no-underline transition-colors hover:text-text-strong hover:no-underline md:inline-flex"
          >
            Sign in
          </a>
          <div className="hidden md:block">
            <Button href={appendUTMToUrl(SIGNUP_URL)} size="sm" iconRight={<Icon name="ArrowRight" size={15} />}>
              Start an audit
            </Button>
          </div>
          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-md text-text-body hover:bg-surface-hover md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <Icon name={open ? "X" : "Menu"} size={22} />
          </button>
        </div>
      </div>

      {open && (
        <div className="savant-page border-t border-[var(--border-subtle)] bg-surface-card md:hidden">
          <div className="container-max flex flex-col gap-1 py-3">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="rounded-md px-2 py-3 text-[15px] font-medium text-text-body no-underline hover:bg-surface-hover hover:no-underline"
                onClick={() => setOpen(false)}
              >
                {l.label}
              </Link>
            ))}
            <a
              href={appendUTMToUrl("/dashboard/login")}
              className="rounded-md px-2 py-3 text-[15px] font-medium text-text-body no-underline hover:bg-surface-hover"
            >
              Sign in
            </a>
            <div className="px-2 pt-2">
              <Button href={appendUTMToUrl(SIGNUP_URL)} size="md" fullWidth iconRight={<Icon name="ArrowRight" size={15} />}>
                Start an audit
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

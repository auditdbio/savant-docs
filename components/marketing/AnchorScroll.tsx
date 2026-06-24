"use client";

import { useEffect } from "react";

/** Instant scroll to the URL hash on mount and on hashchange (for deep links like #developers). */
export function AnchorScroll() {
  useEffect(() => {
    const scrollToHash = () => {
      const hash = window.location.hash;
      if (!hash) return;
      const el = document.getElementById(hash.substring(1));
      el?.scrollIntoView({ behavior: "auto", block: "start", inline: "nearest" });
    };
    scrollToHash();
    [0, 10, 50].forEach((d) => setTimeout(scrollToHash, d));
    window.addEventListener("hashchange", scrollToHash);
    return () => window.removeEventListener("hashchange", scrollToHash);
  }, []);

  return null;
}

export default AnchorScroll;

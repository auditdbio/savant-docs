import next from "eslint-config-next";

const nextConfigs = Array.isArray(next) ? next : [next];

const config = [
  { ignores: ["node_modules/**", ".next/**", "out/**", "legacy/**", "public/**"] },
  ...nextConfigs,
  {
    // Intentional choices for a statically-exported marketing site:
    // next/image optimization is unavailable with output:"export", and plain
    // <a> navigation between static pages is acceptable here.
    rules: {
      "@next/next/no-img-element": "off",
      "@next/next/no-html-link-for-pages": "off",
    },
  },
  {
    // AnalysisDemo is a self-contained canvas animation engine; its effects
    // intentionally drive state in a controlled loop (guarded against re-entry).
    files: ["components/AnalysisDemo/**"],
    rules: {
      "react-hooks/set-state-in-effect": "off",
      "react-hooks/exhaustive-deps": "off",
    },
  },
];

export default config;

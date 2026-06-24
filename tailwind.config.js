/**
 * Savant Chat design-system theme (ported onto Docusaurus).
 * Fonts use the system stack (Geist is NOT loaded). Semantic tokens are bound
 * to CSS custom properties defined in src/css/custom.css.
 * `primary`/`secondary` are kept for backwards-compat with legacy markup.
 */
module.exports = {
  corePlugins: {
    preflight: true,
    container: true,
  },
  content: ["./src/**/*.{jsx,js,tsx,ts,html}"],
  darkMode: ["class", '[data-theme="dark"]'],
  theme: {
    container: { center: true, padding: "24px" },
    extend: {
      colors: {
        primary: { DEFAULT: "#FF6B00", hover: "#E65D00" },
        secondary: { DEFAULT: "rgb(82, 23, 109)", hover: "rgb(71, 20, 95)" },
        flame: {
          50: "#FFF3EA", 100: "#FFE2CC", 200: "#FFC79A", 300: "#FFA866", 400: "#FF8A33",
          500: "#FF6B00", 600: "#E65D00", 700: "#BF4D00", 800: "#8F3A00", 900: "#5C2500",
        },
        plum: {
          50: "#F6EEFA", 100: "#EBD9F2", 200: "#D4AFE3", 300: "#B07FCB", 400: "#834AA6",
          500: "#6A2A8C", 600: "#52176D", 700: "#47115F", 800: "#350C47", 900: "#230730",
        },
        ink: { 950: "#150A1C", 900: "#1C1126", 800: "#271832", 700: "#352343" },
        neutral: {
          0: "#FFFFFF", 50: "#FAFAFB", 100: "#F3F3F5", 150: "#ECECEF", 200: "#E3E3E8",
          300: "#D1D1D9", 400: "#A6A6B2", 500: "#797985", 600: "#5A5A66", 700: "#41414B",
          800: "#2A2A31", 900: "#18181C",
        },
        sev: {
          critical: "#C0233A", "critical-bg": "#FCEBEE",
          high: "#E5484D", "high-bg": "#FDECEC",
          medium: "#E08600", "medium-bg": "#FFF3DD",
          low: "#2563EB", "low-bg": "#E8EFFE",
          info: "#6B6B78", "info-bg": "#F0F0F3",
          gas: "#1A9E62", "gas-bg": "#E3F6EC",
        },
        success: { DEFAULT: "#1A9E62", bg: "#E3F6EC" },
        warning: { DEFAULT: "#E08600", bg: "#FFF3DD" },
        danger: { DEFAULT: "#E5484D", bg: "#FDECEC" },
        info: { DEFAULT: "#2563EB", bg: "#E8EFFE" },
        surface: {
          page: "var(--surface-page)", card: "var(--surface-card)", sunken: "var(--surface-sunken)",
          hover: "var(--surface-hover)", inverse: "var(--surface-inverse)",
        },
        text: {
          strong: "var(--text-strong)", body: "var(--text-body)", muted: "var(--text-muted)",
          subtle: "var(--text-subtle)", inverse: "var(--text-inverse)", brand: "var(--text-brand)",
          link: "var(--text-link)",
        },
        border: {
          subtle: "var(--border-subtle)", DEFAULT: "var(--border-default)", strong: "var(--border-strong)",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
        display: ["var(--font-display)"],
      },
      fontSize: {
        xs: ["12px", { lineHeight: "1" }],
        sm: ["13px", { lineHeight: "1" }],
        base: ["15px", { lineHeight: "1.5" }],
        md: ["16px", { lineHeight: "1.5" }],
        lg: ["18px", { lineHeight: "1.5" }],
        xl: ["21px", { lineHeight: "1.3" }],
        "2xl": ["26px", { lineHeight: "1.3" }],
        "3xl": ["32px", { lineHeight: "1.15" }],
        "4xl": ["40px", { lineHeight: "1.15" }],
        "5xl": ["52px", { lineHeight: "1.1" }],
        "6xl": ["68px", { lineHeight: "1.05" }],
        "7xl": ["88px", { lineHeight: "1.05" }],
      },
      fontWeight: { normal: "400", medium: "500", semibold: "600", bold: "700", extrabold: "800" },
      letterSpacing: {
        tight: "-0.02em", snug: "-0.011em", normal: "0", wide: "0.02em", caps: "0.06em",
      },
      spacing: {
        0: "0", 1: "4px", 2: "8px", 3: "12px", 4: "16px", 5: "20px", 6: "24px",
        7: "32px", 8: "40px", 9: "48px", 10: "64px", 11: "80px", 12: "96px", 13: "128px",
      },
      maxWidth: { container: "1200px", prose: "720px", thread: "760px" },
      borderRadius: {
        xs: "4px", sm: "6px", md: "8px", lg: "12px", xl: "16px", "2xl": "22px", full: "999px",
      },
      boxShadow: {
        xs: "0 1px 2px rgba(35,7,48,0.06)",
        sm: "0 1px 3px rgba(35,7,48,0.08), 0 1px 2px rgba(35,7,48,0.04)",
        md: "0 4px 12px rgba(35,7,48,0.08), 0 2px 4px rgba(35,7,48,0.05)",
        lg: "0 12px 28px rgba(35,7,48,0.12), 0 4px 8px rgba(35,7,48,0.06)",
        xl: "0 24px 56px rgba(35,7,48,0.18), 0 8px 16px rgba(35,7,48,0.08)",
        focus: "0 0 0 3px rgba(255,107,0,0.28)",
        "focus-plum": "0 0 0 3px rgba(82,23,109,0.24)",
      },
      transitionTimingFunction: {
        out: "cubic-bezier(0.22, 1, 0.36, 1)",
        "in-out": "cubic-bezier(0.65, 0, 0.35, 1)",
        spring: "cubic-bezier(0.34, 1.56, 0.64, 1)",
      },
      transitionDuration: { fast: "120ms", base: "180ms", slow: "320ms" },
      screens: { xs: { min: "480px" }, "3xl": { min: "1920px" }, "4xl": { min: "2560px" } },
    },
  },
  variants: { extend: {} },
  plugins: [],
};

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Marketing + docs site for **Savant Chat** — an AI-powered smart-contract security auditing platform.
This repo is the public website (homepage, marketing pages, blog, legal), **not** the product app.

It is built on **Next.js (App Router) + React 19 + Tailwind CSS + MDX**, statically exported
(`output: "export"`), and styled with the official **Savant Chat design system** (flame-orange +
plum-purple, a first-class severity scale, plum-tinted elevation). Fonts use the system stack.

> History: this site was migrated from Docusaurus 3 to Next.js. The design tokens and component
> APIs come from the Savant Chat design system (see `savant-app` / `feat/design-system`).

## Commands

```bash
npm run dev        # Dev server on localhost:3000 (runs preload-tweets + gen-blog first)
npm run build      # Static export to ./out (runs prebuild: preload-tweets + gen-blog)
npm run serve      # Serve the ./out static export locally
npm run typecheck  # tsc --noEmit
```

Docker: `docker compose up -d` (prod, serves ./out) · `docker compose -f docker-compose.dev.yml up`.

## Architecture

- **`app/`** — App Router routes. Each marketing/legal page is a server component that exports
  `metadata` and embeds page-specific JSON-LD via a `<script type="application/ld+json">`.
  - `layout.tsx` — global `<Nav>` + `<Footer>`, site metadata, favicons, Matomo, global
    Organization + SoftwareApplication JSON-LD.
  - `page.tsx` (home), `pricing/`, `how-it-works/`, `use-cases/`, `ecosystem/`, `faq/`,
    `privacy-policy/`, `terms-of-service/`, `cookie-policy/`, `refund-policy/`, `imprint/`.
  - `blog/` (listing) + `blog/[slug]/` (MDX posts, SSG via `generateStaticParams`).
  - `sitemap.ts` — generates `/sitemap.xml`.
- **`components/ui/`** — design-system primitives (Button, Card, Badge, SeverityBadge, StatTile,
  ProgressBar, Avatar, Input, Checkbox, Switch, Select, Radio, Toast, Tabs, Icon). Consume the
  semantic CSS variables in `styles/globals.css` — never hardcode hex.
- **`components/marketing/`** — Nav, Footer, CTA, FAQ client, etc. `components/AnalysisDemo/` is the
  animated hero code-scan. `components/mdx/Mdx.tsx` renders MDX (remark-gfm, rehype-slug,
  rehype-pretty-code/shiki).
- **`config/`** — `site.ts` (nav, footer, SEO, JSON-LD), `pricing.ts`, `constants.ts`,
  `faq-data.ts`, `blog-authors.ts`, `tweets.mjs`.
- **`lib/`** — `blog.ts` (MDX frontmatter/excerpt/reading-time), `tweets/` (preload/cache/proxy),
  `utm.ts`.
- **`content/blog/`** — MDX posts (`<dir>/index.mdx` + images). `scripts/gen-blog.mjs` copies
  images to `public/blog/` and generates `public/blog/rss.xml`.
- **`styles/globals.css`** — all design tokens as CSS custom properties (light + `[data-theme="dark"]`).
- **`tailwind.config.ts`** — Tailwind theme mirroring the tokens.

### Tweet system

Build-time preload caches tweets to `.cache/tweets.json` (`scripts/preload-tweets.mjs`, run by the
`predev`/`prebuild` hooks). Configure via `.env` (see `.env.example`): `USE_PROXY`, `PROXY_URL`,
`FORCE_MOCK_TWEETS`, `SKIP_TWEET_ERRORS`, `STRICT_TWEET_LOADING`.

## Deployment

GitHub Actions (`.github/workflows/deploy-main.yml`) runs a remote SSH deploy script on push to
`main`. The Docker image builds the static export and serves `./out` with `serve` on port 3000.

## Language Rule

Always respond in the user's language, but keep all code, comments, and commit messages in English.

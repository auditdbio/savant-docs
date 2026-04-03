# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Docusaurus 3.7.0 static website for **Savant Chat** — an AI-powered smart contract security auditing platform. This repo is the marketing/docs site, not the product itself. The site includes homepage, blog, documentation, pricing, FAQ, and legal pages.

## Commands

```bash
npm start              # Dev server on localhost:3000 (hot reload)
npm run build          # Production build (runs preload-tweets first)
npm run typecheck      # TypeScript type checking (tsc)
npm run clear          # Clear Docusaurus cache
npm run serve          # Serve the built static files locally
```

Docker dev workflow: `./start-dev.sh` / `./stop-dev.sh`

## Architecture

- **Docusaurus 3** with React 19, Tailwind CSS 3, TypeScript
- **`src/pages/index.tsx`** — main homepage (~38KB), the largest and most frequently edited file
- **`src/components/`** — React components (pricing calculator, analysis demo, tweet carousel, CTAs)
- **`src/config/`** — centralized constants (`constants.ts`), pricing tiers (`pricing.ts`), tweet IDs (`tweets.mjs`)
- **`docs/`** — MDX documentation content
- **`blog/`** — MDX blog posts (each in its own dated directory)
- **`static/`** — images, videos, `llms.txt`, `robots.txt`
- **`docusaurus.config.ts`** — main site config (URL, plugins, navbar, footer, SEO)
- **`tailwind.config.js`** — custom theme colors: primary `#FF6B00` (orange), secondary `#521B6D` (purple)
- **`plugins/tailwind-config.cjs`** — custom Docusaurus plugin wiring Tailwind + PostCSS

### Tweet System

The site embeds Twitter testimonials with a caching layer to avoid API rate limits:
- `src/config/tweets.mjs` — list of tweet IDs to embed
- `scripts/preload-tweets.mjs` — pre-fetches tweets before build (runs as `prebuild`)
- `src/utils/tweet-cache.mjs` / `twitter.js` — caching and proxy logic
- `src/plugins/docusaurus-plugin-tweets/` — custom Docusaurus plugin for tweet data
- Configure via `.env` (see `.env.example`): `USE_PROXY`, `PROXY_URL`, `FORCE_MOCK_TWEETS`, etc.

## Deployment

- GitHub Actions (`.github/workflows/deploy-main.yml`) auto-deploys on push to `main`
- Deploys via SSH to remote server running `deploy-docs.sh`
- Requires secrets: `DOCS_DEPLOY_HOST`, `DOCS_DEPLOY_USER`, `DOCS_DEPLOY_SSH_KEY`

## Language Rule

Always respond in the user's language, but keep all code, variable names, comments, documentation, and commit messages in English.

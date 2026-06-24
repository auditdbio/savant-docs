# Savant Chat — Website

Marketing + docs site for [Savant Chat](https://savant.chat), an AI-powered smart-contract security
auditing platform. Built with **Next.js (App Router) + Tailwind CSS + MDX**, statically exported,
and styled with the Savant Chat design system.

## Develop

```bash
npm install
npm run dev          # http://localhost:3000
```

The dev/build steps preload tweet data and blog assets first (see `scripts/`).

## Build

```bash
npm run build        # static export to ./out
npm run serve        # serve ./out locally
```

## Docker

```bash
docker compose up -d                                   # production (serves ./out)
docker compose -f docker-compose.dev.yml up            # dev with hot reload
```

## Configuration

Copy `.env.example` to `.env` to configure the tweet preloader (`USE_PROXY`, `PROXY_URL`,
`FORCE_MOCK_TWEETS`, `SKIP_TWEET_ERRORS`, `STRICT_TWEET_LOADING`).

## Structure

- `app/` — routes (marketing, legal, blog) — see `CLAUDE.md` for the full map
- `components/ui/` — design-system primitives
- `components/marketing/` — site sections (Nav, Footer, CTA, FAQ, AnalysisDemo)
- `config/`, `lib/` — data, SEO, blog + tweet helpers
- `content/blog/` — MDX blog posts
- `styles/globals.css`, `tailwind.config.ts` — design tokens

## Deployment

Pushing to `main` triggers `.github/workflows/deploy-main.yml`, which runs the remote deploy script.

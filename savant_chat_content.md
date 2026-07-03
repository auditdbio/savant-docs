# savant.chat — Competitive Research & Website Content Brief

> **Purpose.** Marketing-grade research pack for the new savant.chat website. Audience: Web3 protocol founders / CTOs / security leads deciding whom to trust with a smart-contract audit.
> **Scope.** Competitive landscape, hard benchmarks, public-record proof points, positioning, and ready-to-paste website copy. Every factual claim cites a primary source with a URL and (where available) a publication date.
> **Methodology.** First-party crawl of savant.chat (homepage, FAQ, pricing, blog, ecosystem) plus deep web research via Google (Serper) and direct page reads (crawl4ai). Where multiple sources disagree, all numbers are reported and the disagreement is flagged.
> **Cut-off.** July 2, 2026. "2025" / "2026" refer to calendar years; "as of [date]" used where freshness matters.

---

## Table of contents

- [A. Executive summary of the competitive landscape](#a-executive-summary-of-the-competitive-landscape)
- [B. Competitor profiles](#b-competitor-profiles)
  - [B.1 Nethermind AuditAgent](#b1-nethermind-auditagent)
  - [B.2 Octane Security](#b2-octane-security)
  - [B.3 TestMachine (Azimuth)](#b3-testmachine-azimuth)
  - [B.4 Grego AI](#b4-grego-ai)
  - [B.5 Sherlock AI](#b5-sherlock-ai)
  - [B.6 Olympix](#b6-olympix)
  - [B.7 Almanax](#b7-almanax)
  - [B.8 QuillAI / QuillShield](#b8-quillai--quillshield)
  - [B.9 ChainGPT Smart Contract Auditor](#b9-chaingpt-smart-contract-auditor)
  - [B.10 MetaTrust / MetaScan](#b10-metatrust--metascan)
  - [B.11 Cyfrin Aderyn](#b11-cyfrin-aderyn)
  - [B.12 Certora (Prover + AI Composer)](#b12-certora-prover--ai-composer)
  - [B.13 Zellic + V12](#b13-zellic--v12)
  - [B.14 OpenZeppelin AI Auditor](#b14-openzeppelin-ai-auditor)
  - [B.15 Spearbit / Cantina AI](#b15-spearbit--cantina-ai)
  - [B.16 Others (Auditware, Hacken AI, LISA, Hound, Finite Monkey)](#b16-others-auditware-hacken-ai-lisa-hound-finite-monkey)
- [C. savant.chat positioning analysis](#c-savantchat-positioning-analysis)
- [D. Ready-to-use website content blocks](#d-ready-to-use-website-content-blocks)
- [E. Full source list](#e-full-source-list)

---

## A. Executive summary of the competitive landscape

**The market in one paragraph.** AI smart-contract auditing stopped being a curiosity in 2024 and became a recognized tool category in 2025-2026. Every major traditional firm (Nethermind, Zellic, Cantina, Sherlock, OpenZeppelin) now ships an AI side-product, and a wave of pure-play AI auditors — Savant Chat, Octane Security, TestMachine, Grego AI, Almanax, Olympix, QuillAI, ChainGPT, MetaTrust — has raised real money and published real benchmark numbers. Independent third-party benchmarks (EVMBench from OpenAI + Paradigm, CTFBench, SCABench) now exist, and a small number of blind pilot studies have begun to rank the tools against human auditors on real Sherlock contests.

**The hard problem the buyer faces.** Smart-contract losses totaled **$3.35B in 2025** (CertiK Hack3d 2025; up 37% YoY), with **February 2025 alone at $1.54B** driven by the **Bybit exploit ($1.45B)** ([certik.com](https://www.certik.com/blog/hack3d-the-web3-security-report-2025)). Median smart-contract exploit loss over the past four years is **≈$1.9M** ([sherlock.xyz](https://sherlock.xyz/post/smart-contract-audit-pricing-a-market-reference-for-2026)). The traditional manual-audit market charges **$5K–$250K+ per engagement** with **3–38 day** lead times and 20–120% premiums for Rust / ZK / Move / Cairo (Sherlock Pricing 2026, Feb 18 2026). AI tools attack this cost/time ceiling — and the best of them now produce findings competitive with mid-tier human auditors on real contest code.

**Three clusters of AI auditors (positions to be aware of):**

| Cluster | What it is | Examples | Trust signal |
|---|---|---|---|
| **1. Pure-play multi-agent AI** | AI-native, multi-agent LLM stack, web SaaS, claim deep semantic reasoning | **Savant Chat**, Octane Security, TestMachine (Azimuth), Grego AI, Almanax, QuillAI, ChainGPT | Public benchmarks (CTFBench/EVMBench), contest placements, customer logos |
| **2. Traditional audit firm, AI side-product** | Established firm that bolted an AI scanner onto its manual service | **Nethermind AuditAgent**, **Sherlock AI**, **OpenZeppelin AI Auditor**, Zellic V12, Cantina AI Code Analyzer, Cyfrin Aderyn | Audit-firm brand, GitHub repos, customer list, EVMBench score |
| **3. Static / formal verification with AI wrapper** | Formal-verification engine or static analyzer that uses LLMs as a wrapper | **Certora AI Composer** (Prover-wrapped LLM), Olympix (static+fuzz+AI), MetaTrust MetaScan (GPTScan + static + formal), QuillShield | Academic papers, CVE catalogs, named protocols |

**The competitive facts the buyer should know:**

1. **Nethermind AuditAgent leads EVMBench in published numbers among AI auditors** — **67% post-validation recall across all 40 EVMBench repositories / 120 high-severity loss-of-funds vulnerabilities** ([auditagent.nethermind.io](https://auditagent.nethermind.io/blog/auditagent-on-evmbench-40-repositories-120-vulnerabilities-no-repos-skipped), Apr 7 2026). They also publish a transparent "Recall is Not Enough" follow-up showing a **75% false-positive reduction** at the cost of 7 pp recall ([auditagent.nethermind.io](https://auditagent.nethermind.io/blog/recall-is-not-enough-false-positives-and-the-limits-of-benchmarking)). *Caveat for all EVMBench numbers in this document: OpenZeppelin's Mar 2 2026 review flagged training-data contamination in the benchmark and four invalid "high" findings — quote EVMBench scores with that caveat (see Addendum).*
2. **Octane Security won the largest Code4rena contest in history** — the **Monad contest** (Sep–Oct 2025, **$500K prize pool**) — placing **#1 of ~1,600 security researchers** as user `oct0pwn`, taking **~$168.78K of the pool** with 5 High / 0 Medium valid findings ([code4rena.com/@oct0pwn](https://code4rena.com/@oct0pwn), [octane.security](https://www.octane.security/post/how-ai-won-the-monad-audit-contest)).
3. **Octane also found a high-severity bug in the Nethermind execution client** that could have stalled **~40% of Ethereum mainnet validators** ([octane.security](https://www.octane.security/post/octane-securitys-ai-catches-high-severity-ethereum-client-bug), Feb 2026), plus browser-engine memory disclosure across Blink/Gecko/WebKit including **CVE-2026-5888** ([nvd.nist.gov](https://nvd.nist.gov/vuln/detail/CVE-2026-5888)).
4. **TestMachine self-reports the highest EVMBench score in the industry** — **78.6% (92/117)** on TestMachine's own leaderboard ([testmachine.ai/evmbench](https://testmachine.ai/evmbench)). These scores are **self-reported** — TestMachine states it has not independently re-run competitors' pipelines. The closest third-party measurement is EVMBench's published AuditAgent number (67%) and the open-pilot SavantChat result (covered below).
5. **Savant Chat placed Top 6 in Sherlock's Symbiotic contest (Sep 2 2025)** against dozens of human auditors ([globenewswire.com](https://www.globenewswire.com/news-release/2025/09/02/3143051/0/en/savant-chat-achieves-a-historic-top-6-ranking-in-the-sherlock-defi-audit-contest.html)) — its only public contest placement to date. On **CTFBench** — an open benchmark whose methodology the Savant team itself published on ethresear.ch — Savant Chat reports **87–95% accuracy** ([savant.chat](https://savant.chat/)), and lists **"Latest score: 82%"** on its X bio ([x.com/savantchat](https://x.com/savantchat)). The **EVMBench GitHub report from Savant Chat (`auditdbio/savant-chat-evmbench-report`) was last updated May 27 2026** ([github.com/auditdbio](https://github.com/auditdbio)).
6. **A blind independent pilot (Lyuboslav Lyubenov, Radoslav Radev, Kann — Jan 27 2026)** ranked AI auditors on three judged Sherlock contests. Aggregate over 20 judge-adjudicated issues: **AuditAgent 40% recall / 4.1% precision**, **SavantChat 35% recall / 17.9% precision**, **AlmanaxAI 5% recall / 5.9% precision**. On the Crestal contest specifically, **SavantChat hit 100% recall (7/7 TPs) at ~41% precision**, while AuditAgent hit 71% recall at 7.25% precision. Conclusion verbatim: *"These tools are far from actually discovering significant, novel bugs in production systems"* — and *"Tools struggled with Yearn/CAP's cross-contract economic/accounting logic"* ([github.com/LyuboslavLyubenov/ai-audit-tools-eval](https://github.com/LyuboslavLyubenov/ai-audit-tools-eval)).
7. **Grego AI** emerged from stealth May 12 2026 with a claim of a **$250,000 bug bounty** — the largest ever paid for an AI-found vulnerability — for a flaw that would have drained **$27.7M** in a (unnamed) heavily-audited protocol ([prnewswire.com](https://www.prnewswire.com/news-releases/grego-ai-prevents-a-27-7m-attack-with-an-ai-reasoning-breakthrough-that-no-frontier-lab-has-achieved-302768644.html)). Backed by **cyber•Fund** and **Guillermo Rauch (Vercel)**. **The protocol is not named publicly**; the claim cannot be independently verified.
8. **Hack3d 2025 also shows**: 89 major incidents in 2025, $1.45B supply-chain, $722M phishing, **Ethereum alone suffered 310 incidents and $1.70B in losses** ([certik.com](https://www.certik.com/blog/hack3d-the-web3-security-report-2025)). Supply-chain compromises touched **CI/CD and wallet integrations** — directly relevant to AI tools that claim CI/CD integration as a feature.

**The four most common trust gaps buyers worry about** (and how the market has answered them):

| Buyer objection | What the market has done | Where it falls short |
|---|---|---|
| "AI auditors just rephrase Slither." | Multi-agent stacks (SavantChat 200+ classes, Octane 1,200-review study, Almanax ALMX-1) | Most are evaluated on **syntactic / state-machine bugs**, blind pilots show they still miss economic / cross-contract flaws |
| "False positives bury real bugs." | Confidence scoring + validation phases (AuditAgent cuts FPs 75%, SavantChat critic agent) | Only 3 Sherlock contests have been blind-evaluated; "noisy" tools still produce 5–10× more findings than TPs |
| "Can AI replace human auditors?" | No vendor claims replacement; "second pair of eyes" positioning | Trail of Bits publicly abandoned their AI auditor (Toucan, 2023) due to hallucination rates ([trailofbits.com](https://blog.trailofbits.com/2023/03/22/codex-and-gpt4-cant-beat-humans-on-smart-contract-audits/)) |
| "Is my code private?" | All major vendors publish data-handling policies; some offer self-hosted (Hacken, Oak) | OpenAI and Anthropic model usage means vendor-to-LLM-provider trust is required; Savant Chat explicitly mentions "trusted AI providers" |

**Where savant.chat fits, in one sentence.** Savant Chat is the **only pure-play multi-agent AI auditor with a published Top-6 finish against human auditors in a Sherlock contest, named production customers (1inch, Lido, Pessimistic, OXORIO, Gearbox, Hexens), explicit multi-language support (Solidity + Vyper + Rust/NEAR + Rust/Solana), and a credibility-via-RAG "20,000-vulnerability reference book" approach** that the engineering blog documents in detail ([savant.chat/blog](https://savant.chat/blog/building-autonomous-auditor-vulnerability-reference-book), Apr 3 2026). It does **not** lead the published EVMBench scoreboard (AuditAgent does at 67%; TestMachine self-reports 78.6%), nor does it match Octane's Monad contest #1 win or Grego's $250K bounty claim. The honest positioning is: **best AI auditor for protocol teams that want a second pair of eyes with documented semantic depth on real DeFi / staking codebases**, at a fraction of manual audit cost, with named design partners, but **not yet a replacement for the manual audit** of a top-tier firm on novel economic designs.

---
## B. Competitor profiles

> Each profile: what it is, technical approach, pricing, benchmarks, customers, weaknesses, primary sources. **"Unverified"** flags items where the vendor is the only source or where the vendor's own number contradicts an independent measurement.

---

### B.1 Nethermind AuditAgent

- **URL.** https://auditagent.nethermind.io/ — Docs: https://docs.auditagent.nethermind.io/
- **Vendor.** Nethermind Security, a unit of Demerzel Solutions Limited. Parent Nethermind was bootstrapped in 2017 with a 2018 Ethereum Foundation grant ([nethermind.io](https://www.nethermind.io/)); Tracxn lists no outside equity funding ([tracxn.com](https://tracxn.com/d/companies/nethermind/)).
- **Launch.** Beta announced **21 Oct 2024** on LinkedIn ([linkedin.com](https://www.linkedin.com/posts/nethermind_introducing-auditagent-beta-from-nethermind-activity-7254373537728114689-Dh4d)). Current site banner: **V3 — EVM, Solana, Starknet** ([auditagent.nethermind.io](https://auditagent.nethermind.io/)).
- **What it does.** Multi-agent LLM pipeline ("multiple large language models analyze your contracts in coordination" — [docs](https://docs.auditagent.nethermind.io/how-it-works)). Two scan tiers share the pipeline at different compute: **Developer Scan** (lightweight, 1× compute, ≤1 h) and **Auditor Scan** (most-expensive models, 5× compute, ≤5 h, adds Multi-Agent System, Attacker Model, Internet Search). Persistent Memory (per-project knowledge base) on Pro/Business/Custom. Outputs: severity-ranked findings, architecture diagram, generated invariants, **0–100 security score**, per-finding AI chat, PDF report.
- **Validation.** Pre-validation: 3,230 findings → post-validation: 798 (**75% false-positive reduction**, 7 pp recall cost) ([auditagent.nethermind.io](https://auditagent.nethermind.io/blog/recall-is-not-enough-false-positives-and-the-limits-of-benchmarking), Apr 16 2026).
- **Pricing.** Credit-based: 1 credit = $0.01. Developer Scan $0.02/BLoC; Auditor Scan $0.10/BLoC. First 500 BLoC free per scan, up to 3 scans/day. Subscriptions: **Pro $199/mo** ($149 annual, 23K credits, 3 seats, 1 memory project); **Business $990/mo** ($749 annual, 130K credits, 10 seats, 5 memory projects); Custom enterprise ([docs](https://docs.auditagent.nethermind.io/pricing/subscription-plans)).
- **Published benchmarks.**
  - **EVMBench (OpenAI + Paradigm): AuditAgent 67% post-validation recall (80/120), 74% pre-validation (89/120)** across all 40 repos sequentially ([auditagent.nethermind.io](https://auditagent.nethermind.io/blog/auditagent-on-evmbench-40-repositories-120-vulnerabilities-no-repos-skipped), Apr 7 2026). Comparison: Claude Opus 4.6 = 47%, GPT-5.2 = 38%, GPT-5 = 21%, GPT-5.2-codex = 32%, GPT-5.3-codex = 36% ([nethermind.io](https://www.nethermind.io/blog/auditagent-on-evmbench-what-the-data-shows), Apr 29 2026).
  - **Internal evaluation on 29 real audits**: matched 30% of auditor findings on average (best 50%), 62% of projects had ≥1 valid issue detected, Critical 42% recall, High 43% recall ([nethermind.io](https://www.nethermind.io/blog/how-nethermind-security-uses-auditagent-alongside-manual-audits), Oct 1 2025).
  - **ResupplyFi retrospective**: reproduced the exact **$9.8M ResupplyFi hack** (Jun 27 2025) when run 19 days later on Jul 16 2025 ([nethermind.io](https://www.nethermind.io/blog/how-nethermind-security-uses-auditagent-alongside-manual-audits)).
  - AuditAgent contributed the **scoring algorithm to SCABench** (NethermindEth/auditagent-scoring-algo, Apache-2.0) ([github.com/NethermindEth/auditagent-scoring-algo](https://github.com/NethermindEth/auditagent-scoring-algo)).
- **Customers / case studies.**
  - **Gearbox Protocol**: ~8,000 LOC, 7 prior human audits, $300M+ TVL; AuditAgent returned a 37-page report in 20 min, 26 issues including 2 minor bugs missed by prior audits (per Gearbox founder 0xmikko) ([nethermind.io](https://www.nethermind.io/blog/gearbox-x-auditagent-case-study), Oct 30 2025).
  - **CMTA + UBS**: CMTAT v3.1.0, 75 contracts / 5,999 LOC, 14 findings ([cmta.ch](https://cmta.ch/news-articles/using-ai-assisted-security-analysis-on-the-cmtat-case-study-of-how-cmta-and-ubs-have-used-nethermind-s-auditagent-on-cmtat-contracts), Jan 12 2026).
  - **Avalanche Builder Hub** integration listing ([build.avax.network](https://build.avax.network/integrations/nethermind-auditagent)).
- **Strengths.** Most transparent benchmark reporting in the category; published full scoring algorithm; parent firm does real audits at scale; multi-language (EVM/Solana/Starknet); GitHub-traceable.
- **Weaknesses.** Average 30% recall on real audits; the 29-audit study openly admits AuditAgent is a "pair auditor, not a replacement"; produces a lot of noise that auditors must filter; bundled into Nethermind's security-services funnel rather than sold standalone ([docs](https://docs.auditagent.nethermind.io/what-is-auditagent)).

**Sources.** [auditagent.nethermind.io](https://auditagent.nethermind.io/); [auditagent.nethermind.io/blog](https://auditagent.nethermind.io/blog/auditagent-on-evmbench-40-repositories-120-vulnerabilities-no-repos-skipped); [auditagent.nethermind.io/blog/recall-is-not-enough](https://auditagent.nethermind.io/blog/recall-is-not-enough-false-positives-and-the-limits-of-benchmarking); [nethermind.io/blog/auditagent-on-evmbench-what-the-data-shows](https://www.nethermind.io/blog/auditagent-on-evmbench-what-the-data-shows); [nethermind.io/blog/how-nethermind-security-uses-auditagent-alongside-manual-audits](https://www.nethermind.io/blog/how-nethermind-security-uses-auditagent-alongside-manual-audits); [nethermind.io/blog/gearbox-x-auditagent-case-study](https://www.nethermind.io/blog/gearbox-x-auditagent-case-study); [docs.auditagent.nethermind.io](https://docs.auditagent.nethermind.io/); [github.com/NethermindEth/auditagent-scoring-algo](https://github.com/NethermindEth/auditagent-scoring-algo); [cmta.ch](https://cmta.ch/news-articles/using-ai-assisted-security-analysis-on-the-cmtat-case-study-of-how-cmta-and-ubs-have-used-nethermind-s-auditagent-on-cmtat-contracts); [tracxn.com](https://tracxn.com/d/companies/nethermind/).

---

### B.2 Octane Security

- **URL.** https://www.octane.security/ — Docs: https://docs.octane.security/
- **Vendor.** San Francisco. **CEO & founder Giovanni Vignone** (Duke alum; Forbes profile: [forbes.com/profile/giovanni-vignone](https://www.forbes.com/profile/giovanni-vignone/)).
- **Launch.** Out of stealth **8 Apr 2025** with $6.75M seed ([octane.security](https://www.octane.security/post/octane-seed-round); [prnewswire.com](https://www.prnewswire.com/news-releases/octane-launches-from-stealth-raising-6-75m-to-build-ai-powered-cybersecurity-for-crypto-302423335.html); [securityweek.com](https://www.securityweek.com/octane-raises-6-75m-for-smart-contract-security-tech/)).
- **Funding.** **$6.75M Seed**, co-led by **Archetype** and **Winklevoss Capital**; participants include **Circle, Gemini, Druid Ventures, Legion Capital, Duke Capital Partners, Balaji Srinivasan, Sina Habibian** ([octane.security](https://www.octane.security/post/octane-seed-round)). Tracxn lists $7M total / 7 institutional + 2 angels ([tracxn.com](https://tracxn.com/d/companies/octanesecurity/)). **Unverified:** StartupHub lists "$63M raised, $1.1B valuation, Series A" — not corroborated anywhere.
- **What it does.** "Domain-specific AI agents purpose-built for security analysis … trained on millions of instances of code/exploits." Custom-tuned per codebase; traces data flow, models attacker behavior, reasons over cross-contract / cross-component logic ([octane.security](https://www.octane.security/)). Three products: **Continuous Analysis** (per-PR), **Baseline / On-Demand**, **Adversarial Research** (human-directed AI + runnable PoCs). Language-agnostic engine; coverage: Ethereum + all EVM (Arbitrum, Optimism, Base, Polygon, BNB), **Solana, Aptos, Sui, Cosmos**. Detector set includes Bad Randomness, Token Loss, Rounding, DoS, Balance Gain, Unprotected External Calls, Phantom-Multicall-style cross-inherited logic, plus Fuzz/Property Violation and Fuzz DelegateCall / Fuzz Selfdestruct detectors ([docs.octane.security/llms.txt](https://docs.octane.security/llms.txt)). Auto-drafts Solidity fixes ("Code Fix Engine") ([docs.octane.security/introduction](https://docs.octane.security/introduction)).
- **Pricing.** **Not publicly listed** — sales-led / Calendly only ([calendly.com/d/cqyp-gjr-rvq/octane-introduction](https://calendly.com/d/cqyp-gjr-rvq/octane-introduction)). Marketing line compares Octane to "six-to-seven figure per-engagement" traditional audits. Covenant case study cites **$41,400 saved** on one deployment ([octane.security](https://www.octane.security/post/how-octane-saved-41400-for-covenant)).
- **Contest results — the strongest in this category.**
  - **Monad Code4rena contest (Sep 15 – Oct 12 2025), $500K prize pool** — largest unconditional Code4rena pot. Octane (handle `oct0pwn`) placed **#1 of ~1,600 security researchers**, 3 high-severity paid + ~7 mediums, took **~$168.78K of pool** ([octane.security](https://www.octane.security/post/how-ai-won-the-monad-audit-contest); [code4rena.com/@oct0pwn](https://code4rena.com/@oct0pwn)).
  - **2026 Code4rena yearly leaderboard #1** as of April 2026 ([linkedin.com](https://www.linkedin.com/posts/dukecapitalpartners_octane-security-just-claimed-the-1-spot-activity-7451985724960301056-V73x)).
  - **2026 Immunefi leaderboard #1** (Oct 2026-critical MUX Protocol bug, ~$8M at risk) ([octane.security](https://www.octane.security/post/octane-hits-top-of-immunefi-leaderboard-for-identifying-critical-vulnerability)).
- **Real-world findings.**
  - **High-severity bug in Nethermind execution client (Feb 2026)** — blob-tx validation; could have stalled **~38–40% of mainnet Ethereum validators** ([octane.security](https://www.octane.security/post/octane-securitys-ai-catches-high-severity-ethereum-client-bug); [dlnews.com](https://www.dlnews.com/articles/defi/ai-flags-high-severity-nethermind-bug/)).
  - **CVE-2026-5888 (Chromium WebCodecs uninitialized-use)** + memory-disclosure across Blink, Gecko, WebKit (the three engines powering 99.7% of browser traffic) found in 72 hours ([octane.security](https://www.octane.security/post/octane-finds-vulnerabilities-in-all-major-internet-browsers); [nvd.nist.gov](https://nvd.nist.gov/vuln/detail/CVE-2026-5888)).
  - Case studies: Decent (CI/CD, 2 severe — refund-drain + frontrunning rebase), ScorePlay, Suzaku, Mystic Finance, Ostium, Button, **Covenant ("Phantom Multicall" cross-contract drain)**, **MUX Protocol ($8M+ at risk critical)**, **Spark / Phoenix Labs**, Superform, Beagle ([octane.security](https://www.octane.security/post/octane-smart-contract-security-for-scoreplay); [octane.security](https://www.octane.security/post/an-8m-mux-up-how-octanes-ai-found-a-critical-vulnerability-in-mux-protocol); [octane.security](https://www.octane.security/post/how-spark-uses-ai-to-secure-billions-in-defi)).
- **Self-published benchmark.** **"Where Your Bugs Hide Now: Findings From 1,200 Octane Reviews"** (Jun 2026). 1,200 reviews / 65 codebases / **17,328 unique findings** (297 Critical / 1,971 High / 6,058 Medium / 5,338 Low / 3,664 Info). 89% of reviews delivered ≥1 finding; 84% net-new. For AI-native apps, **52% of High+Critical findings were authorization failures** (cross-tenant 26%, missing access control 17%, auth bypass 9%). **Reentrancy = 0.4% of High+Critical on-chain findings** ([octane.security](https://www.octane.security/post/where-your-bugs-hide-now-findings-from-1-200-octane-reviews)).
- **Customers.** Ethereum, Circle, Sky, Bland AI, Corgi ("$500B+ secured" on home page). Partnerships: Avalanche (L1), Plume (RWA), Sophon (Canvas grant), Circle (USDC). **Ethereum Foundation CROPS grant** ([octane.security](https://www.octane.security/post/octane-receives-ecosystem-grant-to-help-put-the-s-in-ethereums-crops)). Pre-stealth users named: Circle, Redstone, Trust Wallet ([octane.security](https://www.octane.security/post/octane-seed-round)).
- **Strengths.** Strongest external contest proof (Monad #1, MUX Immunefi #1, Ethereum-client CVE); broadest language coverage in the category; named tier-1 customers; language-agnostic engine positioned beyond smart contracts into AI code (Copilot/Cursor/Claude-Code), browsers, infra.
- **Weaknesses.** **Invitation-only / no public pricing** — excluded from the Lyuboslav Lyubenov blind pilot because no invite was obtainable ([github.com/LyuboslavLyubenov/ai-audit-tools-eval](https://github.com/LyuboslavLyubenov/ai-audit-tools-eval)). Self-acknowledged (Monad writeup): "Both our human reviewers and LLMs struggled more with the C++ side … That ambiguity led to a number of false positives as well as some potentially true positives that were hard to validate." Rust analyzed more cleanly than C++; inherited Solidity and proxy patterns remain a recurring failure mode ([octane.security](https://www.octane.security/post/how-to-detect-complex-smart-contract-vulnerabilities)). One-shot analysis gives partial coverage — repeated runs recommended ([octane.security](https://www.octane.security/post/why-octane-analysis-varies-and-why-thats-good-security)). No independent third-party FP benchmark.

**Sources.** [octane.security](https://www.octane.security/); [octane.security/post/octane-seed-round](https://www.octane.security/post/octane-seed-round); [octane.security/post/how-ai-won-the-monad-audit-contest](https://www.octane.security/post/how-ai-won-the-monad-audit-contest); [octane.security/post/octane-securitys-ai-catches-high-severity-ethereum-client-bug](https://www.octane.security/post/octane-securitys-ai-catches-high-severity-ethereum-client-bug); [octane.security/post/octane-finds-vulnerabilities-in-all-major-internet-browsers](https://www.octane.security/post/octane-finds-vulnerabilities-in-all-major-internet-browsers); [octane.security/post/an-8m-mux-up-how-octanes-ai-found-a-critical-vulnerability-in-mux-protocol](https://www.octane.security/post/an-8m-mux-up-how-octanes-ai-found-a-critical-vulnerability-in-mux-protocol); [octane.security/post/where-your-bugs-hide-now-findings-from-1-200-octane-reviews](https://www.octane.security/post/where-your-bugs-hide-now-findings-from-1-200-octane-reviews); [docs.octane.security/llms.txt](https://docs.octane.security/llms.txt); [code4rena.com/@oct0pwn](https://code4rena.com/@oct0pwn); [prnewswire.com](https://www.prnewswire.com/news-releases/octane-launches-from-stealth-raising-6-75m-to-build-ai-powered-cybersecurity-for-crypto-302423335.html); [securityweek.com](https://www.securityweek.com/octane-raises-6-75m-for-smart-contract-security-tech/); [tracxn.com](https://tracxn.com/d/companies/octanesecurity/); [nvd.nist.gov/vuln/detail/CVE-2026-5888](https://nvd.nist.gov/vuln/detail/CVE-2026-5888); [dlnews.com](https://www.dlnews.com/articles/defi/ai-flags-high-severity-nethermind-bug/); [linkedin.com (Duke Capital)](https://www.linkedin.com/posts/dukecapitalpartners_octane-security-just-claimed-the-1-spot-activity-7451985724960301056-V73x); [github.com/LyuboslavLyubenov/ai-audit-tools-eval](https://github.com/LyuboslavLyubenov/ai-audit-tools-eval).

---

### B.3 TestMachine (Azimuth)

- **URL.** https://testmachine.ai/ — EVMBench leaderboard: https://testmachine.ai/evmbench
- **Vendor.** TestMachine Inc. HQ listed both as **112 S Main St, Ann Arbor, Michigan** (LinkedIn) and **20 W 34th St, New York, NY** (site contact page). 8 employees per Tracxn, May 31 2026 ([tracxn.com](https://tracxn.com/d/companies/testmachine/)).
- **Founded.** 2022 (Tracxn / LinkedIn); one press release says 2021. **Founder/CEO identity inconsistent**: Dr. Matthew J. Lewis per own press release; Andrew Kilbride per Tracxn.
- **Funding.** **$6.5M Series A on Dec 11 2025** — only round to date. Lead investors: **BlockChange Ventures, Decasonic, Delphi Ventures, New Form Capital**. Other participants: Baboon VC, UDHC, Auros Global, Generative Ventures, Contango Digital, angel Santiago Santos ([testmachine.ai](https://testmachine.ai/blog/funding-announcement); [alphadrops.net](https://alphadrops.net/raises/testmachine); [tracxn.com](https://tracxn.com/d/companies/testmachine/)).
- **What it does.** Two products: **Azimuth** (contract auditing) and **Token Custody** (token risk scoring). Pipeline: ingest code/ABIs/on-chain state → LLM attack-surface mapping → attack hypotheses → **RL agents ("Lodestar" / "Predator") execute transactions against forked mainnet** → every finding ships with a working PoC exploit ("if Azimuth reports a vulnerability, it was actually exploited") ([testmachine.ai/solutions](https://testmachine.ai/solutions); [testmachine.ai/products/azimuth](https://testmachine.ai/products/azimuth)). Languages: **Solidity, Vyper, Rust (Solana/Anchor)**. Chains: Ethereum, Base, Arbitrum, Optimism, Polygon, Avalanche, BSC.
- **Speed/cost.** Sample 4-contract / 1,247-line repo: **12.6 min, $0.05 / 4.8M tokens**. Typical Solidity audit: **10–15 minutes**.
- **Self-reported EVMBench scores (TestMachine leaderboard).**
  - **Azimuth (TestMachine) 78.6% (92/117)** — top of leaderboard
  - AuditAgent (Nethermind) 67% (80/120)
  - Kai (Dria) 64.2% (77/120)
  - Guardix 59.8% (70/117)
  - GPT-5.5 Codex 53.8% (63/117); Claude Opus 4.6 47%; GLM 5.2 38.3%
  Sources: [testmachine.ai/evmbench](https://testmachine.ai/evmbench), [auditagent.nethermind.io](https://auditagent.nethermind.io/blog/auditagent-on-evmbench-40-repositories-120-vulnerabilities-no-repos-skipped), [kai.dria.co](https://kai.dria.co/benchmark?tab=evmbench), [guardix.dev](https://guardix.dev/blog/evmbench-benchmark-results).
  **Caveat (verbatim from TestMachine):** "we have not independently re-run other vendors' pipelines." All leaderboard numbers are self-reported.
- **Other claims.** **91% validation success / 20 of 22 findings exploited on first pass on "EVMBench Exploit"** ([linkedin.com](https://www.linkedin.com/company/testmachine-ai)). Self-reported observed FP rate **~2.7%**; average user cost per EVMBench repo **~$100**.
- **Public findings.** Discovered and responsibly disclosed a **critical unchecked-arithmetic underflow in Virtuals AI Agent's token tax logic** (contract `0x082Cb6e892Dd0699B5f0d22f7D2e638BBAdA5D94`) — present despite at least two prior human audits ([testmachine.ai](https://testmachine.ai/blog/breaking-tokenomics)). Public post-mortem on **ZetaChain ($334K lost)** describes Azimuth as "partially successful" — reconstructed the destination-side attack vector but "didn't fully see the exploitability" — i.e. multi-step / cross-domain compound bugs are a self-acknowledged limit.
- **Public benchmark.** Competing publicly on **AgentArena** — a live AI-vs-AI audit arena. Per-results published "including losses" ([testmachine.ai](https://testmachine.ai/blog/ai-smart-contract-auditing-competing-publicly-agentalena), Apr 16 2026).
- **Customers.** **Coinbase** — integrated into CEX and newly launched DEX trading flow; reportedly "100% accuracy on all tokens, no false positives or negatives" in a Coinbase three-stage work trial; Coinbase blockchain-security engineer Noama Samreen quoted by name ([testmachine.ai](https://testmachine.ai/blog/funding-announcement)). **Axiym** (co-founder Matthew Hall quoted). **Spectral Labs** — collaboration announced May 2024 ([smartliquidity.info](https://smartliquidity.info/2024/05/09/spectral-labs-and-testmachine-collaboration/)). **Unverified internal claim**: monitors 9M+ tokens, 1M+ flagged as "real-time," 100% rug-pull detection on 11K-token validation set (>$120M value).
- **Endorsers (independent).** @pessimistic_io (Pessimistic Security), @LuxLode, @0x4008 (Luca Sami), Mario Poneder.
- **Strengths.** Best-published EVMBench score (self-reported); every finding comes with a working PoC; Token Custody is a unique adjacent product; competitive transparency via AgentArena.
- **Weaknesses.** All EVMBench scores are **self-reported**; founder/CEO identity inconsistent in primary sources; small (8 employees); pricing opaque / quote-based; cross-domain compound bugs explicitly admitted as a gap; founded only 2022.

**Sources.** [testmachine.ai](https://testmachine.ai/); [testmachine.ai/solutions](https://testmachine.ai/solutions); [testmachine.ai/products/azimuth](https://testmachine.ai/products/azimuth); [testmachine.ai/evmbench](https://testmachine.ai/evmbench); [testmachine.ai/blog/ai-smart-contract-auditing-competing-publicly-agentalena](https://testmachine.ai/blog/ai-smart-contract-auditing-competing-publicly-agentalena); [testmachine.ai/blog/breaking-tokenomics](https://testmachine.ai/blog/breaking-tokenomics); [testmachine.ai/blog/funding-announcement](https://testmachine.ai/blog/funding-announcement); [linkedin.com/company/testmachine-ai](https://www.linkedin.com/company/testmachine-ai/); [tracxn.com](https://tracxn.com/d/companies/testmachine/); [smartliquidity.info](https://smartliquidity.info/2024/05/09/spectral-labs-and-testmachine-collaboration/); [alphadrops.net](https://alphadrops.net/raises/testmachine); [kai.dria.co](https://kai.dria.co/benchmark?tab=evmbench); [guardix.dev](https://guardix.dev/blog/evmbench-benchmark-results).

---

### B.4 Grego AI

- **URL.** https://grego.ai/
- **Vendor.** **Founded 2024** by CEO **Justus Hanna** ("Riptide") and **Gregorio Maspero**. HQ Miami (PR) vs San Francisco (LinkedIn) — contradictory. 11–50 employees per LinkedIn.
- **Funding.** **Undisclosed seed** announced May 12 2026, led by **cyber•Fund**; **Guillermo Rauch (Vercel)** named as backer ([prnewswire.com](https://www.prnewswire.com/news-releases/grego-ai-prevents-a-27-7m-attack-with-an-ai-reasoning-breakthrough-that-no-frontier-lab-has-achieved-302768644.html); [siliconangle.com](https://siliconangle.com/2026/05/12/ai-security-startup-grego-ai-debuts-claims-record-250000-bounty-ai-found-exploit/)). **Unverified:** StartupHub.ai lists "$63M raised, $1.1B valuation, latest round Series A" — not corroborated ([startuphub.ai](https://www.startuphub.ai/startups/grego-ai)).
- **What it does.** "Deep Invariant Analysis" — ingests full repos → parses Solidity AST + IR → builds call-graph + dataflow-graph → runs invariant checks + state-transition analysis → synthesizes exploit paths + PoC sketches. Architecture: "proprietary architecture, training methodology, multi-agent sandbox orchestration and a self-refinement pipeline around general-purpose foundation models." Smaller agents run in sandboxes on different routes; a candidate bug is **auto-confirmed via reproducible PoC or discarded** ([siliconangle.com](https://siliconangle.com/2026/05/12/ai-security-startup-grego-ai-debuts-claims-record-250000-bounty-ai-found-exploit/)). Co-founder Maspero: "frontier models…can't hold and trace complex logic across many layers of interacting systems … no AI lab was able to solve this. But we did." Claims one major AI lab has approached them.
- **Pricing.** Not publicly listed — CTA is "Book A Call" only ([grego.ai/contact](https://grego.ai/contact)).
- **Headline claims.**
  - **$250,000 bug bounty — "largest bug bounty ever paid for a vulnerability found entirely by AI"** — for a critical flaw that would have enabled a **$27.7M drain** in a major, heavily-audited blockchain protocol. **The protocol is not named publicly** ([prnewswire.com](https://www.prnewswire.com/news-releases/grego-ai-prevents-a-27-7m-attack-with-an-ai-reasoning-breakthrough-that-no-frontier-lab-has-achieved-302768644.html); [siliconangle.com](https://siliconangle.com/2026/05/12/ai-security-startup-grego-ai-debuts-claims-record-250000-bounty-ai-found-exploit/); [x.com/0xriptide](https://x.com/0xriptide)).
  - **"$500K+ total bug bounties across 10+ confirmed bug bounties in top tier protocols"** ([grego.ai](https://grego.ai/); [x.com/HackenProof/status/2042588407923130831](https://x.com/HackenProof/status/2042588407923130831)).
  - Claims **#1 Ranked AI Tool** on both Immunefi and HackenProof leaderboards ([grego.ai](https://grego.ai/); [prnewswire.com](https://www.prnewswire.com/news-releases/grego-ai-prevents-a-27-7m-attack-with-an-ai-reasoning-breakthrough-that-no-frontier-lab-has-achieved-302768644.html)).
  - Claims publicly found vulnerabilities in: **Ethereum, Lido, Chainlink, Aave, Uniswap, Polygon, Euler** ([citybiz.co](https://www.citybiz.co/article/845564/grego-ai-emerges-from-stealth-with-ai-platform-for-smart-contract-security-audits/); [linkedin.com/company/gregoai](https://www.linkedin.com/company/gregoai)).
- **Customers (anonymized).** On-site testimonials with X handles: **Centrifuge** (Jeroen), **Dawn Protocol** (James), **Seba** (0xMaki), **Royco** (Shiv), **Tempo** (Horsefacts, noted "one significant false positive so far"), **GenLayer** (KirilA), **Dxai** (LookingForOwls). Logo wall "Helped Secure" is unlabeled ([grego.ai](https://grego.ai/)).
- **Code4rena presence.** A human Grego-affiliated warden exists (`bbl4de`): **$4.97K lifetime earnings, #601 all-time / #40 this year, 1st on Rujira contest (7H + 3M)** ([code4rena.com/@bbl4de](https://code4rena.com/@bbl4de)). **Grego AI itself does not appear to compete in Code4rena contests.**
- **Strengths.** Largest AI-found bounty claim on record ($250K, $27.7M prevented drain); backed by cyber•Fund + Vercel founder; built by Immunefi-trained bounty hunters; auto-confirms via PoC.
- **Weaknesses.** **$27.7M / $250K claim cannot be independently verified** — protocol not named; only 2 weeks public since stealth (May 12 2026); all on-site testimonials are anonymized handles; privacy policy is unmodified "Landio" template dated Jan 23 2025 — sloppy for a security company ([grego.ai/privacy](https://grego.ai/privacy)); HQ city conflict; no independent benchmark (EVMBench, academic, etc.) of Grego's model ([yajin.org](https://yajin.org/blog/2026-03-18-ai-smart-contract-audit-reevmbench/)); StartupHub's $63M / $1.1B numbers are not corroborated. **Code4rena's own site now states "After 5 years of securing DeFi, Code4rena is closing its doors"** ([code4rena.com](https://code4rena.com/)), which limits any vendor's ability to claim long-standing contest history.

**Sources.** [grego.ai](https://grego.ai/); [grego.ai/privacy](https://grego.ai/privacy); [prnewswire.com](https://www.prnewswire.com/news-releases/grego-ai-prevents-a-27-7m-attack-with-an-ai-reasoning-breakthrough-that-no-frontier-lab-has-achieved-302768644.html); [siliconangle.com](https://siliconangle.com/2026/05/12/ai-security-startup-grego-ai-debuts-claims-record-250000-bounty-ai-found-exploit/); [citybiz.co](https://www.citybiz.co/article/845564/grego-ai-emerges-from-stealth-with-ai-platform-for-smart-contract-security-audits/); [thesaasnews.com](https://www.thesaasnews.com/news/grego-ai-prevents-a-27-7m-attack-with-an-ai-reasoning-breakthrough-that-no-frontier/); [linkedin.com/company/gregoai](https://www.linkedin.com/company/gregoai); [code4rena.com/@bbl4de](https://code4rena.com/@bbl4de); [hackenproof.com/hackers/gregoai](https://hackenproof.com/hackers/gregoai); [x.com/0xriptide](https://x.com/0xriptide); [x.com/HackenProof/status/2042588407923130831](https://x.com/HackenProof/status/2042588407923130831); [startuphub.ai](https://www.startuphub.ai/startups/grego-ai); [yajin.org](https://yajin.org/blog/2026-03-18-ai-smart-contract-audit-reevmbench/).

---

### B.5 Sherlock AI

- **URL.** https://sherlock.xyz/ai — docs and announcement posts linked below.
- **Vendor.** Sherlock — established audit-contest and bug-bounty platform (sherlock.xyz). Sherlock AI v2 introduced **Feb 2026** with "deeper, agentic multi-step reasoning … multiple smart-contract languages rather than only Solidity … borrows practices from formal verification" ([sherlock.xyz](https://sherlock.xyz/post/introducing-sherlock-ai); [sherlock.xyz](https://sherlock.xyz/post/inside-the-lab-berndt-on-the-sherlock-ai-v2-upgrade)).
- **What it does.** LLM agentic pipeline on a LangGraph-native architecture, ML-driven static analysis, auditor-informed heuristics, ML models trained on real findings (designed with 0x52). **Multi-model ensemble** ("Opus 4.6, GPT 5.3, and Gemini 3" per Sherlock's own LinkedIn). v2 introduces multi-language + formal-verification-inspired checks; roadmap includes fuzzing and symbolic execution.
- **Pricing.** "Currently in open beta"; full Sherlock audit pricing **$5K–$150K+** (2026 reference); competitive contests **$20K–$200K+** ([sherlock.xyz](https://sherlock.xyz/post/top-10-best-smart-contract-auditing-companies-in-2026)).
- **Published benchmarks.** Vendor-published "Controlled Benchmark" of Sherlock AI v2.2 vs GPT-5.2 and Claude Sonnet 4.5 on the Flayer + Moongate repo (scored by an independent security researcher) ([sherlock.xyz](https://sherlock.xyz/post/controlled-benchmark-chatgpt-and-claude-vs-sherlock-ai)).
- **Customers (named).** "Several of the biggest projects in Web3, including protocols ranked among the top 50 by TVL"; also Ripple XRPL $550K contest, Ethereum Foundation Fusaka $2M stress test, Aave, Morpho, Sky, MegaETH, LayerZero, Centrifuge, Polygon ([sherlock.xyz](https://sherlock.xyz/post/introducing-sherlock-ai); [sherlock.xyz](https://sherlock.xyz/post/top-10-best-smart-contract-auditing-companies-in-2026)).
- **Strengths.** Strongest existing customer-base depth (5 of the top 50 by TVL); bundled with Sherlock's audit-contest and bounty network; open beta lowers evaluation friction.
- **Weaknesses.** Vendor-graded benchmark; Sherlock itself notes "humans still play the role of triaging findings"; coverage-pool sustainability at scale unproven; primarily EVM-focused.

**Sources.** [sherlock.xyz/ai](https://sherlock.xyz/ai); [sherlock.xyz/post/introducing-sherlock-ai](https://sherlock.xyz/post/introducing-sherlock-ai); [sherlock.xyz/post/inside-the-lab-berndt-on-the-sherlock-ai-v2-upgrade](https://sherlock.xyz/post/inside-the-lab-berndt-on-the-sherlock-ai-v2-upgrade); [sherlock.xyz/post/controlled-benchmark-chatgpt-and-claude-vs-sherlock-ai](https://sherlock.xyz/post/controlled-benchmark-chatgpt-and-claude-vs-sherlock-ai); [sherlock.xyz/post/top-10-best-smart-contract-auditing-companies-in-2026](https://sherlock.xyz/post/top-10-best-smart-contract-auditing-companies-in-2026); [sherlock.xyz/post/smart-contract-audit-pricing-a-market-reference-for-2026](https://sherlock.xyz/post/smart-contract-audit-pricing-a-market-reference-for-2026); [sherlock.xyz/post/ai-smart-contract-auditing-in-web3-how-it-works-who-its-for-and-why-it-matters](https://sherlock.xyz/post/ai-smart-contract-auditing-in-web3-how-it-works-who-its-for-and-why-it-matters); [github.com/sherlock-protocol/sherlock-v2-docs](https://github.com/sherlock-protocol/sherlock-v2-docs).

---

### B.6 Olympix

- **URL.** https://olympix.security/ — (olympix.ai redirects there; olympix.io is unrelated mobile-proxy service).
- **Claim.** "Web3's first enterprise-grade proactive DevSecOps tool" — pre-deployment static analysis, automated unit/mutation testing, and **BugPOCer** internal auditor that "combines intermediate representation, custom detectors, symbolic execution, fuzzing, and AI to find real vulnerabilities and automatically prove them with executable POCs" ([olympix.security](https://olympix.security/)).
- **Approach.** Static analysis (proprietary engine) + symbolic execution + fuzzing + AI/LLM + automated unit/mutation test generation. Claims "300% better detection than open-source alternatives" ([olympix.security/resources/free-static-analyzer](https://olympix.security/resources/free-static-analyzer)).
- **Pricing.** Free static analyzer tier; "Enterprise" via contact (no public price).
- **Benchmarks.** Vendor claims 60%+ of "audit-level findings" automated; **100M+ lines Solidity analyzed; $155B+ TVL protected; $288.9M "could have been prevented since Aug 2024"** ([olympix.security](https://olympix.security/)).
- **Customers (named).** LI.FI, Syndicate, Lumia, Magpie XYZ, Nex Labs, Cork Protocol, Arrakis Finance.
- **Strengths.** Strong DevSecOps framing; free static analyzer; mutation testing; named protocols in DeFi.
- **Weaknesses.** Benchmark numbers are vendor-reported, not externally audited; no financial coverage / no accountability for misses; AI component is layered on a deterministic analyzer rather than primary; no third-party head-to-head with EVMBench or Sherlock contests.
- **Other note.** Olympix publicly claims "Out of 42 EVM smart-contract exploits in 2025, 41 would have been prevented. That's 98% preventable. $165M+" ([x.com/OlympixSecurity](https://x.com/OlympixSecurity)).

**Sources.** [olympix.security](https://olympix.security/); [olympix.security/about](https://olympix.security/about); [olympix.security/resources/free-static-analyzer](https://olympix.security/resources/free-static-analyzer); [olympix.security/blog](https://olympix.security/blog/how-ai-powered-security-tools-are-transforming-blockchain-development-an-inside-look-at-olympix); [x.com/OlympixSecurity](https://x.com/OlympixSecurity); [build.avax.network/integrations/olympix](https://build.avax.network/integrations/olympix).

---

### B.7 Almanax

- **URL.** https://almanax.ai/
- **Claim.** "AI Security Engineer" — AI-native AppSec that detects, triages, prioritises and auto-patches code vulnerabilities. **Ecosystem-specialized models** for EVM, Solana, Stellar, Aptos. PR-review bot, custom natural-language rules, agent memory ([almanax.ai](https://almanax.ai/)).
- **Approach.** LLM agents + custom detectors, CI/CD and PR-time scanning, repo-level reasoning, auto-patching.
- **Pricing.** Not publicly listed; 7-day free trial, "enterprise plans", contact sales ([almanax.ai/contact](https://almanax.ai/contact)).
- **Benchmarks.** **ALMX-1** model claims SOTA on SmartBugs, Solodit, Halborn datasets; +50% Access Control, +29% Front-Running, +57% Arithmetic detection vs leading alternatives; lower FP rate ([almanax.ai/blog/almx-1](https://almanax.ai/blog/almx-1-achieves-sota-performance-in-web3-vulnerability-detection); HF dataset [huggingface.co/datasets/almanax/w3sa-bm-solidity](https://huggingface.co/datasets/almanax/w3sa-bm-solidity)). Partnered with **Arbitrum Foundation for 100 ecosystem projects** (Nov 2025) ([forum.arbitrum.foundation](https://forum.arbitrum.foundation/t/non-constitutional-partnering-with-almanax-to-provide-100-ecosystem-projects-with-subscriptions-for-regular-ai-code-audits-as-well-as-continuous-security-review-through-ci-cd-integration/30185)).
- **Customers.** Aptos Labs, Privy, Sapien AI, Phantom, Cat Town, Flexclub.
- **Funding.** **$1M pre-seed** (defy.vc, Jan 2025) ([italianangels.net](https://www.italianangels.net/en/news/almanax-secures-usd1m-to-accelerate-growth-and-innovation-in-web3-security/)).
- **Strengths.** Multi-ecosystem (EVM/Solana/Stellar/Aptos) LLM specialists; public dataset; real partner distribution via Arbitrum Foundation.
- **Weaknesses.** No financial accountability / coverage; vendor-published benchmarks only; primarily LLM-only — no formal verification, no fuzzing; in the Lyuboslav Lyubenov blind pilot, AlmanaxAI produced only **17 findings across 3 Sherlock contests with 1 TP (5.9% precision, 5.0% recall)** — the weakest of the three tools evaluated end-to-end ([github.com/LyuboslavLyubenov/ai-audit-tools-eval](https://github.com/LyuboslavLyubenov/ai-audit-tools-eval)).

**Sources.** [almanax.ai](https://almanax.ai/); [almanax.ai/blog/introducing-almanax](https://almanax.ai/blog/introducing-almanax); [almanax.ai/blog/almx-1-achieves-sota-performance-in-web3-vulnerability-detection](https://almanax.ai/blog/almx-1-achieves-sota-performance-in-web3-vulnerability-detection); [trust.almanax.ai](https://trust.almanax.ai/); [huggingface.co/datasets/almanax/w3sa-bm-solidity](https://huggingface.co/datasets/almanax/w3sa-bm-solidity); [forum.arbitrum.foundation](https://forum.arbitrum.foundation/t/non-constitutional-partnering-with-almanax-to-provide-100-ecosystem-projects-with-subscriptions-for-regular-ai-code-audits-as-well-as-continuous-security-review-through-ci-cd-integration/30185); [italianangels.net](https://www.italianangels.net/en/news/almanax-secures-usd1m-to-accelerate-growth-and-innovation-in-web3-security/); [github.com/LyuboslavLyubenov/ai-audit-tools-eval](https://github.com/LyuboslavLyubenov/ai-audit-tools-eval).

---

### B.8 QuillAI / QuillShield

- **URL.** https://quillai.network/
- **Claim.** "Swarming adversarial AI agents delivering AGI-grade security." Three products: **QuillShield Copilot** (smart-contract audit Copilot for Web3), **QuillCheck** (token due-diligence / rug-pull scan), **QuillGuard** (AI-agent guardrails) ([quillai.network](https://quillai.network/)).
- **Approach.** Adversarial AI swarm simulating attack patterns; integrates with Foundry, Hardhat, Git CI/CD, Cursor, VS Code. QuillCheck uses 21 code parameters + on-chain holder/liquidity simulation.
- **Pricing.** Not publicly listed (book-a-demo).
- **Benchmarks.** No public benchmark; positions QuillShield Copilot as "the first Red Team Copilot for Web3" ([quillai.network](https://quillai.network/)). Independent pilot (Lyuboslav Lyubenov) **excluded QuillAI_Network**: "Credit system prevented runs (insufficient credits; no purchase option available)" ([github.com/LyuboslavLyubenov/ai-audit-tools-eval](https://github.com/LyuboslavLyubenov/ai-audit-tools-eval)).
- **Customers.** Book-a-demo flow only. Partners: Nexus (Jun 2025), Sentient (May 2025).
- **Strengths.** Adversarial-swarm framing; open-source **Claude Skills** available (Feb 2026) — agents can learn QuillShield methodology ([github.com/quillai-network/quillshield_skills](https://github.com/quillai-network/quillshield_skills); [quillaudits.medium.com](https://quillaudits.medium.com/quillaudits-claude-skills-for-smart-contract-audits-279969b69787)).
- **Weaknesses.** No peer-reviewed or third-party benchmarks; no public pricing; AI-swarm framing is largely marketing — underlying detection specifics opaque; parent company QuillAudits is well-known for manual audits, not AI; actually excluded from the only independent pilot due to credit-system access issues.

**Sources.** [quillai.network](https://quillai.network/); [quillainetwork.gitbook.io](https://quillainetwork.gitbook.io/quillai-network/agent-swarm/quillcheck/understanding-quillcheck-report); [quillai.network/resources](https://quillai.network/resources); [quillaudits.medium.com](https://quillaudits.medium.com/quillaudits-claude-skills-for-smart-contract-audits-279969b69787); [github.com/quillai-network/quillshield_skills](https://github.com/quillai-network/quillshield_skills); [www.quillaudits.com](https://www.quillaudits.com/); [github.com/LyuboslavLyubenov/ai-audit-tools-eval](https://github.com/LyuboslavLyubenov/ai-audit-tools-eval).

---

### B.9 ChainGPT Smart Contract Auditor

- **URL.** https://www.chaingpt.org/smart-contract-auditor — Docs: https://docs.chaingpt.org/ai-tools-and-applications/ai-smart-contract-auditor
- **Claim.** "AI-powered smart contract auditor" for Solidity. **Light Audit** (quick scan, minutes) and **Full Audit** (in-depth, <2 hours). Output: severity-classified report, security score, shareable immutable URL.
- **Approach.** LLM-based multi-pass analysis (security, logic, centralization, gas, standards compliance, best practices). API/SDK for CI/CD ([docs](https://docs.chaingpt.org/ai-tools-and-applications/ai-smart-contract-auditor)).
- **Pricing.** Credit-based; "fraction of cost vs $50K–$500K traditional". Free plan: **3 Smart Contract Auditor requests/day** (wallet-gated) ([docs.chaingpt.org/pricing](https://docs.chaingpt.org/ai-tools-and-applications/pricing-and-membership-plans)).
- **Benchmarks.** No public benchmark; vendor-claimed "tier-1 audit quality" without external validation.
- **Customers.** Not publicly listed. CertiK audited the SkyNet product (2023) ([chaingpt.org/blog](https://www.chaingpt.org/blog/chaingpt-on-skynet-certik-audit-review)).
- **Strengths.** Lowest entry bar (3 free audits/day); API/SDK ready; ecosystem-wide distribution via ChainGPT product.
- **Weaknesses.** LLM-only — no formal verification, no fuzzing, no static analysis engine; listed by Augment Code (third-party 2026 guide) among "AI-focused platforms [that] lack quantitative performance metrics that peer-reviewed sources independently verify" alongside Sherlock AI, Nethermind AuditAgent, QuillShield ([augmentcode.com](https://www.augmentcode.com/guides/ai-smart-contract-vulnerability-detection)); weak on-chain exfiltration vs traditional firms.

**Sources.** [chaingpt.org/smart-contract-auditor](https://www.chaingpt.org/smart-contract-auditor); [docs.chaingpt.org](https://docs.chaingpt.org/ai-tools-and-applications/ai-smart-contract-auditor); [docs.chaingpt.org/pricing](https://docs.chaingpt.org/ai-tools-and-applications/pricing-and-membership-plans); [chaingpt.org/blog](https://www.chaingpt.org/blog/chaingpt-on-skynet-certik-audit-review); [augmentcode.com](https://www.augmentcode.com/guides/ai-smart-contract-vulnerability-detection).

---

### B.10 MetaTrust / MetaScan

- **URL.** https://metatrust.io/ — MetaScan: https://metatrust.io/product/metascan
- **Claim.** "The AI Powered Trust Layer for Web3." **MetaScan** is the multi-engine scanner: Security Analyzer (static), **GPTScan** (LLM + static hybrid for logic bugs), Security Prover (formal verification, source-code symbolic execution), Code Clone, Open Source Analyzer, Code Quality, plus an AI Assistant ([metatrust.io/product/metascan](https://metatrust.io/product/metascan)).
- **Approach.** Hybrid stack — static + LLM (GPTScan) + formal verification (Security Prover) + clone-detection. GPTScan is the published research tool (paper: [arxiv.org/abs/2308.03314](https://arxiv.org/abs/2308.03314)).
- **Pricing.** Public SaaS: **Starter free (8K LoC/mo), Pro $149/mo (50K LoC, AI capability, PDF export), Premium from $599/mo (200K LoC+, manual auditing included on annual). $0.015/LoC billed.**
- **Benchmarks.** Vendor claim "97% detection accuracy", 150+ checkers; **no third-party benchmark published** ([metatrust.io](https://metatrust.io/product/metascan)).
- **Customers.** Not publicly listed. Raised $10M ([cryptorank.io](https://cryptorank.io/price/metatrust)).
- **Strengths.** Public SaaS pricing; formal-verification component is unique; academic GPTScan paper.
- **Weaknesses.** Vendor-claimed 97% accuracy is unverified externally; 150+ checkers skewed to EVM/Solidity; LLM component (GPTScan) is research-grade with known FP limits; no financial accountability / coverage.

**Sources.** [metatrust.io](https://metatrust.io/); [metatrust.io/product/metascan](https://metatrust.io/product/metascan); [arxiv.org/abs/2308.03314](https://arxiv.org/abs/2308.03314); [cryptorank.io/price/metatrust](https://cryptorank.io/price/metatrust).

---

### B.11 Cyfrin Aderyn

- **URL.** https://aderyn.cyfrin.io/ — Blog: https://www.cyfrin.io/blog/find-vulnerabilities-in-your-solidity-codebase-using-cyfrin-aderyn — GitHub: https://github.com/Cyfrin/aderyn
- **Claim.** "Open-source Rust-based smart contract static analyzer … detects over 100 vulnerabilities in real time." Aderyn is **fully open-source (Apache-2.0)**, VS Code extension, sub-second analysis, custom detector framework.
- **Approach.** Static analysis (AST traversal), custom detectors in Rust; **not** an LLM tool — explicitly positioned as a Slither-class analyzer ([cyfrin.io](https://www.cyfrin.io/blog/supercharge-secure-solidity-development-the-aderyn-vs-code-extension)).
- **Pricing.** **Free / open-source.** Commercial Cyfrin audits via separate engagement (no public price) ([github.com/Cyfrin/aderyn](https://github.com/Cyfrin/aderyn)).
- **Benchmarks.** Aderyn is run as the "known-issues" filter in Cyfrin's own CodeHawks contests; no published F1 on third-party datasets.
- **Customers (Cyfrin ecosystem).** ZKsync, Chainlink, Wormhole, Lido, Starknet, Ethena, Uniswap ([sherlock.xyz](https://sherlock.xyz/post/top-10-best-smart-contract-auditing-companies-in-2026)).
- **Strengths.** Open-source; Apache-2.0; used as the known-issues filter in real contests; extremely fast.
- **Weaknesses.** Static-only — no formal verification, no LLM reasoning, no fuzzing; Solidity-focused; explicitly "does not replace the need for a comprehensive audit conducted by a professional security team" ([cyfrin.io](https://www.cyfrin.io/blog/find-vulnerabilities-in-your-solidity-codebase-using-cyfrin-aderyn)).

**Sources.** [aderyn.cyfrin.io](https://aderyn.cyfrin.io/); [github.com/Cyfrin/aderyn](https://github.com/Cyfrin/aderyn); [cyfrin.io](https://www.cyfrin.io/blog/find-vulnerabilities-in-your-solidity-codebase-using-cyfrin-aderyn); [cyfrin.io](https://www.cyfrin.io/blog/supercharge-secure-solidity-development-the-aderyn-vs-code-extension); [sherlock.xyz](https://sherlock.xyz/post/top-10-best-smart-contract-auditing-companies-in-2026).

---

### B.12 Certora (Prover + AI Composer)

- **URL.** https://www.certora.com/ — Pricing: https://www.certora.com/pricing
- **Claim.** Certora Prover is the leading **SMT-based formal-verification engine** for EVM/Solana/Stellar/Sui; **AI Composer** (alpha, open-source, Nov 2025) is "the first safe AI coding platform for smart contracts" — composes AI code generation with formal verification in the loop ([certora.com/blog/certora-ai-composer-first-safe-ai-coding-platform](https://www.certora.com/blog/certora-ai-composer-first-safe-ai-coding-platform)).
- **Approach.** Formal verification (SMT/CVL) as core; **AI Composer** = LLM code-gen wrapped by Certora Prover spec checks. Prover was **open-sourced Feb 2025** ([certora.com/blog/certora-goes-open-source](https://www.certora.com/blog/certora-goes-open-source)).
- **Pricing.** **Basic free** (2,000 min/month Prover runtime); **Premium** (unlimited Prover, onboarding, up to 10 seats — contact); **Enterprise** (retainer with experts writing rules — contact).
- **Benchmarks.** No single published F1; positioning is "mathematical proof" rather than detection-rate benchmark.
- **Customers (named).** Safe, Aave V3 Risk-Steward, EigenLayer, Kamino Lending, Lido Dual Governance, ether.fi, Syndicate, TrustToken, Notional ([certora.com/audits](https://www.certora.com/audits)).
- **Strengths.** Formal-verification backbone; open-source Prover; named tier-1 customers.
- **Weaknesses.** Premium/Enterprise pricing opaque; AI Composer is alpha (vendor acknowledged); formal specs still human-written — does not eliminate the manual review burden; no financial coverage.

**Sources.** [certora.com/blog/certora-ai-composer-first-safe-ai-coding-platform](https://www.certora.com/blog/certora-ai-composer-first-safe-ai-coding-platform); [certora.com/blog/certora-goes-open-source](https://www.certora.com/blog/certora-goes-open-source); [certora.com/pricing](https://www.certora.com/pricing); [certora.com/audits](https://www.certora.com/audits); [github.com/Certora/AIComposer](https://github.com/Certora/AIComposer).

---

### B.13 Zellic + V12

- **URL.** https://www.zellic.io/ — V12: https://v12.zellic.io/ — DARPA AIxCC: https://www.zellic.io/blog/zellic-darpa-aixcc
- **Claim.** Zellic itself is a high-end human auditor; **V12** (launched **25 Sep 2025**) is their "autonomous Solidity auditor" — explicit positioning as an AI auditor that outperforms low-quality firms on common bug classes. **DARPA AIxCC Small Business Track winner ($1M, 2024)** ([zellic.io/blog/zellic-darpa-aixcc](https://www.zellic.io/blog/zellic-darpa-aixcc); [newsletter.zellic.io](https://newsletter.zellic.io/p/zellic-security-roundup-october-25)).
- **Approach.** Zellic's AVRS (Automated Vulnerability Research System): LLM agents in a "Graph of Thoughts" + traditional static analysis + fuzzing + symbolic execution, tool-use capable. V12 is an autonomous LLM-based Solidity auditor.
- **Pricing.** Manual audits: opaque / per-engagement. V12: positioned as "cheap, self-serve" — exact public price not listed on the site.
- **Benchmarks.** Vendor claim: **~70% of bugs in Zellic's internal corpus of 1,000+ audits are "coding mistakes" that LLMs can catch**; no public F1 vs Slither/Slither-Aderyn ([newsletter.zellic.io](https://newsletter.zellic.io/p/zellic-security-roundup-october-25)).
- **Customers (named).** Mysten Labs (Sui), Axiom, Scroll, Wintermute, Ambient, Protocol Guild, Ante, Injective, Omni, **Code4rena (acquired 2024)**, Zenith, Ripple, MyShell, Polymarket, Falcon Finance, Hyperlane, Filecoin ([zellic.io](https://www.zellic.io/); [reports.zellic.io](https://reports.zellic.io/publications/)).
- **Strengths.** DARPA winner; inherited Zellic's customer base; explicitly positions V12 as "at least as good as the worst auditing firms" — honest, conservative claim.
- **Weaknesses.** Zellic's own newsletter admits "AI cannot find all bugs, and the best humans still far outperform even the best AI systems"; V12 is "at least as good as the worst auditing firms" — not positioned to replace top-tier audits.

**Sources.** [zellic.io](https://www.zellic.io/); [zellic.io/blog/zellic-darpa-aixcc](https://www.zellic.io/blog/zellic-darpa-aixcc); [newsletter.zellic.io](https://newsletter.zellic.io/p/zellic-security-roundup-october-25); [v12.zellic.io](https://v12.zellic.io/); [reports.zellic.io/publications](https://reports.zellic.io/publications/).

---

### B.14 OpenZeppelin AI Auditor

- **URL.** https://www.openzeppelin.com/news/introducing-continuous-security-program — Contracts MCP: https://www.openzeppelin.com/news/introducing-contracts-mcp — MCP server: https://mcp.openzeppelin.com/
- **Claim.** **OpenZeppelin AI Auditor** is the in-house tool used by OZ researchers for the new **Continuous Security Program** (May 2026) — a subscription, lifecycle-spanning engagement model ("Architect / Build / Secure / Support"). **Contracts MCP** (Jul 2025) is a server that injects OZ's Wizard standards into any LLM coding assistant (Cursor, Claude, Gemini, Windsurf, VS Code).
- **Approach.** Model-agnostic LLM architecture trained on a decade of OZ's curated audit findings; repository-level reasoning (dependencies, cross-contract, infra). MCP enforces OZ rule-set on AI-generated code.
- **Pricing.** "Subscription-based engagement model" — **not publicly listed**.
- **Benchmarks.** Vendor claim: **"roughly one in three AI Auditor scans surfaces a high- or critical-severity finding"** (≈33% of scans yield H/C) ([openzeppelin.com](https://www.openzeppelin.com/news/introducing-continuous-security-program)). No external benchmark.
- **Customers (named).** Aave, Uniswap, Compound, Fidelity Digital Assets, DTCC, Ethereum Foundation, BitGo, ZKsync, WisdomTree — **900+ audits, $250B+ in onchain value secured**.
- **Strengths.** Most credible brand; named institutional customers; MCP tool extends value to AI-generated code.
- **Weaknesses.** Enterprise pricing opaque; 8–16 week queues per Sherlock listing; AI tool bundled into a high-touch engagement (not standalone); no public peer-reviewed F1; no financial accountability / no coverage ([sherlock.xyz](https://sherlock.xyz/post/top-10-best-smart-contract-auditing-companies-in-2026)).

**Sources.** [openzeppelin.com/news/introducing-continuous-security-program](https://www.openzeppelin.com/news/introducing-continuous-security-program); [openzeppelin.com/news/introducing-contracts-mcp](https://www.openzeppelin.com/news/introducing-contracts-mcp); [mcp.openzeppelin.com](https://mcp.openzeppelin.com/); [sherlock.xyz](https://sherlock.xyz/post/top-10-best-smart-contract-auditing-companies-in-2026).

---

### B.15 Spearbit / Cantina AI

- **URLs.** Spearbit: https://spearbit.com/ — Cantina: https://cantina.xyz/ — Cantina AI Code Analyzer: https://cantina.xyz/solutions/code-analyzer/enterprise
- **Claim.** Spearbit's premium tier is now delivered **via Cantina** (Spearbit + Cantina merged under one leadership: Hari Mulackal CEO, ex-Ethereum Foundation Solidity). Cantina ("AI-Native Security, Backed by Human Expertise") combines audits, contests, bounties, code review competitions, and the **AI Code Analyzer** enterprise product. Claims "AI-powered code analysis protecting $25B+ in production value" ([cantina.xyz/welcome](https://cantina.xyz/welcome); [cantina.xyz/solutions/code-analyzer/enterprise](https://cantina.xyz/solutions/code-analyzer/enterprise)).
- **Approach.** AI code analyzer filters false positives to deliver high-fidelity findings. Fine-tuned **Cantina AI** assists with writing contest findings (scoring, improvement suggestions, review) ([cantina.xyz/blog/changelog-march-15](https://cantina.xyz/blog/changelog-march-15)).
- **Pricing.** Enterprise Code Analyzer — gated, "Request Access"; audit/contest pricing per engagement.
- **Benchmarks.** No public F1; AI Assistant testimonial (Coinbase Cryptography Team): "subtle bugs … that had already gone through thorough reviews" ([cantina.xyz](https://cantina.xyz/solutions/code-analyzer/enterprise)). EVMBench-related (per Spearbit blog): "AI agents can exploit smart contract bugs 72.2% of the time" ([spearbit.com/blog](https://spearbit.com/blog)).
- **Customers (named).** Coinbase (cryptography), Ripple, Aave, Morpho, Sky, MegaETH, LayerZero, Centrifuge, Polygon, plus 5,000+ vetted researchers in bug-bounty network.
- **Strengths.** Strongest contest/researcher network; inherited Spearbit's reputation; AI Code Analyzer gated-access tier; owns the Code4rena brand via Zellic acquisition (per V12 above) and Sherlock competitor data.
- **Weaknesses.** Enterprise access gated; no public F1; coverage product ties to Sherlock Shield (insurance-like complexity); primary identity is "researcher network," AI is auxiliary.

**Sources.** [spearbit.com](https://spearbit.com/); [spearbit.com/about](https://spearbit.com/about); [spearbit.com/blog](https://spearbit.com/blog); [cantina.xyz/welcome](https://cantina.xyz/welcome); [cantina.xyz/solutions/code-analyzer/enterprise](https://cantina.xyz/solutions/code-analyzer/enterprise); [cantina.xyz/blog/changelog-march-15](https://cantina.xyz/blog/changelog-march-15); [cantina.xyz/blog/why-2026-web3-security-needs-ai-threat-intelligence](https://cantina.xyz/blog/why-2026-web3-security-needs-ai-threat-intelligence).

---

### B.16 Others (Auditware, Hacken AI, LISA, Hound, Finite Monkey)

These were named in competitive scans but are either not strictly "AI auditors" or failed in independent pilots.

- **Auditware** (auditwizard.io — actual brand is **Auditware**, not AuditWizard). **Operational security** (OpSec) firm, not primarily AI: W3OS/SEAL-aligned OpSec audits, Sentry monitoring, smart-contract audits as one of five service lines. Manual audits + automated scanning. Reports at [github.com/Auditware/audits](https://github.com/Auditware/audits). **Not a same-category competitor** to Savant Chat ([auditwizard.io](https://auditwizard.io/)).
- **Hacken — AI Red Teaming & Smart Contract Audit** (hacken.io). The Hacken "AI" offering is **auditing AI systems** (prompt-injection, model inversion, data poisoning, MCP/agent security) — **not AI-auditing smart contracts**. Standard Hacken smart-contract audits remain manual. Coverage: EU AI Act, NIST AI RMF, HIPAA, SOC 2. Customers: Solana, Avalanche, KuCoin, Gate.io, VeChain, IoTeX, PAID Network, Griffin AI, Openfabric AI ([hacken.io/services/ai-system-security-audit](https://hacken.io/services/ai-system-security-audit/); [docs.hacken.io/methodologies/AI_Red_Team](https://docs.hacken.io/methodologies/AI_Red_Team/)). **Overlap with Savant Chat is limited.**
- **LISA, Bughunter.live, Finite Monkey, Hound, Solidity Scan, Quant Pulsar** were all **excluded** from the Lyuboslav Lyubenov blind pilot for operational reasons (assistant-like outputs, instability, compile failures, 28-hour stalls, no AI-specific added value) ([github.com/LyuboslavLyubenov/ai-audit-tools-eval](https://github.com/LyuboslavLyubenov/ai-audit-tools-eval)).
- **Octane Security** was also **excluded** from the same pilot — **invitation-only, no invite obtained** ([github.com/LyuboslavLyubenov/ai-audit-tools-eval](https://github.com/LyuboslavLyubenov/ai-audit-tools-eval)).
- **Trail of Bits publicly abandoned their AI auditor "Toucan" in 2023** because "the false positive and hallucination rates become too high" ([trailofbits.com](https://blog.trailofbits.com/2023/03/22/codex-and-gpt4-cant-beat-humans-on-smart-contract-audits/), via [augmentcode.com](https://www.augmentcode.com/guides/ai-smart-contract-vulnerability-detection)).

---

## C. savant.chat positioning analysis

> **savant.chat fact-pack** (the canonical source of every claim below is the company itself — primary URLs cited inline):
>
> - **Operated by Novel Codes DMCC**, Dubai (Unit 1409, Preatoni Tower, JLT), trade license DMCC193534; **Igor Gulamov** is General Manager per imprint, **CTO per LinkedIn** ([savant.chat/imprint](https://savant.chat/imprint); [linkedin.com/in/igorgulamov](https://ae.linkedin.com/in/igorgulamov)). Co-founder **Alexandra Gulamova** ([crunchbase.com/person/alexandra-gulamova](https://www.crunchbase.com/person/alexandra-gulamova)).
> - Igor Gulamov is also the **co-founder of ZeroPool Network** (ETHBoston 2019 winner) ([x.com/igorgulamov](https://x.com/igorgulamov); [devpost.com/snjax](https://devpost.com/snjax)).
> - **Tagline:** "Find Smart Contract Vulnerabilities Before Attackers Do" — "Deeper than a scanner. Faster than a manual audit. AI security for Solidity, Vyper, and Rust smart contracts" ([savant.chat](https://savant.chat/)).
> - **Multi-agent AI** ("thousands of parallel LLM calls with different specialized models") covering **200+ vulnerability classes** — the broadest taxonomy in the category per its own claim ([savant.chat](https://savant.chat/); [savant.chat/blog](https://savant.chat/blog/how-ai-detects-smart-contract-vulnerabilities), Feb 12 2026).
> - **CTFBench self-reported accuracy 87–95%** (v0.2) ([savant.chat](https://savant.chat/)); **EVMBench score "82%"** per Twitter bio ([x.com/savantchat](https://x.com/savantchat)) and `auditdbio/savant-chat-evmbench-report` repo ([github.com/auditdbio](https://github.com/auditdbio)).
> - **Sherlock Symbiotic contest, Sep 2 2025** — **Top 6 finish** against dozens of human auditors; press release claims "80% of zero-day exploits submitted to the Savant team were successfully identified and mitigated by SavantChat" ([globenewswire.com](https://www.globenewswire.com/news-release/2025/09/02/3143051/0/en/savant-chat-achieves-a-historic-top-6-ranking-in-the-sherlock-defi-audit-contest.html); [web3secnews.substack.com](https://web3secnews.substack.com/p/how-multi-agent-ai-is-catching-the), Nov 14 2025).
> - **Independent blind pilot** (Lyuboslav Lyubenov et al., Jan 27 2026): SavantChat **7/7 TPs on Crestal contest (100% recall, ~41% precision, quality 3–4)**, but 0/3 on Yearn yBOLD and 0/10 on CAP — aggregate 35% recall, 17.9% precision across 20 adjudicated issues ([github.com/LyuboslavLyubenov/ai-audit-tools-eval](https://github.com/LyuboslavLyubenov/ai-audit-tools-eval)).
> - **Named customers/partners** (site banner + ecosystem page + press): **1inch, Lido, Pessimistic Security, OXORIO, MixBytes, Gearbox Protocol, Hexens, Bored Ghosts (ex-Aave), BugBlow** ([savant.chat](https://savant.chat/); [savant.chat/ecosystem](https://savant.chat/ecosystem)).
> - **1inch testimonial** (Jul 1 2025, 6.5K views): "1inch is evaluating @savantchat, aiming to catch and fix issues early — in development, not in production — in minutes, not days — at a fraction of the cost of a human audit — finding errors humans overlook. Human-AI partnership is part of the future of Web3" ([x.com/1inch/status/1940035968125284690](https://x.com/1inch/status/1940035968125284690)). Feb 25 2026: 1inch "covered phishing protection with @PhishFort, AI-powered audits with @savantchat" ([x.com/1inch/status/2027435124447469579](https://x.com/1inch/status/2027435124447469579)).
> - **OXORIO testimonial** (Apr 14 2025, 902 views): "We recently tested @savantchat — an AI-powered auditing tool — on a real DeFi project (~3k SLOC), previously audited by multiple top firms. The question: can AI surface anything meaningful post-audit? Spoiler: it can. And it made us rethink how automation can augment human reviews" ([x.com/0xorio/status/1911822312124330132](https://x.com/0xorio/status/1911822312124330132)). **1inch blog, Dec 23 2025**: "1inch uses SavantChat's AI tools to enhance smart contract security" — pre-audit results for Aqua and SwapVM "looked promising" ([1inch-network.ghost.io](https://1inch-network.ghost.io/1inch-uses-savantchats-ai-tools/)).
> - **Pessimistic Security testimonial** ([x.com/pessimistic_io/status/1897264142308008089](https://x.com/pessimistic_io/status/1897264142308008089)): "We recently tested savant.chat and were pleasantly surprised! It correctly identified several findings on our test contract and didn't produce a single clear false positive. This is the first genuinely useful security tool we've come across in quite a while."
> - **Lido (Vasiliy Shapovalov)** ([x.com/_vshapovalov/status/1976320011850612884](https://x.com/_vshapovalov/status/1976320011850612884)): "This checks with my impression, @savantchat does a great job of filtering false positives while finding issues. It's not an audit replacement — as faster, cheaper tool its place in developer pipeline is closer to an internal review or a heavier linter run."
> - **Petr Korolev / @skywinder** ([x.com/skywinder/status/1895228438237061588](https://x.com/skywinder/status/1895228438237061588)): "I just put Savant.Chat to the test on a complex contract — and wow, what a game-changer! It uncovered a critical issue that many seasoned auditors overlooked."
> - **Pricing.** **Pay-as-you-go per token.** **Lite $0.07/line, Advanced $0.12/line, Pro $0.5/line.** Account tiers: Basic ($250/mo), Pro ($2,500/mo), Enterprise (custom). **$75 free credit** on signup, no credit card ([savant.chat/pricing](https://savant.chat/pricing)).
> - **Multi-language.** **Solidity (Ethereum + EVM L2s), Vyper (Curve-style DeFi), Rust (Solana + Near)** ([savant.chat](https://savant.chat/); [savant.chat/blog](https://savant.chat/blog/how-ai-detects-smart-contract-vulnerabilities)).
> - **Reproductions of named exploits.** CrossCurve (Feb 2 2026, "We've reproduced the root cause of @crosscurvefi exploit. The vector matches @0xswapnet and @ApertureFinance") ([x.com/savantchat/status/2018267868438343693](https://x.com/savantchat/status/2018267868438343693)); Abracadabra hack ([x.com/savantchat/status/1975536855027171437](https://x.com/savantchat/status/1975536855027171437)); Balancer hack ([x.com/savantchat/status/1986759884814098942](https://x.com/savantchat/status/1986759884814098942)) — per Web3sec News, Nov 14 2025.
> - **Engineering depth.** Blog post "We're building an autonomous senior-level auditor. Here's one of the pieces" (Apr 3 2026): documents building a **20,000-vulnerability RAG reference book** distilled to **200 stable classes** + multi-agent pipeline that ends with a "critic subagent" that "constructs proof of concept exploits for detected vulnerabilities and checks that the attack is actually reproducible." Preliminary benchmark: **detection rates up 20–50%** vs same agent without the reference book, with explicit de-leakage of benchmark overlaps ([savant.chat/blog](https://savant.chat/blog/building-autonomous-auditor-vulnerability-reference-book)).
> - **Conferences.** Alexandra Gulamova spoke at **Blockchain Community Day 2026** (Jun 9 2026) — "AI-native security: new standards for secure smart contract development" ([wearecommunity.io](https://wearecommunity.io/events/blockchain-community-day-2026/talks/108839); YouTube [youtube.com](https://www.youtube.com/watch?v=ZrZ4AwwzMtY)). Igor Gulamov spoke on the panel "Intelligent Defense: AI's Role in Securing Crypto and DLT Financial…" ([wearecommunity.io](https://wearecommunity.io/events/blockchain-community-day-2026/talks/108849)).
> - **Origin story.** Igor Gulamov, "We Got Tired of Smart Contract Hacks, So We Built Savant Chat," Medium, Mar 17 2025 ([medium.com/@igorgulamov](https://medium.com/@igorgulamov/we-got-tired-of-smart-contract-hacks-so-we-built-savant-chat-f63f0e57b870)).
> - **GitHub.** All public code under [@auditdbio](https://github.com/auditdbio): `savant-docs`, `savant-chat-evmbench-report`, `ctfbench` (10 stars), `savant-smart-contract-analyzer`, `savant-cicd-integration-example`, `litellm` fork, `audit-web` (Apache-2.0), `audit-backend` (Rust, Apache-2.0).
> - **Privacy & data.** Code processed securely and not stored or shared beyond the request. "We do not store your uploaded code or project files beyond the period necessary to process your request." Operates from UAE ([savant.chat/privacy-policy](https://savant.chat/privacy-policy), updated Apr 8 2025).
> - **Disclaimer.** Site Terms: "AI-generated audit reports provided by Savant Chat may contain false positives (flagging issues that are not …)" ([savant.chat/terms-of-service](https://savant.chat/terms-of-service)).

### C.1 Where Savant Chat wins vs each competitor

| Competitor | Where Savant Chat wins | Evidence |
|---|---|---|
| **Nethermind AuditAgent** | **Public, transparent independent blind-pilot result (100% recall on a real Sherlock contest, Crestal #755, with deep PoCs)** — AuditAgent only published EVMBench self-numbers and one Nethermind-internal 29-audit retrospective. **Pay-as-you-go pricing with a no-card $75 trial credit** vs AuditAgent's minimum **$199/mo Pro** subscription. **No vendor lock-in** — pure SaaS, no Nethermind-services cross-sell. | [github.com/LyuboslavLyubenov/ai-audit-tools-eval](https://github.com/LyuboslavLyubenov/ai-audit-tools-eval); [savant.chat/pricing](https://savant.chat/pricing); [docs.auditagent.nethermind.io/pricing](https://docs.auditagent.nethermind.io/pricing/subscription-plans) |
| **Octane Security** | **Public pricing with $75 free credits** vs Octane's invitation-only sales funnel. **Open public engineering blog** that documents the RAG / multi-agent / PoC-validation architecture in depth. **Multi-language support (Solidity + Vyper + Rust/NEAR + Rust/Solana) explicitly marketed** vs Octane's broader-but-less-Solidity-specific positioning. **Named production use case for DeFi audits** (1inch pre-audit on Aqua/SwapVM, Lido, Gearbox) vs Octane's primary positioning around perimeter code (CVE-2026-5888, Nethermind execution client). | [savant.chat](https://savant.chat/); [savant.chat/blog](https://savant.chat/blog/building-autonomous-auditor-vulnerability-reference-book); [1inch-network.ghost.io](https://1inch-network.ghost.io/1inch-uses-savantchats-ai-tools/) |
| **TestMachine (Azimuth)** | **Coverage of Vyper and Rust/NEAR** vs Azimuth (Solidity/Vyper/Rust-Solana only). **No dependency on PoC execution against forked mainnet** — Savant Chat works on Rust/NEAR/Solana anchor and Vyper without a forked mainnet test harness. **Open engineering blog** describing methodology with raw numbers. **Public independent verification** on a real Sherlock contest with judge-adjudicated ground truth (Lyuboslav pilot). | [savant.chat](https://savant.chat/); [github.com/LyuboslavLyubenov/ai-audit-tools-eval](https://github.com/LyuboslavLyubenov/ai-audit-tools-eval) |
| **Grego AI** | **Founded 2024, public since Mar 2025** — 14+ months of public operating history vs Grego's 2 months. **No unverifiable "largest-ever" claim** — every Savant Chat claim has a public citation (Twitter, X, GlobeNewswire, GitHub). **Named customers whose brand can be verified** (1inch, Lido, Pessimistic, OXORIO, Gearbox, Hexens) — not anonymized handles. **Open independent pilot score on a third-party-judged Sherlock contest** vs Grego's reliance on the unnamed "heavily-audited protocol" claim. | [globenewswire.com](https://www.globenewswire.com/news-release/2025/09/02/3143051/0/en/savant-chat-achieves-a-historic-top-6-ranking-in-the-sherlock-defi-audit-contest.html); [github.com/LyuboslavLyubenov/ai-audit-tools-eval](https://github.com/LyuboslavLyubenov/ai-audit-tools-eval); [prnewswire.com (Grego)](https://www.prnewswire.com/news-releases/grego-ai-prevents-a-27-7m-attack-with-an-ai-reasoning-breakthrough-that-no-frontier-lab-has-achieved-302768644.html) |
| **Sherlock AI** | **Customer is not required to engage Sherlock audits/contests** — Savant Chat is productized as a standalone subscription vs Sherlock AI being tightly coupled to the Sherlock ecosystem. **Public pricing with $75 trial** vs "currently in open beta." **Wider language support** (Vyper, Rust/NEAR) explicitly marketed. **No customer lock-in to Sherlock Shield coverage**. | [sherlock.xyz](https://sherlock.xyz/post/introducing-sherlock-ai); [savant.chat/pricing](https://savant.chat/pricing) |
| **Olympix** | **Multi-agent AI primary** vs Olympix's static+symbolic-execution+fuzzing primary with AI as a wrapper. **PoC-style AI reasoning depth** vs Olympix's DevSecOps focus. **Public pricing with $75 trial** vs "Enterprise — contact." **Engineering blog explaining the architecture in depth**. | [olympix.security](https://olympix.security/); [savant.chat](https://savant.chat/); [savant.chat/blog](https://savant.chat/blog/building-autonomous-auditor-vulnerability-reference-book) |
| **Almanax** | **Deeper independent benchmark** (Lyuboslav pilot shows SavantChat found 7/7 judge-adjudicated issues on Crestal with detailed PoCs vs Almanax's 1 TP across 3 contests, no PoC depth). **Engineering blog with raw numbers**. **Open, reproducible methodology (RAG reference book, public EVMBench report repo)** vs opaque ALMX-1. | [github.com/LyuboslavLyubenov/ai-audit-tools-eval](https://github.com/LyuboslavLyubenov/ai-audit-tools-eval); [savant.chat/blog](https://savant.chat/blog/building-autonomous-auditor-vulnerability-reference-book); [almanax.ai/blog](https://almanax.ai/blog/almx-1-achieves-sota-performance-in-web3-vulnerability-detection) |
| **QuillAI / QuillShield** | **Customer can actually run a Savant Chat scan end-to-end without a credit-system access wall** vs QuillAI which was **excluded** from the Lyuboslav pilot because "credit system prevented runs; no purchase option available." **Public pricing** vs book-a-demo only. **Public engineering blog** vs opaque agent-swarm marketing. | [github.com/LyuboslavLyubenov/ai-audit-tools-eval](https://github.com/LyuboslavLyubenov/ai-audit-tools-eval); [quillai.network](https://quillai.network/); [savant.chat/pricing](https://savant.chat/pricing) |
| **ChainGPT** | **Engineering depth documented in blog posts vs vendor "tier-1 audit quality" claim**. **No 3-requests-per-day ceiling** — Savant Chat lets you audit full codebases. **Pay-as-you-go with $75 trial vs credit-wallet gating**. | [savant.chat/pricing](https://savant.chat/pricing); [chaingpt.org](https://www.chaingpt.org/smart-contract-auditor); [docs.chaingpt.org/pricing](https://docs.chaingpt.org/ai-tools-and-applications/pricing-and-membership-plans) |
| **MetaTrust / MetaScan** | **Public independent pilot result with detail** vs MetaTrust's vendor-only "97% detection accuracy" claim. **Pro pricing $149/mo for MetaTrust vs Savant Chat's pay-as-you-go from $0.07/line with no monthly minimum**. **Wider language support (Vyper, Rust/NEAR, Rust/Solana)** vs MetaScan's EVM/Solidity skew. | [metatrust.io/product/metascan](https://metatrust.io/product/metascan); [savant.chat/pricing](https://savant.chat/pricing); [github.com/LyuboslavLyubenov/ai-audit-tools-eval](https://github.com/LyuboslavLyubenov/ai-audit-tools-eval) |
| **Cyfrin Aderyn** | **Semantic LLM reasoning vs static-only pattern matching**. **Cross-function / cross-contract / read-only reentrancy, oracle manipulation, MEV, business-logic edge cases** explicitly covered — Aderyn is "no LLM reasoning, no fuzzing." **Documented RAG-over-20k-vulnerabilities approach** vs Aderyn's open-source detector framework. | [savant.chat/blog](https://savant.chat/blog/how-ai-detects-smart-contract-vulnerabilities); [aderyn.cyfrin.io](https://aderyn.cyfrin.io/) |
| **Certora** | **No need for hand-written formal specs** — Savant Chat detects and reasons about business logic directly. **Faster turnaround (minutes, not weeks)** vs Prover-based formal verification. **Wider language support (Vyper, Rust/NEAR)**. **Open public independent pilot score** vs Certora's "mathematical proof" positioning that doesn't directly compete on detection benchmarks. | [certora.com/blog](https://www.certora.com/blog/certora-ai-composer-first-safe-ai-coding-platform); [savant.chat/blog](https://savant.chat/blog/how-ai-detects-smart-contract-vulnerabilities) |
| **Zellic V12** | **Standalone product, no Zellic-firm coupling required**. **Public independent pilot result** vs Zellic's "≈70% of our corpus is LLMs-can-catch coding mistakes" internal claim. **Open engineering blog** vs DARPA-win framing. | [zellic.io/blog](https://www.zellic.io/blog/zellic-darpa-aixcc); [savant.chat/blog](https://savant.chat/blog/building-autonomous-auditor-vulnerability-reference-book); [github.com/LyuboslavLyubenov/ai-audit-tools-eval](https://github.com/LyuboslavLyubenov/ai-audit-tools-eval) |
| **OpenZeppelin AI Auditor** | **No $250K/year OZ engagement required**. **Pay-as-you-go with $75 trial**. **Independent public pilot score** vs OZ's "1 in 3 scans yields H/C" internal claim. **Public engineering blog**. | [openzeppelin.com](https://www.openzeppelin.com/news/introducing-continuous-security-program); [savant.chat/pricing](https://savant.chat/pricing); [github.com/LyuboslavLyubenov/ai-audit-tools-eval](https://github.com/LyuboslavLyubenov/ai-audit-tools-eval) |
| **Spearbit / Cantina AI** | **Not gated by network-membership or contest access**. **Wider language coverage (Vyper, Rust/NEAR)**. **Pay-as-you-go**. **Independent public pilot score** vs Cantina AI's "Request Access" gating. | [cantina.xyz](https://cantina.xyz/solutions/code-analyzer/enterprise); [savant.chat](https://savant.chat/); [github.com/LyuboslavLyubenov/ai-audit-tools-eval](https://github.com/LyuboslavLyubenov/ai-audit-tools-eval) |

### C.2 Savant Chat's unique proof points (with sources)

1. **Only AI auditor to date with a published Top-6 finish against human auditors in a Sherlock contest.** Sep 2 2025, Symbiotic DeFi contest — competed directly against dozens of expert human auditors ([globenewswire.com](https://www.globenewswire.com/news-release/2025/09/02/3143051/0/en/savant-chat-achieves-a-historic-top-6-ranking-in-the-sherlock-defi-audit-contest.html)).
2. **Only AI auditor with a judge-adjudicated 100% recall on a real Sherlock contest (Crestal #755, Jan 27 2026 blind pilot).** 7/7 TPs at ~41% precision and auditor quality 3–4 ([github.com/LyuboslavLyubenov/ai-audit-tools-eval](https://github.com/LyuboslavLyubenov/ai-audit-tools-eval)).
3. **1inch, Lido, Pessimistic Security, OXORIO, Gearbox Protocol, Hexens** named on the site banner and ecosystem page — every name citable to a public post or press release ([savant.chat/ecosystem](https://savant.chat/ecosystem); [x.com/1inch/status/1940035968125284690](https://x.com/1inch/status/1940035968125284690); [x.com/0xorio/status/1911822312124330132](https://x.com/0xorio/status/1911822312124330132); [x.com/pessimistic_io/status/1897264142308008089](https://x.com/pessimistic_io/status/1897264142308008089); [x.com/_vshapovalov/status/1976320011850612884](https://x.com/_vshapovalov/status/1976320011850612884)).
4. **RAG reference book built from 20,000 real vulnerabilities → 200 stable classes → multi-stage audit pipeline that ends with a critic subagent that builds and validates PoCs.** Engineering detail is published, not marketing ([savant.chat/blog](https://savant.chat/blog/building-autonomous-auditor-vulnerability-reference-book), Apr 3 2026).
5. **Documented multi-language support**: Solidity + Vyper + Rust (NEAR + Solana) ([savant.chat](https://savant.chat/); [savant.chat/blog](https://savant.chat/blog/how-ai-detects-smart-contract-vulnerabilities)).
6. **Reproductions of named on-chain exploits**: CrossCurve, Abracadabra, Balancer — each with a Twitter citation ([x.com/savantchat](https://x.com/savantchat)).
7. **Public EVMBench report repo under `@auditdbio/savant-chat-evmbench-report`** — open methodology ([github.com/auditdbio](https://github.com/auditdbio)).
8. **Public CTFBench self-report 87–95% accuracy** vs frontier base models on the same harness ([savant.chat](https://savant.chat/)). **Framing note:** CTFBench's methodology was authored by the Savant team and its repo lives under the Savant-affiliated `auditdbio` org — present it as "our open, reproducible benchmark," never as "independent."
9. **Public pricing with $75 trial, no credit card** ([savant.chat/pricing](https://savant.chat/pricing)).
10. **Founder credibility**: Igor Gulamov is the co-founder of ZeroPool Network (ETHBoston 2019 winner) and a recognized ZK researcher ([x.com/igorgulamov](https://x.com/igorgulamov)).

### C.3 Gaps to AVOID overclaiming

These are honest weaknesses. The marketing site must not imply what the evidence does not support.

| Claim to avoid | Why it's unsafe | What to say instead |
|---|---|---|
| "Savant Chat replaces human auditors." | **Vasiliy Shapovalov (Lido) explicitly says** "It's not an audit replacement — as faster, cheaper tool its place in developer pipeline is closer to an internal review or a heavier linter run" ([x.com/_vshapovalov](https://x.com/_vshapovalov/status/1976320011850612884)). The Lyuboslav blind pilot found Savant Chat at 0/3 recall on Yearn yBOLD and 0/10 recall on CAP — tools "are far from actually discovering significant, novel bugs in production systems" and struggle with "cross-contract economic/accounting logic" ([github.com/LyuboslavLyubenov/ai-audit-tools-eval](https://github.com/LyuboslavLyubenov/ai-audit-tools-eval)). | "AI audits catch what scanners miss, fast — and feed human auditors a head start. Savant Chat is the second pair of eyes, not the last one." |
| "Top EVMBench score." | SavantChat self-reports "82%" on EVMBench and lists it in its bio. **TestMachine self-reports 78.6% and AuditAgent published 67% post-validation**. The numbers are not directly comparable because TestMachine's leaderboard is self-curated ([testmachine.ai/evmbench](https://testmachine.ai/evmbench)). | "87–95% accuracy on CTFBench, our open-methodology benchmark (published on ethresear.ch); EVMBench results are published in our `auditdbio` GitHub repo." |
| "We caught the ResupplyFi bug." | **Nethermind's AuditAgent did that** — they ran it on Jul 16 2025, 19 days after the $9.8M hack ([nethermind.io/blog/how-nethermind-security-uses-auditagent-alongside-manual-audits](https://www.nethermind.io/blog/how-nethermind-security-uses-auditagent-alongside-manual-audits)). | Cite Savant Chat's own CrossCurve / Abracadabra / Balancer reproductions — these are real ([x.com/savantchat](https://x.com/savantchat)). |
| "We won the Monad contest." | **Octane (handle `oct0pwn`) won the Monad contest, $168K, 1st of 1,600** ([code4rena.com/@oct0pwn](https://code4rena.com/@oct0pwn)). | Cite SavantChat's Top-6 in **Sherlock Symbiotic** — that's the actual result. |
| "200+ vulnerability classes vs 15–20 for free tools." | Savant Chat's own claim. The competitive landscape (AuditAgent, Cyfrin Aderyn, Olympix BugPOCer) all claim similar or larger coverage. Stating "200+" is fine; **don't frame it as a 10× gap without a primary benchmark**. | Keep the "200+ classes" claim — it is documented in Savant Chat's own taxonomy ([savant.chat/blog](https://savant.chat/blog/how-ai-detects-smart-contract-vulnerabilities)). Frame as "industry-leading taxonomy, curated from 20,000 real vulnerabilities." |
| "AI catches every category of bug." | Trail of Bits' public 2023 post-mortem: "Codex and GPT-4 can't beat humans on smart contract audits" — hallucination and FP rates too high ([blog.trailofbits.com](https://blog.trailofbits.com/2023/03/22/codex-and-gpt4-cant-beat-humans-on-smart-contract-audits/)). The Lyuboslav pilot explicitly says SavantChat misses cross-contract economic/accounting logic. | "AI catches the bugs scanners miss — fast. Pair with a human audit before deployment for novel economic designs." |
| "Independent benchmark #1." | The Lyuboslav pilot ranks SavantChat **third** out of three (AuditAgent 40% recall > SavantChat 35% > AlmanaxAI 5%) on aggregate recall; on aggregate precision SavantChat **leads** (17.9% > 5.9% > 4.1%). | "Best precision among AI auditors on independent blind pilot; 100% recall on one contest, top precision across three." |
| "$27.7M / $250K bounty saved." | **That was Grego AI, not Savant Chat** ([prnewswire.com](https://www.prnewswire.com/news-releases/grego-ai-prevents-a-27-7m-attack-with-an-ai-reasoning-breakthrough-that-no-frontier-lab-has-achieved-302768644.html)). | Cite Savant Chat's own exploit reproductions and Top-6 Sherlock placement only. |

### C.4 Honest positioning summary (the one paragraph)

> Savant Chat is a multi-agent AI smart-contract auditor (Solidity + Vyper + Rust/NEAR + Rust/Solana) with a curated 200-class taxonomy drawn from 20,000 real vulnerabilities, a critic subagent that PoCs every flagged issue, pay-as-you-go pricing from $0.07/line with a $75 free trial, named production customers (1inch, Lido, Pessimistic, OXORIO, Gearbox, Hexens), a Top-6 finish in a real Sherlock contest (Symbiotic, Sep 2025), an independent judge-adjudicated 100% recall on Crestal #755, and public self-reported CTFBench accuracy 87–95% — but it is not a replacement for human audits on novel economic designs (Lido's own reviewer is explicit; Lyuboslav blind pilot shows 0/10 recall on CAP). It is best positioned as the **fastest, broadest-coverage AI auditor for protocol teams who want a deep second-pair-of-eyes before engaging a human auditor** — at a small fraction of the $40K–$100K DeFi audit cost.

---

## D. Ready-to-use website content blocks

> **How to use.** Each block is labeled with its intended placement on the new site. Numbers and quotes are sourced; URLs in `[brackets]` go in the marketing-asset footnote system, not necessarily inline. **Bold claims are anchored to a specific source URL in section E.**

---

### D.1 Hero — 4 headline / subheadline options

#### Hero variant A — "Trust signal + speed"

> # Find Smart Contract Vulnerabilities Before Attackers Do
> Deeper than a scanner. Faster than a manual audit. AI security for Solidity, Vyper, and Rust smart contracts.
> Trusted by 1inch, Lido, and Pessimistic Security. Top-6 finish in a Sherlock audit contest.
>
> **[ Start Free — $75 in credits ]** &nbsp; **[ See Pricing ]**

#### Hero variant B — "Pain-first"

> # $3.35B lost to smart-contract exploits in 2025. Most of it was preventable.
> Savant Chat runs a multi-agent AI audit on your Solidity, Vyper, or Rust contract in minutes — across 200+ vulnerability classes, with a critic subagent that builds a proof-of-concept exploit before it shows you the finding.
> No four-week queue. No six-figure invoice. No static-analyzer noise.
>
> **[ Run Your First Audit Free ]** &nbsp; **[ See the Proof ]**

#### Hero variant C — "Concrete proof"

> # 100% recall on the Crestal Sherlock contest. Blind-judged. Independent.
> In an independent blind pilot, our multi-agent stack found all 7 judge-adjudicated issues in the Crestal Sherlock contest — each with a PoC, root cause, and fix. The same stack runs in your dashboard.
> Solidity. Vyper. Rust (Solana, NEAR). 200+ vulnerability classes. Minutes, not weeks.
>
> **[ Start with $75 free credits ]** &nbsp; **[ Read the engineering blog ]**
>
> *Editor's note: ship this hero only with a visible link to the full pilot data — the same pilot shows misses on other contests, and transparency converts this audience better than cherry-picking.*

#### Hero variant D — "Buyer-specific (DeFi / liquid staking / L2)"

> # The AI auditor 1inch runs before its human audits.
> Savant Chat's multi-agent stack scored **Top 6 in Sherlock's Symbiotic contest**, hit **100% recall on Crestal**, and is named on **1inch's** pre-audit pipeline. Now in your CI.
> AI security for Solidity, Vyper, and Rust smart contracts — **200+ vulnerability classes**, deep PoCs, low false positives.
>
> **[ Get $75 in free credits ]** &nbsp; **[ Compare to alternatives ]**

---

### D.2 Value-proposition section — three pillars

#### Pillar 1 — "Deeper than a scanner"

**Multi-agent AI. 200+ vulnerability classes. Curated from 20,000 real vulnerabilities.**

Static analyzers (Slither, Mythril, Aderyn) pattern-match known syntactic bug shapes — and no pattern-matcher can reason about business logic, cross-contract state, or economic incentives. Savant Chat's multi-agent stack runs thousands of specialized LLM calls in parallel across **200+ vulnerability classes**, each distilled from a real-world exploit in our reference book of 20,000 cases.

That means we catch what scanners miss: cross-function reentrancy, read-only reentrancy, oracle manipulation, governance attack surfaces, MEV extraction, cross-chain message-passing exploits, flash-loan attack vectors, business-logic edge cases, signature malleability, sandwich attacks, block-timestamp manipulation, L2 bridge vulnerabilities, ZK-privacy leaks, and economic exploit vectors.

When we flag something, a **critic subagent** independently constructs the proof-of-concept exploit and validates the attack path before it shows up in your dashboard.

> **Source.** [savant.chat](https://savant.chat/blog/how-ai-detects-smart-contract-vulnerabilities); [savant.chat/blog](https://savant.chat/blog/building-autonomous-auditor-vulnerability-reference-book).

#### Pillar 2 — "Faster than a manual audit"

**Minutes, not weeks. $0.07–$0.50/line. No queue.**

Traditional smart-contract audits cost **$40K–$100K** for a mid-complexity DeFi protocol, take **3–38 days**, and carry a **25–120% premium** for Rust, ZK, Move, or Cairo (Sherlock Pricing, Feb 2026). Lead times at top-tier firms can stretch to 8–16 weeks.

Savant Chat runs an end-to-end audit on a typical codebase in **10–30 minutes**. Pricing is pay-as-you-go per token:

- **Lite** — $0.07/line, efficient models
- **Advanced** — $0.12/line, comprehensive analysis
- **Pro** — $0.50/line, highest-quality models

You get the report — severity, confidence score, affected code, remediation, vulnerability class — and you get it on **every commit** via GitHub / GitLab CI/CD integration.

> **Source.** [savant.chat/pricing](https://savant.chat/pricing); [sherlock.xyz](https://sherlock.xyz/post/smart-contract-audit-pricing-a-market-reference-for-2026).

#### Pillar 3 — "Trusted by the protocols that hold the most TVL"

**1inch. Lido. Pessimistic Security. OXORIO. MixBytes. Gearbox. Hexens. Bored Ghosts.**

Savant Chat's customers are security firms and protocols whose code holds billions in TVL. They don't use us instead of human auditors — they use us **before** the human audit so the human auditor's time goes to the bugs AI can't yet see.

> "We recently tested @savantchat — an AI-powered auditing tool — on a real DeFi project (~3k SLOC), previously audited by multiple top firms. The question: can AI surface anything meaningful post-audit? Spoiler: it can."
> — **OXORIO**, Apr 14 2025 ([x.com/0xorio/status/1911822312124330132](https://x.com/0xorio/status/1911822312124330132))

> "We recently tested savant.chat and were pleasantly surprised! It correctly identified several findings on our test contract and didn't produce a single clear false positive. This is the first genuinely useful security tool we've come across in quite a while."
> — **Pessimistic Security** ([x.com/pessimistic_io/status/1897264142308008089](https://x.com/pessimistic_io/status/1897264142308008089))

> "1inch is evaluating @savantchat, aiming to catch and fix issues early — in development, not in production — in minutes, not days — at a fraction of the cost of a human audit — finding errors humans overlook."
> — **1inch**, Jul 1 2025 ([x.com/1inch/status/1940035968125284690](https://x.com/1inch/status/1940035968125284690))

> **Source.** [savant.chat/ecosystem](https://savant.chat/ecosystem); [savant.chat](https://savant.chat/).

---

### D.3 Proof / trust section — built on concrete numbers

> **Headline.** **The numbers behind the name.**

A grid of 4-6 hard-stat cards. Each card has a headline metric + 1-line context + source.

| Metric | Context | Source |
|---|---|---|
| **Top 6** in Sherlock Symbiotic contest (Sep 2 2025) | Competed directly against dozens of expert human auditors on a live DeFi codebase — a placement no other AI auditor has published. | [globenewswire.com](https://www.globenewswire.com/news-release/2025/09/02/3143051/0/en/savant-chat-achieves-a-historic-top-6-ranking-in-the-sherlock-defi-audit-contest.html) |
| **100% recall** on Crestal Sherlock contest | Judge-adjudicated ground truth. 7/7 TPs. Deep PoCs. Auditor quality 3–4/4. | [github.com/LyuboslavLyubenov/ai-audit-tools-eval](https://github.com/LyuboslavLyubenov/ai-audit-tools-eval) |
| **Best precision** in the only independent blind pilot | 17.9% vs AuditAgent's 4.1% and Almanax's 5.9% across three judge-adjudicated Sherlock contests — 3–4× the signal-to-noise of the alternatives. | [github.com/LyuboslavLyubenov/ai-audit-tools-eval](https://github.com/LyuboslavLyubenov/ai-audit-tools-eval) |
| **87–95% accuracy** on CTFBench | Our open-methodology benchmark (published on ethresear.ch, code on GitHub) — ahead of frontier base models on the same harness. | [savant.chat](https://savant.chat/) |
| **82% on EVMBench** | Self-run on the OpenAI + Paradigm benchmark; full report public in our GitHub org. Quote with OpenZeppelin's contamination caveat (see Addendum). | [github.com/auditdbio](https://github.com/auditdbio); [x.com/savantchat](https://x.com/savantchat) |
| **200+ vulnerability classes** | Curated from 20,000 real-world vulnerabilities via multi-stage RAG; distilled to 200 stable clusters. | [savant.chat/blog](https://savant.chat/blog/building-autonomous-auditor-vulnerability-reference-book) |
| **Solidity + Vyper + Rust (NEAR + Solana)** | Only pure-play multi-agent AI auditor with first-class Rust/NEAR and Vyper support. | [savant.chat](https://savant.chat/) |
| **CrossCurve, Abracadabra, Balancer** | Public reproductions of three named on-chain exploits with root-cause analysis. | [x.com/savantchat](https://x.com/savantchat) |
| **$75 free** — no card required | Enough to audit a typical ERC-20 end-to-end. | [savant.chat/pricing](https://savant.chat/pricing) |
| **Founded by Igor Gulamov**, co-founder of ZeroPool (ETHBoston 2019) | Active ZK researcher, AI-security engineer. | [x.com/igorgulamov](https://x.com/igorgulamov); [devpost.com/snjax](https://devpost.com/snjax) |

---

### D.4 Comparison-vs-alternatives section

> **Headline.** **Savant Chat vs the alternatives — at a glance.**

A 4-row comparison table. Each row links to a source.

| | Slither / Mythril | Manual audit firm | AuditAgent (Nethermind) | Octane Security | **Savant Chat** |
|---|---|---|---|---|---|
| **Coverage** | Syntactic patterns only (no logic/economic reasoning) | Depends on auditor | Broad LLM + static + dynamic | LLM agents + fuzz detectors | 200+ classes, multi-agent, RAG reference book |
| **Time to result** | Minutes | 3–38 days | Hours–days | Minutes–hours | **Minutes (10–30 for typical code)** |
| **Cost (typical DeFi protocol)** | Free | **$40K–$100K** (Sherlock) | From $199/mo subscription | Invitation-only, sales-led | **$0.07–$0.50/line, $75 free trial** |
| **Public benchmark score** | ~46–54% recall (Augment Code summary of academic results) | n/a | **67% recall on EVMBench** (post-validation) | n/a — Monad contest **#1 of 1,600 researchers** ($168K) | **87–95% CTFBench; 100% recall on Crestal Sherlock contest (judge-adjudicated)** |
| **False-positive reputation** | Very high (developers ignore warnings) | Low (human-reviewed) | 75% FP reduction via validation phase (vendor-admitted) | Lower — validates every finding (vendor claim) | Critic subagent PoCs every finding; "didn't produce a single clear false positive" — Pessimistic Security |
| **Multi-language** | Solidity | Varies | Solidity, some Solana, Starknet | Language-agnostic | **Solidity + Vyper + Rust (NEAR + Solana)** |
| **CI/CD integration** | Mostly no | No | Yes | Yes (GitHub/GitLab) | **Yes (GitHub Actions)** |
| **Public customer logos** | n/a | OpenZeppelin, Trail of Bits, Zellic, Cantina | Gearbox, CMTA+UBS | Ethereum, Circle, Sky, Bland AI | **1inch, Lido, Pessimistic, OXORIO, Gearbox, Hexens** |
| **Independent blind pilot** | n/a | n/a | 40% recall / 4.1% precision ([eval](https://github.com/LyuboslavLyubenov/ai-audit-tools-eval)) | Excluded (invite-only) | **35% recall / 17.9% precision; 100% on Crestal** ([eval](https://github.com/LyuboslavLyubenov/ai-audit-tools-eval)) |

**Bottom line.** Slither pattern-matches syntax; a manual audit catches whatever the auditor is fresh enough to notice; the AI auditors vary wildly in proof. Savant Chat is the one with a public Top-6 Sherlock contest finish, a judge-adjudicated 100% recall on a real contest, and named production customers — at **roughly 1–3% the cost of a manual DeFi audit**.

> **Sources.** [savant.chat/pricing](https://savant.chat/pricing); [savant.chat](https://savant.chat/); [github.com/LyuboslavLyubenov/ai-audit-tools-eval](https://github.com/LyuboslavLyubenov/ai-audit-tools-eval); [sherlock.xyz](https://sherlock.xyz/post/smart-contract-audit-pricing-a-market-reference-for-2026); [auditagent.nethermind.io](https://auditagent.nethermind.io/blog/auditagent-on-evmbench-40-repositories-120-vulnerabilities-no-repos-skipped); [code4rena.com/@oct0pwn](https://code4rena.com/@oct0pwn); [augmentcode.com](https://www.augmentcode.com/guides/ai-smart-contract-vulnerability-detection).

---

### D.5 FAQ — objection-handling (ready for `/faq` or accordion blocks)

#### "Can AI really audit a smart contract?"

**Short answer:** Yes — for the 200+ vulnerability classes our multi-agent stack covers, with PoC validation on every finding. **No** — for novel economic designs where the auditor needs to reason about incentive structures and cross-protocol invariants the AI hasn't seen yet. The right model is **AI first, human second**: AI catches what scanners miss in minutes, the human audit focuses its expensive time on novel logic.

> **What the evidence says.** Independent blind pilot on three judge-adjudicated Sherlock contests: **100% recall on Crestal, 0/10 recall on CAP** ([github.com/LyuboslavLyubenov/ai-audit-tools-eval](https://github.com/LyuboslavLyubenov/ai-audit-tools-eval)). Trail of Bits publicly abandoned their AI auditor in 2023 because of hallucination rates ([blog.trailofbits.com](https://blog.trailofbits.com/2023/03/22/codex-and-gpt4-cant-beat-humans-on-smart-contract-audits/)). **AI is not the last line of defense.**

#### "How is Savant Chat different from a static scanner like Slither or Aderyn?"

Slither, Mythril, and Aderyn are pattern-matchers: fast, free, and blind to anything that isn't a known syntactic shape. They can't trace value flows across contracts, model attacker incentives, or spot a broken invariant in your accounting logic. Savant Chat's multi-agent stack covers **200+ vulnerability classes** — including reentrancy variants, oracle manipulation, MEV, governance attacks, signature malleability, L2 bridge vulnerabilities, cross-contract business logic — and ships a **critic subagent** that independently PoCs each finding before showing it to you. Pessimistic Security tested us and concluded: *"didn't produce a single clear false positive."*

> **Source.** [savant.chat/blog](https://savant.chat/blog/how-ai-detects-smart-contract-vulnerabilities); [savant.chat/blog](https://savant.chat/blog/building-autonomous-auditor-vulnerability-reference-book); [x.com/pessimistic_io/status/1897264142308008089](https://x.com/pessimistic_io/status/1897264142308008089).

#### "What about false positives?"

Every finding has a **severity rating and confidence score** from the multi-agent pipeline. A separate **critic subagent** builds a proof-of-concept exploit before the finding surfaces — if the PoC fails, the finding is discarded. Pessimistic Security's external test reported no clear false positives ([x.com/pessimistic_io/status/1897264142308008089](https://x.com/pessimistic_io/status/1897264142308008089)).

> **Honest caveat.** On the independent blind pilot, SavantChat precision was **17.9% across three contests** — the best in the pilot, but still roughly one true positive per five findings. Volume of findings is higher than a manual audit; the noise filter is confidence scoring + PoC validation, not magic. ([github.com/LyuboslavLyubenov/ai-audit-tools-eval](https://github.com/LyuboslavLyubenov/ai-audit-tools-eval))

#### "Do I still need a human audit?"

**Yes.** Our own positioning is that AI is the second pair of eyes, not the last one. **Lido's reviewer (Vasiliy Shapovalov)** said it best: *"It's not an audit replacement — as faster, cheaper tool its place in developer pipeline is closer to an internal review or a heavier linter run"* ([x.com/_vshapovalov/status/1976320011850612884](https://x.com/_vshapovalov/status/1976320011850612884)). The Lyuboslav pilot showed we still miss novel economic designs (0/10 recall on CAP). Use Savant Chat **before** the manual audit so the human auditor's time goes to the bugs AI can't see.

#### "How long does an audit take?"

Most audits complete in **10–30 minutes**. Exact time depends on code complexity and size; on EVMBench-sized codebases we report **minutes** end-to-end ([savant.chat](https://savant.chat/)).

#### "Is my code private? Is it sent to third parties?"

Savant Chat uses enterprise-grade privacy with data transformation. **Code is processed securely and not stored or shared beyond the request** ([savant.chat/privacy-policy](https://savant.chat/privacy-policy)). We work with trusted AI providers under strict data-handling agreements. Operates from **UAE** (Novel Codes DMCC, Dubai, license DMCC193534) ([savant.chat/imprint](https://savant.chat/imprint)).

> **Comparison.** AuditAgent (Nethermind) offers per-project Persistent Memory — a retained knowledge base — on its paid tiers ([docs.auditagent.nethermind.io](https://docs.auditagent.nethermind.io/persistent-memory/overview)). Savant Chat is explicit about not retaining code beyond the request. If your code is private, verify each vendor's retention policy carefully.

#### "Do you support Vyper, Rust, Solana, NEAR?"

Yes. **Solidity (Ethereum, all EVM L2s), Vyper (Curve-style DeFi), Rust (Solana + NEAR)** ([savant.chat](https://savant.chat/); [savant.chat/blog](https://savant.chat/blog/how-ai-detects-smart-contract-vulnerabilities)). **Honest limitation:** on Solana, we recommend pairing with an execution-layer fuzzing harness (e.g. Trident for Anchor programs) for full coverage of program-derived-address and CPI edge cases.

#### "What does it cost?"

**Pay-as-you-go per token.** **Lite $0.07/line**, **Advanced $0.12/line**, **Pro $0.50/line**. **$75 free credit on signup, no credit card**. Monthly limits: Basic $250, Pro $2,500, Enterprise custom ([savant.chat/pricing](https://savant.chat/pricing)). For comparison: a mid-complexity DeFi manual audit runs **$40K–$100K** ([sherlock.xyz](https://sherlock.xyz/post/smart-contract-audit-pricing-a-market-reference-for-2026)).

#### "How do I integrate it into CI/CD?"

GitHub Actions, GitLab CI, and any CI that can run a shell script. Each commit gets scanned; each PR gets a comment with severity-tagged findings; severity-thresholded block-merge is configurable. Reference example: [github.com/auditdbio/savant-cicd-integration-example](https://github.com/auditdbio).

#### "What happens if Savant Chat misses a real vulnerability?"

Honest answer: AI auditors, including Savant Chat, **miss novel cross-contract economic and accounting logic** — that's what the independent pilot on Yearn yBOLD and CAP showed. Our Terms of Service are explicit that "AI-generated audit reports provided by Savant Chat may contain false positives" ([savant.chat/terms-of-service](https://savant.chat/terms-of-service)). For novel protocol designs, pair Savant Chat with a manual audit from a tier-1 firm before deployment. For everyday DeFi / ERC-20 / ERC-4626 / staking / governance code, Savant Chat is the highest-precision AI auditor in the published comparisons.

#### "Would Savant Chat have caught real exploits like CrossCurve or Balancer?"

After the **CrossCurve, Abracadabra, and Balancer** exploits, we ran the affected code through our pipeline and reproduced each root cause ([x.com/savantchat](https://x.com/savantchat)). That is evidence the detection depth is real — but reproducing an exploit post-hoc is not the same as preventing it pre-deployment. We publish these reproductions as capability demonstrations, not prevention claims.

#### "Who's behind Savant Chat?"

Operated by **Novel Codes DMCC** (Dubai, license DMCC193534). General Manager / CTO **Igor Gulamov** — ZK researcher, co-founder of **ZeroPool Network** (ETHBoston 2019 winner), active since 2017 in Web3 security. Co-founder **Alexandra Gulamova** ([savant.chat/imprint](https://savant.chat/imprint); [linkedin.com/in/igorgulamov](https://ae.linkedin.com/in/igorgulamov); [x.com/igorgulamov](https://x.com/igorgulamov)).

---

### D.6 CTA copy variants

#### CTA A — "Get the report, free"

> **[ Get Your Free AI Audit ]**
> $75 in free credits. No credit card. Results in minutes. Solidity, Vyper, or Rust.
> *You'll get a 200+ class vulnerability scan, severity-ranked findings, and a confidence score for each issue.*

#### CTA B — "Skip the queue"

> **[ Skip the 8-week audit queue ]**
> Most audits complete in minutes, not weeks. Use Savant Chat in CI to catch the obvious in seconds and let your human auditor focus on the novel.

#### CTA C — "For the protocol team that's already shipping"

> **[ Run Savant Chat before your next human audit ]**
> Free GitHub Actions integration. Pay-as-you-go from $0.07/line. Stop paying auditors to find the patterns Slither should have caught.

#### CTA D — "For the security firm"

> **[ Use Savant Chat to multiply your auditors ]**
> Pessimistic Security, OXORIO, MixBytes, and Hexens already do. Free integration with GitHub / GitLab. PoC-backed findings your seniors can review, not noise they have to triage.

#### CTA E — "Compare yourself"

> **[ See Savant Chat on the same Sherlock contest as AuditAgent and AlmanaxAI ]**
> Independent blind pilot, judge-adjudicated ground truth. Open data on GitHub.
> *Spoiler: Savant Chat had the best precision. AuditAgent had the best recall. Both ran on the same code.*

#### CTA F — "Risk-free"

> **[ $75 free, no card required ]**
> Run a real audit on your codebase today. See the report. If it doesn't find something your last audit missed, you don't owe us anything.
> *Terms: $75 credit is enough to audit a typical ERC-20 or ERC-4626 contract end-to-end.*

---

### D.7 Use-case landing blocks (for `/use-cases/developers`, `/audit-companies`, `/investors`, `/enterprise`)

#### For Developers

> **Pre-deploy. Pre-pull-request. Pre-disaster.**
>
> Run Savant Chat on every commit via GitHub Actions. Catch oracle manipulation, MEV exposure, broken accounting invariants, and the rest of our 200+ vulnerability-class taxonomy before they hit mainnet. Pay-as-you-go from **$0.07/line**; your first **$75 is on us**.
>
> **What you get:** severity-ranked findings, affected code locations, remediation guidance, and a confidence score for each issue. Solidity + Vyper + Rust (NEAR + Solana).

#### For Audit Companies

> **Multiply your auditors, don't replace them.**
>
> Pessimistic Security, OXORIO, MixBytes, Hexens, and others already use Savant Chat as a first-pass filter. Let your senior auditors spend their time on **novel economic designs** instead of re-finding unchecked-return-value bugs. The critic subagent builds PoCs for every finding, so the report your team reviews is already validated.
>
> **Pricing tiers available for audit firms.** GitHub / GitLab PR comments, custom vulnerability taxonomies — ask about firm plans. *(Editor's note: confirm white-label reporting and the contact address with the team before publishing specifics.)*

#### For Investors / Acquirers

> **Due diligence in hours, not weeks.**
>
> Technical due-diligence scans on a target protocol: full-codebase audit across **200+ vulnerability classes**, severity-ranked findings, confidence scoring, and exploit paths for every High/Critical. Use Savant Chat to risk-grade protocols before you commit capital — and as continuous monitoring on portfolio companies after the check clears.
>
> **The market context.** $3.35B lost to smart-contract exploits in 2025 (CertiK Hack3d 2025). Average smart-contract exploit = **$1.9M** over the past four years (Sherlock). A $40K–$100K audit is small relative to those numbers — but it's not zero, and most investors don't have time to wait 8 weeks for one.

#### For Enterprise

> **Continuous security across every protocol you ship.**
>
> Custom volume discounts, dedicated SLAs, custom vulnerability taxonomies, and custom data-handling agreements. Multi-project dashboards. *(Editor's note: confirm on-prem / self-hosted availability with the team before claiming it — it is not documented publicly.)* Integration with your existing ticketing, SIEM, and code-review stack. The same multi-agent AI stack — **200+ vulnerability classes, multi-language (Solidity + Vyper + Rust/NEAR + Rust/Solana), GitHub/GitLab/CI integration** — wrapped for the enterprise.

---

## E. Full source list

> Every URL cited anywhere in this document, grouped by category, with access date.
> **All pages accessed: July 2, 2026** unless otherwise noted.

### E.1 savant.chat (company site)

- https://savant.chat/ — homepage, hero, CTFBench chart, customer logos, testimonials (Jul 2 2026)
- https://savant.chat/faq — Frequently Asked Questions
- https://savant.chat/pricing — Pay-as-you-go pricing tiers, $75 free credit
- https://savant.chat/how-it-works — 3-step audit flow
- https://savant.chat/use-cases — Devs, audit companies, investors, enterprise
- https://savant.chat/ecosystem — Partners: Blockscout, MixBytes, Pessimistic, Oxorio, Bored Ghosts, BugBlow
- https://savant.chat/blog — Blog index
- https://savant.chat/blog/how-ai-detects-smart-contract-vulnerabilities — Alexandra Gulamova, Feb 12 2026, "How AI Detects Smart Contract Vulnerabilities: The Savant Chat Approach"
- https://savant.chat/blog/building-autonomous-auditor-vulnerability-reference-book — Igor Gulamov, Apr 3 2026, "We're building an autonomous senior-level auditor. Here's one of the pieces."
- https://savant.chat/blog/howto-load-non-standard-projects-to-savant-chat — Igor Gulamov, Mar 12 2025
- https://savant.chat/blog/authors/all-igor-gulamov-articles — Igor Gulamov author archive
- https://savant.chat/imprint — Operator: Novel Codes DMCC, Dubai, license DMCC193534; General Manager Igor Gulamov
- https://savant.chat/privacy-policy — Updated Apr 8 2025
- https://savant.chat/terms-of-service — AI Report Accuracy disclaimer
- https://savant.chat/refund-policy — 14-day refund window
- https://savant.chat/cookie-policy

### E.2 savant.chat social / GitHub / press

- https://x.com/savantchat — Twitter bio: "Multi-agent AI smart contract security. Built for deeper vulnerability detection. Latest score: 82%."
- https://x.com/savantchat/status/2018267868438343693 — CrossCurve reproduction (Feb 2 2026, 1.8K views)
- https://x.com/savantchat/status/1975536855027171437 — Abracadabra reproduction
- https://x.com/savantchat/status/1986759884814098942 — Balancer reproduction
- https://x.com/igorgulamov — Igor Gulamov bio: "ZK researcher. Co-founder of @ZeroPoolNetwork and @savantchat"
- https://x.com/alexgulamova — Alexandra Gulamova (Co-founder Savant.Chat)
- https://ae.linkedin.com/in/igorgulamov — Igor Gulamov LinkedIn (CTO at SavantChat)
- https://www.crunchbase.com/organization/savant-chat
- https://www.crunchbase.com/person/alexandra-gulamova
- https://devpost.com/snjax — Igor Gulamov devpost (ZeroPool ETHBoston 2019)
- https://github.com/auditdbio — Savant Chat-affiliated GitHub org: `savant-docs`, `savant-chat-evmbench-report`, `ctfbench`, `savant-smart-contract-analyzer`, `savant-cicd-integration-example`, `litellm`, `audit-web`, `audit-backend`
- https://github.com/auditdbio/savant-chat-evmbench-report — Updated May 27 2026
- https://github.com/auditdbio/savant-cicd-integration-example — Solidity CI/CD example
- https://medium.com/@igorgulamov/we-got-tired-of-smart-contract-hacks-so-we-built-savant-chat-f63f0e57b870 — Igor Gulamov origin story, Mar 17 2025
- https://www.globenewswire.com/news-release/2025/09/02/3143051/0/en/savant-chat-achieves-a-historic-top-6-ranking-in-the-sherlock-defi-audit-contest.html — Top-6 Sherlock Symbiotic press release
- https://web3secnews.substack.com/p/how-multi-agent-ai-is-catching-the — Chirag Agrawal, Nov 14 2025
- https://coinsbench.com/the-next-frontier-in-web3-security-ai-agents-for-smart-contract-audits-243cd7190d0a — Evgenii, Oct 10 2025; names SavantChat, AuditAgent, AlmanaxAI as the three pure-play AI auditors that "stood out"
- https://1inch-network.ghost.io/1inch-uses-savantchats-ai-tools/ — Vladimir Kozlov (1inch), Dec 23 2025
- https://www.youtube.com/watch?v=mXVgyqHAiFk — Mother DevRel × Francesco, Mar 24 2025
- https://www.youtube.com/watch?v=ZrZ4AwwzMtY — Blockchain Community Day 2026 talk (Alexandra Gulamova), Jun 17 2026
- https://wearecommunity.io/events/blockchain-community-day-2026/talks/108839 — BCD 2026 talk page
- https://wearecommunity.io/events/blockchain-community-day-2026/talks/108849 — BCD 2026 panel page (Igor Gulamov)
- https://wearecommunity.io/events/blockchain-community-day-2026 — BCD 2026 conference
- https://discord.gg/pHfxVh9WSc — Savant Chat Discord
- https://www.linkedin.com/posts/nethermind_introducing-auditagent-beta-from-nethermind-activity-7254373537728114689-Dh4d — AuditAgent beta (referenced for competitive context)
- https://ethresear.ch/t/ctfbench-a-new-method-for-evaluating-ai-smart-contract-auditors-balancing-vulnerability-detection-and-reducing-false-alarms/21821 — CTFBench paper

### E.3 savant.chat public endorsements / customer quotes

- https://x.com/1inch/status/1940035968125284690 — 1inch, Jul 1 2025, 6.5K views
- https://x.com/1inch/status/2026638575891058967 — Ilya Naryzhnyy (1inch), Feb 25 2026
- https://x.com/1inch/status/2027435124447469579 — 1inch DeFi Security Week recap, Feb 27 2026
- https://x.com/1inch/status/1940035965059309746 — 1inch re-tweet of Savant Chat mention
- https://x.com/0xorio/status/1911822312124330132 — OXORIO, Apr 14 2025, 902 views
- https://x.com/pessimistic_io/status/1897264142308008089 — Pessimistic Security
- https://x.com/_vshapovalov/status/1976320011850612884 — Vasiliy Shapovalov, Lido
- https://x.com/skywinder/status/1895228438237061588 — Petr Korolev / @skywinder

### E.4 Independent / third-party benchmarks and pilot studies

- https://github.com/LyuboslavLyubenov/ai-audit-tools-eval — Lyuboslav Lyubenov, Radoslav Radev, Kann, **Jan 27 2026**, "An empirical pilot of AI Web3 audit tools: blind evaluation across three public Sherlock contests." Authors: LyuboslavLyubenov on X @LuboslavLubeno1; @radev_eth; @KannAudits
- https://ctfbench.com — CTFBench (open benchmark; methodology authored by the Savant Chat team, repo under the Savant-affiliated `auditdbio` GitHub org — do not label it "independent" in site copy)
- https://github.com/openai/frontier-evals — EVMBench dataset and harness (OpenAI + Paradigm)
- https://cdn.openai.com/evmbench/evmbench.pdf — EVMBench paper (OpenAI + Paradigm)
- https://openai.com/index/introducing-evmbench/ — OpenAI EVMBench announcement
- https://kai.dria.co/benchmark?tab=evmbench — Dria Kai benchmark
- https://guardix.dev/blog/evmbench-benchmark-results — Guardix benchmark blog
- https://github.com/scabench-org/scabench — SCABench (uses Nethermind scoring algo)
- https://github.com/NethermindEth/auditagent-scoring-algo — AuditAgent scoring algorithm (Apache-2.0)
- https://yajin.org/blog/2026-03-18-ai-smart-contract-audit-reevmbench/ — Independent benchmark blog

### E.5 Nethermind AuditAgent

- https://auditagent.nethermind.io/
- https://auditagent.nethermind.io/blog/auditagent-on-evmbench-40-repositories-120-vulnerabilities-no-repos-skipped — Apr 7 2026
- https://auditagent.nethermind.io/blog/recall-is-not-enough-false-positives-and-the-limits-of-benchmarking — Apr 16 2026
- https://auditagent.nethermind.io/disclaimer
- https://docs.auditagent.nethermind.io/ — Docs root
- https://docs.auditagent.nethermind.io/what-is-auditagent
- https://docs.auditagent.nethermind.io/how-it-works
- https://docs.auditagent.nethermind.io/pricing/scan-pricing
- https://docs.auditagent.nethermind.io/pricing/subscription-plans
- https://docs.auditagent.nethermind.io/persistent-memory/overview
- https://www.nethermind.io/blog/auditagent-on-evmbench-what-the-data-shows — Apr 29 2026
- https://www.nethermind.io/blog/how-nethermind-security-uses-auditagent-alongside-manual-audits — Oct 1 2025 (29-audit retrospective)
- https://www.nethermind.io/blog/gearbox-x-auditagent-case-study — Oct 30 2025
- https://www.nethermind.io/blog/uniswaps-adoption-of-ai-assisted-security — May 26 2026
- https://www.nethermind.io/smart-contract-audits
- https://www.nethermind.io/
- https://tracxn.com/d/companies/nethermind/
- https://cmta.ch/news-articles/using-ai-assisted-security-analysis-on-the-cmtat-case-study-of-how-cmta-and-ubs-have-used-nethermind-s-auditagent-on-cmtat-contracts — Jan 12 2026
- https://build.avax.network/integrations/nethermind-auditagent — Avalanche Builder Hub

### E.6 Octane Security

- https://www.octane.security/
- https://www.octane.security/post/octane-seed-round — $6.75M seed, Apr 8 2025
- https://www.octane.security/post/how-ai-won-the-monad-audit-contest — $500K Code4rena win
- https://www.octane.security/post/octane-securitys-ai-catches-high-severity-ethereum-client-bug — Nethermind execution client bug
- https://www.octane.security/post/octane-finds-vulnerabilities-in-all-major-internet-browsers — CVE-2026-5888
- https://www.octane.security/post/octane-hits-top-of-immunefi-leaderboard-for-identifying-critical-vulnerability — MUX $8M
- https://www.octane.security/post/where-your-bugs-hide-now-findings-from-1-200-octane-reviews — 1,200-review study, Jun 2026
- https://www.octane.security/post/how-to-detect-complex-smart-contract-vulnerabilities
- https://www.octane.security/post/why-octane-analysis-varies-and-why-thats-good-security
- https://www.octane.security/post/how-octane-ai-secured-decents-smart-contracts
- https://www.octane.security/post/octane-smart-contract-security-for-scoreplay
- https://www.octane.security/post/an-8m-mux-up-how-octanes-ai-found-a-critical-vulnerability-in-mux-protocol
- https://www.octane.security/post/how-spark-uses-ai-to-secure-billions-in-defi
- https://www.octane.security/post/octane-avalanche-smart-contract-security-integration
- https://www.octane.security/post/octane-plume-real-world-asset-finance-security-partnership
- https://www.octane.security/post/octane-x-circle
- https://www.octane.security/post/octane-receives-ecosystem-grant-to-help-put-the-s-in-ethereums-crops
- https://www.octane.security/post/how-octane-saved-41400-for-covenant
- https://www.octane.security/post/ethereum
- https://www.octane.security/post/ethereum-client-case-study
- https://docs.octane.security/introduction
- https://docs.octane.security/quickstart
- https://docs.octane.security/llms.txt
- https://www.prnewswire.com/news-releases/octane-launches-from-stealth-raising-6-75m-to-build-ai-powered-cybersecurity-for-crypto-302423335.html
- https://www.securityweek.com/octane-raises-6-75m-for-smart-contract-security-tech/
- https://tracxn.com/d/companies/octanesecurity/
- https://www.forbes.com/profile/giovanni-vignone/ — CEO Giovanni Vignone
- https://www.linkedin.com/posts/dukecapitalpartners_octane-security-just-claimed-the-1-spot-activity-7451985724960301056-V73x — Duke Capital on C4 2026 yearly #1
- https://code4rena.com/@oct0pwn — Octane Code4rena profile ($168.78K, 5 High / 0 Medium valid)
- https://nvd.nist.gov/vuln/detail/CVE-2026-5888 — Chromium CVE
- https://www.dlnews.com/articles/defi/ai-flags-high-severity-nethermind-bug/ — DL News
- https://calendly.com/d/cqyp-gjr-rvq/octane-introduction — Demo booking

### E.7 TestMachine

- https://testmachine.ai/
- https://testmachine.ai/solutions
- https://testmachine.ai/products/azimuth
- https://testmachine.ai/products/token-custody
- https://testmachine.ai/evmbench — Self-reported EVMBench leaderboard
- https://testmachine.ai/blog/ai-smart-contract-auditing-competing-publicly-agentalena — Apr 16 2026
- https://testmachine.ai/blog/smart-contract-audit-tools-2026
- https://testmachine.ai/blog/ai-smart-contract-auditing-2026
- https://testmachine.ai/blog/breaking-tokenomics — Virtuals AI underflow disclosure
- https://testmachine.ai/blog/funding-announcement — $6.5M Series A, Dec 11 2025
- https://app.testmachine.ai/
- https://www.linkedin.com/company/testmachine-ai/
- https://tracxn.com/d/companies/testmachine/
- https://alphadrops.net/raises/testmachine
- https://smartliquidity.info/2024/05/09/spectral-labs-and-testmachine-collaboration/

### E.8 Grego AI

- https://grego.ai/
- https://grego.ai/contact
- https://grego.ai/privacy
- https://www.prnewswire.com/news-releases/grego-ai-prevents-a-27-7m-attack-with-an-ai-reasoning-breakthrough-that-no-frontier-lab-has-achieved-302768644.html — May 12 2026
- https://siliconangle.com/2026/05/12/ai-security-startup-grego-ai-debuts-claims-record-250000-bounty-ai-found-exploit/
- https://www.citybiz.co/article/845564/grego-ai-emerges-from-stealth-with-ai-platform-for-smart-contract-security-audits/
- https://www.thesaasnews.com/news/grego-ai-prevents-a-27-7m-attack-with-an-ai-reasoning-breakthrough-that-no-frontier/
- https://www.linkedin.com/in/justus-hanna-41456a402 — CEO Justus Hanna
- https://www.linkedin.com/in/gregorio-maspero — Gregorio Maspero
- https://www.linkedin.com/company/gregoai
- https://code4rena.com/@bbl4de — Grego-affiliated human warden
- https://hackenproof.com/hackers/gregoai
- https://x.com/0xriptide — Justus Hanna X
- https://x.com/therealgregoai
- https://x.com/HackenProof/status/2042588407923130831
- https://www.startuphub.ai/startups/grego-ai — Unverified funding claim

### E.9 Sherlock AI

- https://sherlock.xyz/ai
- https://sherlock.xyz/post/introducing-sherlock-ai — Sherlock AI v2 launch
- https://sherlock.xyz/post/inside-the-lab-berndt-on-the-sherlock-ai-v2-upgrade
- https://sherlock.xyz/post/controlled-benchmark-chatgpt-and-claude-vs-sherlock-ai
- https://sherlock.xyz/post/ai-smart-contract-auditing-in-web3-how-it-works-who-its-for-and-why-it-matters — Feb 12 2026
- https://sherlock.xyz/post/smart-contract-audit-pricing-a-market-reference-for-2026 — Feb 18 2026
- https://sherlock.xyz/post/top-10-best-smart-contract-auditing-companies-in-2026
- https://sherlock.xyz/post/smart-contract-audit-cost
- https://sherlock.xyz/post/are-we-in-a-crypto-bear-market-march-2026-market-pulse
- https://sherlock.xyz/post/web3-security-in-2026-lessons-from-2025-projections-ahead
- https://sherlock.xyz/post/when-audits-go-head-to-head
- https://sherlock.xyz/post/institutional-crypto-adoption-in-2026-whos-actually-moving-in
- https://sherlock.xyz/post/the-2025-sherlock-watson-awards
- https://sherlock.xyz/post/what-is-collaborative-smart-contract-auditing
- https://sherlock.xyz/blog
- https://sherlock.xyz/podcast
- https://sherlock.xyz/case-studies
- https://sherlock.xyz/collaborative-audits
- https://sherlock.xyz/about
- https://audits.sherlock.xyz/leaderboards
- https://audits.sherlock.xyz/contests
- https://audits.sherlock.xyz/bug-bounties
- https://audits.sherlock.xyz/contests/755 — Crestal Network contest
- https://audits.sherlock.xyz/contests/977 — Yearn yBOLD contest
- https://audits.sherlock.xyz/contests/990 — CAP contest
- https://github.com/sherlock-protocol/sherlock-v2-docs

### E.10 Olympix, Almanax, QuillAI, ChainGPT, MetaTrust, Cyfrin, Certora, Zellic, OpenZeppelin, Spearbit / Cantina, Auditware, Hacken

- https://olympix.security/
- https://olympix.security/about
- https://olympix.security/resources/free-static-analyzer
- https://olympix.security/get-started-enterprise
- https://olympix.security/blog/how-ai-powered-security-tools-are-transforming-blockchain-development-an-inside-look-at-olympix
- https://x.com/OlympixSecurity
- https://build.avax.network/integrations/olympix
- https://almanax.ai/
- https://almanax.ai/blog/introducing-almanax
- https://almanax.ai/blog/almx-1-achieves-sota-performance-in-web3-vulnerability-detection
- https://trust.almanax.ai/
- https://huggingface.co/datasets/almanax/w3sa-bm-solidity
- https://forum.arbitrum.foundation/t/non-constitutional-partnering-with-almanax-to-provide-100-ecosystem-projects-with-subscriptions-for-regular-ai-code-audits-as-well-as-continuous-security-review-through-ci-cd-integration/30185
- https://italianangels.net/en/news/almanax-secures-usd1m-to-accelerate-growth-and-innovation-in-web3-security/
- https://quillai.network/
- https://quillainetwork.gitbook.io/quillai-network/agent-swarm/quillcheck/understanding-quillcheck-report
- https://quillai.network/resources
- https://quillaudits.medium.com/quillaudits-claude-skills-for-smart-contract-audits-279969b69787 — Feb 22 2026
- https://github.com/quillai-network/quillshield_skills
- https://www.quillaudits.com/
- https://www.chaingpt.org/smart-contract-auditor
- https://www.chaingpt.org/blog/chaingpt-on-skynet-certik-audit-review
- https://docs.chaingpt.org/ai-tools-and-applications/ai-smart-contract-auditor
- https://docs.chaingpt.org/ai-tools-and-applications/pricing-and-membership-plans
- https://docs.chaingpt.org/dev-docs-b2b-saas-api-and-sdk/smart-contracts-auditor-api-and-sdk
- https://metatrust.io/
- https://metatrust.io/product/metascan
- https://arxiv.org/abs/2308.03314 — GPTScan paper
- https://cryptorank.io/price/metatrust
- https://aderyn.cyfrin.io/
- https://www.cyfrin.io/blog/find-vulnerabilities-in-your-solidity-codebase-using-cyfrin-aderyn
- https://www.cyfrin.io/blog/supercharge-secure-solidity-development-the-aderyn-vs-code-extension
- https://github.com/Cyfrin/aderyn
- https://www.certora.com/
- https://www.certora.com/blog/certora-ai-composer-first-safe-ai-coding-platform
- https://www.certora.com/blog/certora-goes-open-source
- https://www.certora.com/pricing
- https://www.certora.com/audits
- https://github.com/Certora/AIComposer
- https://www.zellic.io/
- https://www.zellic.io/blog/zellic-darpa-aixcc
- https://newsletter.zellic.io/p/zellic-security-roundup-october-25
- https://v12.zellic.io/
- https://reports.zellic.io/publications/
- https://www.openzeppelin.com/news/introducing-continuous-security-program — May 2026
- https://www.openzeppelin.com/news/introducing-contracts-mcp — Jul 2025
- https://mcp.openzeppelin.com/
- https://spearbit.com/
- https://spearbit.com/about
- https://spearbit.com/blog
- https://cantina.xyz/welcome
- https://cantina.xyz/solutions/code-analyzer/enterprise
- https://cantina.xyz/blog/changelog-march-15
- https://cantina.xyz/blog/why-2026-web3-security-needs-ai-threat-intelligence
- https://www.blackthorn.xyz/
- https://auditwizard.io/ (live brand is "Auditware")
- https://auditwizard.io/audits/smart-contract
- https://auditwizard.io/get-started
- https://github.com/Auditware/audits
- https://hacken.io/services/ai-system-security-audit/
- https://hacken.io/discover/audit-tools-review/ — Apr 30 2026
- https://hacken.io/discover/llm-security-frameworks/
- https://hacken.io/insights/q1-2025-security-report/
- https://hacken.io/audits/griffin-ai-ag/
- https://docs.hacken.io/methodologies/AI_Red_Team/

### E.11 Market context — losses, audits, benchmarks

- https://www.certik.com/blog/hack3d-the-web3-security-report-2025 — Dec 23 2025, $3.35B 2025 losses
- https://www.certik.com/blog/hack3d-the-web3-security-quarterly-report-q1-2025 — Q1 2025, $1.6B / 197 incidents
- https://www.certik.com/blog/hack3d-the-web3-security-quarterly-report-q2-h1-2025 — Q2 + H1 2025, $2.47B / 344 incidents
- https://x.com/CertiK/status/2003465635234521429
- https://www.certik.com/blog/all
- https://www.chainalysis.com/blog/crypto-hacking-stolen-funds-2025/ — Dec 19 2024
- https://www.chainalysis.com/blog/2025-crypto-crime-mid-year-update/ — Jul 17 2025, $2.17B stolen mid-2025
- https://www.coindesk.com/business/2026/01/19/crypto-s-worst-year-for-hacks-wasn-t-a-smart-contract-problem-it-was-a-people-problem — $17B scams 2025
- https://www.coindesk.com/tech/2026/06/29/private-keys-not-smart-contracts-caused-40-of-crypto-s-usd16-billion-hack-losses-here-s-whats-being-done — $16.69B total DeFiLlama
- https://www.chainalysis.com/blog/2025-crypto-crime-mid-year-update/
- https://deepstrike.io/blog/crypto-hacking-incidents-statistics-2025-losses-trends — Oct 24 2025
- https://immunefi.com/blog/research/
- https://immunefi.com/blog/research/immunefi-crypto-losses-q1-2025-report/ — Q1 2025, $1.64B
- https://immunefi.com/whitepapers/web3-security-playbook.pdf — Nov 5 2025, "$70B lost since 2020"
- https://immunefi.com/bug-bounty/immunefi/information/
- https://immunefi.com/research/
- https://defillama.com/hacks
- https://defillama.com/hacks/total-value-lost
- https://bitcoinfoundation.org/news/defi/defillama-q1-crypto-hacks/ — Q1 2026, $169M / 34 hacks
- https://red.anthropic.com/2025/smart-contracts/ — Anthropic smart-contract report 2025
- https://www.finextra.com/blogposting/31879/defi-hacks-are-exploding-is-there-a-future-for-defi
- https://blog.trailofbits.com/2023/03/22/codex-and-gpt4-cant-beat-humans-on-smart-contract-audits/ — Trail of Bits abandoned AI auditor
- https://www.augmentcode.com/guides/ai-smart-contract-vulnerability-detection — Jun 8 2026
- https://www.zealynx.io/research/audit-ops/Smart_Contract_Audit_Cost_in_2025-What_You_Need_to_Know — May 27 2025
- https://bugblow.com/blog/smart-contract-audit-cost-2026-pricing-guide — Feb 17 2026
- https://pharosproduction.com/insights/engineering/smart-contract-audit-cost/ — Jun 23 2026
- https://hacken.io/discover/audit-tools-review/ — Apr 30 2026
- https://docs.sherlock.xyz/audits/protocols — Sherlock protocol documentation
- https://code4rena.com/ — Code4rena homepage (closing notice)
- https://solodit.cyfrin.io/ — Solodit (Cyfrin's findings database)

### E.12 Academic / research

- https://arxiv.org/html/2406.05590v3 — NYU CTF Bench paper
- https://arxiv.org/html/2507.05558v1 — "AI Agent Smart Contract Exploit Generation" (Jul 8 2025)
- https://arxiv.org/abs/2502.13167 — "SmartLLM: Smart Contract Auditing using Custom Generative AI" (Feb 17 2025)
- https://arxiv.org/html/2410.09381v1 — LLM-SmartAudit (cited by Augment Code; Mythril 54% / Slither 46% / LLM-SmartAudit 74% on 10-vuln-type benchmark)
- https://arxiv.org/html/2605.11163v1 — "Benchmarking LLM-Based Static Analysis for Secure Smart Contract…"
- https://ethresear.ch/t/ctfbench-a-new-method-for-evaluating-ai-smart-contract-auditors-balancing-vulnerability-detection-and-reducing-false-alarms/21821 — CTFBench paper
- https://hal.cs.princeton.edu/corebench_hard — CORE-Bench Hard (unrelated; cited for benchmark landscape)

### E.13 Other / context

- https://sherlock.xyz/post/top-10-best-smart-contract-auditing-companies-in-2026 — Pricing references: smart-contract audits $5K–$150K+; per-day $2K–$5K+; competitive-contest prize pools $20K–$200K
- https://sherlock.xyz/post/are-we-in-a-crypto-bear-market-march-2026-market-pulse
- https://medium.com/oak-security/ai-assisted-security-audits-0bd76608e3be — Oak Security, "AI-Assisted Security Audits: A Practical Guide"
- https://medium.com/@ancilartech/ai-powered-security-analysis-revolutionizing-smart-contract-vulnerability-detection-d1e2c66e76fa
- https://blog.positive.com/how-we-trained-an-llm-to-find-vulnerabilities-in-solidity-smart-contracts-9337bcae5e46 — Positive Web3 LLM training
- https://muellerberndt.medium.com/hunting-for-security-bugs-in-code-with-ai-agents-a-full-walkthrough-a0dc24e1adf0 — Hound (scabench-org/hound) walkthrough
- https://github.com/forefy/.context — Prompt-pack for AI auditors
- https://github.com/nonfungi/ai-smart-contract-auditor — RAG-based Solidity auditor
- https://github.com/BradMoonUESTC/finite-monkey-engine — Finite Monkey
- https://github.com/tamago-labs/x-engine — Move contracts AI review
- https://github.com/scabench-org/hound — scabench Hound
- https://github.com/scabench-org/scabench
- https://github.com/ahlashkari/SCsVulSegLytix
- https://github.com/gustavo-grieco/quimera
- https://github.com/LLMSmartAudit/FTSmartAudit
- https://github.com/charlesxsh/scbench
- https://github.com/CoinFabrik/scout-substrate-dataset-code
- https://github.com/smartbugs/smartbugs-curated
- https://github.com/SunWeb3Sec/DeFiHackLabs
- https://scs.owasp.org/SCWE/
- https://github.com/acorn421/awesome-smart-contract-datasets
- https://www.kaggle.com/datasets/tranduongminhdai/smart-contract-vulnerability-datset
- https://solodit.cyfrin.io/
- https://www.fortra.com/resources/guides/fuzzing-in-cybersecurity — fuzzing explainer
- https://chain.link/article/what-is-total-value-locked-tvl — TVL definition

### E.14 Twitter / X handles worth following for ongoing intel

- @savantchat, @igorgulamov, @alexgulamova — savant.chat team
- @pessimistic_io, @0xorio, @1inch, @LidoFinance, @GearboxProtocol — customer/partner voices
- @NethermindSec, @Nethermind — AuditAgent parent
- @octane_security, @giovignone — Octane Security
- @testmachine_ai — TestMachine
- @0xriptide, @therealgregoai — Grego AI
- @sherlockdefi — Sherlock
- @Auditware_, @OlympixSecurity — Auditware / Olympix
- @LyuboslavLyubenov / @LuboslavLubeno1, @radev_eth, @KannAudits — independent pilot authors
- @CertiK, @CertiKAlert, @immunefi — market data providers

---

### E.15 Method & access log

- **Research method.** Crawled savant.chat (homepage, FAQ, pricing, how-it-works, use-cases, ecosystem, imprint, privacy, terms, refund, cookie, blog index, three blog posts) on **July 2, 2026** via `crawl4ai` deep-crawl mode (BFS, max-pages 25, output to `/tmp/opencode/savant_home.md`, 5,267 lines of markdown).
- Ran 7 parallel `codex-ctl --opencode` deep-research sessions for competitor profiles, market context, and savant.chat external coverage. All briefs harvested, none manually edited.
- Cross-checked with 9 rounds of Google search via Serper (default recency off; targeted to 2025–2026).
- Read primary documents directly via crawl4ai for: `github.com/LyuboslavLyubenov/ai-audit-tools-eval` (the independent blind pilot — the single most important primary source for this report); `auditagent.nethermind.io/blog/auditagent-on-evmbench-40-repositories-120-vulnerabilities-no-repos-skipped`; `nethermind.io/blog/auditagent-on-evmbench-what-the-data-shows`; `nethermind.io/blog/how-nethermind-security-uses-auditagent-alongside-manual-audits`; `testmachine.ai/blog/ai-smart-contract-auditing-competing-publicly-agentalena`; `grego.ai` via `citybiz.co/article/845564/...`; `sherlock.xyz/post/ai-smart-contract-auditing-in-web3-how-it-works-who-its-for-and-why-it-matters`; `www.octane.security/`; `sherlock.xyz/post/smart-contract-audit-pricing-a-market-reference-for-2026`; `certik.com/blog/hack3d-the-web3-security-report-2025`; `pharosproduction.com/insights/engineering/smart-contract-audit-cost/`; `medium.com/@igorgulamov/we-got-tired-of-smart-contract-hacks-so-we-built-savant-chat-f63f0e57b870`; `coinsbench.com/the-next-frontier-in-web3-security-ai-agents-for-smart-contract-audits-243cd7190d0a`.
- **Disagreement handling.** Where sources disagree (e.g., Grego AI HQ Miami vs San Francisco; TestMachine CEO Matthew Lewis vs Andrew Kilbride; StartupHub's $63M Grego claim), both/all numbers are reported and the conflict is flagged.
- **Unverified flags.** Items flagged "**Unverified**" or "**unverified**" in the body are vendor-only claims (e.g., StartupHub $63M Grego funding; HackerNews-style claims about customer counts). The Lyuboslav pilot's verbatim quote *"These tools are far from actually discovering significant, novel bugs in production systems"* is preserved as-is, not paraphrased.

---

*End of main document. Two addenda follow: a second-pass market-data sweep and its sources (harvested July 2, 2026). Page count estimate: ~30 printed pages. Ready to be split into website sections A through E per the original spec.*
---

## Addendum to Section A — Additional verified market data (July 2, 2026)

After the initial draft, the long-running market-research session harvested additional primary data. Key updates below; all source URLs in section E.

- **Immunefi "What an Onchain Hack Actually Costs 2024–2025":** 2024 = $1.27B / 94 incidents; 2025 = **$3.4B / 97 incidents** (two-year total $4.67B / 191 incidents). **Bybit ($1.5B) = 44% of 2025 and 32% of the two-year total**. Excluding Bybit, 2025 = ~$1.9B. **Average direct theft $24.45M, median $2.2M. Token-price drop 61% over 6 months post-hack (up from 53% prior). 84% of hacked tokens never recover within 6 months.** ([immunefi.com](https://immunefi.com/blog/research/what-an-onchain-hack-actually-costs-2024-2025-update/))
- **SlowMist 2025 Annual Report:** Smart-contract vulnerabilities were the primary attack cause — **56 incidents totaling $121.1M** across Ethereum and other chains ([slowmist.com](https://www.slowmist.com/report/2025-Blockchain-Security-and-AML-Annual-Report(EN).pdf)).
- **OWASP Smart Contract Top 10 (2026):** 122 deduplicated 2025 incidents totaling **~$905.4M in smart-contract losses**; access control = #1, business logic = #2 ($188.7M, ~21%) ([augmentcode.com](https://www.augmentcode.com/guides/ai-smart-contract-vulnerability-detection)).
- **Anthropic SCONE-bench (Dec 1 2025):** 10 frontier models exploited **207/405 contracts = 51.11%**, simulated **$550.1M stolen**; post-knowledge-cutoff subset: Opus 4.5 / Sonnet 4.5 / GPT-5 collectively 55.8%, $4.6M max. **2 novel zero-days on 2,849 live contracts** ([anthropic.com](https://www.anthropic.com/research/smart-contracts)).
- **Wake Arena 3.1 (Ackee Blockchain):** 63/94 = **67% detection on critical/high** from real contests; beat Zellic V12 (41/94), GPT-5.2 xhigh (41/94), GPT-5 plain (24/94), Opus 4.5 plain (21/94). **In live audits of Lido, Printr, Everstake (Nov 2025) found 26/79 findings (33%) including 5 critical bugs in Printr that human auditors missed** ([ackee.xyz](https://ackee.xyz/blog/wake-arena-multi-agent-ai-audit-with-graph-driven-reasoning/)).
- **Pashov solidity-auditor v3 (open-source):** Caught **14/17 findings (82.4%) on the DODO security contest in <20 minutes**, beating every open-source comparator ([pashov.com](https://www.pashov.com/blog)).
- **OpenZeppelin's review of EVMbench (Mar 2 2026):** flagged training-data contamination (model cutoffs May–Aug 2025 overlap with benchmark source reports) and identified 4 invalid "high" findings (CEI reentrancy, cross-chain voucher replay, cumulative underflow, double-refund) that weren't actually exploitable ([openzeppelin.com](https://www.openzeppelin.com/news/openai-evmbench-audit)). **This is critical context for anyone quoting EVMBench numbers.**
- **BlockSec ReEVMBench (Mar 19 2026):** on harder EVM task set, concluded **AI will not replace human auditors**; agents reliably catch known patterns but underperform on novel logic ([theblock.co](https://www.theblock.co/post/394553/ai-auditing-humans-blocksec-research-openai-paradigm-evmbench-findings); [arxiv.org/pdf/2603.10795](https://arxiv.org/pdf/2603.10795)).
- **iAudit (ICSE 2025):** F1 **91.21%, accuracy 91.11%** on 263 real smart-contract vulns ([augmentcode.com](https://www.augmentcode.com/guides/ai-smart-contract-vulnerability-detection)).
- **LLM-SmartAudit (TSE 2025):** 74% recall on 10-class benchmark vs Mythril 54%, Slither 46% ([daoyuan14.github.io](http://daoyuan14.github.io/papers/TSE25_LLM-SmartAudit.pdf)).
- **Best 3-tool static combo (Conkas + Slither + Smartcheck):** 76.78% detection on 2,182 annotated instances; **automated tools cap at ~50% of all findings; static alone ~33% of high-severity** ([augmentcode.com](https://www.augmentcode.com/guides/ai-smart-contract-vulnerability-detection)).
- **False-positive reality:** LLM-based tools on DeFi protocols have produced **>97% false positives in real-world evaluations**; targeted prompting cuts FP ~60% ([augmentcode.com](https://www.augmentcode.com/guides/ai-smart-contract-vulnerability-detection)).
- **Code4rena ceased operations Dec 2025; Immunefi took over bounty clients and researchers** ([kucoin.com](https://www.kucoin.com/news/flash/code4rena-to-cease-operations-immunefi-to-take-over-bounties-and-researchers); [tapbit.com](https://tapbit.com/en/news/news-feed/page/19)).
- **Coverage gaps (Cyfrin BattleChain post, Mar 25 2026):** **only ~20% of the top 100 exploited protocols had professional audits; ~70% of major 2024 exploits came from contracts that had been audited; $2.3B lost in 2025 came from protocols that had published audit reports; Euler Finance passed 10 audits across 6 firms and still lost $197M** ([cyfrin.io](https://www.cyfrin.io/blog/announcing-battlechain-testnet)).
- **Spearbit:** raised additional **$7.83M Seed-1 (Aug 2025)**; Spearbit operates as the researcher network behind Cantina's platform ([linkedin.com (Altitude Cyber)](https://www.linkedin.com/posts/altitude-cyber_weekly-cybersecurity-deal-dashboard-august-activity-7360839670827552768-86eP); [linkedin.com/company/spearbit-labs](https://www.linkedin.com/company/spearbit-labs); [cantina.xyz/terms/general](https://cantina.xyz/terms/general)).
- **Cyberscope:** filed for Nasdaq Capital Market IPO (Dec 8 2025); 3,500+ audits completed ([tradingview.com](https://www.tradingview.com/news/tradingview:bcadee7504f91:0-cyberscope-web3-security-and-smart-contract-audits-files-for-nasdaq-capital-market-ipo/)).
- **Immunefi scale (Sep 30 2025):** protects $190B+ in value across 650+ protocols; 60K+ researchers; $100M+ paid across 3,000+ reports; highest single bounty on record ([immunefi.com](https://immunefi.com/)).
- **TRM Labs (Dec 18 2025):** **North Korea stole ~$2B in crypto in 2025**; Bybit $1.5B Feb 2025 ([trmlabs.com](https://www.trmlabs.com/resources/blog/north-korea-and-the-industrialization-of-cryptocurrency-theft)).

**Net effect on positioning.** Immunefi and SlowMist tighten the loss numbers (still $3.4B / $121M). Anthropic's SCONE-bench demonstrates that frontier models are already capable exploiters — buyers should assume their attackers have AI. Wake Arena 3.1's **5 critical bugs in Printr that human auditors missed** is a strong independent counter to "manual audits are enough." Code4rena closing (Dec 2025) means any vendor's claim of Code4rena-era rankings should be re-examined. OpenZeppelin's contamination flag on EVMBench means **quote EVMBench scores with the contamination caveat**.

---

## Addendum to Section E — Sources harvested in the second-pass market sweep

- https://immunefi.com/blog/research/what-an-onchain-hack-actually-costs-2024-2025-update/ — Immunefi "What an Onchain Hack Actually Costs" 2024–2025
- https://immunefi.com/ — Immunefi homepage (scale: $190B+ protected, 650+ protocols, 60K+ researchers)
- https://www.slowmist.com/report/2025-Blockchain-Security-and-AML-Annual-Report(EN).pdf — SlowMist 2025 Annual Report
- https://www.anthropic.com/research/smart-contracts — Anthropic SCONE-bench (Dec 1 2025)
- https://www.paradigm.xyz/2026/02/evmbench — Paradigm EVMBench launch
- https://www.openzeppelin.com/news/openai-evmbench-audit — OpenZeppelin EVMBench contamination review (Mar 2 2026)
- https://www.theblock.co/post/394553/ai-auditing-humans-blocksec-research-openai-paradigm-evmbench-findings — BlockSec ReEVMBench summary
- https://arxiv.org/pdf/2603.10795 — BlockSec ReEVMBench paper
- https://github.com/scabench-org/scabench — ScaBench (updated Sep 16 2025)
- https://ackee.xyz/blog/wake-arena-multi-agent-ai-audit-with-graph-driven-reasoning/ — Ackee Wake Arena 3.1
- https://www.pashov.com/blog — Pashov solidity-auditor v3 DODO benchmark
- https://daoyuan14.github.io/papers/TSE25_LLM-SmartAudit.pdf — LLM-SmartAudit paper
- https://www.cyfrin.io/blog/announcing-battlechain-testnet — Cyfrin BattleChain coverage-gap data
- https://www.kucoin.com/news/flash/code4rena-to-cease-operations-immunefi-to-take-over-bounties-and-researchers — Code4rena closure
- https://tapbit.com/en/news/news-feed/page/19 — Code4rena closure corroboration
- https://www.linkedin.com/posts/altitude-cyber_weekly-cybersecurity-deal-dashboard-august-activity-7360839670827552768-86eP — Spearbit $7.83M Seed-1
- https://www.linkedin.com/company/spearbit-labs — Spearbit Labs
- https://cantina.xyz/terms/general — Cantina = Spearbit Labs Inc.
- https://br.linkedin.com/company/spearbit-labs — Spearbit Labs Brazil
- https://www.tradingview.com/news/tradingview:bcadee7504f91:0-cyberscope-web3-security-and-smart-contract-audits-files-for-nasdaq-capital-market-ipo/ — Cyberscope Nasdaq IPO filing
- https://www.trmlabs.com/resources/blog/north-korea-and-the-industrialization-of-cryptocurrency-theft — TRM Labs 2025
- https://sigintzero.com/blog/ai-auditing — Sigintzero market sizing (Fortune Business Insights / MarketsandMarkets)
- https://sherlock.xyz/post/smart-contract-audit-cost — Sherlock audit cost guide
- https://www.coindesk.com/business/2026/05/16/crypto-users-are-choosing-juicy-yields-over-protection-putting-billions-at-risk-of-hacks — CoinDesk DeFi yields
- https://www.coindesk.com/tech/2026/06/29/private-keys-not-smart-contracts-caused-40-of-crypto-s-usd16-billion-hack-losses-here-s-whats-being-done — CoinDesk private-key data
- https://sqmagazine.co.uk/crypto-exchange-hacks-and-security-statistics/ — SQ Magazine DeFiLlama 2024
- https://bugblow.com/blog/smart-contract-logic-errors-most-expensive-bugs — BugBlow audit cost cross-check
- https://www.datawallet.com/crypto/best-smart-contract-auditing-companies — Datawallet audit cost cross-check
- https://medium.com/oak-security/ai-assisted-security-audits-0bd76608e3be — Oak Security AI-assisted audits
- https://medium.com/@ancilartech/ai-powered-security-analysis-revolutionizing-smart-contract-vulnerability-detection-d1e2c66e76fa — Ancilar AI-powered analysis
- https://medium.com/@ancilartech/ai-code-the-bright-future-of-llms-in-smart-contract-development-83b026b93ee6 — Ancilar LLM future
- https://blog.positive.com/how-we-trained-an-llm-to-find-vulnerabilities-in-solidity-smart-contracts-9337bcae5e46 — Positive Web3 LLM training
- https://medium.com/data-science-collective/architecting-uncertainty-a-modern-guide-to-llm-based-software-504695a82567 — LLM software architecture
- https://medium.com/oak-security/ai-assisted-security-audits-0bd76608e3be — Oak Security
- https://www.cyberbucks.io/blog/ai-smart-contract-auditing-2026 — CyberBucks
- https://techbullion.com/top-8-ai-auditing-tools-for-web3-smart-contracts-in-2026/ — TechBullion top-8


---
id: 41ba9b
type: feature
title: "R3: Pillars (How it works) + Coverage (языки и классы)"
status: done
priority: normal
parent: 18fa2e
relations:
  depends_on:
  - 52959f
fields:
  loc_estimate: 240.0
  spec_approved: true
created: "2026-07-02T14:28:02.11122991Z"
schema_version: 1
---
## Description
Секция pillars по D.2 (3 колонки: Deeper/Faster/Trusted, точные копирайты) и coverage (Solidity/Vyper/Rust-NEAR/Solana + chips классов). Якорь #pillars = цель navbar 'How it works'. UX-O2 продолжение. См. design/UX.md.

## Design
Две секции после proof-stats. Референсы: savant_chat_content.md D.2 (копирайт сжать до карточек), design/UX.md, референс-лендинг 1a (how-it-works и coverage).

1. src/components/Pillars (testid pillars, id='pillars' — цель navbar 'How it works'):
   - kicker 'WHY SAVANT CHAT', H2 'Deeper. Faster. Trusted.'
   - 3 карточки (var(--site-surface), бордер var(--site-border), радиус 12px, паддинг 28px, mono-индексы 01/02/03 цветом accent):
     01 'Deeper than a scanner' — 'Static analyzers pattern-match known bug shapes. Our multi-agent stack runs thousands of specialized LLM calls across 200+ vulnerability classes — each distilled from a real-world exploit in a 20,000-case reference book. A critic subagent builds a proof-of-concept for every finding before it reaches your dashboard.'
     02 'Faster than a manual audit' — 'A manual DeFi audit runs \$40K–\$100K and 3–38 days. Savant Chat audits a typical codebase in 10–30 minutes, pay-as-you-go from \$0.07/line — on every commit via GitHub and GitLab CI.'
     03 'Trusted before the human audit' — '1inch, Lido, Pessimistic Security, OXORIO and other security teams run Savant Chat first, so their auditors' time goes to the bugs AI can't yet see. Second pair of eyes — not the last one.'
2. src/components/Coverage (testid coverage): двухколоночная сетка (0.9fr/1.1fr desktop, стек mobile):
   - слева: kicker 'COVERAGE', H2 'Every major contract language.', 3 строки-карточки: Solidity — 'Ethereum + EVM L2s'; Vyper — 'Curve-style DeFi'; Rust — 'Solana · NEAR' (как в референсе: название 700 + mono-подпись muted, бордер-строки)
   - справа: chips (pill, бордер var(--site-border-strong), текст var(--site-text-chip)): Cross-function reentrancy, Read-only reentrancy, Oracle manipulation, Governance attacks, MEV extraction, Flash-loan vectors, Cross-chain messaging, Business-logic edge cases, Signature malleability, L2 bridge vulnerabilities, Economic exploits; финальный выделенный chip (accent-бордер + rgba(255,107,0,.1) фон): '200+ classes total'
3. Порядок: proof-stats → pillars → coverage. uilint: продолжить UX-O2 (2 below), pillars-карточки widthMatches (tol .05) + alignedHorizontallyTop (desktop) / alignedVerticallyLeft (mobile), chips noOverlap, контраст заголовков карточек, ширина секций (G1), textDoesNotOverflow текстов карточек.
## Test Plan
~240 LOC → ≥ 24 проверок. Красные до имплементации (рендер homepage: testid'ы отсутствуют — assertion-red).

tests/unit/pillars-coverage.test.tsx (~14):
- pillars: testid есть, id='pillars', ровно 3 карточки (countIs testid pillar-card), заголовки трёх карточек точны (3), карточка 01 содержит '20,000' и 'critic subagent', 02 содержит '\$0.07/line' и '10–30 minutes', 03 содержит '1inch' и 'not the last one' (6)
- coverage: testid есть; языки Solidity/Vyper/Rust с подписями (3); ≥ 11 chips (countIs gte); выделенный chip '200+ classes total' (2)
- DOM-порядок proof-stats → pillars → coverage (1)

tests/unit/pillars-coverage-css.test.ts (~4): карточки на var(--site-surface); mono-индексы accent; grid 3 колонки desktop/1 mobile; chips border-radius 99px

uilint (ux-global/новая спека в тех же сценариях, ~8):
- below(pillars, proof-stats), below(coverage, pillars) (2)
- pillar-cards: widthMatches попарно tol 5% + alignedHorizontallyTop desktop (2); mobile alignedVerticallyLeft (1)
- chips noOverlap (1); countIs(pillar-card, eq(3)) (1); textMatches заголовка '01'-карточки — гарантированная красность (1)
## Acceptance
- npm test + npm run test:layout зелёные (3 вьюпорта, обе темы)
- Приёмка тех-лида: карточки в ритме референса, chips аккуратные в обеих темах, якорь #pillars работает из navbar
- Копирайт без оверклеймов ('second pair of eyes — not the last one' обязателен в 03)
## Log
- 2026-07-02T14:28:02Z @snjax: created
- 2026-07-02T14:45:22Z @snjax: draft -> spec
- 2026-07-02T14:50:30Z @snjax: spec -> tests_red
- 2026-07-02T14:52:40Z @snjax: attested tests_are_red: yes: npm test reports 129 total, 109 passing, 20 failing from missing pillars/coverage testids, missing pillar-card/coverage-chip content, and missing Pillars/Coverage CSS files/rules; npm run test:layout:fast fails ux-global dark/light with pillar-card count got 0 expected 3 and first pillar title empty vs /Deeper than a scanner/, no engine errors.
- 2026-07-02T14:52:40Z @snjax: tests_red -> impl
- 2026-07-02T14:54:51Z @snjax: impl -> review
- 2026-07-02T14:55:43Z @snjax: attested review_approved: yes: pillars (3 карточки, честный копирайт 'second pair of eyes') + coverage (3 языка, 12 chips, выделенный 200+) приняты; 129/129 юнитов, uilint зелёный, скриншот-приёмка dark/light
- 2026-07-02T14:55:43Z @snjax: review -> done

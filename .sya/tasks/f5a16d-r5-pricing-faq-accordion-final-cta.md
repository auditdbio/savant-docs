---
id: f5a16d
type: feature
title: "R5: Pricing + FAQ (accordion) + Final CTA"
status: done
priority: normal
parent: 18fa2e
relations:
  depends_on:
  - d11131
fields:
  loc_estimate: 320.0
  spec_approved: true
created: "2026-07-02T14:28:02.141239902Z"
schema_version: 1
---
## Description
Pricing: Lite $0.07/Advanced $0.12/Pro $0.50 за line, $75 free no card, Advanced выделен (UX-G3); FAQ: 6 вопросов из D.5 с honest-ответами, accordion (UX-I1); final-cta по D.6-F. UX-C4/C5, завершение цепочки UX-O2 до footer. См. design/UX.md.

## Design
Три финальные секции + завершение цепочки. Референсы: savant_chat_content.md D.5 (FAQ), D.6 (CTA F), фактпак C (цены), design/UX.md §3, референс 1a (pricing-карточки).

1. src/components/Pricing (testid pricing, id='pricing'):
   - kicker 'PRICING', H2 'Pay as you go. Priced per line.', подзаголовок '$75 free credit on signup — no card required. Credits never expire.'
   - 3 карточки: Lite $0.07/line ('Efficient models. CI-friendly quick pass.'), Advanced $0.12/line — ВЫДЕЛЕНА (бордер accent, фон rgba(255,107,0,.06), бейдж 'RECOMMENDED') ('Comprehensive analysis. The default for pre-audit runs.'), Pro $0.50/line ('Highest-quality models for critical releases.')
   - у каждой список 3-4 пунктов (severity-ranked findings + confidence score; PoC-validated by critic subagent; GitHub/GitLab CI; report export) — распределить по уровням разумно, без выдумывания фич
   - CTA-кнопки: Advanced — primary 'Start free' → signupUrl; остальные — secondary
   - под карточками mono-note: 'Account tiers: Basic $250/mo · Pro $2,500/mo · Enterprise — custom.'
2. src/components/Faq (testid faq, id='faq'):
   - kicker 'FAQ', H2 'Honest answers to hard questions.'
   - 6 <details>-аккордеонов (native details/summary, кликабельный summary ≥ 44px) из D.5 (сжато, с сохранением честности): 'Can AI really audit a smart contract?', 'How is this different from Slither or Aderyn?', 'What about false positives?', 'Do I still need a human audit?' (ответ ОБЯЗАН содержать 'Yes.'), 'Is my code private?', 'What does it cost?'
3. src/components/FinalCta (testid final-cta): band на var(--site-accent) (как CTA-band референса; текст #1a0d02): H2 '$75 free. No card required.', подзаголовок 'Run a real audit on your codebase today — results in minutes.', кнопка (тёмная #14110d, текст #f2ede4) 'Start your first audit' → signupUrl.
4. Порядок: testimonials → pricing → faq → final-cta → footer. uilint: завершение UX-O2 (3 below + footer), UX-G3 (3 карточки widthMatches tol 5%; выделенная: colorDistance bg vs соседняя ≥ MIN_ADJACENT_REGION_DISTANCE), UX-I1 (FAQ: первый answer невидим до клика, виден после — сценарий кликает первый summary; высота summary ≥ 44), UX-C4 (после скролла к pricing navbar в view сверху — sticky), UX-C5 (кнопка final-cta: colorDistance ≥ MIN_TEXT_BG_DISTANCE), цены singleLineText.
## Test Plan
~320 LOC → ≥ 32 проверок. Красные до имплементации.

tests/unit/pricing-faq-cta.test.tsx (~19):
- pricing: id и testid (1); 3 карточки countIs (1); названия/цены Lite $0.07, Advanced $0.12, Pro $0.50 за line (3); бейдж RECOMMENDED на Advanced (1); CTA Advanced → signupUrl (1); mono-note с Basic $250/Pro $2,500/Enterprise (1)
- faq: id и testid (1); 6 details (countIs) (1); все 6 вопросов точны (2 table-driven); ответ 'Do I still need a human audit?' начинается с 'Yes' (1); ответ про приватность содержит 'not stored' (1)
- final-cta: testid (1); H2 '$75 free. No card required.' (1); кнопка 'Start your first audit' → signupUrl (2); DOM-порядок testimonials→pricing→faq→final-cta (1)

tests/unit/pricing-css.test.ts (~4): Advanced-карточка accent-бордер; band final-cta на var(--site-accent); summary min-height/padding ≥ 44px эквивалент; grid 3/1 колонок

uilint (~11):
- below(pricing, testimonials), below(faq, pricing), below(final-cta, faq), below(footer, final-cta) (4)
- G3: widthMatches 3 карточек (1), colorDistance выделенной vs обычной (1)
- I1-сценарий: до клика visible(faq-answer-1,false), клик по summary, после visible true (2); heightIn(summary, gte(44)) forAll (1)
- C4: сценарий скроллит к #pricing и снапшотит: navbar inside view сверху (1)
- C5: colorDistance текста кнопки final-cta (1)
- textMatches(pricing H2) — гарантированная красность (1); singleLineText цен (1 forAll)
## Acceptance
- npm test + npm run test:layout зелёные (3 вьюпорта, обе темы, интерактивный FAQ-сценарий)
- Приёмка тех-лида: pricing в ритме референса (выделенный Advanced), FAQ-аккордеон работает с клавиатуры (native details), final-cta band контрастен в обеих темах
- Цены и tier-ы точны по фактпаку C; в FAQ сохранена честность ('Yes' про human audit)
- Полный конверсионный путь: hero → … → final-cta, все navbar-якоря ведут на существующие секции (broken-anchor warnings в build исчезают)
## Log
- 2026-07-02T14:28:02Z @snjax: created
- 2026-07-02T14:56:23Z @snjax: draft -> spec
- 2026-07-02T15:01:37Z @snjax: spec -> tests_red
- 2026-07-02T15:06:45Z @snjax: attested tests_are_red: yes: npm test reports 177 total, 150 passing, 27 failing from missing pricing/FAQ/final-cta testids, pricing cards, FAQ items, CTA link, and missing Pricing/Faq/FinalCta CSS files/rules; npm run test:layout:fast fails ux-global dark/light with pricing-card count got 0 expected 3, pricing headline empty vs /Pay as you go\. Priced per line\./, and faq-open first answer not visible after click, no engine errors.
- 2026-07-02T15:06:45Z @snjax: tests_red -> impl
- 2026-07-02T15:13:55Z @snjax: impl -> review
- 2026-07-02T15:15:25Z @snjax: attested review_approved: yes: pricing (Lite/Advanced-RECOMMENDED/Pro, тиры точны по фактпаку), FAQ (6 честных аккордеонов, интерактив в uilint-сценарии), final-cta band; все navbar-якоря резолвятся, broken-anchor warnings исчезли; 177/177 юнитов, uilint полностью зелёный (3 вьюпорта, обе темы, FAQ-клик, sticky-navbar), скриншот-приёмка пройдена
- 2026-07-02T15:15:25Z @snjax: review -> done

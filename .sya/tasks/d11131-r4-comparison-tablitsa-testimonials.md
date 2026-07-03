---
id: d11131
type: feature
title: "R4: Comparison-таблица + Testimonials"
status: done
priority: normal
parent: 18fa2e
relations:
  depends_on:
  - 41ba9b
fields:
  loc_estimate: 260.0
  spec_approved: true
created: "2026-07-02T14:28:02.129692622Z"
schema_version: 1
---
## Description
Comparison по D.4 (5 колонок: Slither/manual/AuditAgent/Octane/Savant, 6-7 строк, honest bottom line) + testimonials (Pessimistic, 1inch, Lido — точные цитаты). UX-G5 (mobile scroll в контейнере), UX-O2. См. design/UX.md.

## Design
Две секции после coverage. Референсы: savant_chat_content.md D.4 (таблица + bottom line) и D.2 P3/C-цитаты, design/UX.md §3.

1. src/components/Comparison (testid comparison):
   - kicker 'COMPARISON', H2 'Savant Chat vs the alternatives — at a glance.'
   - таблица (desktop) / горизонтально скроллимый контейнер (mobile, testid comparison-scroll): колонки Slither/Mythril · Manual audit firm · AuditAgent · Octane · Savant Chat (колонка Savant выделена: фон rgba(255,107,0,.06), бордер accent сверху)
   - строки (сжато из D.4): Coverage; Time to result; Cost (typical DeFi protocol); Public benchmark; False-positive reputation; Multi-language; CI/CD. Содержимое точно из D.4 (Savant: '87–95% CTFBench (our open benchmark); 100% recall on Crestal (judge-adjudicated)'; Octane benchmark: 'Monad contest #1 of 1,600' — чужая победа остаётся в ЧУЖОЙ колонке, это честно и допустимо)
   - bottom line (mono, muted): 'Roughly 1–3% the cost of a manual DeFi audit — with a public contest record.'
2. src/components/Testimonials (testid testimonials):
   - kicker 'WHAT SECURITY TEAMS SAY', 3 цитаты-карточки (surface, большая кавычка accent):
     a. Pessimistic Security: 'It correctly identified several findings on our test contract and didn't produce a single clear false positive. This is the first genuinely useful security tool we've come across in quite a while.'
     b. 1inch: 'Catch and fix issues early — in development, not in production — in minutes, not days — at a fraction of the cost of a human audit — finding errors humans overlook.'
     c. Vasiliy Shapovalov, Lido: 'Savant Chat does a great job of filtering false positives while finding issues. As a faster, cheaper tool its place in the developer pipeline is closer to an internal review.'
   - подписи mono muted: имя + ссылка на пост в X (URL из брифа C-фактов)
3. Порядок: coverage → comparison → testimonials. uilint: продолжение UX-O2 (2 below), G5 (mobile: страница без overflow при широкой таблице — G1 держит, добавить widthIn(comparison-scroll, ≤ viewport)), Savant-колонка визуально отлична (colorDistance фона ≥ MIN_ADJACENT_REGION_DISTANCE от соседней колонки), 3 цитаты countIs, textDoesNotOverflow цитат, alignedHorizontallyTop карточек цитат desktop.
## Test Plan
~260 LOC → ≥ 26 проверок. Красные до имплементации (по testid на homepage).

tests/unit/comparison-testimonials.test.tsx (~16):
- comparison есть; 5 заголовков колонок точны (5); ≥ 6 строк-критериев (1); ячейка Savant/benchmark содержит 'our open benchmark' и '100% recall' (2); ячейка Octane/benchmark содержит 'Monad' (честность: чужая победа в чужой колонке) (1); bottom line содержит '1–3%' (1)
- testimonials: 3 цитаты (countIs) (1); тексты Pessimistic/1inch/Lido по ключевым фразам ('single clear false positive', 'minutes, not days', 'internal review') (3); подписи с https-ссылками на x.com (1); DOM-порядок coverage→comparison→testimonials (1)
- рендер НЕ содержит 'replaces human audit' и 'independent' в ячейке CTFBench (1)

tests/unit/comparison-css.test.ts (~3): Savant-колонка с выделением (accent-фон/бордер); mobile media: comparison-scroll overflow-x auto; карточки цитат на var(--site-surface)

uilint (~7): below(comparison, coverage), below(testimonials, comparison) (2); widthIn(comparison-контейнер ≤ viewport) mobile (1); colorDistance(savant-col, обычная col, gte(MIN_ADJACENT_REGION_DISTANCE), from backgroundColor to backgroundColor) (1); countIs(quote-card, eq(3)) (1); textDoesNotOverflow для 3 цитат (1 forAll); textMatches заголовка comparison — гарантированная красность (1)
## Acceptance
- npm test + npm run test:layout зелёные (3 вьюпорта, обе темы)
- Приёмка тех-лида: таблица читабельна в обеих темах, Savant-колонка выделена но без кислотности; mobile — таблица скроллится внутри, страница не расползается
- Цитаты дословно из брифа (сокращения без искажения смысла), ссылки на первоисточники работают
## Log
- 2026-07-02T14:28:02Z @snjax: created
- 2026-07-02T14:51:09Z @snjax: draft -> spec
- 2026-07-02T14:55:43Z @snjax: spec -> tests_red
- 2026-07-02T14:57:57Z @snjax: attested tests_are_red: yes: npm test reports 150 total, 130 passing, 20 failing from missing comparison/testimonials testids, comparison cells, quote cards, and missing Comparison/Testimonials CSS files/rules; npm run test:layout:fast fails ux-global dark/light with quote-card count got 0 expected 3 and comparison headline empty vs /Savant Chat vs the alternatives/, no engine errors.
- 2026-07-02T14:57:57Z @snjax: tests_red -> impl
- 2026-07-02T15:00:41Z @snjax: impl -> review
- 2026-07-02T15:01:37Z @snjax: attested review_approved: yes: comparison (выделенная Savant-колонка, честные ячейки — Monad у Octane, CTFBench=our open) + testimonials (3 цитаты с ссылками на X) приняты; 150/150 юнитов, uilint зелёный, mobile overflow 0, скриншот-приёмка обеих тем
- 2026-07-02T15:01:37Z @snjax: review -> done

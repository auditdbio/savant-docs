---
id: 10a8d3
type: feature
title: "V6: Типографика переносов, выравнивание, 10-30 констрейнтов на элемент"
status: done
priority: normal
parent: 8d6305
relations:
  depends_on:
  - 1d305a
  - 3f0798
  - 0483d9
  - b79b36
fields:
  loc_estimate: 400.0
  spec_approved: true
created: "2026-07-02T19:01:51.70440743Z"
schema_version: 1
---
## Description
text-wrap balance/pretty, BalancedHeading со span-словами, custom constraint noOrphanLastLine, таблица строк per-viewport (DESIGN.md §3.1), правила выравнивания (§5, UX-A1..A5), добор каждой спеки до 10-30 констрейнтов (UX §3.9)

## Design
Типографика переносов + выравнивание + плотность uilint. design/DESIGN.md §3.1, §5; design/UX.md §3.7–3.9. Завершающая фича эпика.

1. src/components/BalancedHeading: рендерит заголовок, оборачивая каждое слово в <span class='bw'> (пробелы сохраняются), text-wrap: balance. Применить к hero-title и ко ВСЕМ секционным H2 (proof, pillars, coverage, comparison, testimonials, pricing, faq, final-cta). testid'ы заголовков сохраняются на корневом элементе.
2. custom.css: h1..h3 text-wrap balance (fallback-safe), лиды/абзацы p text-wrap pretty.
3. uilint/lib/constraints.ts: кастомный констрейнт noOrphanLastLine(words, container, {minLastLineRatio: .25}): сгруппировать span-слова по top (толеранс 4px) → строки; violation если последняя строка из 1 слова И её ширина < 25% ширины container. По docs vendor/uilint/docs/core-api.md §Custom constraints.
4. Применение noOrphanLastLine: hero-title + 8 секционных H2, на desktop И wide (mobile не проверяем — узко).
5. Таблица строк (textLinesAtMost): hero-title ≤3 desktop/wide, ≤5 mobile; все H2 ≤2 desktop/wide, ≤3 mobile; заголовки карточек (pillars/pricing) ≤2.
6. Выравнивание (UX-A1..A5) — добрать в спеки: hero mobile centered / desktop left (уже частично); kickers+H2 секций alignedVerticallyLeft с контейнером; final-cta centered (заголовок+кнопка); сетки alignedHorizontallyTop + equal gaps.
7. Плотность: КАЖДАЯ из 12 секций (navbar, hero, trust-logos, proof-stats, pillars, coverage, comparison, testimonials, pricing, faq, final-cta, footer) — ≥10 констрейнтов в uilint-спеках (max 30). Добрать недостающие: inside/below/размеры/контраст/переносы/выравнивание/视порт-поведение. Meta-enforcement: tests/unit/spec-density.test.ts парсит uilint/specs/*.ts и проверяет число констрейнтов на секцию ≥10 (по группировке имён/комментариям-маркерам section:<name> — ввести соглашение: каждый констрейнт создаётся с name-префиксом 'секция/...', парсер считает по префиксам).
## Test Plan
~400 LOC → ≥ 40 проверок. Красные до имплементации.

tests/unit/balanced-heading.test.tsx (~6): каждое слово в span.bw; пробелы сохранены (textContent равен исходному); testid на корне; hero-title и все 8 H2 используют компонент (рендер homepage: querySelectorAll('[data-testid] .bw') покрывает 9 заголовков)

tests/unit/typography-css.test.ts (~3): h1/h2 text-wrap balance; p/lead pretty; .bw display inline (не ломает переносы)

tests/unit/spec-density.test.ts (~13): для каждой из 12 секций число констрейнтов с name-префиксом 'section/' ≥10 и ≤40 (12 table-driven + 1 «все констрейнты имеют секционный префикс»)

tests/unit/no-orphan-unit.test.ts (~5): юнит на функцию группировки строк noOrphanLastLine по синтетическим снапшотам (1 строка ок; висяк-нарушение; широкое последнее слово ок; толеранс top; пустая группа)

uilint (~15+): noOrphanLastLine на 9 заголовках × desktop+wide; textLinesAtMost по таблице; UX-A1..A5 добор. Красность: .bw-спаны отсутствуют (element-missing), density-тест красный (секции сейчас <10), BalancedHeading не существует
## Acceptance
- npm test + npm run test:layout зелёные; spec-density: 12/12 секций ≥10 констрейнтов
- Приёмка арт-директора на 3 вьюпортах × 2 темы: ни один заголовок не оставляет висячего слова; выравнивание по DESIGN §5 (hero-текст центр на mobile / слева на desktop; final-cta центр; сетки по верху)
- text-wrap balance не ломает SSR/гидрацию
## Log
- 2026-07-02T19:01:51Z @snjax: created
- 2026-07-02T19:43:13Z @snjax: draft -> spec
- 2026-07-02T20:01:05Z @snjax: spec -> tests_red
- 2026-07-02T20:06:56Z @snjax: attested tests_are_red: yes: npm test reports 298 tests, 31 failing; failures are assertion-level for missing BalancedHeading/.bw spans, text-wrap CSS, blog title color CSS, and uilint spec-density. npm run test:layout:fast fails via ux-global missing .bw noOrphanLastLine violations on hero-title and all 8 H2s in dark/light.
- 2026-07-02T20:06:56Z @snjax: tests_red -> impl
- 2026-07-02T20:18:00Z @snjax: impl -> review
- 2026-07-02T20:20:06Z @snjax: review -> tests_red ↩
- 2026-07-02T20:21:46Z @snjax: attested tests_are_red: yes: typography-css mobile heroText text-align assertion fails; test:layout:fast fails hero/title-first-line-centered-mobile on mobile dark/light with leftGap 0 and rightGap 107-137px.
- 2026-07-02T20:21:46Z @snjax: tests_red -> impl
- 2026-07-02T20:24:12Z @snjax: impl -> review
- 2026-07-02T20:25:14Z @snjax: attested review_approved: yes: BalancedHeading + noOrphanLastLine (без висяков на wide/desktop, проверено скриншотами), центрирование mobile-hero после setback (centeredTextLine по word-спанам), 147+ секционных констрейнтов ≥10 на секцию (мета-тест плотности), выравнивание UX-A1..A5; 299/299, uilint полностью зелёный
- 2026-07-02T20:25:14Z @snjax: review -> done

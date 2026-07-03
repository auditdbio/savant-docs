---
id: 1d305a
type: feature
title: "V2: Hero — AnalysisDemo (cinematic-аудит) справа"
status: done
priority: normal
parent: 8d6305
relations:
  depends_on:
  - f1390a
fields:
  loc_estimate: 320.0
  spec_approved: true
created: "2026-07-02T19:01:51.661364185Z"
schema_version: 1
---
## Description
Порт src/components/AnalysisDemo из savant-docs (единственный переносимый UI-элемент): canvas-анимация аудита + shiki. Тема-зависимые цвета канваса по DESIGN.md §6. Layout 50/50 desktop, стек mobile (UX-A1/A2)

## Design
Порт AnalysisDemo из клона savant-docs (единственный переносимый UI-элемент). Референс: <клон>/src/components/AnalysisDemo/{AnalysisDemo.tsx,AnalysisSidePanel.tsx,codeData.ts}. design/DESIGN.md §6, design/UX.md §3.8 (UX-A1/A2).

1. Копировать 3 файла в src/components/AnalysisDemo/ с адаптациями (логика анимации БЕЗ изменений):
   - deps: npm i shiki@^3.4.2
   - SSR: экспортировать обёртку с <BrowserOnly> (canvas — клиент-only), fallback — пустой контейнер той же высоты (без layout shift)
   - Темизация (DESIGN.md §6): вынести цвета в функцию getDemoColors(colorMode): light {bg:#FFFFFF, code:#111827, gutter:#6b7280, shikiTheme:'github-light'}; dark {bg:#0C0810, code:#E5E7EB, gutter:#877C93, shikiTheme:'github-dark'}. useColorMode() из @docusaurus/theme-common; при смене темы канвас перерисовывается (re-init шики/цветов). Highlight RGB не меняются
   - AnalysisSidePanel: фон/текст панели тоже от colorMode (surface/gray-токены), инлайн-стили заменить на значения из getDemoColors/токенов
2. Монтаж в hero (index.tsx): правая колонка, data-testid analysis-demo, role img + aria-label как в референсе. Grid hero: desktop/wide — текст-колонка 50%/демо 50% (демо на белой/surface панели с радиусом 14 и тенью, вписан в band); mobile (<997) — демо ПОД ctas/note, full-width, высота 420
3. Высоты: desktop 494px, mobile 420px (как в референсе 465/494 — округляю)
4. UX-инварианты (uilint, добавить в ux-global/hero-часть): rightOf(demo, hero-title) desktop/wide; widthIn(demo, ≥40% ширины hero); heightIn(demo, 400–520); noOverlap([demo, hero-title, hero-lead, hero-ctas]); mobile: below(demo, hero-note) + widthMatches(demo, hero, tol 10%); demo inside hero; visible(demo,true) на всех вьюпортах/темах
## Test Plan
~320 LOC адаптаций/обвязки → ≥ 32 проверок. Красные до имплементации.

tests/unit/analysis-demo.test.tsx (~12): getDemoColors('light')/('dark') возвращают точные значения DESIGN §6 (8 проверок table-driven); codeData экспортирует строку с 'pragma solidity' (1); blocksData: ≥1 блок isVulnerable и ≥1 safe (2); обёртка рендерит fallback-контейнер с data-testid analysis-demo в SSR-режиме (1)

tests/unit/homepage.test.tsx дополнение (~3): hero содержит analysis-demo; порядок: demo после hero-note в DOM; hero-текст и demo в одном section[hero]

tests/unit/hero-layout-css.test.ts (~5): grid/flex 2 колонки в desktop-media; mobile-media demo full-width; высота 494 desktop / 420 mobile; панель демо радиус 14

uilint ux-global hero-дополнение (~12): visible(demo) на 3 вьюпортах (3); rightOf(demo, title) desktop+wide (2); widthIn ≥40% hero desktop (1); heightIn 400-520 (1); noOverlap с текстовой колонкой (1); mobile: below(demo, note) (1); inside(demo, hero) (1); present(canvas внутри demo, true) (1); UX-F1 по-прежнему: title+CTA above the fold ПРИ демо справа (1)

Красность: testid analysis-demo отсутствует — uilint element-missing + unit assertion-red; getDemoColors не существует — тест через динамический import с ожиданием модуля (оформить как expect(importFails).toBe(false) чтобы был assertion-red, не crash)
## Acceptance
- npm test + npm run test:layout зелёные; демо анимируется в браузере (ручная проверка арт-директора по скриншотам: код скроллится, блоки подсвечиваются, панель печатает текст)
- Обе темы: канвас перекрашивается при переключении (light: белый код-фон; dark: #0C0810), без «белой вспышки» в dark
- Mobile: демо под текстом, страница без горизонтального скролла
- Производительность: анимация не блокирует прокрутку (canvas RAF)
## Log
- 2026-07-02T19:01:51Z @snjax: created
- 2026-07-02T19:03:36Z @snjax: draft -> spec
- 2026-07-02T19:14:45Z @snjax: spec -> tests_red
- 2026-07-02T19:17:50Z @snjax: attested tests_are_red: yes: npm test reports 209 total, 189 passing, 20 failing via assertions: missing AnalysisDemo module exports/getDemoColors/codeData/blocksData, missing homepage analysis-demo testid/order, and absent hero layout CSS. npm run test:layout:fast fails ux-global dark/light with analysis demo visible/canvas/inside/height/rightOf/width violations; no engine errors.
- 2026-07-02T19:17:50Z @snjax: tests_red -> impl
- 2026-07-02T19:24:07Z @snjax: Implementation is green for npm test (209/209) and npm run test:layout, but npm run typecheck is blocked by tests/unit/homepage.test.tsx:79 passing HTMLElement | null to Array.indexOf(Element). Per impl instruction, tests/specs were not edited.
- 2026-07-02T19:26:03Z @snjax: impl -> review
- 2026-07-02T19:27:21Z @snjax: attested review_approved: yes: AnalysisDemo портирован и анимируется (скролл кода, подсветка, панель), канвас темизирован (white/#0C0810), 50/50 desktop и стек mobile, 209/209 юнитов, uilint зелёный incl. above-fold с демо; приёмка по скриншотам dark/light/mobile
- 2026-07-02T19:27:21Z @snjax: review -> done

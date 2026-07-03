---
id: 3f0798
type: feature
title: "V3: Реальные логотипы партнёров"
status: done
priority: normal
parent: 8d6305
relations:
  depends_on:
  - f1390a
fields:
  loc_estimate: 120.0
  spec_approved: true
created: "2026-07-02T19:01:51.67264185Z"
schema_version: 1
---
## Description
Копируем horizontal-SVG (1inch, lido, pessimistic, oxorio, mixbytes, gearbox, hexens) в static/img/partners/, заменяем текстовые wordmarks в TrustLogos. Монохром через CSS-filter, hover — цвет; в dark — читаемость каждого проверить (DESIGN.md §6)

## Design
Реальные логотипы партнёров вместо текстовых wordmarks. design/DESIGN.md §6. Ассеты из клона savant-docs: static/img/{1inch,lido,pessimistic,oxorio,mixbytes,gearbox,hexens}/*_horizontal.svg

1. Скопировать 7 horizontal-SVG в static/img/partners/ (плоские имена: 1inch.svg, lido.svg, ...)
2. TrustLogos: <img src=... alt='<Name> logo' loading='lazy' height=28> вместо span-wordmarks; data-testid partner-logo на каждом
3. CSS: высота 24-28px (width auto); базово filter: grayscale(1) opacity(.65); hover: filter none, opacity 1, transition .2s
4. Dark-тема: многие SVG тёмные → в dark добавить invert-стратегию ТОЛЬКО тем логотипам, что нечитаемы: класс per-logo не вводить, использовать filter: grayscale(1) invert(1) opacity(.6) на весь ряд в dark (сделает все логотипы светло-серыми — единообразно и читаемо). Hover в dark: opacity .9 (цвет не возвращаем — инверсия исказит бренд-цвета; сдержанный ряд лучше кислотного)
5. Выравнивание (UX-A, §5): одна строка, alignedHorizontally по вертикальному центру, равные зазоры 40px, mobile — wrap по центру
## Test Plan
~120 LOC → ≥ 12 проверок. Красные до имплементации.

tests/unit/trust-proof.test.tsx обновление (~7): вместо текстовых wordmarks — 7 img[data-testid=partner-logo] (countIs eq 7); каждый img имеет src /img/partners/ и непустой alt '<Name> logo' (table-driven 7 имён → 2 сводных); loading=lazy (1); файлы static/img/partners/*.svg существуют — 7 путей fs.existsSync (1 сводный table-driven)

tests/unit/partner-logos-css.test.ts (~3): grayscale-фильтр в базовом состоянии; hover-правило снимает фильтр; dark-блок содержит invert

uilint trust-logos обновление (~5): countIs(partner-logo, eq(7)); forAll heightIn 20-36; alignedHorizontally (desktop+wide); alignedHorizEqualGap (desktop); noOverlap. Красность: element-missing по data-testid partner-logo (wordmarks не имеют testid)
## Acceptance
- npm test + npm run test:layout зелёные
- Приёмка арт-директора: в light ряд серых логотипов, оживающих на hover; в dark — единообразный светло-серый ряд, каждый логотип различим (проверяю каждый по скриншоту)
## Log
- 2026-07-02T19:01:51Z @snjax: created
- 2026-07-02T19:15:33Z @snjax: draft -> spec
- 2026-07-02T19:27:21Z @snjax: spec -> tests_red
- 2026-07-02T19:28:46Z @snjax: attested tests_are_red: yes: npm test reports 220 total, 202 passing, 18 failing via assertions: no partner-logo imgs, missing static/img/partners/*.svg assets, and missing .partnerLogo filter CSS. npm run test:layout:fast fails ux-global dark/light with UX-G4 seven partner logos count got 0 expected 7; no engine errors.
- 2026-07-02T19:28:46Z @snjax: tests_red -> impl
- 2026-07-02T19:30:39Z @snjax: impl -> review
- 2026-07-02T19:32:44Z @snjax: review -> tests_red ↩
- 2026-07-02T19:35:07Z @snjax: attested tests_are_red: yes: npm test 220 total, 17 failing; failures assert old img tags, missing TrustLogos/logos/*.tsx currentColor sources, and filter CSS. test:layout:fast remained green because uilint selectors are unchanged.
- 2026-07-02T19:35:07Z @snjax: tests_red -> impl
- 2026-07-02T19:38:06Z @snjax: impl -> review
- 2026-07-02T19:40:15Z @snjax: review -> tests_red ↩
- 2026-07-02T19:40:45Z @snjax: attested tests_are_red: yes: npm test 220 total, 219 passing, 1 failing; trust-proof source normalization rejects OxorioLogo.tsx fill="url(#paint0_linear_2741_28786)".
- 2026-07-02T19:40:45Z @snjax: tests_red -> impl
- 2026-07-02T19:41:58Z @snjax: impl -> review
- 2026-07-02T19:42:23Z @snjax: attested review_approved: yes: 7 реальных логотипов монохромом currentColor (без filter-хаков), MixBytes без плашки, OXORIO без градиента, 1inch — официальная геометрия; единый muted-ряд в обеих темах, hover темнеет/светлеет; 220/220, uilint зелёный
- 2026-07-02T19:42:23Z @snjax: review -> done

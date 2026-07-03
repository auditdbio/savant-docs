---
id: 6adc6d
type: feature
title: Navbar и Footer в стиле Obsidian/Porcelain
status: done
priority: normal
parent: 45d3f8
relations:
  depends_on:
  - 7e875c
fields:
  loc_estimate: 150.0
  spec_approved: true
created: "2026-07-02T13:25:19.6989518Z"
schema_version: 1
---
## Description
Navbar: логотип (квадрат с ромбом, DESIGN.md §4) + словомарка, ссылки text-soft, CTA-кнопка accent. Footer: фон bg-deep, колонки ссылок, копирайт. Обе темы. data-testid для uilint.

## Design
Navbar и Footer по DESIGN.md §3–4.

1. Логотип: src/components/Logo/index.tsx — квадрат 26×26, фон var(--site-accent), border-radius 6px, внутри ромб 9×9 цвета var(--site-bg) (transform rotate(45deg)), data-testid="logo-mark". Подключить в navbar через docusaurus.config (logo → кастомный компонент нельзя напрямую — использовать navbar item html или swizzle Navbar/Logo; предпочтительно: свой SVG-файл static/img/logo.svg, генерируемый по этой геометрии, + wordmark 'Sentiel' стилем CSS).
2. Navbar CSS: высота ~64px, фон --ifm-navbar-background-color, border-bottom 1px solid --site-border; ссылки 14.5px/500 цвет --site-text-soft, hover --site-text; словомарка 19px/800/-0.02em; CTA-элемент 'Start an audit' (navbar item custom-cta): заливка accent, радиус 8px, паддинг 10px 20px, вес 700.
3. Footer: фон --site-bg-deep (dark) / #fff (light), border-top --site-border; колонки заголовков 13px/700 letter-spacing .06em цвет muted, ссылки 14px text-soft; копирайт 13px muted. Структура ссылок: PRODUCT / COMPANY / LEGAL как в референсе.
4. data-testid: navbar, navbar-logo, navbar-links, navbar-cta, footer, footer-columns (через CSS-селекторы Docusaurus классов в uilint допустимо: .navbar, .footer — testid только там, где мы владеем разметкой).
## Test Plan
До имплементации, красные. Оценка ~150 LOC → 15+ тестов.

tests/unit/navbar-config.test.ts (vitest, импорт docusaurus.config.ts):
- navbar title = 'Sentiel' (1)
- navbar logo src задан (1)
- navbar содержит ссылки Docs и Blog (2)
- navbar содержит CTA-item с классом/меткой Start an audit (1)
- footer содержит колонки PRODUCT/COMPANY/LEGAL (3)
- footer copyright содержит 'Sentiel' (1)

tests/unit/navbar-css.test.ts (vitest, парсинг custom.css):
- .navbar использует border-bottom с var(--site-border) (1)
- стиль navbar CTA: background var(--site-accent) (1)
- footer background = var(--site-bg-deep) в dark-блоке (1)

uilint/specs/navbar.spec.ts (декларативно, Galen-стиль):
- logo inside navbar; links inside navbar; alignedHorizontally([logo, links, cta]) (3)
- navbar прижат к верху viewport, ширина = ширина страницы (2)
uilint/specs/footer.spec.ts:
- footer ниже основного контента, у нижней границы страницы (1)
- колонки footer не пересекаются, выровнены по верху (2)
Viewports: desktop 1280×800 + mobile 375×667 (спеки прогоняются на обоих).

Итого ~20 проверок на ~150 LOC → 1/7.5 ✓
## Acceptance
- npm test и npm run test:layout зелёные
- Навбар и футер в обеих темах соответствуют DESIGN.md (визуальная приёмка тех-лида по скриншотам)
- Мобильный вид: бургер-меню работает, ничего не вылезает за viewport
## Log
- 2026-07-02T13:25:19Z @snjax: created
- 2026-07-02T13:27:17Z @snjax: draft -> spec
- 2026-07-02T13:44:52Z @snjax: spec -> tests_red
- 2026-07-02T13:46:59Z @snjax: attested tests_are_red: yes: npm test has 40 total tests with 9 failing from new navbar/footer unit assertions (title/logo srcDark/Docs/CTA/footer columns/copyright/navbar-cta CSS); npm run test:layout:fast runs and fails 2 navbar CTA constraints across 375x667, 1280x800, 1440x900.
- 2026-07-02T13:46:59Z @snjax: tests_red -> impl
- 2026-07-02T13:49:24Z @snjax: impl -> review
- 2026-07-02T13:50:55Z @snjax: review -> impl ↩
- 2026-07-02T13:57:15Z @snjax: impl -> review
- 2026-07-02T13:57:58Z @snjax: attested review_approved: yes: setback устранён — footer dark #0d0b08 / light #fff, ссылки text-soft; 40/40 юнитов, uilint navbar/footer спеки зелёные на mobile/desktop/wide, визуальная приёмка обеих тем и мобильного меню пройдена
- 2026-07-02T13:57:58Z @snjax: review -> done

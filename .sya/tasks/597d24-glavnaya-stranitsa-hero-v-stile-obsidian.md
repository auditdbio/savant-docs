---
id: 597d24
type: feature
title: "Главная страница: hero в стиле Obsidian"
status: done
priority: normal
parent: 45d3f8
relations:
  depends_on:
  - 7e875c
fields:
  loc_estimate: 250.0
  spec_approved: true
created: "2026-07-02T13:25:19.710308925Z"
schema_version: 1
---
## Description
Homepage: mono-kicker, крупный H1 (62px/800/-0.03em), лид-абзац, два CTA (primary accent + secondary outline), mono-подпись, stats-ряд с border-top. Разметка по DESIGN.md §2-3, обе темы, адаптив mobile. data-testid для uilint.

## Design
Главная (src/pages/index.tsx + index.module.css) — hero в стиле Obsidian (DESIGN.md референс: вариант 1a, левая колонка hero; правую колонку-терминал НЕ делаем в этой фиче).

Структура (сверху вниз, data-testid в скобках):
1. (hero) секция, паддинг 88px 56px 72px (desktop), фон страницы.
2. (hero-kicker) mono-kicker 'AI SMART CONTRACT AUDITS': IBM Plex Mono 12.5px/600, letter-spacing .14em, цвет accent (dark) / accent-text (light).
3. (hero-title) H1 'Continuous audits for contracts that can't fail.': 62px/800, line-height 1.04, letter-spacing -0.03em; max-width ~12ch не задаём — просто контейнер ~640px.
4. (hero-lead) лид 18px, line-height 1.6, цвет text-secondary, max-width 520px.
5. (hero-ctas) ряд: primary 'Start an audit' (accent, 14px 26px, радиус 9px, 700) + secondary 'View a sample report' (outline border-btn). gap 14px.
6. (hero-note) mono-подпись 12.5px цвет muted: '$50 in free credits · pay per audit · no subscription'.
7. (hero-stats) ряд из 3 стат (418 protocols audited / $6.8B TVL under coverage / <48h deep-audit turnaround): цифра 26px/800, подпись 13px muted; border-top 1px --site-border, padding-top 22px, gap 44px.

Адаптив: <=996px — паддинги 48px 24px, H1 40px; stats переносом (flex-wrap). Мобайл 375px: одна колонка, без горизонтального скролла.
Убрать дефолтные HomepageFeatures/hero Docusaurus-скаффолда.
## Test Plan
До имплементации, красные. Оценка ~250 LOC (tsx+css) → 25+ тестов.

tests/unit/homepage.test.tsx (vitest + @testing-library/react, рендер Hero-компонента; Layout Docusaurus мокается):
- рендерится testid hero, hero-kicker, hero-title, hero-lead, hero-ctas, hero-note, hero-stats (7)
- kicker text = 'AI SMART CONTRACT AUDITS' (1)
- h1 — тег H1 и содержит 'Continuous audits' (2)
- primary CTA — ссылка с текстом 'Start an audit', secondary — 'View a sample report' (2)
- stats содержат '418', '$6.8B', '<48h' и подписи (3)
- порядок в DOM: kicker перед title перед lead перед ctas (2)

tests/unit/homepage-css.test.ts (парсинг index.module.css):
- kicker: font-family содержит Plex Mono / var(--ifm-font-family-monospace); letter-spacing .14em (2)
- title: font-weight 800, letter-spacing -0.03em (2)
- ctas primary: background var(--site-accent) (1)
- media query для 996px и 375/мобайл присутствует (1)

uilint/specs/hero.spec.ts (Galen-стиль, desktop+mobile):
- kicker above title, title above lead, lead above ctas, ctas above stats (4)
- все элементы hero inside hero-секции (1)
- desktop: CTA-кнопки alignedHorizontally (1)
- mobile 375px: hero не шире viewport (нет горизонтального переполнения) (1)

Итого ~30 проверок на ~250 LOC → 1/8.3 ✓
## Acceptance
- npm test и npm run test:layout зелёные
- Главная в dark = референс 1a (левая колонка hero) по типографике/цветам/ритму; light — та же структура в палитре Porcelain
- Приёмка тех-лида по скриншотам dev-сервера (desktop 1280, mobile 375, обе темы)
## Log
- 2026-07-02T13:25:19Z @snjax: created
- 2026-07-02T13:27:43Z @snjax: draft -> spec
- 2026-07-02T13:58:19Z @snjax: spec -> tests_red
- 2026-07-02T14:00:38Z @snjax: attested tests_are_red: yes: npm test reports 60 tests total, 41 passing, 19 failing; failures are missing hero data-testid elements and missing index.module.css hero rules. npm run test:layout:fast fails hero snapshot across 375x667, 1280x800, 1440x900 with 'hero is not visible'.
- 2026-07-02T14:00:38Z @snjax: tests_red -> impl
- 2026-07-02T14:02:38Z @snjax: impl -> review
- 2026-07-02T14:03:53Z @snjax: review -> impl ↩
- 2026-07-02T14:04:55Z @snjax: impl -> review
- 2026-07-02T14:05:27Z @snjax: attested review_approved: yes: hero по референсу 1a — kicker/H1/lead/CTA/note/stats; dark secondary CTA исправлен на #f2ede4, light kicker #D45500; 60/60 юнитов, uilint hero-спека зелёная mobile+desktop+wide, mobile overflow 0px; визуальная приёмка обеих тем пройдена
- 2026-07-02T14:05:27Z @snjax: review -> done

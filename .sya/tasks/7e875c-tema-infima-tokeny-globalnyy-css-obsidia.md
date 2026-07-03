---
id: 7e875c
type: feature
title: "Тема: Infima-токены + глобальный CSS (Obsidian dark default + Porcelain light)"
status: done
priority: normal
parent: 45d3f8
relations:
  depends_on:
  - 5ce945
fields:
  loc_estimate: 200.0
  spec_approved: true
created: "2026-07-02T13:25:07.887064083Z"
schema_version: 1
---
## Description
custom.css с токенами по design/DESIGN.md (§1-3, §5): палитра dark/light, шрифты Archivo + IBM Plex Mono (Google Fonts), радиусы, цвета navbar/footer/code. Dark по умолчанию.

## Design
Полная реализация design/DESIGN.md §1–3, §5 в src/css/custom.css + docusaurus.config.ts.

1. Шрифты: Google Fonts через headTags (preconnect fonts.googleapis.com + fonts.gstatic.com, css2: Archivo 500..800, IBM Plex Mono 400..600).
2. custom.css, блок :root (= light Porcelain) и [data-theme='dark'] (= dark Obsidian):
   - все --site-* токены из таблиц DESIGN.md §1;
   - маппинг Infima из §5: --ifm-color-primary (+ shades dark/darker/darkest/light/lighter/lightest вокруг #FF6B00 для dark и #D45500 для light), --ifm-background-color, --ifm-background-surface-color, --ifm-font-color-base, --ifm-font-family-base/monospace, --ifm-code-background, --ifm-navbar-*, --ifm-footer-*, --ifm-global-radius: 9px;
   - типографика: h1..h3 веса/letter-spacing по §2 (h1 800/-0.03em, h2 800/-0.02em, h3 700), body line-height 1.6;
   - кнопки: .button--primary (заливка accent, hover accent-hover, текст on-accent в dark / #fff в light), .button--secondary (прозрачная, обводка --site-border-btn, hover усиление);
   - hr/секционные разделители = --site-border.
3. docusaurus.config.ts: colorMode.defaultMode='dark', respectPrefersColorScheme=false (если не сделано в скаффолде).
4. Никаких структурных изменений страниц — только токены/глобальные стили.
## Test Plan
Все тесты пишутся ДО имплементации и обязаны быть красными. Оценка имплементации ~200 LOC → норма 20+ тестов.

tests/unit/theme-tokens.test.ts (vitest): парсим src/css/custom.css (postcss или регэксп по блокам), table-driven:
- [data-theme='dark']: --site-bg=#14110d, --site-bg-deep=#0d0b08, --site-surface=#1b1712, --site-text=#f2ede4, --site-text-secondary=#b3a894, --site-text-muted=#8f8577, --site-accent=#FF6B00, --site-accent-hover=#ff7d1f, --site-on-accent=#1a0d02, --ifm-background-color=#14110d, --ifm-color-primary=#FF6B00, --ifm-font-color-base=#f2ede4 (12 тестов)
- :root (light): --site-bg=#faf8f4, --site-surface=#ffffff, --site-text=#1e1811, --site-text-secondary=#6f6659, --site-text-muted=#9a8f80, --site-accent-text=#D45500, --ifm-color-primary=#D45500, --ifm-background-color=#faf8f4 (8 тестов)
- шрифты: --ifm-font-family-base содержит Archivo; --ifm-font-family-monospace содержит IBM Plex Mono; --ifm-global-radius=9px (3 теста)

tests/unit/site-config.test.ts (vitest, импорт docusaurus.config.ts):
- colorMode.defaultMode === 'dark' (1)
- respectPrefersColorScheme === false (1)
- headTags содержат preconnect на fonts.googleapis.com и стиль css2 с Archivo и IBM+Plex+Mono (2)

Итого ~27 тестов на ~200 LOC → 1/7.4 ✓
## Acceptance
- npm test зелёный (все ~27 новых тестов проходят)
- npm run build успешен
- Визуально (скриншоты dev-сервера, обе темы): фон/текст/акцент соответствуют DESIGN.md, дефолтная тема — тёмная, переключатель тем работает
- Никакой оранжевый текст #FF6B00 не используется на светлом фоне (только #D45500)
## Log
- 2026-07-02T13:25:07Z @snjax: created
- 2026-07-02T13:26:50Z @snjax: draft -> spec
- 2026-07-02T13:38:24Z @snjax: spec -> tests_red
- 2026-07-02T13:39:37Z @snjax: attested tests_are_red: yes: 28 total tests, 25 failing; new theme/site-config suites add 27 tests, failing on missing CSS tokens/fonts/headTags, e.g. --site-bg undefined vs #14110d and fonts.googleapis.com preconnect false.
- 2026-07-02T13:39:37Z @snjax: tests_red -> impl
- 2026-07-02T13:41:56Z @snjax: impl -> review
- 2026-07-02T13:44:17Z @snjax: attested review_approved: yes: код-ревью diff custom.css+config пройден (токены 1:1 с DESIGN.md, satisfies Config корректен), 28/28 тестов зелёные, uilint smoke зелёный, визуальная приёмка скриншотами: dark=Obsidian, light=Porcelain, дефолт dark, переключатель работает, оранжевый текст на светлом = D45500
- 2026-07-02T13:44:17Z @snjax: review -> done

---
id: f1390a
type: feature
title: "V1: Палитра v2 — white из имплементации, dark производная, фиолетовый hero, логотип savant"
status: done
priority: normal
parent: 8d6305
fields:
  loc_estimate: 350.0
  spec_approved: true
created: "2026-07-02T19:01:51.650368306Z"
schema_version: 1
---
## Description
Полная замена токенов custom.css по DESIGN.md v2 §1-2: white = white/gray-50/gray-900 + orange + purple #52176D; dark = фиолетовый подтон #120C18/#1E1528 + #FF7B1A + #7A2FA3. Hero band на brand/brand-band, hero-CTA белая с фиолетовым текстом, kicker на band #FE9900. Логотип logo_short.svg (+dark-вариант с заменой чёрного контура). signupUrl -> https://savant.chat/dashboard/login

## Design
Реализация design/DESIGN.md v2 §0–2, §6-логотип. Референс-клон savant-docs: /tmp/claude-1000/-home-snjax-projects-website2/9e691436-8d72-4a88-a6a9-958b7418fe6e/scratchpad/savant-docs

1. src/css/custom.css — полная замена палитры (старые Obsidian/Porcelain-значения упраздняются):
   - :root (white) и [data-theme='dark'] — все --site-* из таблиц §1/§2 DESIGN.md, включая новые --site-bg-alt, --site-brand, --site-brand-hover, --site-brand-band, --site-on-brand, --site-hero-cta-bg
   - --ifm-* маппинг: color-primary light=#D05500/dark=#FF7B1A (+шкалы), background-color, font-color-base, navbar/footer от новых токенов; footer в dark = --site-bg-alt, в light = #f9fafb
   - удалить упоминания старых hex (#14110d, #faf8f4, #f2ede4, #1b1712, #b3a894 и пр.) — grep должен быть чистым
2. Hero band: index.module.css — фон var(--site-brand) (light) / var(--site-brand-band) (dark); текст hero на band: title/lead/note цветами --site-on-brand / rgba-производные (lead 80%, note 60% непрозрачности); kicker на band = #FE9900
3. Hero CTA: primary — заливка var(--site-hero-cta-bg), текст #52176D, тень 0 8px 20px rgba(0,0,0,.25); подпись '+ $75 in free credits' под кнопкой (mono 12px, on-brand 60%); secondary — прозрачная, бордер 2px rgba(255,255,255,.85), текст on-brand. ВНЕ hero primary-кнопки остаются оранжевыми (--site-accent)
4. Логотип: скопировать static/img/logo_short.svg из клона → static/img/logo_short.svg; создать logo_short_dark.svg (fill .fil0 #020202 → #F5F2F8, остальное без изменений); navbar logo src/srcDark на них; favicon: скопировать savant-favicon.png → favicon
5. docusaurus.config.ts: customFields.signupUrl = 'https://savant.chat/dashboard/login'
6. Секции: proof-stats и pricing band'ы на var(--site-bg-alt); остальные на --site-bg
7. Kicker вне band: цвет var(--site-accent-text) (обе темы — в dark это #FF8C33)
8. ВАЖНО: все существующие uilint colorDistance-инварианты обязаны остаться зелёными (контраст пересчитан мною в DESIGN.md, но если constraint падает — сообщить, не ослаблять спеку)
## Test Plan
~350 LOC → ≥ 35 проверок. Обновление token-тестов = красные против текущих значений.

tests/unit/theme-tokens.test.ts — ПЕРЕПИСАТЬ таблицы (~24):
- :root: --site-bg #ffffff, --site-bg-alt #f9fafb, --site-text #111827, --site-text-secondary #4b5563, --site-text-muted #6b7280, --site-border #e5e7eb, --site-accent #FF6B00, --site-accent-hover #E65D00, --site-accent-text #D05500, --site-brand #52176D, --site-on-brand #ffffff, --site-hero-cta-bg #ffffff (12)
- [data-theme='dark']: --site-bg #120C18, --site-bg-alt #0C0810, --site-surface #1E1528, --site-text #F5F2F8, --site-text-secondary #B3A9BF, --site-accent #FF7B1A, --site-accent-hover #FF8C33, --site-brand #7A2FA3, --site-brand-band #221030, --ifm-color-primary #FF7B1A (10)
- отсутствие старых hex в custom.css: #14110d, #faf8f4, #1b1712 (2 сводных)

tests/unit/site-config.test.ts (~4): signupUrl = https://savant.chat/dashboard/login; navbar logo src img/logo_short.svg + srcDark img/logo_short_dark.svg; favicon savant

tests/unit/hero-band-css.test.ts (~5): band background var(--site-brand); dark-блок var(--site-brand-band); kicker на band #FE9900; hero primary CTA background var(--site-hero-cta-bg) + цвет #52176D; secondary бордер rgba(255,255,255

Файлы-ассеты (~2): static/img/logo_short.svg существует и содержит #FE9900; logo_short_dark.svg существует и НЕ содержит #020202

uilint: существующие инварианты остаются (регрессия контраста ловится ими); +textMatches не требуется — красность обеспечена token-тестами.
## Acceptance
- npm test + npm run test:layout полностью зелёные (обе темы, 3 вьюпорта)
- Скриншот-приёмка арт-директора: white = ощущение текущего savant.chat (белый + фиолетовый hero + оранжевые CTA), dark = те же hue на тёмных поверхностях, логотип различим в обеих темах
- Никаких старых Obsidian/Porcelain hex в кодовой базе
## Log
- 2026-07-02T19:01:51Z @snjax: created
- 2026-07-02T19:02:33Z @snjax: draft -> spec
- 2026-07-02T19:02:33Z @snjax: spec -> tests_red
- 2026-07-02T19:04:18Z @snjax: attested tests_are_red: yes: npm test reports 190 total, 156 passing, 34 failing via assertions: v1 palette tokens vs v2 expected values, signupUrl still https://app.savant.chat/, favicon/logo still old assets, missing logo_short.svg/logo_short_dark.svg, and hero band/CTA CSS still old colors; no parser/import crashes.
- 2026-07-02T19:04:18Z @snjax: tests_red -> impl
- 2026-07-02T19:11:20Z @snjax: Implementation is green for typecheck and uilint layout, but npm test is blocked by stale tests/unit/navbar-config.test.ts expecting img/logo.svg/img/logo-dark.svg while f1390a Design and updated site-config tests require img/logo_short.svg/img/logo_short_dark.svg. Tests were not edited during impl.
- 2026-07-02T19:13:33Z @snjax: impl -> review
- 2026-07-02T19:14:45Z @snjax: attested review_approved: yes: палитра v2 принята — white восстановлен из имплементации (фиолетовый hero-band, белая hero-CTA, gray-шкала), dark корректно производный (#120C18/#221030/#FF7B1A), логотип savant в обеих темах; 190/190 юнитов, uilint полностью зелёный, контраст-инварианты держат; stale-тест логотипа обновлён мною (супersеded R1-спека)
- 2026-07-02T19:14:45Z @snjax: review -> done

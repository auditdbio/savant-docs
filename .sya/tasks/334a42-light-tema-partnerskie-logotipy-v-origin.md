---
id: 334a42
type: feature
title: "Light-тема: партнёрские логотипы в оригинальных цветах"
status: done
priority: normal
fields:
  loc_estimate: 160.0
  spec_approved: true
created: "2026-07-03T01:38:22.798384846Z"
schema_version: 1
---
## Description
В light логотипы рендерятся в оригинальных цветах ассетов savant-docs; в dark остаётся монохром currentColor. Механика: fill="var(--logo-<name>-<part>, currentColor)" в inline-SVG; light :root задаёт переменные, dark не задаёт. Структурные чёрные заливки — общий var(--logo-ink) (light #111827). Акценты по оригиналам: pessimistic плашка #FFE500 (рука чёрная), oxorio точка градиент #FF6C1A, mixbytes скобки #29C278, gearbox #FF4C00 + #F4129A, TON круг #0098EA (глиф белый выбит), 1inch — icon чёрный (ориг. для светлых носителей), lido/hexens/bgd/mellow — ink (ориг. тёмные wordmark'и; mellow через mask background var). Hover в light: opacity .8→1; grayscale-фильтров не вводить.

## Design
См. Description. Дополнительно: переменные объявлять в custom.css рядом с токенами (§ комментарий 'partner logo originals'); имена --logo-pessimistic-plate, --logo-oxorio-dot(+gradient stop), --logo-mixbytes-accent, --logo-gearbox-accent, --logo-gearbox-accent2, --logo-ton-circle, --logo-ink, --logo-mellow. Градиент OXORIO: восстановить linearGradient в компоненте, stop-color через var (dark: currentColor-стопы). TON: круг var(--logo-ton-circle, currentColor), глиф — выбит (fill страницы/прозрачный) как сейчас. Muted-базу в light для логотипов заменить на полные цвета (без opacity-приглушения, кроме hover-эффекта). Оригинальные SVG — в клоне savant-docs (пути в Description фичи b4ee30).
## Test Plan
~160 LOC → ≥ 16, красные до имплементации.
unit (~12): custom.css light-блок задаёт table-driven: --logo-ink #111827, --logo-pessimistic-plate #FFE500, --logo-oxorio-dot #FF6C1A, --logo-mixbytes-accent #29C278, --logo-gearbox-accent #FF4C00, --logo-gearbox-accent2 #F4129A, --logo-ton-circle #0098EA (7); dark-блок НЕ содержит --logo-* (1); каждый logo-компонент использует var(--logo- (1 сводный); ни один не содержит голых hex-fill вне var-fallback (1); mellow css: background var(--logo-mellow, currentColor) (1); в light нет grayscale-фильтра на ряде (1).
uilint (~4): light-сценарий: forAll partner-logo colorDistance vs фон секции ≥ MIN_ADJACENT_REGION_DISTANCE (различимость на белом) (1); существующие height/noOverlap/один ряд на wide остаются (регрессия) (3).
## Acceptance
- npm test + full test:layout зелёные; приёмка арт-директора: light-ряд цветной как на живом savant.chat (жёлтый Pessimistic, зелёные скобки MixBytes, синий TON), dark-ряд без изменений (муты).
## Log
- 2026-07-03T01:38:22Z @snjax: created
- 2026-07-03T01:38:22Z @snjax: draft -> spec
- 2026-07-03T01:38:22Z @snjax: spec -> tests_red
- 2026-07-03T01:41:04Z @snjax: attested tests_are_red: yes: targeted unit run failed with 20 assertion failures: 7 missing :root --logo-* originals, 9 logo components missing var(--logo-) fills, Mellow mask still currentColor, and signupUrl/navbar CTA still absolute/href. npm run test:layout:fast stayed green because current muted logos remain distinguishable; unit tests carry red.
- 2026-07-03T01:41:04Z @snjax: tests_red -> impl
- 2026-07-03T01:48:01Z @snjax: impl -> review
- 2026-07-03T01:49:22Z @snjax: review -> tests_red ↩
- 2026-07-03T01:50:50Z @snjax: attested tests_are_red: yes: tests/unit/partner-logo-colors.test.ts is red with 31 tests, 10 failing assertions; [data-theme='light'] lacks --logo-* tokens and :root still contains --logo-* while the dark-block absence check passes.
- 2026-07-03T01:50:50Z @snjax: tests_red -> impl
- 2026-07-03T01:52:39Z @snjax: impl -> review
- 2026-07-03T01:53:48Z @snjax: attested review_approved: yes: light — оригинальные цвета (жёлтая плашка Pessimistic, зелёный MixBytes, оранж/розовый Gearbox, синий TON, ink-wordmark'и), dark — полный монохром после setback (vars скоупнуты в [data-theme=light], тест усилен на отсутствие в :root); 362/362, uilint зелёный, colorDistance логотипов в light держит
- 2026-07-03T01:53:48Z @snjax: review -> done

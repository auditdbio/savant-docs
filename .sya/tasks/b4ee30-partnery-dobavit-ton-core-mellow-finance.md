---
id: b4ee30
type: feature
title: "Партнёры: добавить TON Core, Mellow Finance, BGD Labs"
status: done
priority: normal
parent: 8d6305
fields:
  loc_estimate: 140.0
  spec_approved: true
created: "2026-07-02T21:00:56.408846038Z"
schema_version: 1
---
## Description
Добавить 3 логотипа в trust-logos: TON Core (лого из github.com/ton-blockchain — официальный ton_symbol/логотип репо организации), Mellow Finance (с mellow.finance), BGD Labs (уже есть в клоне savant-docs: static/img/bgd/). Тот же монохром currentColor подход, что и у остальных 7; выровнять оптические веса ряда (замечание аудита: uneven logo weights). Итого 10 логотипов, wrap в 2 ряда на laptop допустим.

## Design
Добавить 3 логотипа в TrustLogos (итого 10). Ассеты подготовлены арт-директором в /tmp/claude-1000/-home-snjax-projects-website2/9e691436-8d72-4a88-a6a9-958b7418fe6e/scratchpad/new-partners/:
1. TON Core: ton3.svg (официальный ton_symbol 56x56, circle+glyph) → инлайн-компонент currentColor: круг currentColor, глиф выбит (even-odd/маска), рядом текст 'TON Core' (стиль как у соседей, вес 700). 
2. Mellow: mellow-logo.png (белый wordmark 288x72, растровый) → техника CSS mask: span с mask-image:url(/img/partners/mellow.png), mask-size contain, background-color currentColor, aspect-ratio 4:1, height 22px. PNG скопировать в static/img/partners/mellow.png. aria-label 'Mellow Finance logo', role img.
3. BGD Labs: из клона savant-docs static/img/bgd/bgd_black_logo.svg → currentColor-компонент как остальные 7.
Оптические веса: выровнять высоты так, чтобы визуальная масса была схожей (Pessimistic уже тяжёлый: допустимо ему 24px, лёгким — 28px). Ряд из 10: на laptop допустим wrap в 2 строки, зазоры равные, mobile — wrap по центру.
## Test Plan
~140 LOC → ≥ 14. Красные до имплементации.
unit (~8): countIs partner-logo == 10 (обновить с 7); новые: TON Core / Mellow Finance / BGD Labs имеют aria-label/alt (3 table-driven → 1); ton-компонент содержит fill-rule evenodd или mask и currentColor (1); mellow: css-правило mask-image + background currentColor (2); static/img/partners/mellow.png существует (1); bgd-компонент currentColor без #-fill (1); порядок: новые в конце ряда (1)
uilint (~6): countIs(partner-logo, eq(10)); forAll heightIn 18-36; ряды: на laptop allow 2 строки — alignedHorizontally per-row невозможно жёстко → noOverlap + равные вертикальные зазоры между строками (2); mobile wrap centered (1); textDoesNotOverflow label 'TRUSTED BY...' (1)
## Acceptance
- npm test + test:layout зелёные; приёмка арт-директора: ряд из 10 логотипов ровный в обеих темах, оптические веса сбалансированы, Mellow-mask рендерится идентично соседям
## Log
- 2026-07-02T21:00:56Z @snjax: created
- 2026-07-02T21:17:01Z @snjax: draft -> spec
- 2026-07-02T21:17:01Z @snjax: spec -> tests_red
- 2026-07-02T21:19:31Z @snjax: attested tests_are_red: yes: targeted partner tests 40 total, 11 failing; failures are missing TON/Mellow/BGD logos/assets and Mellow mask CSS. uilint fast red: trust-logos/logo-count got 7 expected 10 plus missing nth(10) logo geometry.
- 2026-07-02T21:19:31Z @snjax: tests_red -> impl
- 2026-07-02T21:26:52Z @snjax: impl -> review
- 2026-07-02T21:29:25Z @snjax: review -> impl ↩
- 2026-07-02T21:31:44Z @snjax: impl -> review
- 2026-07-02T21:32:45Z @snjax: attested review_approved: yes: 10 логотипов (добавлены TON Core inline-SVG, Mellow через CSS mask+currentColor, BGD Labs), TON-клиппинг исправлен, ряд ровный в обеих темах; 321/321
- 2026-07-02T21:32:45Z @snjax: review -> done

---
id: 1ef41a
type: bug
title: "Widescreen: панель демо изредка клиппится по верхней кромке (pos0 1920)"
status: done
priority: normal
fields:
  severity: minor
created: "2026-07-02T21:56:05.368523915Z"
schema_version: 1
---
## Description
Судьи R2: tooltip-текст панели AnalysisDemo на 1920 в отдельные моменты обрезан верхней кромкой контейнера над почти пустой карточкой. Панель не должна выходить за верх контейнера ни в одной фазе анимации.

## Test Plan
Красный юнит: расчёт вертикальной позиции панели (topPx) в AnalysisDemo — синтетические кейсы: блок у верхней кромки контейнера → top клампится в ≥0 (+паддинг), блок у нижней кромки → top+height ≤ высота контейнера; текущая реализация без клампа падает. Плюс uilint: inside(panel, demo-container) на widescreen-сценарии (панель — DOM-элемент).
## Log
- 2026-07-02T21:56:05Z @snjax: created
- 2026-07-02T22:54:11Z @snjax: open -> triage
- 2026-07-02T22:54:11Z @snjax: triage -> tests_red
- 2026-07-02T22:56:16Z @snjax: attested tests_are_red: yes: tests/unit/analysis-demo-panel-position.test.ts has 2 assertion failures; top-edge synthetic case returns -34.5 < 20 and bottom-edge case returns top+height 570.5 > 494. Added hero/analysis-panel-inside-demo uilint constraint; current sampled layout phase passes.
- 2026-07-02T22:56:16Z @snjax: tests_red -> impl
- 2026-07-02T22:58:36Z @snjax: impl -> verify
- 2026-07-02T23:08:33Z @snjax: attested fix_verified: yes: кламп topPx панели покрыт юнитами (верх/низ контейнера) + uilint inside(panel, demo) на widescreen; 330/330, визуально на 1920 панель в границах
- 2026-07-02T23:08:33Z @snjax: verify -> done

---
id: 7f203d
type: bug
title: "AnalysisDemo: вернуть легаси-поведение попапов и отрисовки кода"
status: done
priority: normal
fields:
  severity: major
created: "2026-07-03T05:16:41.658617631Z"
schema_version: 1
---
## Description
Заказчик: (1) код на canvas НЕ обрезать справа эллипсисом — длинные строки уходят под панель-оверлей, это нормально; (2) попапы НЕ клампить в видимую область — они центрируются по своему блоку кода (legacy calculatePanelCenterAlignedTop: blockCenterY - panelHeight/2 от scrollY, без ограничений) и уезжают вместе с кодом за край контейнера; кламп из бага 1ef41a вызывает съезжание попапов в видимость и глюки. Тесты/констрейнты, кодирующие неверное поведение (кламп-юниты, uilint inside(panel, demo)), УДАЛИТЬ и заменить легаси-верными.

## Test Plan
Красные тесты легаси-поведения (перед фиксом):
1. unit panel-position (~5): формула top = paddingTop + (startLine-1)*LH - scrollY + (blockHeight-panelHeight)/2 (центрирование по блоку); синтетика: блок в середине → top по формуле; scrollY уводит блок вверх → top ОТРИЦАТЕЛЬНЫЙ (никакого клампа — текущая кламп-реализация даст 0+ → красный); блок ниже вьюпорта → top > высоты контейнера; pinned-панели пересчитываются от scrollY той же формулой.
2. unit code-render (~3): функция подготовки строк НЕ добавляет '…' и не режет по ширине панели (длинная строка возвращается целиком → красный против ellipsis-логики); канвас-ширина отрисовки = полная ширина канваса.
3. Удаление неверных ожиданий: кламп-юниты из 1ef41a и uilint 'hero/panel-inside-demo' — убрать; спек-плотность hero остаётся ≥10 (там ~28 констрейнтов, запас есть).
4. uilint: оставить/сохранить 'панель непуста когда видима' (фикс 3c529a остаётся в силе).
## Log
- 2026-07-03T05:16:41Z @snjax: created
- 2026-07-03T05:16:41Z @snjax: open -> triage
- 2026-07-03T05:16:59Z @snjax: triage -> tests_red
- 2026-07-03T05:19:18Z @snjax: attested tests_are_red: yes: npm test is red with 368 tests, 7 failing assertions; failures prove clamped AnalysisDemo panel tops (20/369 instead of negative/offscreen legacy values) and missing full-line canvas render helpers for no-ellipsis behavior.
- 2026-07-03T05:19:18Z @snjax: tests_red -> impl
- 2026-07-03T05:21:02Z @snjax: impl -> verify
- 2026-07-03T05:22:45Z @snjax: attested fix_verified: yes: легаси-формула calculatePanelCenterAlignedTop без клампа (юниты: отрицательный top при уехавшем блоке), полные строки кода без эллипсиса под панелью-оверлеем, кламп-тесты 1ef41a и uilint inside(panel,demo) удалены по решению владельца, «панель непуста» сохранена; 368/368, full layout зелёный; визуальная проверка кадрами анимации — попап едет с блоком и режется краем
- 2026-07-03T05:22:45Z @snjax: verify -> done

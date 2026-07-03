---
id: cacdfe
type: bug
title: "AnalysisDemo: balloon при наборе текста подрезается сверху — первая строка видна наполовину"
status: done
priority: normal
fields:
  severity: major
created: "2026-07-03T05:28:47.833071155Z"
schema_version: 1
---
## Description
Заказчик: в момент рендеринга/набора текста первая строка balloon иногда видна наполовину (верх панели за краем контейнера — центрирование по блоку уводит top<0 при высоком блоке; рост высоты панели при наборе двигает top вверх за край). Требование: ПОКА текст набирается/показывается — панель полностью в контейнере (top ≥ отступ, первая строка целиком); ПОСЛЕ завершения набора (текст прочитан, pinned/уходящая фаза) — легаси-поведение без клампа, уезжает с кодом. Кламп ТОЛЬКО для активной набирающей панели, pinned не трогать (регрессия-стража от прошлого перебора).

## Test Plan
УТОЧНЕНИЕ ЗАКАЗЧИКА (заменяет прежний план): кламп ТОЛЬКО в момент появления панели. После появления панель может уезжать даже во время набора. Семантика: при появлении initialTop = clamp(anchoredTop, TOP_MARGIN, containerH - MIN_VISIBLE) и запоминается offset = initialTop - anchoredTop(scrollY_на_момент_появления); далее top = anchoredTop(scrollY) + offset (едет с кодом, без повторного клампа). Рост высоты при наборе НЕ двигает верхнюю кромку (рост вниз / top-анкер после появления) — первая строка стоит на месте, пока панель на экране.
Красные юниты:
1. появление с блоком у верха → initialTop ≥ TOP_MARGIN (текущее центрирование даст <0 → красный) (1)
2. после появления scrollY растёт → top уменьшается по anchored-формуле с offset, БЕЗ повторного клампа (может стать отрицательным) (1)
3. рост panelHeight после появления → top не меняется (рост вниз) (1)
4. обычный средний блок → offset = 0, поведение эквивалентно легаси (1)
5. pinned-панели: без клампа вовсе, легаси-формула (регрессия-стража) (1)
## Log
- 2026-07-03T05:28:47Z @snjax: created
- 2026-07-03T05:28:47Z @snjax: open -> triage
- 2026-07-03T05:28:48Z @snjax: triage -> tests_red
- 2026-07-03T05:30:06Z @snjax: attested tests_are_red: yes: targeted npm test for analysis-demo-panel-position has 10 tests, 3 failing assertions; active typing panel returns legacy offscreen tops (-150.5/-56/837.5) instead of clamped edge positions, while pinned no-clamp guards pass.
- 2026-07-03T05:30:06Z @snjax: tests_red -> impl
- 2026-07-03T05:42:39Z @snjax: Spec refinement red check: updated panel-position tests to initial-only clamp/offset semantics; targeted npm test is red with 10 tests, 1 failing assertion because continuous clamp returns 12 after scroll instead of offset legacy top -188.
- 2026-07-03T05:52:13Z @snjax: impl -> verify
- 2026-07-03T05:55:49Z @snjax: attested fix_verified: yes: кламп только в момент появления (initialTop ≥ margin, offset запоминается), дальше anchored-формула без повторного клампа — уезжает даже при наборе; рост высоты вниз, верхняя кромка неподвижна; pinned без клампа; 373/373 + full layout; визуальная проверка — 3 пойманных момента появления, topRel=13px, первая строка целиком
- 2026-07-03T05:55:49Z @snjax: verify -> done

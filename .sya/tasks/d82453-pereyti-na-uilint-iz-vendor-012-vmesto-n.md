---
id: d82453
type: task
title: Перейти на uilint из vendor/ (0.1.2) вместо npm 0.1.1
status: done
priority: normal
parent: 45d3f8
created: "2026-07-02T13:37:22.43067294Z"
schema_version: 1
---
## Description
npm-реестр отдаёт только @uilint/*@0.1.1, vendored source — 0.1.2 (docs описывают другие builtin-вьюпорты). Собрать пакеты из vendor/uilint (pnpm build) и подключить через file:/workspace, убрав нормализацию viewport groups из uilint.config.ts.
## Log
- 2026-07-02T13:37:22Z @snjax: created
- 2026-07-02T14:27:28Z @snjax: todo -> in_progress
- 2026-07-02T14:30:42Z @snjax: in_progress -> done: Switched root @uilint/* dependencies to vendored 0.1.2 tarballs built from vendor/uilint; npm test, npm run typecheck, and npm run test:layout are green.

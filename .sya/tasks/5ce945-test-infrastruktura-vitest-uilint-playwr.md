---
id: 5ce945
type: task
title: "Test-инфраструктура: vitest + uilint + playwright"
status: done
priority: normal
parent: 45d3f8
relations:
  depends_on:
  - f4779c
created: "2026-07-02T13:25:00.01330754Z"
schema_version: 1
---
## Description
vitest (+ @testing-library/react, jsdom) для unit/component; @uilint/{core,playwright,cli} + uilint.config.ts + сценарии/спеки каркасом; npm scripts: test, test:layout. Версии пакетов = vendor/uilint (0.1.2). Chromium для playwright установлен. Оба раннера запускаются (пустой прогон зелёный/no-op).
## Log
- 2026-07-02T13:25:00Z @snjax: created
- 2026-07-02T13:32:04Z @snjax: todo -> in_progress
- 2026-07-02T13:33:24Z @snjax: Attempted npm install with requested @uilint/*@0.1.2, but npm registry only publishes 0.1.0 and 0.1.1 for @uilint/cli/core/playwright. Proceeding with latest published 0.1.1 unless blocked by verification.
- 2026-07-02T13:36:30Z @snjax: Configured Vitest/jsdom smoke runner and uilint/Playwright layout smoke runner. Verified npm test, npm run typecheck, npm run test:layout, and npm run test:layout:fast pass. Note: npm registry lacks requested @uilint/* 0.1.2; installed latest published @uilint/* 0.1.1 from npm.
- 2026-07-02T13:36:35Z @snjax: in_progress -> done: Test infrastructure is wired and verified: Vitest/jsdom smoke passes, uilint/Playwright layout smoke builds and passes, and root typecheck is clean.

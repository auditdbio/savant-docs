---
id: "803161"
type: task
title: signupUrl → относительный /dashboard/login
status: done
priority: normal
created: "2026-07-03T01:38:22.909863237Z"
schema_version: 1
---
## Description
Заказчик: login-URL сделать относительным (/dashboard/login); 404 на фронте ок — админка позже. Обновить customFields.signupUrl и все тесты, которые ассертят абсолютный https://savant.chat/dashboard/login (site-config, CTA-тесты: ожидание = '/dashboard/login'; проверку startsWith(https) заменить на startsWith('/')).
## Log
- 2026-07-03T01:38:22Z @snjax: created
- 2026-07-03T01:38:22Z @snjax: todo -> in_progress
- 2026-07-03T01:53:48Z @snjax: in_progress -> done

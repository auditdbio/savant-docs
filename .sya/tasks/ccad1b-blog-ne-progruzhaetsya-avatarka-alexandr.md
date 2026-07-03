---
id: ccad1b
type: bug
title: "Блог: не прогружается аватарка Alexandra Gulamova"
status: done
priority: normal
fields:
  severity: minor
created: "2026-07-02T21:12:17.591221608Z"
schema_version: 1
---
## Description
В блоге у автора Alexandra Gulamova не отображается аватар (в savant-docs есть static/img/alexandra_gulamova.jpg — вероятно, не скопирован при переносе V5 или неверный путь в authors.yml). Проверить authors.yml image_url и наличие файла в static/img/.

## Test Plan
Регрессионный тест (красный): tests/unit/blog-authors.test.ts — authors.yml: у каждого автора с image_url файл существует в static (fs.existsSync по указанному пути); отдельная проверка alexandra: файл static/img/alexandra_gulamova.jpg существует.
## Log
- 2026-07-02T21:12:17Z @snjax: created
- 2026-07-02T21:17:19Z @snjax: open -> triage
- 2026-07-02T21:17:19Z @snjax: triage -> tests_red
- 2026-07-02T21:27:34Z @snjax: attested tests_are_red: yes: tests/unit/blog-authors.test.ts has 2 assertion failures; missing local image_url alexandra: /img/alexandra_gulamova.jpg and static/img/alexandra_gulamova.jpg existsSync false.
- 2026-07-02T21:27:34Z @snjax: tests_red -> impl
- 2026-07-02T21:28:16Z @snjax: impl -> verify
- 2026-07-02T21:32:45Z @snjax: attested fix_verified: yes: alexandra_gulamova.jpg скопирован, authors.yml путь корректен, регрессионный тест blog-authors зелёный, аватары в блоге грузятся
- 2026-07-02T21:32:45Z @snjax: verify -> done

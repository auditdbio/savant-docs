---
id: b79b36
type: feature
title: "V5: Блог из savant-docs + математика в markdown"
status: done
priority: normal
parent: 8d6305
relations:
  depends_on:
  - f1390a
fields:
  loc_estimate: 150.0
  spec_approved: true
created: "2026-07-02T19:01:51.694758489Z"
schema_version: 1
---
## Description
Перенос blog/ (3 статьи + authors.yml + картинки) из savant-docs; remark-math + rehype-katex + katex css; uilint-спека blog-страниц (UX §3.9)

## Design
Перенос блога из клона savant-docs + математика в markdown. UX §3.9 (blog-инварианты).

1. Контент: скопировать blog/{3 директории с index.mdx и картинками} + blog/authors.yml в наш blog/ (существующие докозавровые посты УДАЛИТЬ). Тексты статей НЕ редактировать (контент как есть).
2. Математика: npm i remark-math@6 rehype-katex@7 katex; docusaurus.config.ts: blog- и docs-пресеты получают remarkPlugins [remark-math], rehypePlugins [rehype-katex]; stylesheet katex.min.css в stylesheets (self-host из node_modules katex/dist через copy в static или прямой импорт в custom.css — предпочесть импорт локального дистрибутива, НЕ CDN: CSP/self-contained).
3. Проверка математики: добавить в одну из статей нельзя (контент не трогаем) → создать docs-страницу не надо; вместо этого юнит-тест конфига (плагины подключены) + e2e-фикстура: tests/fixtures/math-check.mdx НЕ создавать в блоге. Решение: математика проверяется рендером страницы блога с формулой, ЕСЛИ она есть в статьях; если формул в статьях нет — uilint-проверка ограничивается конфиг-тестами + сборкой (rehype-katex не падает). Дополнительно: страница /blog должна собираться и содержать 3 поста.
4. Навбар/футер: ссылка Blog уже есть; ничего не менять.
5. uilint blog.spec.ts + сценарий: страница /blog (list) и страница одной статьи (2026-04-03 reference book): заголовок статьи ≤3 строк (textLinesAtMost), контент-колонка widthIn 600-860 (desktop), изображения inside контента, нет горизонтального переполнения (inside canvas), навбар сверху, разумные констрейнты по UX §3.9 (~10-15 на страницу).
## Test Plan
~150 LOC кода/конфига → ≥ 15 проверок. Красные до имплементации.

tests/unit/blog-config.test.ts (~7): package.json содержит remark-math/rehype-katex/katex (3); конфиг blog-пресета: remarkPlugins включает remark-math, rehypePlugins включает rehype-katex (2); katex css подключен (stylesheet или импорт в custom.css) (1); authors.yml существует в blog/ (1)

tests/unit/blog-content.test.ts (~5): 3 директории статей существуют (table-driven 1); каждая содержит index.mdx (1); докозавровых постов нет (blog/ не содержит 2021-08-26-welcome и пр.) (1); front-matter каждой статьи含 title и date (2)

uilint blog.spec.ts + сценарии /blog и /blog/<reference-book> (~10): на обеих страницах navbar top+full-width (2); заголовок h1 статьи textLinesAtMost 3 desktop (1); контент-колонка widthIn 600-860 desktop (1); изображения inside контент-колонки (1); страницы inside canvas по ширине — mobile/desktop (2); textDoesNotOverflow заголовка и первого абзаца (2); footer внизу (1). Красность: сценарии идут на /blog/<slug> которых ещё нет → element-missing/404 (валидная красная), плюс config-тесты красные
## Acceptance
- npm test + npm run test:layout зелёные (включая blog-сценарии)
- 3 статьи открываются, картинки на месте, авторы отображаются; katex-рендеринг работает (проверка формулой в build-песочнице или готовностью пайплайна)
- Приёмка арт-директора: типографика статей в нашей теме (обе темы), код-блоки на --site-bg-alt
## Log
- 2026-07-02T19:01:51Z @snjax: created
- 2026-07-02T19:28:03Z @snjax: draft -> spec
- 2026-07-02T19:52:20Z @snjax: spec -> tests_red
- 2026-07-02T19:56:38Z @snjax: attested tests_are_red: yes: npm test 262 total, 25 failing on missing math deps/config, missing savant-docs blog dirs/index/frontmatter, and scaffold posts still present; npm run test:layout:fast fails blog scenario with /blog count got 4 expected 3 and missing reference-book article route/content.
- 2026-07-02T19:56:38Z @snjax: tests_red -> impl
- 2026-07-02T20:00:04Z @snjax: impl -> review
- 2026-07-02T20:01:05Z @snjax: attested review_approved: yes: 3 статьи savant-docs с картинками и authors.yml, katex-пайплайн локальный (без CDN), blog uilint-спеки зелёные; 262/262; приёмка по скриншотам list+article
- 2026-07-02T20:01:05Z @snjax: review -> done

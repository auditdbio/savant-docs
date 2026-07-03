---
id: 0483d9
type: feature
title: "V4: Твит-карточки для цитат"
status: done
priority: normal
parent: 8d6305
relations:
  depends_on:
  - f1390a
fields:
  loc_estimate: 220.0
  spec_approved: true
created: "2026-07-02T19:01:51.683575131Z"
schema_version: 1
---
## Description
Мой дизайн (НЕ порт): карточки-твиты по DESIGN.md §6 — аватар, имя/@handle/дата, текст, метрики, ссылка на пост X. Заменяют текущие quote-карточки в testimonials. Без внешних запросов

## Design
Твит-карточки для testimonials — МОЙ дизайн (порт StaticTweet запрещён). design/DESIGN.md §6, данные цитат — фактпак C брифа savant_chat_content.md.

1. src/components/TweetCard: карточка var(--site-surface), бордер var(--site-border), радиус 14px, паддинг 20px, вся карточка — <a href='<пост в X>' target=_blank rel=noopener> без подчёркивания
   - шапка: аватар 40px круг (генерируем локально: SVG-кружок с инициалами на бренд-градиенте оранжевый→фиолетовый; data-testid tweet-avatar) + колонка (имя 15px/700 --site-text; @handle · дата 13px --site-text-muted) + логотип X (мини-SVG 18px, muted) справа
   - текст 15px/1.55 --site-text; @упоминания и ссылки внутри текста — --site-accent-text (спаны, не ссылки)
   - футер: метрики mono 12.5px muted: N replies · N reposts · N likes
2. Данные (tweets.ts, статично): Pessimistic Security @pessimistic_io (пост 1897264142308008089, 27 Feb 2025) — текст цитаты как в текущем testimonials; 1inch @1inch (1940035968125284690, 1 Jul 2025); Vasiliy Shapovalov @_vshapovalov (Lido, 1976320011850612884, 9 Oct 2025). Метрики скромно-правдоподобные НЕ выдумывать: у нас нет данных → метрики опустить у тех, где не знаем; у skywinder-примера в клоне есть (4/1/6) — но он не в нашем списке. Решение: строка метрик опциональна, выводим только дату
3. Заменить QuoteCard в Testimonials на TweetCard (тот же порядок, 3 карточки, сетка прежняя); заголовок секции сохранить
4. Hover: карточка приподнимается translateY(-4px) + тень, transition .25s
## Test Plan
~220 LOC → ≥ 22 проверок. Красные до имплементации.

tests/unit/tweet-cards.test.tsx (~13): 3 карточки countIs testid tweet-card (1); каждая — ссылка на верный x.com URL c target=_blank и rel noopener (3); имена и @handle точны (3 table-driven → 2); дата отображается (1); аватар testid tweet-avatar с инициалами (1); X-логотип testid tweet-x-logo присутствует (1); тексты цитат сохранены (ключевые фразы, 3); нет <img> с внешним (https://pbs.twimg...) src — все ассеты локальные (1)

tests/unit/tweet-cards-css.test.ts (~3): радиус 14; hover translateY; аватар border-radius 50%

uilint testimonials обновление (~8): countIs(tweet-card, eq(3)); внутри карточки below-цепочка header→text (по testid tweet-header/tweet-text); аватар widthIn 36-44 + almostSquared; alignedHorizontallyTop 3 карточек (desktop) + widthMatches tol 5%; mobile стек alignedVerticallyEdges; textDoesNotOverflow текста; noOverlap. Красность: testid tweet-card отсутствует
## Acceptance
- npm test + npm run test:layout зелёные
- Приёмка арт-директора: карточки читаются как твиты (шапка-аватар-handle-X-лого), но в нашей типографике и палитре, обе темы; клик ведёт на реальный пост
- Никаких внешних запросов (аватары локальные)
## Log
- 2026-07-02T19:01:51Z @snjax: created
- 2026-07-02T19:15:33Z @snjax: draft -> spec
- 2026-07-02T19:42:23Z @snjax: spec -> tests_red
- 2026-07-02T19:45:11Z @snjax: attested tests_are_red: yes: npm test 237 total, 17 failing on missing tweet-card testids/CSS; npm run test:layout:fast fails ux-global dark+light with tweet-card count got 0 expected 3.
- 2026-07-02T19:45:11Z @snjax: tests_red -> impl
- 2026-07-02T19:51:31Z @snjax: impl -> review
- 2026-07-02T19:52:20Z @snjax: attested review_approved: yes: твит-карточки моего дизайна — градиентные аватары-инициалы, handle·дата, X-лого, полные цитаты с accent-упоминаниями, ссылки на посты; обе темы, 236/236, uilint зелёный; дефекты тестов (test.each index, stale quoteCard) исправлены техлидом
- 2026-07-02T19:52:20Z @snjax: review -> done

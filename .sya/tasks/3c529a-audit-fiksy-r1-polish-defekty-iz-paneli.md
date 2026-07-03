---
id: 3c529a
type: feature
title: "Аудит-фиксы R1: polish-дефекты из панели судей"
status: done
priority: normal
parent: 8d6305
fields:
  loc_estimate: 300.0
  spec_approved: true
created: "2026-07-02T21:00:56.429234303Z"
schema_version: 1
---
## Description
Устойчивые находки 62 судейских сравнений (проигрыши Octane 1:5, Sherlock 3:5, Phantom 4:4) + метрики codex. 1) КРИТИЧНО: AnalysisDemo — тултип обрезается mid-word ('...access to the E') с мёртвым пустым местом, код клиппится на правой кромке панели. 2) H1 на laptop 1280 даёт 5 строк с висячим 'Before' — ужать размер/ширину до 3-4 строк без висяков (расширить noOrphan-покрытие на laptop). 3) Два конкурирующих primary-стиля: оранжевая navbar-CTA против белой hero-CTA — унифицировать (navbar-CTA сделать сдержаннее: outline или белая). 4) Оранжевый перегруз: proof-числа (6 громких) + eyebrow + nav-ссылки + лого — снизить: nav-ссылки нейтральные (text-soft), часть чисел text-цветом. 5) Widescreen 1920: контейнер контента не ограничен/не центрирован — FAQ/comparison прижаты влево, половина вьюпорта пустая; ввести max-width 1440 центрированный + добавить viewport 1920 в uilint. 6) Метрики: сократить шрифтовую шкалу 19→~11 размеров, палитру 22→~16, выровнять вертикальные отступы на 4px-сетку (цель ≥0.75 share). 7) Mono trust-line в hero не должна ломаться посреди фразы (max-width/nowrap-сегменты). 8) Stat-карточки не режутся фолдом на laptop (позиция секции).

## Design
Полный список дефектов в Description. Приоритет краткости: это polish-раунд, дизайн-система не меняется.
1. AnalysisDemo: панель анализа — текст не обрезать mid-word: контейнер тултипа авто-высота под контент (убрать фикс TARGET_FULL_PANEL_HEIGHT-обрезание), при переполнении — ellipsis по границе слова или уменьшение шрифта панели; canvas-код: не рисовать строки за правой кромкой (клип по ширине панели с паддингом, длинные строки обрезать с '…').
2. H1: на 997–1439px размер 52px (сейчас 62) → 3-4 строки без висяка; noOrphanLastLine добавить на laptop-подобный вьюпорт (добавить viewport 'laptop' 1280x800 в uilint-конфиг, если его нет — есть desktop 1280 builtin: применить констрейнт и на desktop).
3. Navbar-CTA: заливку заменить на outline-стиль (бордер --site-border-btn/accent, текст --site-text; hover: бордер accent) — один primary на экран (белая hero-CTA).
4. Nav-ссылки: цвет --site-text-soft (не accent) в dark; логотип-текст остаётся брендовым.
5. Proof-числа: карточки a,c,e (Top 6 / 17.9% / 200+) — числа цветом --site-text, карточки b,d,f — accent-text; либо все text-цветом с accent-числом только у главной (Top 6). Решение: числа --site-text, kicker и SOURCE остаются accent — сдержанный банд.
6. Widescreen: главный контейнер лендинга max-width 1440, margin auto (все секции); uilint: добавить viewport widescreen 1920x1080, констрейнты centered(container, view) для 3-4 секций.
7. Типографика: свести font-size к шкале [11,12.5,14,15,16,18,20,24,32,44,56] (±замены ближайших), вертикальные паддинги/gap к кратным 4.
8. Hero mono-note: разбить на 2 span-сегмента (white-space:nowrap каждый) — перенос только между сегментами.
9. Stats: секция proof начинается ниже фолда — ок; карточки внутри не режутся на laptop (проверить высоты).
## Test Plan
~300 LOC → ≥ 30. Красные до имплементации.
unit (~14): analysis-demo — функция layout панели не допускает высоту текста > высоты контейнера (юнит на расчёт с длинным текстом); H1 css 52px в laptop-медиа; navbar-cta css: нет background --site-accent, есть бордер (3); nav-link color в dark = --site-text-soft (1); proof-числа color --site-text (1); container max-width 1440 (1); шкала: парсер custom.css+модулей собирает все font-size — множество ⊆ разрешённой шкалы (2); все padding/margin/gap в px кратны 4 (допуск: 1-2 исключения по списку) (2); hero-note два nowrap-сегмента (1).
uilint (~16): viewport widescreen 1920x1080 добавлен, сценарии на нём; hero/H1 textLinesAtMost 4 на desktop (1280) + noOrphanLastLine на desktop (2); centered(content-container, view) на widescreen для hero/proof/faq/footer (4); panel-текст analysis-demo: textDoesNotOverflow (панель — DOM) (1); comparison/faq на widescreen: ширина контента ≥ 60% контейнера, но контейнер центрирован (2); navbar-cta colorDistance с фоном страницы ≥ MIN (кнопка различима без заливки) (1); прочие регрессии держат существующие 150+ констрейнтов.
Красные: css-ожидания против текущих значений; widescreen-сценарий новый (constraints упадут на нецентрированном контейнере).
## Acceptance
- npm test + test:layout зелёные (теперь 4 вьюпорта × 2 темы)
- Повторный аудит-раунд против octane/sherlock/phantom (по 6 сравнений × 3 судьи): статистически не хуже (знаковый тест, α=0.05)
- Метрики codex: font sizes ≤ 12, палитра ≤ 18, 4px-share ≥ 0.7
## Log
- 2026-07-02T21:00:56Z @snjax: created
- 2026-07-02T21:01:41Z @snjax: draft -> spec
- 2026-07-02T21:01:41Z @snjax: spec -> tests_red
- 2026-07-02T21:04:25Z @snjax: attested tests_are_red: yes: unit polish tests fail by assertions on font scale (23 sizes), 4px grid, missing 1440 container, missing laptop H1 media, filled navbar CTA, orange proof stats, missing AnalysisDemo layout helpers. test:layout:fast fails on 1920+ centered/max-width containers and 1280x800 H1 line count.
- 2026-07-02T21:04:25Z @snjax: tests_red -> impl
- 2026-07-02T21:11:59Z @snjax: impl -> review
- 2026-07-02T21:13:41Z @snjax: review -> impl ↩
- 2026-07-02T21:15:42Z @snjax: impl -> review
- 2026-07-02T21:17:00Z @snjax: attested review_approved: yes: все polish-дефекты панели судей закрыты — тултип/клип демо (эллипсис + непустая панель), H1 3 строки на 1280, один primary (navbar-CTA outline), сдержанные числа proof, центрированный контейнер 1440 на widescreen 1920 (+viewport в uilint), шкала шрифтов и 4px-сетка по метрикам, footer разложен; 309/309, uilint зелёный на 4 вьюпортах
- 2026-07-02T21:17:00Z @snjax: review -> done

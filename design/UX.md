# savant.chat — IA, UX Flow & Declarative Layout Invariants

Источник контента: `savant_chat_content.md` (раздел D — готовые блоки; C.3 — запрещённые оверклеймы).
Дизайн-система: `design/DESIGN.md` (Obsidian dark default / Porcelain light).
Все инварианты из §3 обязаны быть закодированы в uilint-спеках (`uilint/specs/`).

## 1. Страница и порядок чтения (landing `/`)

Аудитория: Web3 protocol founders / CTO / security leads. Конверсионное действие —
**Start free ($75 credits)** → `siteConfig.customFields.signupUrl` (единая точка конфигурации).

Порядок секций сверху вниз = порядок убеждения (внимание → доверие → понимание → сравнение → цена → снятие возражений → действие):

| # | Секция | data-testid | Контент (блок брифа) |
|---|---|---|---|
| 0 | Navbar (sticky) | `.navbar` | logo + How it works / Proof / Pricing / FAQ / Blog + CTA «Start free» |
| 1 | Hero | `hero` | Двухколоночный (v2): слева текст — H1 «Find Smart Contract Vulnerabilities Before Attackers Do», подзаголовок, CTA [Start Free — $75 in credits] [See pricing], mono-note; справа `analysis-demo` (cinematic-аудит). Band на `--site-brand` (light) / `--site-brand-band` (dark). Mobile: демо под текстом |
| 2 | Trust logos | `trust-logos` | 1inch · Lido · Pessimistic Security · OXORIO · MixBytes · Gearbox · Hexens |
| 3 | Proof stats | `proof-stats` | D.3 «The numbers behind the name»: Top-6 Sherlock · 100% recall Crestal · best precision 17.9% · CTFBench 87–95% (наш открытый бенчмарк!) · 200+ classes · $75 free |
| 4 | Pillars / How it works | `pillars` | D.2: Deeper than a scanner / Faster than a manual audit / Trusted by protocols |
| 5 | Coverage | `coverage` | Solidity + Vyper + Rust (NEAR/Solana) + chips классов уязвимостей |
| 6 | Comparison | `comparison` | D.4 таблица vs Slither / manual / AuditAgent / Octane |
| 7 | Testimonials | `testimonials` | Твит-карточки (DESIGN.md §6): Pessimistic, 1inch, Lido — те же цитаты в форме твитов со ссылками на посты X |
| 8 | Pricing | `pricing` | Lite $0.07 / Advanced $0.12 / Pro $0.50 за line + $75 free, Advanced выделен |
| 9 | FAQ | `faq` | D.5: 6 вопросов-возражений (accordion) |
| 10 | Final CTA | `final-cta` | D.6 CTA F: «$75 free, no card required» |
| 11 | Footer | `.footer` | Product / Company / Legal + © Novel Codes DMCC |

Контентные правила (из брифа, обязательны):
- CTFBench всегда «our open-methodology benchmark», никогда «independent».
- EVMBench 82% — только со ссылкой на репо и оговоркой о contamination-caveat (OpenZeppelin).
- Никаких «replaces human audits», «top EVMBench score», чужих побед (Monad — Octane, ResupplyFi — Nethermind).
- Позиционирование: «second pair of eyes before the human audit».

## 2. Конверсионный путь

1. Первый экран отвечает: что это, для кого, почему верить, что сделать (CTA).
2. Один primary CTA на секцию hero; navbar CTA — постоянная точка входа при скролле (sticky).
3. Пользователь, скроллящий до Pricing, уже видел proof (2–3) и how (4–5): цена подаётся после ценности.
4. FAQ гасит возражения непосредственно перед финальным CTA.
5. Каждая nav-ссылка — anchor на соответствующую секцию (How it works→#pillars, Proof→#proof, Pricing→#pricing, FAQ→#faq).

## 3. Декларативные UX-инварианты (uilint)

Прогон: viewports mobile 375×667 / desktop 1280×800 / wide 1440×900; сценарии в **обеих темах** (dark default + light, переключение в сценарии).

### 3.1 Above the fold
- **UX-F1 (desktop/wide):** navbar, hero-kicker, hero-title, hero-lead и primary CTA полностью `inside(ctx.view)` без скролла.
- **UX-F2 (mobile):** hero-title полностью `inside(ctx.view)`; primary CTA начинается не ниже 900px от верха документа (доступен одним движением пальца).

### 3.2 CTA и tap-targets
- **UX-C1:** ровно один `.button--primary` внутри hero (`countIs == 1`).
- **UX-C2:** высота обоих hero-CTA ≥ 44px (все вьюпорты); ширина primary ≥ 160px (desktop).
- **UX-C3:** зазор между CTA-кнопками ≥ 12px, `noOverlap`.
- **UX-C4:** после скролла к pricing navbar-CTA остаётся видимым в view (sticky navbar).
- **UX-C5:** final-cta CTA — ниже FAQ, полный контраст (см. 3.4).

### 3.3 Порядок чтения (вертикальная цепочка `below`)
- **UX-O1:** kicker → title → lead → ctas → note (внутри hero).
- **UX-O2:** hero → trust-logos → proof-stats → pillars → coverage → comparison → testimonials → pricing → faq → final-cta → footer (цепочка `below`, gap ≥ 0).

### 3.4 Контраст и читаемость (обе темы!)
- **UX-R1:** `colorDistance ≥ MIN_TEXT_BG_DISTANCE` для: hero-title, hero-lead, stat-числа, pricing-цены, текст primary CTA.
- **UX-R2:** hero-title `textLinesAtMost(3)` desktop / `(5)` mobile; `textDoesNotOverflow` для lead, цитат, FAQ-вопросов.
- **UX-R3:** lead ограничен по ширине читабельной колонкой: `widthIn ≤ 560px` (desktop).

### 3.5 Целостность сетки
- **UX-G1:** нет горизонтального переполнения: каждая секция `inside(ctx.canvas)` по ширине ≤ viewport.
- **UX-G2:** stat-карточки: desktop — `alignedHorizontallyTop` + равные зазоры; mobile — вертикальный стек `alignedVerticallyLeft`.
- **UX-G3:** pricing: 3 карточки, `widthMatches` (tol 5%) desktop; выделенная карточка визуально отлична: `colorDistance(border/bg) ≥ MIN_ADJACENT_REGION_DISTANCE` от соседних.
- **UX-G4:** logos: `alignedHorizontally` (desktop), высота каждого 16–36px, `noOverlap`.
- **UX-G5:** comparison-таблица: на mobile скроллится внутри контейнера (сама страница без overflow — UX-G1 держит).

### 3.6 Интерактив (сценарии)
- **UX-I1:** FAQ: до клика ответ невидим (`visible(answer,false)`), после клика по вопросу — видим; высота кликабельного вопроса ≥ 44px.
- **UX-I2:** переключение темы не ломает инварианты: сценарий прогоняет спеки в dark и light.

### 3.7 Типографика переносов (v2, DESIGN.md §3.1)
- **UX-T1:** `noOrphanLastLine` (custom constraint по span-словам): последняя строка H1/H2/заголовков карточек содержит ≥2 слов ИЛИ её ширина ≥25% контейнера. Проверяется на desktop и wide ОСОБЕННО (широкие расширения — главный источник висяков).
- **UX-T2:** число строк по таблице DESIGN.md §3.1 (`textLinesAtMost` per-viewport на каждый заголовок спеки).
- **UX-T3:** `textDoesNotOverflow` на каждом текстовом элементе каждой спеки.

### 3.8 Выравнивание (v2, DESIGN.md §5)
- **UX-A1:** hero-текст: mobile — `centered(kicker/title/lead/ctas, hero, {h})`; desktop/wide — `alignedVerticallyLeft([kicker,title,lead,ctas])` + текстовая колонка занимает ≤55% ширины hero, demo справа (`rightOf(demo, text-col)`).
- **UX-A2:** analysis-demo: desktop/wide `inside(hero)` правая половина; mobile `below(demo, ctas)` full-width.
- **UX-A3:** kickers/H2 всех секций: `alignedVerticallyLeft` с контентным контейнером секции (кроме final-cta — `centered`).
- **UX-A4:** final-cta: заголовок, подзаголовок и кнопка `centered` по горизонтали.
- **UX-A5:** сетки (proof, pillars, pricing, tweets): `alignedHorizontallyTop` + `alignedHorizEqualGap` (desktop/wide); mobile — `alignedVerticallyEdges` стека.

### 3.9 Плотность покрытия (v2)
На КАЖДУЮ секцию/элемент лендинга — 10–30 uilint-констрейнтов (позиция, порядок, выравнивание, размеры, контраст, переносы,视порт-поведение). Новые элементы: analysis-demo (канвас виден, ≥40% ширины hero на desktop, не перекрывает текст, высота 400–520), tweet-cards (аватар круглый 36–44px, имя/handle/текст/метрики в вертикальном порядке, 3 карточки равной ширины, вся карточка кликабельна), partner-logos (высота 20–36, выровнены, зазоры равные), blog-страницы (заголовок статьи ≤3 строк, контент-колонка 640–800px на desktop, katex-формулы не переполняют колонку).

## 4. Как это тестируется

- Каждая фича добавляет свою uilint-спеку + добирает цепочку UX-O2.
- Глобальные инварианты — `uilint/specs/ux-global.spec.ts` (растёт по мере добавления секций).
- Unit (vitest): контент-инварианты — точные заголовки/цифры/цитаты из брифа, запрет строк-оверклеймов (грепом по отрендеренному DOM: «replaces human audit», «independent benchmark» рядом с CTFBench и т.п.), конфиг navbar/footer/signupUrl.

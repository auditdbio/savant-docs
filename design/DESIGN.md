# Design System v2 — savant.chat brand

Источник истины: реконструкция из имплементации https://github.com/auditdbio/savant-docs
(tailwind.config.js + src/css/custom.css + фактическое использование в разметке).
Явного брендбука не существует — эта реконструкция и есть брендбук.
v1 (Obsidian/Porcelain из ui_example.zip) упразднён этой версией; типографика и форма (§3–4) сохранены.

## 0. Бренд-константы (из имплементации)

| Роль | Значение | Откуда восстановлено |
|---|---|---|
| Primary (CTA, важные кнопки) | `#FF6B00`, hover `#E65D00` | tailwind `colors.primary` |
| Secondary (заголовки, hero-фон, второстепенные элементы) | `#52176D`, hover `#47145F` | tailwind `colors.secondary` (rgb 82,23,109) |
| Gray-шкала | Tailwind: 50 `#f9fafb` · 100 `#f3f4f6` · 200 `#e5e7eb` · 400 `#9ca3af` · 500 `#6b7280` · 600 `#4b5563` · 700 `#374151` · 900 `#111827` | custom.css `--savant-gray-*` + классы разметки |
| Логотип | `logo_short.svg`: знак `#47115F` + `#FE9900` + контур `#020202` | static/img |
| Signup URL | `/dashboard/login` (с UTM) | HeroCTAButtons |

Паттерны использования из имплементации: hero = фиолетовый band с белым текстом;
primary-CTA **внутри hero** = белая кнопка с фиолетовым текстом; вне hero = оранжевая кнопка;
секции чередуются white / gray-50; заголовки gray-900, подзаголовки-акценты — secondary purple.

## 1. Палитра WHITE (default-инверсия не менять: dark остаётся дефолтом сайта)

| Токен | Значение | Использование |
|---|---|---|
| `--site-bg` | `#ffffff` | фон страницы |
| `--site-bg-alt` | `#f9fafb` | чередующиеся секции, band'ы |
| `--site-surface` | `#ffffff` | карточки (на alt-фоне) |
| `--site-text` | `#111827` | основной текст |
| `--site-text-secondary` | `#4b5563` | лиды, описания |
| `--site-text-muted` | `#6b7280` | подписи, мета |
| `--site-border` | `#e5e7eb` | бордеры, разделители |
| `--site-accent` | `#FF6B00` | заливка CTA |
| `--site-accent-hover` | `#E65D00` | hover CTA |
| `--site-accent-text` | `#D05500` | оранжевый ТЕКСТ на светлом (контраст) |
| `--site-brand` | `#52176D` | hero-band, kickers, подзаголовки-акценты |
| `--site-brand-hover` | `#47145F` | hover фиолетовых элементов |
| `--site-on-brand` | `#ffffff` | текст на фиолетовом |
| `--site-hero-cta-bg` | `#ffffff` | primary CTA в hero (текст `--site-brand`) |

## 2. Палитра DARK (производная от white: те же hue — оранжевый + фиолетовый, тёмные поверхности с фиолетовым подтоном)

| Токен | Значение | Правило наследования |
|---|---|---|
| `--site-bg` | `#120C18` | gray-900, сдвинутый к hue фиолетового бренда |
| `--site-bg-alt` | `#0C0810` | глубже фона (инверсия gray-50) |
| `--site-surface` | `#1E1528` | карточки (инверсия white-surface) |
| `--site-text` | `#F5F2F8` | инверсия gray-900 |
| `--site-text-secondary` | `#B3A9BF` | инверсия gray-600 |
| `--site-text-muted` | `#877C93` | инверсия gray-500 |
| `--site-border` | `rgba(245,242,248,.10)` | инверсия gray-200 |
| `--site-accent` | `#FF7B1A` | primary светлеет на тёмном (шкала savant dark) |
| `--site-accent-hover` | `#FF8C33` | их dark-hover |
| `--site-accent-text` | `#FF8C33` | оранжевый текст на тёмном |
| `--site-on-accent` | `#1A0D02` | текст на оранжевой заливке |
| `--site-brand` | `#7A2FA3` | secondary осветлён (между их rgb(115,32,152) и (137,38,182)) |
| `--site-brand-band` | `#221030` | hero-band на тёмном (глубокий фиолетовый, отличим от --site-bg) |
| `--site-on-brand` | `#F5F2F8` | текст на фиолетовом |
| `--site-hero-cta-bg` | `#ffffff` | hero-CTA остаётся белой (узнаваемость), текст `#52176D` |

Правило: dark не вводит новых hue — только пересчёт светлоты white-токенов.

## 3. Типографика (без изменений v1)

Archivo (500–800) + IBM Plex Mono (400–600). H1 62/800/-0.03em (desktop), H2 38/800/-0.02em,
kicker mono 12.5/600/.14em uppercase, body 15–18/1.6. Kicker-цвет: `--site-accent-text` на светлом,
`--site-accent` на тёмном; на фиолетовом band — `#FE9900` (янтарный из логотипа).

### 3.1 Правила переноса строк (обязательные, тестируются)

- Все H1/H2 и заголовки карточек: `text-wrap: balance`; лиды и абзацы: `text-wrap: pretty`.
- Запрещён «висяк»: последняя строка заголовка из одного слова короче 25% ширины контейнера
  (uilint custom constraint `noOrphanLastLine` по span-словам заголовка).
- Число строк заголовков фиксируется per-viewport (`textLinesAtMost`): hero H1 ≤3 (wide), ≤3 (desktop), ≤5 (mobile);
  секционные H2 ≤2 (desktop/wide), ≤3 (mobile).
- `textDoesNotOverflow` на всех текстовых элементах спек.

## 4. Форма (без изменений v1)

Радиусы: кнопки 8–9, карточки 12–14, pills 99. Секции 72px+56px паддинги (desktop), разделитель `--site-border`.
Тени только на плавающих объектах (AnalysisDemo-панель, hero-CTA в light).

## 5. Выравнивание (обязательные правила, тестируются)

| Элемент | mobile (<997px) | desktop (997–1439) | wide (≥1440) |
|---|---|---|---|
| Hero-текст | центр (text-align center, колонка центрирована) | слева, колонка 50% | слева, колонка 50% |
| AnalysisDemo | под текстом, full-width | справа, 50% | справа, 50% |
| Kicker+H2 секций | слева | слева | слева |
| Proof-карточки, pillars, pricing | стек, выровнен влево | grid, выровнен по верху | grid, по верху |
| Trust-logos | центр, wrap | одна строка, центр по вертикали | одна строка |
| Testimonials (твиты) | стек по центру | 3 колонки по верху | 3 колонки |
| Final-CTA | центр | центр | центр |
| Footer | стек влево | 3 колонки | 3 колонки |

uilint: центрированные элементы — `centered(el, container, {h})`; левые — `alignedVerticallyLeft` с контейнером секции; сетки — `alignedHorizontallyTop` + `alignedHorizEqualGap`.

## 6. Новые элементы

- **AnalysisDemo** (порт из savant-docs, единственный переносимый UI-элемент): canvas-анимация аудита.
  Цвета параметризуются темой: light — bg `#FFFFFF`, код `#111827` (shiki light), gutter `#6b7280`;
  dark — bg `#0C0810`, код `#E5E7EB` (shiki dark), gutter `#877C93`. Highlight RGB (blue 59,130,255 / green 46,204,113 / red 231,76,60) одинаковы в обеих темах. Панель демо на white в light / surface в dark.
- **Логотип**: `logo_short.svg` как есть (light); dark-вариант: `#020202` контур → `#F5F2F8`, остальные цвета не трогать.
- **Партнёрские логотипы** (`static/img/partners/*`): horizontal-варианты, высота 24–32px,
  монохромизация через CSS `filter: grayscale(1) opacity(.65)`, hover — полный цвет; в dark добавить `brightness()`-инверсию для тёмных логотипов (проверять глазами per-logo, тёмные версии не выдумывать).
- **Твит-карточки** (мой дизайн, НЕ порт): карточка `--site-surface`, радиус 14px; шапка: круглый аватар 40px (локальный ассет/инициалы), имя 15/700, @handle+дата 13 muted; текст 15/1.55; футер: мини-метрики (реплаи/репосты/лайки) muted + логотип X справа вверху; вся карточка — ссылка на пост. Никаких внешних запросов.

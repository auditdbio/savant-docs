# Design System v3 — savant.chat brand

Источник истины: дизайн-система savant-app (ветка `dev`, `reference/design-system/tokens/*.css`) —
лендинг обязан быть консистентен с приложением. v2 (реконструкция из старого savant-docs) упразднена
этой версией: типографика переведена на Geist, форма и палитра выровнены с app-токенами.
Правила переноса строк (§3.1) и выравнивания (§5) сохранены из v2 без изменений.

## 0. Бренд-константы (= app design system)

| Роль | Значение | Соответствие в app |
|---|---|---|
| Primary / Flame (CTA) | `#FF6B00`, hover `#E65D00`, active `#BF4D00` | `--flame-500/600/700` |
| Текст на flame-заливке | `#1C1126` (тёмный ink, WCAG AA) | `--action-primary-text` (`--ink-900`) |
| Secondary / Plum (hero-band, акценты) | `#52176D`, hover `#47115F` | `--plum-600/700` |
| Ink-поверхности (dark) | `#150A1C` фон · `#1C1126` карточки | `--ink-950` / `--ink-900` |
| Оранжевый текст на светлом | `#BF4D00` | `--flame-700` |
| Оранжевый текст на тёмном | `#FF8A33` | `--flame-400` |
| Focus ring | `rgba(255,107,0,.28)`, 3px | `--shadow-focus` |
| Логотип | `logo_short.svg`: знак `#47115F` + `#FE9900` + контур `#020202` | static/img |
| Signup URL | `/dashboard/login` (через `siteConfig.customFields.signupUrl`) | HeroCTAButtons |

Паттерны использования: hero = фиолетовый band с белым текстом;
primary-CTA **внутри hero** = белая кнопка с фиолетовым текстом; вне hero = flame-кнопка с ink-текстом;
секции чередуются white / gray-50; заголовки gray-900, подзаголовки-акценты — plum.
Final-CTA = flame-band с ink-текстом и ink-кнопкой (inverse-приём из app).

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
| `--site-accent` | `#FF6B00` | заливка CTA (`--flame-500`) |
| `--site-accent-hover` | `#E65D00` | hover CTA (`--flame-600`) |
| `--site-accent-text` | `#BF4D00` | оранжевый ТЕКСТ на светлом (`--flame-700`) |
| `--site-on-accent` | `#1C1126` | текст на flame-заливке (`--ink-900`) |
| `--site-brand` | `#52176D` | hero-band, kickers (`--plum-600`) |
| `--site-brand-hover` | `#47115F` | hover фиолетовых элементов (`--plum-700`) |
| `--site-on-brand` | `#ffffff` | текст на фиолетовом |
| `--site-hero-cta-bg` | `#ffffff` | primary CTA в hero (текст `--site-brand`) |

## 2. Палитра DARK (ink/plum-ramp из app design system)

| Токен | Значение | Соответствие в app |
|---|---|---|
| `--site-bg` | `#150A1C` | `--ink-950` (surface-page dark) |
| `--site-bg-alt` | `#0C0810` | глубже фона (локальный токен лендинга) |
| `--site-surface` | `#1C1126` | `--ink-900` (surface-card dark) |
| `--site-text` | `#F4F1F8` | text-strong dark |
| `--site-text-secondary` | `#B3A9BF` | между body/muted dark (локальный) |
| `--site-text-muted` | `#877C93` | локальный |
| `--site-border` | `#2A1E38` | border-subtle dark |
| `--site-border-strong` | `#392A4A` | border-default dark |
| `--site-border-btn` | `#4A3A5E` | border-strong dark |
| `--site-accent` | `#FF6B00` | flame-500 (как в app: заливка не светлеет) |
| `--site-accent-hover` | `#E65D00` | flame-600 |
| `--site-accent-text` | `#FF8A33` | `--flame-400` (text-brand dark) |
| `--site-on-accent` | `#1C1126` | ink-900 на flame |
| `--site-brand` | `#834AA6` | `--plum-400` |
| `--site-brand-hover` | `#B07FCB` | `--plum-300` |
| `--site-brand-band` | `#230730` | `--plum-900` (hero-band на тёмном) |
| `--site-on-brand` | `#F4F1F8` | текст на фиолетовом |
| `--site-hero-cta-bg` | `#ffffff` | hero-CTA остаётся белой (узнаваемость), текст `#52176D` |

Правило: dark не вводит новых hue — только ink/plum/flame-рампы app-системы.

## 3. Типографика (v3: Geist, как в app)

Geist (400–800) + Geist Mono (400–600), Google Fonts. H1 62/800/-0.03em (desktop), H2 38/800/-0.02em,
kicker mono 12.5/600/.14em uppercase, body 15–18/1.6. Kicker-цвет: `--site-accent-text` на светлом,
`--site-accent-text` на тёмном; на фиолетовом band — `#FE9900` (янтарный из логотипа).

### 3.1 Правила переноса строк (обязательные, тестируются)

- Все H1/H2 и заголовки карточек: `text-wrap: balance`; лиды и абзацы: `text-wrap: pretty`.
- Запрещён «висяк»: последняя строка заголовка из одного слова короче 25% ширины контейнера
  (uilint custom constraint `noOrphanLastLine` по span-словам заголовка).
- Число строк заголовков фиксируется per-viewport (`textLinesAtMost`): hero H1 ≤3 (wide), ≤3 (desktop), ≤5 (mobile);
  секционные H2 ≤2 (desktop/wide), ≤3 (mobile).
- `textDoesNotOverflow` на всех текстовых элементах спек.

## 4. Форма (v3: радиусы app-системы)

Радиусы: кнопки и FAQ-элементы 12 (`--radius-lg`), карточки и панели 16 (`--radius-xl`), pills 99.
Секции 72px+56px паддинги (desktop), разделитель `--site-border`.
Тени только на плавающих объектах (AnalysisDemo-панель, hero-CTA в light).
Focus-visible на кнопках: flame-ring `0 0 0 3px rgba(255,107,0,.28)`.

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
  dark — bg `#0C0810`, код `#E5E7EB` (shiki dark), gutter `#877C93`. Highlight RGB (blue 59,130,255 / green 46,204,113 / red 231,76,60) одинаковы в обеих темах. Панель демо на white в light / surface в dark. Радиус панели 16.
- **Логотип**: `logo_short.svg` как есть (light); dark-вариант: `#020202` контур → `#F4F1F8`, остальные цвета не трогать.
- **Партнёрские логотипы** (`static/img/partners/*`): horizontal-варианты, высота 24–32px,
  монохромизация через CSS `filter: grayscale(1) opacity(.65)`, hover — полный цвет; в dark добавить `brightness()`-инверсию для тёмных логотипов (проверять глазами per-logo, тёмные версии не выдумывать).
- **Твит-карточки** (мой дизайн, НЕ порт): карточка `--site-surface`, радиус 16px; шапка: круглый аватар 40px (локальный ассет/инициалы), имя 15/700, @handle+дата 13 muted; текст 15/1.55; футер: мини-метрики (реплаи/репосты/лайки) muted + логотип X справа вверху; вся карточка — ссылка на пост. Никаких внешних запросов.

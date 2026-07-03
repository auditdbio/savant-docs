---
id: d1a419
type: feature
title: "R1: Ребренд ядра — savant.chat, hero A, навигация-якоря, footer, ux-global база"
status: done
priority: normal
parent: 18fa2e
relations:
  depends_on:
  - d82453
fields:
  loc_estimate: 280.0
  spec_approved: true
created: "2026-07-02T14:28:02.076011275Z"
schema_version: 1
---
## Description
Смена бренда Sentiel→savant.chat: config (title, tagline, url, customFields.signupUrl), hero по D.1-A, navbar-якоря How it works/Proof/Pricing/FAQ + Blog, footer с реальными ссылками (GitHub auditdbio, X, imprint/privacy/terms), © Novel Codes DMCC. База ux-global.spec.ts: UX-F1/F2, UX-C1..C3, UX-O1, UX-R1(hero), UX-R2, UX-G1. См. design/UX.md §1,§3.

## Design
Ребренд Sentiel → savant.chat. Референсы: savant_chat_content.md D.1 (Hero variant A), design/UX.md §1–3, design/DESIGN.md (палитра/типографика не меняются).

1. docusaurus.config.ts:
   - title: 'Savant Chat — AI Smart Contract Auditor'; tagline: 'Find Smart Contract Vulnerabilities Before Attackers Do'; url: 'https://savant.chat'
   - customFields.signupUrl = 'https://app.savant.chat/' — ЕДИНАЯ точка входа для всех Start-free CTA (значение-плейсхолдер, уточним у владельца)
   - navbar: title 'savant.chat', hideOnScroll НЕ включать (sticky по умолчанию); items: How it works→/#pillars, Proof→/#proof, Pricing→/#pricing, FAQ→/#faq, Blog→/blog, справа CTA 'Start free' (className navbar-cta, href=signupUrl). Docs из navbar убрать (плагин не трогать).
   - footer: PRODUCT: Pricing /#pricing, FAQ /#faq, Blog /blog; RESOURCES: GitHub https://github.com/auditdbio, X (Twitter) https://x.com/savantchat, CTFBench https://github.com/auditdbio/ctfbench; COMPANY: Imprint https://savant.chat/imprint, Privacy https://savant.chat/privacy-policy, Terms https://savant.chat/terms-of-service. copyright '© 2026 Novel Codes DMCC · Savant Chat'.
2. src/pages/index.tsx (hero, testid-структура прежняя):
   - kicker: 'AI SMART CONTRACT AUDITS' (без изменений)
   - H1: 'Find Smart Contract Vulnerabilities Before Attackers Do'
   - lead: 'Deeper than a scanner. Faster than a manual audit. AI security for Solidity, Vyper, and Rust smart contracts.'
   - CTA primary: 'Start Free — $75 in credits' → siteConfig.customFields.signupUrl; secondary: 'See pricing' → /#pricing
   - note (mono): 'Trusted by 1inch, Lido, and Pessimistic Security · Top-6 finish in a Sherlock audit contest'
   - hero-stats УДАЛИТЬ (фейковые 418/$6.8B/<48h недопустимы; настоящие цифры — секция proof в R2). Секция hero получает id='hero'.
3. Страница НЕ должна содержать строк: 'Sentiel', '418', '$6.8B', '<48h', 'replaces human audit', и 'independent' в одном предложении с 'CTFBench'.
4. uilint/specs/ux-global.spec.ts (база, растёт в R2–R5) + сценарии: инварианты UX-F1 (desktop+wide: navbar, kicker, title, lead, primary CTA полностью inside ctx.view), UX-F2 (mobile: title inside view; top primary CTA в canvas ≤ 900px), UX-C1 (countIs primary в hero == 1), UX-C2 (высота CTA ≥ 44px везде; ширина primary ≥ 160px desktop), UX-C3 (noOverlap CTA, зазор ≥ 12px), UX-O1 (below-цепочка kicker→title→lead→ctas→note), UX-R1 (colorDistance ≥ MIN_TEXT_BG_DISTANCE: title, lead, label primary CTA), UX-R2 (title textLinesAtMost 3 desktop/5 mobile; lead textDoesNotOverflow), UX-R3 (lead widthIn ≤ 560 desktop), UX-G1 (hero inside canvas по ширине ≤ viewport). Сценарий: снапшоты в dark, затем клик по toggle → снапшоты в light (UX-I2). Существующий uilint/specs/hero.spec.ts обновить/влить в ux-global (не дублировать).
5. Существующие unit-тесты и спеки, привязанные к Sentiel-контенту, ОБНОВЛЯЮТСЯ в tests_red-стадии (новые ожидания = красные против текущего кода).
## Test Plan
Оценка ~280 LOC → норма ≥ 28 проверок. Все новые/обновлённые ожидания пишутся ДО имплементации и красные.

tests/unit/site-config.test.ts (обновить+дополнить):
- title содержит 'Savant Chat'; tagline = 'Find Smart Contract Vulnerabilities Before Attackers Do'; url = 'https://savant.chat' (3)
- customFields.signupUrl задан и начинается с https:// (2)
- navbar: title 'savant.chat'; items содержат to '/#pillars', '/#proof', '/#pricing', '/#faq', '/blog'; нет item с label 'Docs'; CTA item: className navbar-cta, href = signupUrl (8)
- navbar.hideOnScroll не true (1)
- footer: колонки PRODUCT/RESOURCES/COMPANY; ссылки GitHub auditdbio, x.com/savantchat, privacy-policy, terms; copyright содержит 'Novel Codes DMCC' (6)

tests/unit/homepage.test.tsx (обновить):
- H1 = 'Find Smart Contract Vulnerabilities Before Attackers Do' (1); lead содержит 'Deeper than a scanner' и 'Solidity, Vyper, and Rust' (2)
- primary CTA: текст 'Start Free — $75 in credits', href = signupUrl (mock контекста) (2); secondary 'See pricing' → /#pricing (1)
- note содержит '1inch, Lido' и 'Sherlock' (2)
- testid hero-stats ОТСУТСТВУЕТ (1); рендер не содержит 'Sentiel'/'418'/'$6.8B'/'<48h' (4)
- порядок DOM сохранён kicker→title→lead→ctas→note (1)

uilint/specs/ux-global.spec.ts + сценарии (десктоп+wide+mobile, dark+light):
- UX-F1: 5 элементов inside ctx.view на desktop и wide (5)
- UX-F2 mobile: title inside view; primary CTA canvas-top ≤ 900 (2)
- UX-C1 countIs==1 (1); UX-C2 высоты ≥44 обе кнопки + ширина primary ≥160 desktop (3); UX-C3 noOverlap+gap (2)
- UX-O1 цепочка below (4); UX-R1 colorDistance ×3 (3); UX-R2 (2); UX-R3 (1); UX-G1 (1)

Итого ~57 проверок ≥ норма ✓. Красность: контент-ожидания падают против Sentiel-версии; uilint-спека частично падает (нет id=hero? testid'ы есть — но textLinesAtMost/colorDistance/каденция CTA упадут из-за старых текстов размеров? НЕТ — красность uilint обеспечена отсутствием новых текстов: textMatches по новым строкам в спеке добавить для title и primary CTA (2 проверки), они гарантированно красные).
## Acceptance
- npm test зелёный; npm run test:layout зелёный (обе темы, 3 вьюпорта)
- Ни одного вхождения Sentiel/фейковых цифр в собранном сайте (build grep)
- Скриншот-приёмка тех-лида: hero savant.chat в dark/light, desktop/mobile; CTA выше фолда на desktop
- signupUrl меняется в одном месте конфига
## Log
- 2026-07-02T14:28:02Z @snjax: created
- 2026-07-02T14:29:25Z @snjax: draft -> spec
- 2026-07-02T14:31:33Z @snjax: spec -> tests_red
- 2026-07-02T14:36:00Z @snjax: attested tests_are_red: yes: npm test reports 86 tests total, 53 passing, 33 failing via assertion-level savant.chat expectations against current Sentiel content; npm run test:layout:fast fails ux-global dark/light snapshots via textMatches title 'Find Smart Contract Vulnerabilities' and primary CTA '' (plus CTA width/contrast), with no engine errors.
- 2026-07-02T14:36:00Z @snjax: tests_red -> impl
- 2026-07-02T14:39:10Z @snjax: impl -> review
- 2026-07-02T14:40:41Z @snjax: review -> tests_red ↩
- 2026-07-02T14:42:38Z @snjax: attested tests_are_red: yes: npm run test:layout:fast fails only ux-global-dark / UX-R1 navbar CTA contrast on desktop+wide viewports; message: navbar CTA colorDistance got 0, expected >= 40. The light ux-global snapshot has no navbar CTA contrast violation.
- 2026-07-02T14:42:38Z @snjax: tests_red -> impl
- 2026-07-02T14:43:47Z @snjax: impl -> review
- 2026-07-02T14:44:40Z @snjax: attested review_approved: yes: ребренд ядра принят — hero variant A, якорная навигация, footer с реальными ссылками, signupUrl в одном месте; setback по контрасту navbar-CTA закрыт через новый uilint colorDistance-инвариант (красный→зелёный); 86/86 юнитов, layout зелёный в обеих темах на 3 вьюпортах; скриншот-приёмка dark/light/mobile пройдена
- 2026-07-02T14:44:40Z @snjax: review -> done

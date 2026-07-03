---
id: 52959f
type: feature
title: "R2: Trust logos + proof stats («The numbers behind the name»)"
status: done
priority: normal
parent: 18fa2e
relations:
  depends_on:
  - d1a419
fields:
  loc_estimate: 220.0
  spec_approved: true
created: "2026-07-02T14:28:02.097254514Z"
schema_version: 1
---
## Description
Секции trust-logos (7 имён) и proof-stats (6 карточек из D.3, с правильным фреймингом CTFBench/EVMBench). UX: UX-G2, UX-G4, UX-O2 (цепочка hero→logos→stats), контраст стат-чисел. См. design/UX.md.

## Design
Две секции между hero и (будущими) pillars. Референс: savant_chat_content.md D.3, design/UX.md §1 (#2–3), DESIGN.md §2–3.

1. src/components/TrustLogos (testid trust-logos), сразу после hero:
   - mono-label 'TRUSTED BY SECURITY TEAMS AT' (12px, letter-spacing .12em, muted)
   - 7 текстовых wordmarks (логотипов-файлов нет — стилизованные надписи как в референсе): 1inch (800, letter-spacing .04em), Lido (700), Pessimistic Security (600 italic), OXORIO (800 letter-spacing .12em), MixBytes (700), Gearbox (800), Hexens (600 mono). Цвет: приглушённый (#7d7365-класс — var(--site-text-muted)), размер 16–19px; flex-wrap, gap 40px; mobile: wrap по центру.
2. src/components/ProofStats (testid proof-stats, id='proof' — цель navbar 'Proof'):
   - band на var(--site-bg-deep) (light: #fff), border-top/bottom var(--site-border), паддинг 64px 56px
   - kicker 'PROOF' + H2 'The numbers behind the name.'
   - grid 3×2 desktop / 1 колонка mobile, 6 карточек (число 38px/800 цвет var(--site-accent) в dark / var(--site-accent-text) в light; контекст 14.5px var(--site-text-secondary); source — mono 11.5px ссылка ↗ muted):
     a. Top 6 — 'Sherlock Symbiotic contest (Sep 2025) — placed against dozens of expert human auditors.' → globenewswire.com (полный URL из брифа)
     b. 100% recall — 'on the Crestal Sherlock contest in an independent blind pilot: 7/7 judge-adjudicated issues, each with a PoC.' → github.com/LyuboslavLyubenov/ai-audit-tools-eval
     c. 17.9% precision — 'best precision among AI auditors across three judge-adjudicated contests in the same pilot.' → тот же URL
     d. 87–95% — 'accuracy on CTFBench, our open-methodology benchmark (methodology published on ethresear.ch).' → github.com/auditdbio/ctfbench
     e. 200+ — 'vulnerability classes, curated from a reference book of 20,000 real-world vulnerabilities.' → savant.chat/blog/building-autonomous-auditor-vulnerability-reference-book
     f. $75 — 'free credits on signup — no card required. Enough to audit a typical ERC-20 end-to-end.' → signupUrl
   ЗАПРЕЩЕНО: слово 'independent' в карточке CTFBench (d); формулировка ровно 'our open-methodology benchmark'. В карточках b,c 'independent' корректно (это пилот Любенова).
3. Порядок: hero → trust-logos → proof-stats. uilint: добрать в ux-global цепочку UX-O2 (hero→logos→stats), UX-G2 (карточки: desktop alignedHorizontallyTop по рядам + равные зазоры/tableLayout; mobile alignedVerticallyLeft), UX-G4 (wordmarks alignedHorizontally desktop, height 16–36, noOverlap), контраст чисел (colorDistance), G1-ширина для обеих секций.
## Test Plan
~220 LOC → ≥ 22 проверок. Красные до имплементации.

tests/unit/trust-proof.test.tsx (~15):
- trust-logos рендерится, содержит все 7 имён (7 проверок: 1inch, Lido, Pessimistic Security, OXORIO, MixBytes, Gearbox, Hexens)
- proof-stats: 6 карточек (countIs по testid stat-card == 6); числа 'Top 6','100%','17.9%','87–95%','200+','$75' присутствуют (2 сводных table-driven)
- карточка CTFBench содержит 'our open-methodology benchmark' и НЕ содержит 'independent' (2)
- каждая карточка имеет source-ссылку с валидным https href (1 forAll)
- id='proof' на секции proof-stats (1); порядок DOM hero→trust-logos→proof-stats (1)

tests/unit/trust-proof-css.test.ts (~4):
- band использует var(--site-bg-deep); числа — var(--site-accent)/accent-text; grid 3 колонки в desktop-медиа; mobile — 1 колонка

uilint ux-global дополнение (~10):
- UX-O2: below(trust-logos, hero), below(proof-stats, trust-logos) (2)
- UX-G4: alignedHorizontally wordmarks (desktop), forAll heightIn 16–36, noOverlap (3)
- UX-G2: первый ряд карточек alignedHorizontallyTop + равные горизонтальные зазоры (desktop); mobile alignedVerticallyLeft (3)
- countIs(stat-card, eq(6)) (1); textMatches одного числа ('87–95%') — гарантированная красность (1)
## Acceptance
- npm test + npm run test:layout зелёные (3 вьюпорта, обе темы)
- Приёмка тех-лида: band выглядит как референсный stats-band (числа-акценты), wordmarks сдержанные, ничего не прыгает между темами
- Фрейминг: CTFBench = наш открытый бенчмарк; пилот Любенова = независимый; ссылки-источники кликабельны
## Log
- 2026-07-02T14:28:02Z @snjax: created
- 2026-07-02T14:37:12Z @snjax: draft -> spec
- 2026-07-02T14:44:40Z @snjax: spec -> tests_red
- 2026-07-02T14:47:13Z @snjax: attested tests_are_red: yes: npm test reports 109 total, 86 passing, 23 failing from missing trust/proof testids/content/CSS; npm run test:layout:fast fails ux-global dark/light with UX-G2 stat-card count got 0 expected 6 and proof stats text missing /87–95%/, no engine errors.
- 2026-07-02T14:47:13Z @snjax: tests_red -> impl
- 2026-07-02T14:49:34Z @snjax: impl -> review
- 2026-07-02T14:50:30Z @snjax: attested review_approved: yes: trust-logos (7 wordmarks) + proof-band (6 карточек с source-ссылками) приняты; CTFBench-фрейминг корректен, независимость только у пилота Любенова; 109/109 юнитов, uilint зелёный обе темы/3 вьюпорта; скриншот-приёмка dark+light
- 2026-07-02T14:50:30Z @snjax: review -> done

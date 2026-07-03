# Design Audit — Rounds 1–2 (2026-07-02)

Process per phase-2 task d7c2c4: screenshot competitors + ours (mobile 375 / laptop 1280 / widescreen 1920, top + 2 seeded-random scroll positions), pairwise judging by independent subagent critics (rubric: hierarchy, typography, color, layout, polish), quantitative metrics via codex extractor, sign test as stop criterion.

## Round 1 — vs full pool (octane, auditagent, testmachine, grego, sherlock, 1inch, lido, phantom)

- 62 judgments (46 pairs + 16 reliability re-judgments): **44 wins / 18 losses / 0 ties, sign test p = 0.0015 → statistically better than the pool.**
- Per competitor: grego 8:0, oneinch 8:0, lido 8:0 (bot-wall captures), auditagent 7:1, testmachine 5:3, phantom 4:4, sherlock 3:5, **octane 1:5**.
- Dominant loss driver: *polish* (27/62 «our weakest»). Recurring concrete defects: AnalysisDemo tooltip truncation + code clipping, 5-line H1 with orphan «Before» on laptop, two competing primary CTA styles, orange overload in proof band, uncentered content at 1920, uneven logo weights.
- Quantitative (metrics-report.md): font sizes 19 vs median 9; 4px-gap share 0.46 vs 0.89; palette 22 vs 14.5; contrast better than median.

## Rework (feature 3c529a + b4ee30 + ccad1b)

Demo panel never-empty + word-boundary wrap + code ellipsis clipping; H1 52px/3 lines on laptop; navbar CTA → outline (single primary per screen); neutral nav links; calmer proof numbers; centered max-1440 container + widescreen viewport in uilint; type scale consolidated; 4px spacing grid; footer spread at 1920; +3 partner logos (TON Core, Mellow, BGD Labs); blog author avatar fix.

## Round 2 — vs top-3 design leaders (octane, sherlock, phantom)

- 48 judgments (16 pairs × 3 judges): **26 wins / 22 losses, one-sided sign test p(we are worse) = 0.76 → statistically indistinguishable. Stop criterion met.**
- Per competitor: phantom 13:5 (now winning), sherlock 8:10, octane 5:7.
- Residual findings filed as backlog tasks: demo panel top-edge clip at 1920 (1ef41a), logo-row balance/1inch glyph (b9ea0b), mobile H1 compound breaks (9bf19a), coverage dead zone at widescreen (ae6885).

## Verdict

Better than the competitor pool overall; at parity with the three strongest design brands. Loop stopped per criterion («статистически безразлично → стоп»).

# Design Metrics Report

Generated: 2026-07-02T20:33:08.046Z

Viewport: 1280x800 Chromium. Metrics are computed from rendered CSS and visible DOM. External site failures would be skipped; all requested competitor URLs returned metrics in this run.

## Raw Metrics

| Site | Distinct font sizes | Adjacent type-scale ratios | Font families | 4px gap share | Gap samples | Palette size | Min contrast | CTAs above fold |
|---|---:|---|---:|---:|---:|---:|---:|---:|
| Savant local | 19 | 1.045, 1.043, 1.042, 1.04, 1.038, 1.037, 1.036, 1.034, 1.067, 1.063, 1.059, 1.056, 1.105, 1.048, 1.727, 1.105, 1.095, 1.348 | 2 | 0.459 | 98 | 22 | 4.471 | 5 |
| Octane | 8 | 1.333, 1.25, 1.4, 1.143, 1.125, 1.5, 1.333 | 4 | 0.833 | 90 | 11 | 3.89 | 4 |
| AuditAgent | 7 | 1.167, 1.143, 1.125, 2.222, 1.1, 1.273 | 5 | 0.969 | 351 | 27 | 6.057 | 3 |
| Testmachine | 17 | 1.111, 1.1, 1.018, 1.071, 1.042, 1.04, 1.077, 1.071, 1.013, 1.118, 1.176, 1.08, 1.019, 1.091, 1.388, 1.441 | 5 | 0.456 | 281 | 13 | 1.358 | 2 |
| Sherlock | 10 | 1.083, 1.077, 1.071, 1.067, 1.125, 1.111, 1.2, 1.5, 1.778 | 3 | 0.949 | 138 | 16 | 1.071 | 6 |

## Competitor Median Baseline

| Metric | Competitor median | Savant local | Delta | Worse than median? |
|---|---:|---:|---:|---|
| Distinct font sizes | 9 | 19 | +10 | yes |
| Distinct font families | 4.5 | 2 | -2.5 | no |
| 4px-multiple vertical gap share | 0.891 | 0.459 | -0.432 | yes |
| Distinct color/background values | 14.5 | 22 | +7.5 | yes |
| Minimum sampled text contrast | 2.624 | 4.471 | +1.847 | no |
| CTA count above fold | 3.5 | 5 | +1.5 | not scored |

## Worse-Than-Median Findings

- Type-scale count: Savant uses 19 distinct font sizes vs competitor median 9; delta +10.
- Spacing discipline: Savant 4px-multiple gap share is 0.459 vs competitor median 0.891; delta -0.432.
- Palette size: Savant has 22 distinct computed color/background values vs competitor median 14.5; delta +7.5.

## Lowest Contrast Samples

| Site | Min ratio | Text sample | Foreground | Background |
|---|---:|---|---|---|
| Savant local | 4.471 | Source ↗ | rgb(135, 124, 147) | rgb(30, 21, 40) |
| Octane | 3.89 | [devsecops] | rgb(122, 123, 124) | rgb(244, 245, 248) |
| AuditAgent | 6.057 | V3 - AuditAgent now supports multiple ecosystems: EVM, Solana, and Starknet. | rgb(248, 248, 252) | rgb(102, 51, 238) |
| Testmachine | 1.358 | ERC1967Proxy | rgb(221, 221, 221) | rgb(255, 255, 255) |
| Sherlock | 1.071 | OUR TRACK RECORD | rgb(255, 255, 255) | rgb(247, 247, 248) |

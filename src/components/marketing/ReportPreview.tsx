import { Card } from "@site/src/components/ui/Card";
import { Badge } from "@site/src/components/ui/Badge";
import { SeverityBadge, type Severity } from "@site/src/components/ui/SeverityBadge";
import { Icon } from "@site/src/components/ui/Icon";

const SUMMARY: [Severity, number][] = [
  ["critical", 1],
  ["high", 2],
  ["medium", 4],
  ["low", 6],
  ["info", 3],
  ["gas", 5],
];

interface Finding {
  id: string;
  level: Severity;
  title: string;
  file: string;
  lines: string;
  body: string;
  code: string[];
  rec: string;
}

const FINDING: Finding = {
  id: "SAV-01",
  level: "critical",
  title: "Re-entrancy in withdraw() allows fund drain",
  file: "VaultV2.sol",
  lines: "L142–158",
  body: "External call transfers ETH before the user balance is zeroed, so a malicious receiver can recursively re-enter withdraw() and drain the vault.",
  code: [
    "function withdraw(uint256 amount) external {",
    "    require(balances[msg.sender] >= amount);",
    '    (bool ok,) = msg.sender.call{value: amount}("");  // ← external call first',
    "    balances[msg.sender] -= amount;                    // ← state updated after",
    "}",
  ],
  rec: "Apply checks-effects-interactions: update balances before the external call, or use OpenZeppelin ReentrancyGuard.",
};

function CodeBlock({ lines }: { lines: string[] }) {
  return (
    <pre className="mt-3 overflow-x-auto rounded-lg bg-ink-900 px-4 py-[14px] font-mono text-[12.5px] leading-[1.7]">
      {lines.map((l, i) => (
        <div key={i} className="flex gap-[14px]">
          <span className="min-w-[18px] select-none text-right text-neutral-600">{i + 1}</span>
          <span className={l.includes("←") ? "text-flame-300" : "text-neutral-100"}>{l}</span>
        </div>
      ))}
    </pre>
  );
}

/** The product made tangible: a real audit report (severity summary + a finding). */
export function ReportPreview() {
  return (
    <Card variant="elevated" padding={0} className="overflow-hidden">
      {/* Window chrome */}
      <div className="flex items-center gap-2 border-b border-[var(--border-subtle)] bg-surface-sunken px-4 py-3">
        <span className="flex gap-[6px]">
          <span className="h-[11px] w-[11px] rounded-full bg-[#ff5f57]" />
          <span className="h-[11px] w-[11px] rounded-full bg-[#febc2e]" />
          <span className="h-[11px] w-[11px] rounded-full bg-[#28c840]" />
        </span>
        <span className="ml-2 font-mono text-[12px] text-text-muted">VaultV2.sol — audit report</span>
        <Badge tone="success" dot size="sm" className="ml-auto">Completed</Badge>
      </div>

      <div className="p-5">
        {/* Severity summary */}
        <div className="mb-5 grid grid-cols-3 gap-[10px] sm:grid-cols-6">
          {SUMMARY.map(([k, v]) => (
            <div key={k} className="rounded-lg px-[14px] py-3" style={{ background: `var(--sev-${k}-bg)` }}>
              <div className="text-[26px] font-bold leading-none tabular-nums" style={{ color: `var(--sev-${k})` }}>
                {v}
              </div>
              <div
                className="mt-1 text-[11px] font-semibold uppercase tracking-wide"
                style={{ color: `var(--sev-${k})` }}
              >
                {k}
              </div>
            </div>
          ))}
        </div>

        {/* One finding */}
        <div className="overflow-hidden rounded-xl border border-[var(--border-subtle)]">
          <div className="flex flex-wrap items-center gap-3 border-b border-[var(--border-subtle)] px-5 py-4">
            <SeverityBadge level={FINDING.level} />
            <span className="font-mono text-[12px] text-text-subtle">{FINDING.id}</span>
            <h3 className="flex-1 text-md font-semibold text-text-strong">{FINDING.title}</h3>
            <span className="font-mono text-[12px] text-text-muted">
              {FINDING.file} · {FINDING.lines}
            </span>
          </div>
          <div className="px-5 py-4">
            <p className="text-[14px] leading-relaxed text-text-body">{FINDING.body}</p>
            <CodeBlock lines={FINDING.code} />
            <div className="mt-[14px] flex gap-[10px] rounded-lg bg-flame-50 px-[14px] py-3">
              <Icon name="Lightbulb" size={16} className="mt-[2px] shrink-0 text-flame-600" />
              <div>
                <div className="text-[12px] font-semibold uppercase tracking-wide text-flame-700">
                  Recommendation
                </div>
                <p className="mt-[3px] text-[13.5px] leading-snug text-text-body">{FINDING.rec}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}

export default ReportPreview;

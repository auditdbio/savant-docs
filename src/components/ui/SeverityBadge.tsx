import { clsx } from "clsx";
import type { CSSProperties } from "react";

export type Severity = "critical" | "high" | "medium" | "low" | "info" | "gas";
type Size = "sm" | "md";

export interface SeverityBadgeProps {
  level?: Severity;
  showDot?: boolean;
  size?: Size;
  className?: string;
  style?: CSSProperties;
}

const map: Record<Severity, { label: string; fg: string; bg: string }> = {
  critical: { label: "Critical", fg: "var(--sev-critical)", bg: "var(--sev-critical-bg)" },
  high: { label: "High", fg: "var(--sev-high)", bg: "var(--sev-high-bg)" },
  medium: { label: "Medium", fg: "var(--sev-medium)", bg: "var(--sev-medium-bg)" },
  low: { label: "Low", fg: "var(--sev-low)", bg: "var(--sev-low-bg)" },
  info: { label: "Info", fg: "var(--sev-info)", bg: "var(--sev-info-bg)" },
  gas: { label: "Gas", fg: "var(--sev-gas)", bg: "var(--sev-gas-bg)" },
};

/** Severity is first-class to the product: color + a diamond dot (never color alone). */
export function SeverityBadge({
  level = "medium",
  showDot = true,
  size = "md",
  className,
  style,
}: SeverityBadgeProps) {
  const s = map[level];
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-sm font-semibold leading-none tracking-snug",
        size === "sm" ? "h-5 px-2 text-[11px]" : "h-6 px-[10px] text-[12px]",
        className,
      )}
      style={{ background: s.bg, color: s.fg, ...style }}
    >
      {showDot && (
        <span
          aria-hidden
          className="mr-[6px] inline-block h-[7px] w-[7px] rotate-45"
          style={{ background: s.fg }}
        />
      )}
      {s.label}
    </span>
  );
}

export default SeverityBadge;

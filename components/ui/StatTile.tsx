import { clsx } from "clsx";
import type { ReactNode, CSSProperties } from "react";

type Accent =
  | "neutral" | "flame" | "plum"
  | "critical" | "high" | "medium" | "low" | "success";

export interface StatTileProps {
  label: string;
  value: ReactNode;
  sublabel?: string;
  accent?: Accent;
  icon?: ReactNode;
  className?: string;
  style?: CSSProperties;
}

const accentColor: Record<Accent, string> = {
  neutral: "var(--neutral-700)",
  flame: "var(--flame-500)",
  plum: "var(--plum-600)",
  critical: "var(--sev-critical)",
  high: "var(--sev-high)",
  medium: "var(--sev-medium)",
  low: "var(--sev-low)",
  success: "var(--success)",
};

export function StatTile({
  label,
  value,
  sublabel,
  accent = "neutral",
  icon,
  className,
  style,
}: StatTileProps) {
  const color = accentColor[accent];
  return (
    <div
      className={clsx(
        "flex flex-col gap-[6px] rounded-lg border border-[var(--border-subtle)] bg-surface-card p-[18px]",
        className,
      )}
      style={style}
    >
      <div className="flex items-center justify-between">
        <span className="text-[12px] font-semibold uppercase tracking-wide text-text-muted">
          {label}
        </span>
        {icon && <span style={{ color, display: "flex" }}>{icon}</span>}
      </div>
      <span
        className="text-[30px] font-bold leading-none tracking-tight tabular-nums"
        style={{ color }}
      >
        {value}
      </span>
      {sublabel && <span className="text-[12px] text-text-subtle">{sublabel}</span>}
    </div>
  );
}

export default StatTile;

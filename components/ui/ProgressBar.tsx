import { clsx } from "clsx";
import type { CSSProperties } from "react";

type Tone = "flame" | "plum" | "success";

export interface ProgressBarProps {
  value: number;
  label?: string;
  showPercent?: boolean;
  tone?: Tone;
  height?: number;
  className?: string;
  style?: CSSProperties;
}

const toneFill: Record<Tone, string> = {
  flame: "linear-gradient(90deg, var(--flame-500), var(--flame-400))",
  plum: "linear-gradient(90deg, var(--plum-600), var(--plum-500))",
  success: "var(--success)",
};

export function ProgressBar({
  value,
  label,
  showPercent = true,
  tone = "flame",
  height = 8,
  className,
  style,
}: ProgressBarProps) {
  const clamped = Math.max(0, Math.min(100, value));
  return (
    <div className={clsx("w-full", className)} style={style}>
      {(label || showPercent) && (
        <div className="mb-[6px] flex items-center justify-between text-[13px]">
          {label && <span className="font-semibold text-text-body">{label}</span>}
          {showPercent && (
            <span className="font-mono text-[12px] tabular-nums text-text-muted">
              {Math.round(clamped)}%
            </span>
          )}
        </div>
      )}
      <div
        className="w-full overflow-hidden rounded-full bg-neutral-150"
        style={{ height }}
        role="progressbar"
        aria-valuenow={Math.round(clamped)}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className="h-full rounded-full transition-[width] duration-slow ease-out"
          style={{ width: `${clamped}%`, background: toneFill[tone] }}
        />
      </div>
    </div>
  );
}

export default ProgressBar;

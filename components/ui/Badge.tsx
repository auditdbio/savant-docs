import { clsx } from "clsx";
import type { ReactNode, CSSProperties } from "react";

type Tone = "neutral" | "flame" | "plum" | "success" | "warning" | "danger" | "info";
type Variant = "soft" | "solid" | "outline";
type Size = "sm" | "md";

export interface BadgeProps {
  children: ReactNode;
  tone?: Tone;
  variant?: Variant;
  dot?: boolean;
  size?: Size;
  className?: string;
  style?: CSSProperties;
}

const toneMap: Record<Tone, { fg: string; bg: string; solid: string }> = {
  neutral: { fg: "var(--neutral-700)", bg: "var(--neutral-100)", solid: "var(--neutral-700)" },
  flame: { fg: "var(--flame-700)", bg: "var(--flame-50)", solid: "var(--flame-500)" },
  plum: { fg: "var(--plum-700)", bg: "var(--plum-50)", solid: "var(--plum-600)" },
  success: { fg: "var(--success)", bg: "var(--success-bg)", solid: "var(--success)" },
  warning: { fg: "var(--warning)", bg: "var(--warning-bg)", solid: "var(--warning)" },
  danger: { fg: "var(--danger)", bg: "var(--danger-bg)", solid: "var(--danger)" },
  info: { fg: "var(--info)", bg: "var(--info-bg)", solid: "var(--info)" },
};

export function Badge({
  children,
  tone = "neutral",
  variant = "soft",
  dot = false,
  size = "md",
  className,
  style,
}: BadgeProps) {
  const t = toneMap[tone];
  const variantStyle: CSSProperties =
    variant === "soft"
      ? { background: t.bg, color: t.fg, border: "1px solid transparent" }
      : variant === "solid"
        ? { background: t.solid, color: "#fff", border: "1px solid transparent" }
        : { background: "transparent", color: t.fg, border: `1px solid ${t.fg}` };

  return (
    <span
      className={clsx(
        "inline-flex items-center gap-[6px] whitespace-nowrap rounded-full font-semibold leading-none tracking-snug",
        size === "sm" ? "h-5 px-2 text-[11px]" : "h-6 px-[10px] text-[12px]",
        className,
      )}
      style={{ ...variantStyle, ...style }}
    >
      {dot && (
        <span
          className="inline-block h-[6px] w-[6px] rounded-full"
          style={{ background: variant === "solid" ? "#fff" : t.fg }}
        />
      )}
      {children}
    </span>
  );
}

export default Badge;

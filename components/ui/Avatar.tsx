import { clsx } from "clsx";
import type { CSSProperties } from "react";

type Tone = "plum" | "flame" | "neutral";
type Shape = "circle" | "square";

export interface AvatarProps {
  src?: string;
  name?: string;
  size?: number;
  shape?: Shape;
  tone?: Tone;
  className?: string;
  style?: CSSProperties;
}

const toneMap: Record<Tone, { bg: string; fg: string }> = {
  plum: { bg: "var(--plum-100)", fg: "var(--plum-700)" },
  flame: { bg: "var(--flame-100)", fg: "var(--flame-700)" },
  neutral: { bg: "var(--neutral-200)", fg: "var(--neutral-700)" },
};

function initials(name?: string) {
  if (!name) return "?";
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("") || "?";
}

export function Avatar({
  src,
  name,
  size = 40,
  shape = "circle",
  tone = "plum",
  className,
  style,
}: AvatarProps) {
  const t = toneMap[tone];
  return (
    <span
      className={clsx("inline-flex items-center justify-center overflow-hidden font-semibold", className)}
      style={{
        width: size,
        height: size,
        borderRadius: shape === "circle" ? "50%" : "var(--radius-md)",
        background: src ? "transparent" : t.bg,
        color: t.fg,
        fontSize: Math.round(size * 0.4),
        letterSpacing: "0.01em",
        ...style,
      }}
    >
      {src ? (
         
        <img src={src} alt={name ?? ""} className="h-full w-full object-cover" />
      ) : (
        initials(name)
      )}
    </span>
  );
}

export default Avatar;

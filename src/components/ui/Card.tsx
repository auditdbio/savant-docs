import { clsx } from "clsx";
import type { ReactNode, CSSProperties } from "react";

type Variant = "default" | "outlined" | "elevated" | "inverse";

export interface CardProps {
  children: ReactNode;
  variant?: Variant;
  padding?: number;
  hoverable?: boolean;
  className?: string;
  style?: CSSProperties;
  id?: string;
}

const variantClasses: Record<Variant, string> = {
  default: "bg-surface-card border border-[var(--border-subtle)] shadow-sm",
  outlined: "bg-surface-card border border-[var(--border-default)]",
  elevated: "bg-surface-card border border-[var(--border-subtle)] shadow-lg",
  inverse: "bg-surface-inverse border border-ink-700 shadow-md text-neutral-100",
};

export function Card({
  children,
  variant = "default",
  padding = 24,
  hoverable = false,
  className,
  style,
  id,
}: CardProps) {
  return (
    <div
      id={id}
      className={clsx(
        "rounded-xl transition-[box-shadow,transform] duration-base ease-out",
        variantClasses[variant],
        hoverable && "hover:-translate-y-[2px] hover:shadow-lg",
        className,
      )}
      style={{ padding, ...style }}
    >
      {children}
    </div>
  );
}

export default Card;

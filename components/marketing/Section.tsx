import { clsx } from "clsx";
import type { ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
  eyebrow?: string;
  title?: ReactNode;
  description?: ReactNode;
  align?: "center" | "left";
  /** Tinted card surface (alternating section rhythm). */
  surface?: boolean;
  className?: string;
  id?: string;
}

/**
 * Consistent marketing section rhythm. Hierarchy comes from scale + whitespace
 * (per the design bible), so headers are large and airy, dividers are hairlines.
 */
export function Section({
  children,
  eyebrow,
  title,
  description,
  align = "center",
  surface = false,
  className,
  id,
}: SectionProps) {
  return (
    <section
      id={id}
      className={clsx(surface && "border-y border-[var(--border-subtle)] bg-surface-card", className)}
    >
      <div className="container-max py-13">
        {(eyebrow || title || description) && (
          <div className={clsx("mb-10 max-w-2xl", align === "center" ? "mx-auto text-center" : "")}>
            {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
            {title && (
              <h2 className="text-balance text-3xl font-bold tracking-tight text-text-strong md:text-4xl">
                {title}
              </h2>
            )}
            {description && (
              <p className="mt-4 text-lg leading-relaxed text-text-muted">{description}</p>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}

export default Section;

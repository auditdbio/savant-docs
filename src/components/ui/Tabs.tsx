
import { clsx } from "clsx";
import { useState } from "react";
import type { CSSProperties } from "react";

export interface TabItem {
  id: string;
  label: string;
  count?: number;
}

export interface TabsProps {
  items: TabItem[];
  value?: string;
  defaultValue?: string;
  onChange?: (id: string) => void;
  className?: string;
  style?: CSSProperties;
}

export function Tabs({ items, value, defaultValue, onChange, className, style }: TabsProps) {
  const [internal, setInternal] = useState(defaultValue ?? items[0]?.id);
  const active = value ?? internal;

  const select = (id: string) => {
    if (value === undefined) setInternal(id);
    onChange?.(id);
  };

  return (
    <div
      role="tablist"
      className={clsx("flex gap-1 border-b border-[var(--border-subtle)]", className)}
      style={style}
    >
      {items.map((item) => {
        const isActive = item.id === active;
        return (
          <button
            key={item.id}
            role="tab"
            type="button"
            aria-selected={isActive}
            onClick={() => select(item.id)}
            className={clsx(
              "relative inline-flex items-center gap-[7px] px-[14px] py-[10px] text-[14px] transition-colors duration-fast ease-out focus-visible:outline-none",
              isActive ? "font-semibold text-text-strong" : "font-medium text-text-muted hover:text-text-body",
            )}
          >
            {item.label}
            {typeof item.count === "number" && (
              <span
                className={clsx(
                  "rounded-full px-[7px] py-[1px] text-[11px] font-semibold tabular-nums",
                  isActive ? "bg-flame-50 text-flame-700" : "bg-neutral-100 text-text-muted",
                )}
              >
                {item.count}
              </span>
            )}
            <span
              aria-hidden
              className={clsx(
                "absolute -bottom-px left-2 right-2 h-[2px] rounded-[2px] transition-colors duration-fast ease-out",
                isActive ? "bg-flame-500" : "bg-transparent",
              )}
            />
          </button>
        );
      })}
    </div>
  );
}

export default Tabs;

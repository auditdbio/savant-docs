
import { clsx } from "clsx";
import { useEffect, useId, useRef, useState } from "react";
import { Icon } from "./Icon";

export interface DropdownOption {
  value: string;
  label: string;
}

export interface DropdownProps {
  label?: string;
  hint?: string;
  value: string;
  onChange: (value: string) => void;
  options: DropdownOption[];
  disabled?: boolean;
  className?: string;
  /** Accessible name when no visible label is provided. */
  ariaLabel?: string;
}

/**
 * On-brand custom select (replaces the native OS dropdown for visual consistency).
 * Keyboard accessible: Enter/Space/Arrow to open, Up/Down to move, Enter to pick, Esc to close.
 */
export function Dropdown({
  label,
  hint,
  value,
  onChange,
  options,
  disabled,
  className,
  ariaLabel,
}: DropdownProps) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const id = useId();
  const selectedIndex = Math.max(0, options.findIndex((o) => o.value === value));
  const selected = options[selectedIndex];

  useEffect(() => {
    if (!open) return;
    const onDocClick = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [open]);

  const openMenu = () => {
    setActive(selectedIndex);
    setOpen(true);
  };

  const choose = (i: number) => {
    const opt = options[i];
    if (opt) onChange(opt.value);
    setOpen(false);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;
    if (!open) {
      if (["Enter", " ", "ArrowDown", "ArrowUp"].includes(e.key)) {
        e.preventDefault();
        openMenu();
      }
      return;
    }
    if (e.key === "Escape") {
      e.preventDefault();
      setOpen(false);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(options.length - 1, a + 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(0, a - 1));
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      choose(active);
    } else if (e.key === "Home") {
      e.preventDefault();
      setActive(0);
    } else if (e.key === "End") {
      e.preventDefault();
      setActive(options.length - 1);
    }
  };

  return (
    <div className={clsx("flex flex-col gap-[6px]", className)} ref={rootRef}>
      {label && (
        <label id={`${id}-label`} className="text-[13px] font-medium text-text-body">
          {label}
        </label>
      )}
      <div className="relative">
        <button
          type="button"
          disabled={disabled}
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-labelledby={label ? `${id}-label` : undefined}
          aria-label={!label ? ariaLabel : undefined}
          onClick={() => !disabled && (open ? setOpen(false) : openMenu())}
          onKeyDown={onKeyDown}
          className={clsx(
            "flex h-10 w-full items-center justify-between gap-2 rounded-md border bg-surface-card pl-3 pr-3 text-left font-sans text-[14px] text-text-body outline-none transition-[border,box-shadow] duration-fast ease-out",
            open ? "border-flame-500 shadow-focus" : "border-[var(--border-default)] hover:border-[var(--border-strong)]",
            disabled && "cursor-not-allowed bg-surface-sunken opacity-[0.55]",
          )}
        >
          <span className="truncate">{selected?.label}</span>
          <Icon
            name="ChevronDown"
            size={16}
            className={clsx("shrink-0 text-text-subtle transition-transform duration-fast", open && "rotate-180")}
          />
        </button>

        {open && (
          <ul
            ref={listRef}
            role="listbox"
            aria-labelledby={label ? `${id}-label` : undefined}
            tabIndex={-1}
            className="absolute z-20 mt-2 max-h-72 w-full overflow-auto rounded-lg border border-[var(--border-subtle)] bg-surface-card p-1 shadow-lg"
          >
            {options.map((opt, i) => {
              const isSelected = opt.value === value;
              const isActive = i === active;
              return (
                <li key={opt.value} role="option" aria-selected={isSelected}>
                  <button
                    type="button"
                    onClick={() => choose(i)}
                    onMouseEnter={() => setActive(i)}
                    className={clsx(
                      "flex w-full items-center justify-between gap-2 rounded-md px-3 py-2 text-left text-[14px] transition-colors duration-fast",
                      isActive ? "bg-surface-hover" : "bg-transparent",
                      isSelected ? "font-semibold text-flame-600" : "text-text-body",
                    )}
                  >
                    <span className="truncate">{opt.label}</span>
                    {isSelected && <Icon name="Check" size={16} className="shrink-0 text-flame-500" />}
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
      {hint && <span className="text-[12px] text-text-muted">{hint}</span>}
    </div>
  );
}

export default Dropdown;

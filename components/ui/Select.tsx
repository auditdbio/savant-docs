import { clsx } from "clsx";
import { useId } from "react";
import type { SelectHTMLAttributes } from "react";

type Option = { value: string; label: string } | string;

export interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "size"> {
  label?: string;
  hint?: string;
  options: Option[];
}

export function Select({ label, hint, options, id, className, disabled, ...rest }: SelectProps) {
  const generatedId = useId();
  const selectId = id ?? generatedId;
  return (
    <div className={clsx("flex flex-col gap-[6px]", className)}>
      {label && (
        <label htmlFor={selectId} className="text-[13px] font-medium text-text-body">
          {label}
        </label>
      )}
      <div className="relative">
        <select
          id={selectId}
          disabled={disabled}
          className={clsx(
            "h-10 w-full appearance-none rounded-md border bg-surface-card pl-3 pr-9 font-sans text-[14px] text-text-body outline-none transition-[border,box-shadow] duration-fast ease-out",
            "border-[var(--border-default)] focus:border-flame-500 focus:shadow-focus",
            disabled && "cursor-not-allowed bg-surface-sunken opacity-[0.55]",
          )}
          {...rest}
        >
          {options.map((opt) => {
            const value = typeof opt === "string" ? opt : opt.value;
            const text = typeof opt === "string" ? opt : opt.label;
            return (
              <option key={value} value={value}>
                {text}
              </option>
            );
          })}
        </select>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-subtle"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </div>
      {hint && <span className="text-[12px] text-text-muted">{hint}</span>}
    </div>
  );
}

export default Select;

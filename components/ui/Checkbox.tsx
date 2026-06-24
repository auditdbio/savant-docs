import { clsx } from "clsx";
import { useId } from "react";
import type { InputHTMLAttributes } from "react";

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "size"> {
  label?: string;
}

export function Checkbox({ label, id, className, checked, disabled, ...rest }: CheckboxProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  return (
    <label
      htmlFor={inputId}
      className={clsx(
        "inline-flex cursor-pointer items-center gap-[10px] text-[14px] text-text-body",
        disabled && "cursor-not-allowed opacity-[0.55]",
        className,
      )}
    >
      <span className="relative inline-flex h-[18px] w-[18px] items-center justify-center">
        <input
          id={inputId}
          type="checkbox"
          checked={checked}
          disabled={disabled}
          className="peer absolute inset-0 cursor-pointer opacity-0"
          {...rest}
        />
        <span
          className={clsx(
            "h-[18px] w-[18px] rounded-xs border-[1.5px] transition-all duration-fast ease-out",
            "border-[var(--border-strong)] bg-surface-card",
            "peer-checked:border-flame-500 peer-checked:bg-flame-500",
            "peer-focus-visible:shadow-focus",
          )}
        />
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="#fff"
          strokeWidth={3.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="pointer-events-none absolute h-[12px] w-[12px] opacity-0 peer-checked:opacity-100"
        >
          <path d="M20 6 9 17l-5-5" />
        </svg>
      </span>
      {label}
    </label>
  );
}

export default Checkbox;

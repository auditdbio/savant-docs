import { clsx } from "clsx";
import { useId } from "react";
import type { InputHTMLAttributes, ReactNode } from "react";

type Size = "sm" | "md" | "lg";

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: string;
  hint?: string;
  error?: string;
  iconLeft?: ReactNode;
  size?: Size;
}

const heights: Record<Size, string> = { sm: "h-[34px]", md: "h-10", lg: "h-[46px]" };

export function Input({
  label,
  hint,
  error,
  iconLeft,
  size = "md",
  id,
  className,
  disabled,
  ...rest
}: InputProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const describedBy = error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined;

  return (
    <div className={clsx("flex flex-col gap-[6px]", className)}>
      {label && (
        <label htmlFor={inputId} className="text-[13px] font-medium text-text-body">
          {label}
        </label>
      )}
      <div className="relative">
        {iconLeft && (
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-text-subtle">
            {iconLeft}
          </span>
        )}
        <input
          id={inputId}
          disabled={disabled}
          aria-invalid={!!error}
          aria-describedby={describedBy}
          className={clsx(
            "w-full rounded-md border bg-surface-card font-sans text-[14px] text-text-body outline-none transition-[border,box-shadow] duration-fast ease-out",
            "placeholder:text-text-subtle",
            heights[size],
            iconLeft ? "pl-9 pr-3" : "px-3",
            error
              ? "border-danger focus:shadow-[0_0_0_3px_rgba(229,72,77,0.18)]"
              : "border-[var(--border-default)] focus:border-flame-500 focus:shadow-focus",
            disabled && "cursor-not-allowed bg-surface-sunken opacity-[0.55]",
          )}
          {...rest}
        />
      </div>
      {error ? (
        <span id={`${inputId}-error`} className="text-[12px] text-danger">
          {error}
        </span>
      ) : hint ? (
        <span id={`${inputId}-hint`} className="text-[12px] text-text-muted">
          {hint}
        </span>
      ) : null}
    </div>
  );
}

export default Input;

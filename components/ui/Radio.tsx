import { clsx } from "clsx";
import { useId } from "react";
import type { InputHTMLAttributes } from "react";

export interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "size"> {
  label?: string;
  description?: string;
}

export function Radio({ label, description, id, className, disabled, ...rest }: RadioProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  return (
    <label
      htmlFor={inputId}
      className={clsx(
        "inline-flex cursor-pointer items-start gap-[10px]",
        disabled && "cursor-not-allowed opacity-[0.55]",
        className,
      )}
    >
      <span className="relative mt-[1px] inline-flex h-[18px] w-[18px] items-center justify-center">
        <input
          id={inputId}
          type="radio"
          disabled={disabled}
          className="peer absolute inset-0 cursor-pointer opacity-0"
          {...rest}
        />
        <span
          className={clsx(
            "h-[18px] w-[18px] rounded-full border-[1.5px] bg-surface-card transition-colors duration-fast ease-out",
            "border-[var(--border-strong)] peer-checked:border-flame-500",
            "peer-focus-visible:shadow-focus",
          )}
        />
        <span className="pointer-events-none absolute h-[9px] w-[9px] rounded-full bg-flame-500 opacity-0 peer-checked:opacity-100" />
      </span>
      <span className="flex flex-col">
        <span className={clsx("text-[14px] text-text-body", description && "font-semibold")}>{label}</span>
        {description && <span className="mt-[2px] text-[13px] text-text-muted">{description}</span>}
      </span>
    </label>
  );
}

export default Radio;

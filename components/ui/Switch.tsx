"use client";

import { clsx } from "clsx";
import { useId } from "react";

export interface SwitchProps {
  checked?: boolean;
  disabled?: boolean;
  onChange?: (next: boolean) => void;
  label?: string;
  id?: string;
  className?: string;
}

export function Switch({ checked = false, disabled, onChange, label, id, className }: SwitchProps) {
  const generatedId = useId();
  const switchId = id ?? generatedId;
  return (
    <label
      htmlFor={switchId}
      className={clsx(
        "inline-flex cursor-pointer items-center gap-[10px] text-[14px] text-text-body",
        disabled && "cursor-not-allowed opacity-[0.55]",
        className,
      )}
    >
      <button
        id={switchId}
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => !disabled && onChange?.(!checked)}
        className={clsx(
          "relative inline-flex h-6 w-10 shrink-0 rounded-full transition-colors duration-base ease-spring focus-visible:outline-none focus-visible:shadow-focus",
          checked ? "bg-flame-500" : "bg-neutral-300",
        )}
      >
        <span
          className="absolute top-[2px] h-5 w-5 rounded-full bg-white shadow-sm transition-[left] duration-base ease-spring"
          style={{ left: checked ? 18 : 2 }}
        />
      </button>
      {label}
    </label>
  );
}

export default Switch;

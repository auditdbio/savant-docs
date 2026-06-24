import { clsx } from "clsx";
import type { ReactNode, CSSProperties } from "react";

type Tone = "info" | "success" | "warning" | "danger";

export interface ToastProps {
  title: string;
  message?: string;
  tone?: Tone;
  icon?: ReactNode;
  onClose?: () => void;
  className?: string;
  style?: CSSProperties;
}

const toneColor: Record<Tone, string> = {
  info: "var(--info)",
  success: "var(--success)",
  warning: "var(--warning)",
  danger: "var(--danger)",
};

export function Toast({ title, message, tone = "info", icon, onClose, className, style }: ToastProps) {
  const color = toneColor[tone];
  return (
    <div
      role="status"
      className={clsx(
        "flex w-[360px] max-w-full items-start gap-3 rounded-lg border border-[var(--border-subtle)] bg-surface-card py-[14px] pl-4 pr-[14px] shadow-lg",
        className,
      )}
      style={{ borderLeft: `3px solid ${color}`, ...style }}
    >
      {icon && <span style={{ color, display: "flex" }}>{icon}</span>}
      <div className="flex-1">
        <div className="text-[14px] font-semibold text-text-strong">{title}</div>
        {message && <div className="mt-[2px] text-[13px] text-text-muted">{message}</div>}
      </div>
      {onClose && (
        <button
          type="button"
          aria-label="Dismiss"
          onClick={onClose}
          className="text-text-subtle transition-colors hover:text-text-body"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" className="h-4 w-4">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
}

export default Toast;

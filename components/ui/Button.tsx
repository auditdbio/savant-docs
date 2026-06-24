import { clsx } from "clsx";
import type { ReactNode, ButtonHTMLAttributes, AnchorHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "outline" | "ghost" | "danger";
type Size = "sm" | "md" | "lg";

interface CommonProps {
  variant?: Variant;
  size?: Size;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  loading?: boolean;
  fullWidth?: boolean;
  children?: ReactNode;
  className?: string;
}

type ButtonAsButton = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof CommonProps> & { href?: undefined };
type ButtonAsLink = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof CommonProps> & { href: string };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

const sizeClasses: Record<Size, string> = {
  sm: "h-8 px-3 text-[13px] gap-[6px] rounded-md",
  md: "h-10 px-4 text-[14px] gap-2 rounded-lg",
  lg: "h-12 px-[22px] text-[15px] gap-2 rounded-lg",
};

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-flame-500 text-white border border-transparent hover:bg-flame-600 active:bg-flame-700",
  secondary:
    "bg-plum-600 text-white border border-transparent hover:bg-plum-700",
  outline:
    "bg-surface-card text-text-body border border-[var(--border-default)] hover:bg-surface-hover",
  ghost:
    "bg-transparent text-text-body border border-transparent hover:bg-surface-hover",
  danger:
    "bg-danger text-white border border-transparent hover:bg-[#cf3a3f]",
};

const base =
  "inline-flex items-center justify-center font-semibold whitespace-nowrap select-none cursor-pointer " +
  "transition-[background,box-shadow,transform] duration-fast ease-out " +
  "focus-visible:outline-none focus-visible:shadow-focus active:translate-y-[0.5px] active:scale-[0.99] " +
  "disabled:opacity-[0.55] disabled:cursor-not-allowed disabled:pointer-events-none";

function Spinner() {
  return (
    <span
      aria-hidden
      className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
    />
  );
}

export function Button(props: ButtonProps) {
  const {
    variant = "primary",
    size = "md",
    iconLeft,
    iconRight,
    loading = false,
    fullWidth = false,
    children,
    className,
  } = props;

  const classes = clsx(
    base,
    sizeClasses[size],
    variantClasses[variant],
    fullWidth && "w-full",
    className,
  );

  const inner = (
    <>
      {loading ? <Spinner /> : iconLeft}
      {children}
      {!loading && iconRight}
    </>
  );

  if ("href" in props && props.href !== undefined) {
    const { href, ...rest } = props as ButtonAsLink;
    // Strip non-anchor props.
    delete (rest as Record<string, unknown>).variant;
    delete (rest as Record<string, unknown>).size;
    delete (rest as Record<string, unknown>).iconLeft;
    delete (rest as Record<string, unknown>).iconRight;
    delete (rest as Record<string, unknown>).loading;
    delete (rest as Record<string, unknown>).fullWidth;
    return (
      <a href={href} className={classes} {...rest}>
        {inner}
      </a>
    );
  }

  const { type = "button", disabled, ...rest } = props as ButtonAsButton;
  delete (rest as Record<string, unknown>).variant;
  delete (rest as Record<string, unknown>).size;
  delete (rest as Record<string, unknown>).iconLeft;
  delete (rest as Record<string, unknown>).iconRight;
  delete (rest as Record<string, unknown>).loading;
  delete (rest as Record<string, unknown>).fullWidth;
  return (
    <button type={type} disabled={disabled || loading} className={classes} {...rest}>
      {inner}
    </button>
  );
}

export default Button;

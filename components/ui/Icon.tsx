import { icons, type LucideProps } from "lucide-react";

export type IconName = keyof typeof icons;

export interface IconProps extends Omit<LucideProps, "ref"> {
  /** PascalCase Lucide icon name, e.g. "ArrowRight", "ScanSearch". */
  name: IconName;
  size?: number;
}

/**
 * Thin wrapper over lucide-react, mirroring the design system's shared Icon helper.
 * Outline icons, currentColor stroke, rounded caps/joins.
 */
export function Icon({ name, size = 20, strokeWidth = 2, ...props }: IconProps) {
  const LucideIcon = icons[name];
  if (!LucideIcon) {
    if (process.env.NODE_ENV !== "production") {
      console.warn(`[Icon] Unknown lucide icon: "${name}"`);
    }
    return null;
  }
  return <LucideIcon size={size} strokeWidth={strokeWidth} {...props} />;
}

export default Icon;

import type {ComponentPropsWithoutRef, ElementType, ReactNode} from 'react';

interface ThemeComponentProps extends ComponentPropsWithoutRef<'div'> {
  as?: ElementType;
  children?: ReactNode;
}

export default function ThemeComponent({
  as: Component = 'div',
  children,
  ...props
}: ThemeComponentProps) {
  return <Component {...props}>{children}</Component>;
}

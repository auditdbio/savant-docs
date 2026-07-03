import type {ElementType, ReactNode} from 'react';

type BalancedHeadingProps = {
  as?: ElementType;
  children: string;
  className?: string;
  id?: string;
  'data-testid'?: string;
};

export default function BalancedHeading({
  as: Component = 'h2',
  children,
  ...props
}: BalancedHeadingProps): ReactNode {
  const parts = children.split(/([ \t\n\r\f]+)/);

  return (
    <Component {...props}>
      {parts.map((part, index) =>
        /^[ \t\n\r\f]+$/.test(part) ? (
          part
        ) : (
          <span className="bw" key={`${part}-${index}`}>
            {part}
          </span>
        ),
      )}
    </Component>
  );
}

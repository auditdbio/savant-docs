import type {AnchorHTMLAttributes, ReactNode} from 'react';

interface DocusaurusLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children?: ReactNode;
  to?: string;
}

export default function Link({children, href, to, ...props}: DocusaurusLinkProps) {
  return (
    <a href={to ?? href} {...props}>
      {children}
    </a>
  );
}

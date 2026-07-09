import type {AnchorHTMLAttributes, ReactNode} from 'react';

interface DocusaurusLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children?: ReactNode;
  to?: string;
}

export default function Link({children, href, to, ...props}: DocusaurusLinkProps) {
  // Real Docusaurus strips the pathname:// protocol and bypasses SPA routing.
  const resolved = (to ?? href)?.replace(/^pathname:\/\//, '');
  return (
    <a href={resolved} {...props}>
      {children}
    </a>
  );
}

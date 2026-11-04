import React from 'react';

type LinkProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
  replace?: boolean;
  prefetch?: boolean;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
  'aria-label'?: string;
};

const Link = ({ href, children, replace: _replace, prefetch: _prefetch, ...props }: LinkProps) => (
  <a href={href} {...props}>
    {children}
  </a>
);

export default Link;

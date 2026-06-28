'use client';

import Link from 'next/link';

interface ExternalLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export function ExternalLink({ href, children, className }: ExternalLinkProps) {
  const handleClick = (e: React.MouseEvent) => {
    if (
      typeof window !== 'undefined' &&
      window.ReactNativeWebView?.postMessage
    ) {
      e.preventDefault();
      window.ReactNativeWebView.postMessage(
        JSON.stringify({ type: 'OPEN_EXTERNAL', url: href }),
      );
    }
  };

  return (
    <Link
      href={href}
      target='_blank'
      rel='noopener noreferrer'
      className={className}
      onClick={handleClick}
    >
      {children}
    </Link>
  );
}

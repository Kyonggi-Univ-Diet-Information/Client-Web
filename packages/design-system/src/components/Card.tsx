import Link from 'next/link';
import type { ReactNode } from 'react';

import { cn } from '../lib/cn';

export default function Card({
  href,
  children,
  className,
}: {
  children: ReactNode;
  href?: string;
  className?: string;
}) {
  if (href) {
    return (
      <Link
        href={href}
        prefetch
        className={cn(
          'bg-grey-100/50 hover:bg-grey-100 active:bg-grey-100 flex min-w-60 flex-shrink-0 flex-col gap-2 overflow-hidden rounded-2xl p-4 transition-all duration-300',
          className,
        )}
      >
        {children}
      </Link>
    );
  }

  return (
    <div
      className={cn(
        'bg-grey-100/50 flex min-w-60 flex-shrink-0 flex-col gap-2 overflow-hidden rounded-2xl p-4',
        className,
      )}
    >
      {children}
    </div>
  );
}

function CardHeader({ children }: { children: ReactNode }) {
  return <p className='font-semibold'>{children}</p>;
}

function CardContent({ children }: { children: ReactNode }) {
  return <div className='flex flex-col gap-1'>{children}</div>;
}

Card.Header = CardHeader;
Card.Content = CardContent;

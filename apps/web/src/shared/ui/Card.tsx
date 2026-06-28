import Link from 'next/link';
import type { ReactNode } from 'react';

import { cn } from '@/shared/lib';

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
          'flex min-w-60 flex-shrink-0 flex-col gap-2 overflow-hidden rounded-2xl bg-gray-100/50 p-4 transition-all duration-300 hover:bg-gray-100 active:bg-gray-100',
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
        'flex min-w-60 flex-shrink-0 flex-col gap-2 overflow-hidden rounded-2xl bg-gray-100/50 p-4',
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

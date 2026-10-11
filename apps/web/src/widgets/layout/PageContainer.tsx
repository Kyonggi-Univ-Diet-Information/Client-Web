import type { ReactNode } from 'react';

import { cn } from '@/shared/lib';

export default function PageContainer({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'scrollbar-hide absolute inset-0 flex flex-col gap-8 overflow-x-visible overflow-y-scroll pt-16 pb-26 bg-white focus:outline-none',
        className,
      )}
    >
      {children}
    </div>
  );
}

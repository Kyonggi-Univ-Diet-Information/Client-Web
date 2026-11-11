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
        'scrollbar-hide absolute inset-0 flex flex-col gap-8 overflow-x-visible overflow-y-scroll pt-[calc(4rem+var(--safe-area-top))] pb-[calc(5rem+var(--safe-area-bottom))] bg-white focus:outline-none lg:px-[max(0px,calc((100%-1180px)/2))]',
        className,
      )}
    >
      {children}
    </div>
  );
}

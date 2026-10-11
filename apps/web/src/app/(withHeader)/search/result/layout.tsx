import { type ReactNode, Suspense } from 'react';

import { SearchInput } from '@/page/search';

export default function SearchResultLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className='flex min-h-0 flex-1 flex-col'>
      <Suspense fallback={<div className='h-[68px]' />}>
        <SearchInput />
      </Suspense>
      <div className='scrollbar-hide min-h-0 flex-1 overflow-y-scroll'>
        {children}
      </div>
    </div>
  );
}

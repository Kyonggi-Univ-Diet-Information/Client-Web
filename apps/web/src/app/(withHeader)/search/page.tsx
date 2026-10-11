import { Suspense } from 'react';

import { SearchInput } from '@/page/search';

export default function SearchPage() {
  return (
    <Suspense fallback={<div className='h-[68px]' />}>
      <SearchInput />
    </Suspense>
  );
}

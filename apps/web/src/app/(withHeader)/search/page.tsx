import { SearchIcon } from 'lucide-react';
import { Suspense } from 'react';

import { SearchInput } from '@/page/search';

export default async function SearchPage() {
  return (
    <div className='flex flex-col gap-4 px-4'>
      <Suspense fallback={<SearchInputSkeleton />}>
        <SearchInput />
      </Suspense>
    </div>
  );
}

function SearchInputSkeleton() {
  return (
    <div className='flex flex-col gap-4'>
      <form className='relative cursor-not-allowed'>
        <button type='submit' className='cursor-not-allowed'>
          <SearchIcon className='absolute top-1/2 right-3 size-4.5 -translate-y-1/2 text-gray-700 active:text-gray-300' />
        </button>
        <input
          className='w-full rounded-2xl border p-2.5 pr-10 pl-3 text-base focus:outline-none'
          type='text'
          placeholder='검색어를 입력해주세요.'
          disabled
        />
      </form>
    </div>
  );
}

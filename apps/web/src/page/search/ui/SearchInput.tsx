'use client';

import { CircleX, SearchIcon } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function SearchInput() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState('');

  const q = searchParams.get('q');

  useEffect(() => {
    if (q) {
      setSearch(q);
    }
  }, [q]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!search || q === search) return;
    const params = new URLSearchParams(searchParams);
    params.set('q', search);
    router.replace(`/search/result?${params.toString()}`);
  };

  return (
    <form
      className='md:px-gutter bg-white px-4 pt-2.5 pb-1.5'
      onSubmit={handleSubmit}
    >
      <div className='flex items-center gap-2.5 rounded-lg border border-gray-900 bg-white px-4 py-3.5 shadow-[0px_2px_4px_rgba(0,0,0,0.1)]'>
        <SearchIcon size={18} className='shrink-0 text-gray-900' />
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          className='w-full text-sm font-medium text-gray-900 placeholder:text-gray-400 focus:outline-none'
          type='search'
          enterKeyHint='search'
          placeholder='검색어를 입력해주세요.'
        />
        {search && (
          <button
            type='button'
            onClick={() => setSearch('')}
            aria-label='검색어 지우기'
            className='shrink-0'
          >
            <CircleX size={22} className='fill-gray-500 text-white' />
          </button>
        )}
      </div>
    </form>
  );
}

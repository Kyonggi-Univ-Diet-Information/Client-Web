'use client';

import { Search, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import {
  addRecentSearch,
  getRecentSearches,
  removeRecentSearch,
} from './recentSearches';

export default function HeaderSearchOverlay({ onClose }: { onClose: () => void }) {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  useEffect(() => {
    setRecentSearches(getRecentSearches());
  }, []);

  const search = (term: string) => {
    const trimmed = term.trim();
    if (!trimmed) return;

    setRecentSearches(addRecentSearch(trimmed));
    onClose();
    router.push(`/search/result?q=${encodeURIComponent(trimmed)}`);
  };

  const handleRemove = (term: string) => {
    setRecentSearches(removeRecentSearch(term));
  };

  return (
    <div className='fixed inset-0 z-50'>
      <button
        type='button'
        onClick={onClose}
        className='absolute inset-0 bg-black/20'
        aria-label='닫기'
      />
      <div className='absolute top-16 left-1/2 w-full max-w-[770px] -translate-x-1/2 rounded-b-2xl bg-white pb-4 shadow-lg'>
        <form
          onSubmit={e => {
            e.preventDefault();
            search(query);
          }}
          className='px-5 pt-4'
        >
          <div className='flex items-center gap-2.5 rounded-lg border-2 border-gray-100 px-4 py-3.5'>
            <Search size={18} className='shrink-0 text-gray-400' />
            <input
              autoFocus
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder='검색어를 입력하세요'
              className='w-full text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none'
            />
          </div>
        </form>

        {recentSearches.length > 0 && (
          <div className='flex flex-col'>
            <p className='px-6 py-2.5 text-[13px] font-semibold text-gray-500'>
              최근 검색어
            </p>
            <div className='flex flex-wrap gap-2 px-5'>
              {recentSearches.map(term => (
                <div
                  key={term}
                  className='flex items-center gap-0.5 rounded-lg bg-gray-100 py-2 pr-2 pl-3'
                >
                  <button
                    type='button'
                    onClick={() => search(term)}
                    className='text-[13px] font-medium text-gray-900'
                  >
                    {term}
                  </button>
                  <button
                    type='button'
                    onClick={() => handleRemove(term)}
                    aria-label={`${term} 삭제`}
                    className='text-gray-400'
                  >
                    <X size={18} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

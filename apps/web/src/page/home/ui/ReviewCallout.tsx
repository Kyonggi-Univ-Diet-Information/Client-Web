'use client';

import { ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState, type ReactNode } from 'react';

import { getRecentMenus, type RecentMenu } from '@/entities/campus/model/recentMenus';

import RecentMenuSheet from './RecentMenuSheet';

export default function ReviewCallout({
  campusHref,
  children,
}: {
  campusHref: string;
  children: ReactNode;
}) {
  const router = useRouter();
  const [menus, setMenus] = useState<RecentMenu[] | null>(null);

  const handleClick = () => {
    const recentMenus = getRecentMenus();
    if (recentMenus.length === 0) {
      router.push(campusHref);
      return;
    }
    setMenus(recentMenus);
  };

  return (
    <>
      <button
        type='button'
        onClick={handleClick}
        className='flex w-full items-center justify-between rounded-2xl border border-grey-100 bg-white px-4 py-4 text-left transition-colors active:bg-grey-50'
      >
        {children}
        <ChevronRight size={18} className='shrink-0 text-grey-400' />
      </button>
      {menus && (
        <RecentMenuSheet
          menus={menus}
          campusHref={campusHref}
          onClose={() => setMenus(null)}
        />
      )}
    </>
  );
}

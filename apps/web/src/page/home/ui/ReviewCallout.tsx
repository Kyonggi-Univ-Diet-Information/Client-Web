'use client';

import { ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useRef, useState, type ReactNode } from 'react';

import { REVIEW_FLOW_VERSION } from '@/features/review/model/reviewFunnel';

import { getRecentMenus, type RecentMenu } from '@/entities/campus/model/recentMenus';

import { trackEvent } from '@/shared/lib/ga4';
import { useImpression } from '@/shared/lib/useImpression';

const CTA_PARAMS = {
  referrer: 'home_recent',
  flow_version: REVIEW_FLOW_VERSION,
} as const;

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
  const ctaRef = useRef<HTMLButtonElement>(null);

  useImpression(ctaRef, () => trackEvent('review_cta_view', CTA_PARAMS));

  const handleClick = () => {
    trackEvent('review_cta_click', CTA_PARAMS);
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
        ref={ctaRef}
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

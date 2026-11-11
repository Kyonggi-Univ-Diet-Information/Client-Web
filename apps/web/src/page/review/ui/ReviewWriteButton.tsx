'use client';

import { Button } from '@kiryong/design-system';
import { PencilIcon } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useRef } from 'react';

import {
  REVIEW_FLOW_VERSION,
  withReviewReferrer,
} from '@/features/review/model/reviewFunnel';

import { trackEvent } from '@/shared/lib/ga4';
import { isNativeApp } from '@/shared/lib/nativeBridge';
import { useImpression } from '@/shared/lib/useImpression';
import type { GA4ReviewReferrer } from '@/shared/types/ga4';

interface ReviewWriteButtonProps {
  foodCourtId: string;
  foodId: number;
  isAuthenticated: boolean;
  referrer?: GA4ReviewReferrer;
}

export default function ReviewWriteButton({
  foodCourtId,
  foodId,
  isAuthenticated,
  referrer = 'menu_detail',
}: ReviewWriteButtonProps) {
  const router = useRouter();
  const ctaRef = useRef<HTMLDivElement>(null);
  const isOwnCta = referrer !== 'home_recent';
  const ctaParams = {
    referrer: referrer,
    flow_version: REVIEW_FLOW_VERSION,
    menu_id: String(foodId),
    food_court_id: foodCourtId,
    is_authenticated: isAuthenticated,
  };

  useImpression(ctaRef, () => trackEvent('review_cta_view', ctaParams), {
    enabled: isOwnCta,
  });

  return (
    <div className='pointer-events-none fixed bottom-[calc(3rem+var(--safe-area-bottom))] left-1/2 z-40 flex w-full max-w-md -translate-x-1/2 justify-center px-6'>
      <Link
        href={withReviewReferrer(
          `/review/${foodCourtId}/${foodId}/write`,
          referrer,
        )}
        className='pointer-events-auto'
        onClick={e => {
          if (isOwnCta) trackEvent('review_cta_click', ctaParams);
          // 앱은 /auth/login 이동을 가로채 네이티브 로그인을 띄우고, 취소 시 history.back()으로 복귀해요
          if (!isAuthenticated && isNativeApp()) {
            e.preventDefault();
            router.push('/auth/login');
          }
        }}
      >
        <div ref={ctaRef}>
          <Button className='bg-grey-900 hover:bg-grey-900 flex h-11 items-center gap-2 rounded-full px-4! text-white shadow-lg transition-all active:scale-95'>
            <PencilIcon size={16} />
            <span className='text-[13px] font-semibold'>리뷰 작성</span>
          </Button>
        </div>
      </Link>
    </div>
  );
}

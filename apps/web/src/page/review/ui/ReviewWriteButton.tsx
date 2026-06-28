'use client';

import { PencilIcon } from 'lucide-react';
import Link from 'next/link';

import { trackEvent } from '@/shared/lib/ga4';
import { Button } from '@/shared/ui';


interface ReviewWriteButtonProps {
  foodCourtId: string;
  foodId: number;
  isAuthenticated: boolean;
}

export default function ReviewWriteButton({
  foodCourtId,
  foodId,
  isAuthenticated,
}: ReviewWriteButtonProps) {
  return (
    <Link
      href={`/review/${foodCourtId}/${foodId}?reviewMode=true`}
      className='flex justify-center'
      onClick={() =>
        trackEvent('review_write_click', {
          menu_id: String(foodId),
          food_court_id: foodCourtId,
          is_authenticated: isAuthenticated,
        })
      }
    >
      <Button
        variant='primary'
        className='flex h-12 items-center gap-2 rounded-full px-6! shadow-lg shadow-orange-200 transition-all active:scale-95'
      >
        <PencilIcon size={18} />
        <span className='text-base font-semibold'>리뷰 작성하기</span>
      </Button>
    </Link>
  );
}

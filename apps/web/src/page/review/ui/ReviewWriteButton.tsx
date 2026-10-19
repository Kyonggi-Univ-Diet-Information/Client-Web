'use client';

import { Button } from '@kiryong/design-system';
import { PencilIcon } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { trackEvent } from '@/shared/lib/ga4';
import { isNativeApp } from '@/shared/lib/nativeBridge';

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
  const router = useRouter();

  return (
    <Link
      href={`/review/${foodCourtId}/${foodId}?reviewMode=true`}
      className='flex justify-center'
      onClick={e => {
        trackEvent('review_write_click', {
          menu_id: String(foodId),
          food_court_id: foodCourtId,
          is_authenticated: isAuthenticated,
        });
        // 앱은 /auth/login 이동을 가로채 네이티브 로그인을 띄우고, 취소 시 history.back()으로 복귀해요
        if (!isAuthenticated && isNativeApp()) {
          e.preventDefault();
          router.push('/auth/login');
        }
      }}
    >
      <Button className='flex h-11 items-center gap-2 rounded-full bg-gray-900 px-4! text-white shadow-lg transition-all hover:bg-gray-900 active:scale-95'>
        <PencilIcon size={16} />
        <span className='text-[13px] font-semibold'>리뷰 작성</span>
      </Button>
    </Link>
  );
}

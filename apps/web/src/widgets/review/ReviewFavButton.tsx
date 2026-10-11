'use client';

import { HeartIcon } from 'lucide-react';
import { motion } from 'motion/react';
import { useOptimistic, useTransition } from 'react';
import { useSWRConfig } from 'swr';


import { removeReviewFav } from '@/features/review/api/removeReviewFav';
import { submitReviewFav } from '@/features/review/api/submitReviewFav';

import { type FoodCourt } from '@/shared/api';
import { cn } from '@/shared/lib';
import { trackEvent } from '@/shared/lib/ga4';
import { createMutateMatcher, reviewKeys } from '@/shared/lib/queryKey';
import { Button } from '@/shared/ui';


interface ReviewLikeButtonProps {
  type: FoodCourt;
  reviewId: number;
  reviewRating: number;
  initialIsLiked: boolean;
  likedCount: number;
  isDisabled: boolean;
}

export default function ReviewLikeButton({
  type,
  reviewId,
  reviewRating,
  initialIsLiked,
  likedCount,
  isDisabled,
}: ReviewLikeButtonProps) {
  const { mutate } = useSWRConfig();
  const [isPending, startTransition] = useTransition();
  const [optimisticState, addOptimistic] = useOptimistic(
    { isLiked: initialIsLiked, likedCount },
    (_, newState: { isLiked: boolean; likedCount: number }) => newState,
  );

  const handleLikeToggle = async () => {
    if (isDisabled || isPending) return;

    const { isLiked, likedCount: currentCount } = optimisticState;
    const nextLiked = !isLiked;
    const nextCount = nextLiked
      ? currentCount + 1
      : Math.max(0, currentCount - 1);

    startTransition(async () => {
      addOptimistic({ isLiked: nextLiked, likedCount: nextCount });

      try {
        if (isLiked) {
          await removeReviewFav(reviewId, type);
          trackEvent('review_unlike', {
            review_id: String(reviewId),
            review_rating: reviewRating,
          });
        } else {
          await submitReviewFav(reviewId, type);
          trackEvent('review_like', {
            review_id: String(reviewId),
            review_rating: reviewRating,
          });
        }
        mutate(createMutateMatcher(reviewKeys.all()));
      } catch (error) {
        trackEvent('review_like_error', {
          error_message: '좋아요 등록에 실패했어요',
        });
        alert(
          '좋아요 등록에 실패했어요! 계속 문제가 발생할 경우 관리자에게 문의해 주세요!',
        );
        console.error(error);
      }
    });
  };

  return (
    <Button
      disabled={isDisabled}
      variant='ghost'
      size='sm'
      onClick={handleLikeToggle}
      className={cn(
        'gap-1.5 rounded-md border px-2.5 transition-all active:scale-95',
        optimisticState.isLiked
          ? 'border-point bg-point/5 text-point'
          : 'border-gray-200 bg-white text-gray-500 hover:bg-gray-50',
      )}
    >
      <motion.div
        animate={
          optimisticState.isLiked ? { scale: [1, 1.4, 1] } : { scale: 1 }
        }
        transition={{ duration: 0.4, ease: [0.175, 0.885, 0.32, 1.275] }}
      >
        <HeartIcon
          size={14}
          className={cn(
            'transition-colors',
            optimisticState.isLiked
              ? 'fill-current'
              : 'fill-none stroke-[2.5px]',
          )}
        />
      </motion.div>
      <span className='text-[13px] font-medium'>도움돼요</span>
      <span className='text-[13px] font-medium tabular-nums'>
        {optimisticState.likedCount}
      </span>
    </Button>
  );
}

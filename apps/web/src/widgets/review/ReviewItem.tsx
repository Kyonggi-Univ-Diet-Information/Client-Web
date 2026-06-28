'use client';


import type { Review } from '@/entities/review/api/api.type';

import { type FoodCourt } from '@/shared/api';
import { getRelativeDate, parseReviewDate } from '@/shared/lib/date';
import { Avatar, AvatarFallback } from '@/shared/ui';

import ReviewActionMenu from './ReviewActionMenu';
import ReviewFavButton from './ReviewFavButton';





interface ReviewItemProps extends Review {
  type: FoodCourt;
  foodId: number;
  isLiked: boolean;
  likedCount: number;
  isAuthenticated: boolean;
  isMyReview: boolean;
}

export default function ReviewItem({
  type,
  foodId,
  rating,
  content,
  memberName,
  createdAt,
  id,
  isLiked,
  likedCount,
  isAuthenticated,
  myReview,
}: ReviewItemProps) {
  const maskedMemberName = memberName
    ? memberName.length > 1
      ? memberName.charAt(0) + '**'
      : '기**'
    : '기**';

  const relativeDate = getRelativeDate(parseReviewDate(createdAt));

  return (
    <div className='flex w-full flex-col gap-2 border-b border-gray-100 py-3 last:border-0'>
      <div className='flex items-start justify-between'>
        <div className='flex items-center gap-3'>
          <Avatar className='size-9 border border-gray-100 bg-white'>
            <AvatarFallback className='text-xs font-bold text-gray-400'>
              {memberName ? memberName.charAt(0) : '기'}
            </AvatarFallback>
          </Avatar>
          <div className='flex flex-col gap-0.5'>
            <p className='text-sm font-bold text-gray-900'>
              {maskedMemberName}
            </p>
            <p className='text-[11px] font-medium text-gray-400'>
              {relativeDate}
            </p>
          </div>
        </div>

        {isAuthenticated && (
          <ReviewActionMenu
            type={type}
            foodId={foodId}
            reviewId={id}
            isMyReview={myReview}
          />
        )}
      </div>

      <div className='flex flex-col gap-2'>
        <div className='font-tossFace flex items-center gap-0.5 text-xs'>
          {'⭐️'.repeat(rating)}
        </div>
        <p className='text-sm leading-relaxed break-words whitespace-pre-wrap text-gray-700'>
          {content}
        </p>
      </div>

      <div className='mt-1 flex items-center gap-4'>
        <ReviewFavButton
          type={type}
          reviewId={id}
          reviewRating={rating}
          initialIsLiked={isLiked}
          likedCount={likedCount}
          isDisabled={!isAuthenticated}
        />
      </div>
    </div>
  );
}

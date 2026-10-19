'use client';

import { Avatar, AvatarFallback } from '@kiryong/design-system';
import { Star } from 'lucide-react';
import Image from 'next/image';

import type { Review } from '@/entities/review/api/api.type';

import { type FoodCourt } from '@/shared/api';
import { formatShortDate, parseReviewDate } from '@/shared/lib/date';

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

  const formattedDate = formatShortDate(parseReviewDate(createdAt));

  return (
    <div className='md:px-gutter flex w-full flex-col gap-3 border-t border-gray-100 px-4 py-5'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-2'>
          <Avatar className='size-9 bg-[#f5f5f5]'>
            <AvatarFallback className='bg-transparent'>
              <Image
                src='/images/avatar-default.png'
                alt=''
                width={24}
                height={21}
                className='h-[21px] w-[24px] object-contain'
              />
            </AvatarFallback>
          </Avatar>
          <p className='text-sm font-medium text-gray-900'>
            {maskedMemberName}
          </p>
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
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-0.5'>
            {Array.from({ length: 5 }).map((_, index) => (
              <Star
                key={index}
                size={16}
                className={
                  index < rating
                    ? 'fill-point text-point'
                    : 'fill-[#ebebeb] text-[#ebebeb]'
                }
              />
            ))}
          </div>
          <span className='text-xs text-gray-400'>{formattedDate}</span>
        </div>
        <p className='text-sm leading-relaxed break-words whitespace-pre-wrap text-gray-700'>
          {content}
        </p>
      </div>

      <div className='flex justify-end'>
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

'use client';

import { Avatar, AvatarFallback } from '@kiryong/design-system';
import { Star } from 'lucide-react';
import Image from 'next/image';

import type { Review } from '@/entities/review/api/api.type';
import { getReviewKeywordLabels } from '@/entities/review/model/reviewKeywords';

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
  images,
  saltLevel,
  spicyLevel,
  portionLevel,
  valueLevel,
}: ReviewItemProps) {
  const keywordLabels = getReviewKeywordLabels({
    saltLevel,
    spicyLevel,
    portionLevel,
    valueLevel,
  });
  const maskedMemberName = memberName
    ? memberName.length > 1
      ? memberName.charAt(0) + '**'
      : '기**'
    : '기**';

  const formattedDate = formatShortDate(parseReviewDate(createdAt));

  return (
    <div className='md:px-gutter border-grey-100 flex w-full flex-col gap-3 border-t px-4 py-5'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-2'>
          <Avatar className='bg-grey-100 size-9'>
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
          <p className='text-grey-900 text-sm font-medium'>
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
          <div className='flex items-center gap-[1px]'>
            {Array.from({ length: 5 }).map((_, index) => (
              <Star
                key={index}
                size={16}
                className={
                  index < rating
                    ? 'fill-primary-500 text-primary-500'
                    : 'fill-grey-200 text-grey-200'
                }
              />
            ))}
          </div>
          <span className='text-grey-400 text-xs'>{formattedDate}</span>
        </div>
        {images && images.length > 0 && (
          <ul className='md:-mr-gutter mt-1 -mr-4 flex gap-0.5 overflow-x-auto rounded-lg [scrollbar-width:none]'>
            {images.map(({ id, url }, i) => (
              <li key={id} className='border-grey-100 size-[154px] shrink-0'>
                {/* S3 presigned URL이 10분 뒤 만료돼서 next/image 캐시를 쓰면 깨져요 */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={url}
                  alt={`리뷰 사진 ${i + 1}`}
                  className='size-full rounded-lg object-cover'
                />
              </li>
            ))}
          </ul>
        )}
        {keywordLabels.length > 0 && (
          <ul className='flex flex-wrap gap-1.5'>
            {keywordLabels.map(label => (
              <li
                key={label}
                className='bg-grey-100 text-grey-700 rounded-full px-2.5 py-1 text-xs'
              >
                {label}
              </li>
            ))}
          </ul>
        )}
        <p className='text-grey-700 text-sm leading-relaxed break-words whitespace-pre-wrap'>
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

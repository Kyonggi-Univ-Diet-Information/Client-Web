'use client';

import { Avatar, AvatarFallback } from '@kiryong/design-system';
import { Star } from 'lucide-react';
import Image from 'next/image';

import type { Review } from '@/entities/review/api/api.type';

import { type FoodCourt } from '@/shared/api';
import { formatShortDate, parseReviewDate } from '@/shared/lib/date';

import ReviewActionMenu from './ReviewActionMenu';
import ReviewFavButton from './ReviewFavButton';
import ReviewKeywordChips from './ReviewKeywordChips';

interface ReviewItemProps extends Review {
  type: FoodCourt;
  foodId: number;
  isLiked: boolean;
  likedCount: number;
  isAuthenticated: boolean;
  isMyReview: boolean;
  // BEST 리뷰 선정 기준이 서버에 없어서 값이 올 때만 배지를 보여줘요
  isBest?: boolean;
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
  isBest = false,
}: ReviewItemProps) {
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
          <p className='text-grey-900 text-sm font-semibold'>
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
          <div className='flex items-center gap-2'>
            <div className='flex items-center'>
              {Array.from({ length: 5 }).map((_, index) => (
                <Star
                  key={index}
                  size={18}
                  className={
                    index < rating
                      ? 'fill-primary-500 text-primary-500'
                      : 'fill-grey-200 text-grey-200'
                  }
                />
              ))}
            </div>
            {isBest && (
              <span className='border-primary-500 text-primary-500 rounded-[2px] border-[0.4px] bg-white px-1 py-0.5 text-xs font-medium tracking-[-0.72px]'>
                BEST 리뷰
              </span>
            )}
          </div>
          <span className='text-grey-400 text-xs font-medium'>
            {formattedDate}
          </span>
        </div>
        {images && images.length > 0 && (
          <ul className='md:-mr-gutter mt-1 -mr-4 flex gap-0.5 overflow-x-auto rounded-l-lg [scrollbar-width:none]'>
            {images.map(({ id, url }, i) => (
              <li key={id} className='border-grey-100 size-[154px] shrink-0'>
                {/* S3 presigned URL이 10분 뒤 만료돼서 next/image 캐시를 쓰면 깨져요 */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={url}
                  alt={`리뷰 사진 ${i + 1}`}
                  className='size-full object-cover'
                />
              </li>
            ))}
          </ul>
        )}
        <ReviewKeywordChips
          keywords={{ saltLevel, spicyLevel, portionLevel, valueLevel }}
          className='pt-1.5 pb-1'
        />
        <p className='text-sm leading-[21px] font-medium break-words whitespace-pre-wrap text-[#191919]'>
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

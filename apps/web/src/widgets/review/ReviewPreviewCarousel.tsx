import { Star } from 'lucide-react';

import type { ReviewWithMetadata } from '@/features/review/api/getReviewsAction';

import { getRelativeDate, parseReviewDate } from '@/shared/lib/date';

export default function ReviewPreviewCarousel({
  reviews,
}: {
  reviews: ReviewWithMetadata[];
}) {
  return (
    <div className='scrollbar-hide md:px-gutter flex gap-2.5 overflow-x-scroll px-4 pt-2.5 pb-9'>
      {reviews.map(review => {
        const maskedMemberName = review.memberName
          ? review.memberName.length > 1
            ? review.memberName.charAt(0) + '**'
            : '기**'
          : '기**';

        return (
          <div
            key={review.id}
            className='flex w-[293px] shrink-0 flex-col gap-5 rounded-lg border border-grey-100 px-5 pt-5 pb-11'
          >
            <div className='flex flex-col gap-2.5'>
              <div className='flex items-center gap-6'>
                <div className='flex w-[174px] flex-col gap-0.5'>
                  <p className='text-[13px] font-semibold text-grey-900'>
                    {maskedMemberName}
                  </p>
                  <p className='text-xs text-grey-400'>
                    {getRelativeDate(parseReviewDate(review.createdAt))}
                  </p>
                </div>
                <div className='flex items-center gap-0.5'>
                  <Star size={20} className='fill-primary-500 text-primary-500' />
                  <span className='text-lg font-medium text-grey-900'>
                    {review.rating.toFixed(1)}
                  </span>
                </div>
              </div>
              <p className='line-clamp-2 text-sm text-grey-600'>
                {review.content}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

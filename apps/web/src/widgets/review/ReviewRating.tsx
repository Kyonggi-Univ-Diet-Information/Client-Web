import { Star } from 'lucide-react';

import { fetchReviewCount } from '@/features/review/api/fetchReviewCount';
import { fetchReviewRating } from '@/features/review/api/fetchReviewRating';
import { fetchReviewRatingAverage } from '@/features/review/api/fetchReviewRatingAverage';

import { type FoodCourt } from '@/shared/api';

interface ReviewRatingSectionProps {
  type: FoodCourt;
  foodId: number;
}

const STARS = ['5', '4', '3', '2', '1'] as const;

export default async function ReviewRating({
  type,
  foodId,
}: ReviewRatingSectionProps) {
  const [rating, reviewCount, averageRating] = await Promise.all([
    fetchReviewRating(type, foodId),
    fetchReviewCount(type, foodId),
    fetchReviewRatingAverage(type, foodId),
  ]);

  if (reviewCount === 0) {
    return null;
  }

  const roundedAverage = Math.round(averageRating ?? 0);

  return (
    <div className='flex items-end gap-8 bg-white pl-8 pb-4 pr-10'>
      <div className='flex w-[72px] h-full flex-col justify-center'>
        <div className='flex flex-col items-center justify-center gap-1.5'>
           <p className='text-[28px] leading-[38px] font-semibold text-gray-900'>
            {(averageRating ?? 0).toFixed(1)}
          </p>
          <div className='flex items-center'>
            {Array.from({ length: 5 }).map((_, index) => (
              <Star
                key={index}
                size={16}
                className={
                  index < roundedAverage
                    ? 'fill-point text-point'
                    : 'fill-[#ebebeb] text-[#ebebeb]'
                }
              />
            ))}
          </div>
        </div>
      </div>

      <div className='flex flex-1 flex-col gap-1'>
        {STARS.map(star => {
          const count = rating[star];
          const percentage = (count / reviewCount) * 100;

          return (
            <div key={star} className='flex items-center gap-2'>
              <span className='w-6 shrink-0 text-xs font-medium text-gray-900'>
                {star}점
              </span>
              <div className='h-1 flex-1 overflow-hidden rounded-full bg-[#ebebeb]'>
                <div
                  className='bg-point h-full rounded-full'
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <span className='w-4 shrink-0 text-xs font-medium text-gray-400'>
                {count}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

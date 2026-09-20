
import { fetchReviewCount } from '@/features/review/api/fetchReviewCount';
import { fetchReviewRating } from '@/features/review/api/fetchReviewRating';
import { fetchReviewRatingAverage } from '@/features/review/api/fetchReviewRatingAverage';

import { type FoodCourt } from '@/shared/api';
import { cn } from '@/shared/lib';


interface ReviewRatingSectionProps {
  type: FoodCourt;
  foodId: number;
}

export default async function ReviewRating({
  type,
  foodId,
}: ReviewRatingSectionProps) {
  const [rating, reviewCount, averageRating] = await Promise.all([
    fetchReviewRating(type, foodId),
    fetchReviewCount(type, foodId),
    fetchReviewRatingAverage(type, foodId),
  ]);

  const ratingPercentage = {
    '5': (rating['5'] / reviewCount) * 100,
    '4': (rating['4'] / reviewCount) * 100,
    '3': (rating['3'] / reviewCount) * 100,
    '2': (rating['2'] / reviewCount) * 100,
    '1': (rating['1'] / reviewCount) * 100,
  };

  if (reviewCount === 0) {
    return null;
  }

  return (
    <div className='flex flex-col gap-6'>
      <div className='flex items-center justify-between gap-8'>
        <div className='flex flex-col gap-1.5'>
          <div className='flex items-baseline gap-1'>
            <span className='text-3xl leading-none font-black tracking-tighter text-gray-900'>
              {(averageRating ?? 0).toFixed(1)}
            </span>
            <span className='text-xs font-bold text-gray-400'>/ 5.0</span>
          </div>
          <span className='w-full text-center text-xs font-semibold text-gray-400 uppercase'>
            전체 리뷰 {reviewCount}개
          </span>
        </div>

        <div className='grid flex-1 grid-cols-5 gap-2'>
          {Object.entries(ratingPercentage)
            .reverse()
            .map(([rating, percentage]) => (
              <div key={rating} className='flex flex-col items-center gap-2'>
                <div className='relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-xl border border-gray-100 transition-all duration-700'>
                  <div
                    className='bg-point absolute inset-0 transition-all duration-1000 ease-out'
                    style={{
                      opacity: Math.max(0.05, percentage / 100),
                    }}
                  />
                  <span
                    className={cn(
                      'relative text-sm font-black transition-colors duration-500',
                      percentage > 60 ? 'text-white' : 'text-gray-900',
                    )}
                  >
                    {rating}
                  </span>
                </div>
                <span className='text-xs font-semibold text-gray-300'>
                  {Math.round(percentage)}%
                </span>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

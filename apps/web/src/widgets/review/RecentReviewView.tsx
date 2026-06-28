
import { fetchCampusMenuName } from '@/features/campus/api/fetchCampusMenuName';
import { fetchRecentReview } from '@/features/review/api/fetchRecentReview';

import type { RecentReview } from '@/entities/review/api/api.type';

import { FOOD_COURT_ID, FOOD_COURT_NAME, type FoodCourt } from '@/shared/api';
import { getRelativeDate, parseReviewDate } from '@/shared/lib/date';
import { Card, Section } from '@/shared/ui';

import ReviewAnimatedCard from './ReviewAnimatedCard';

export default async function RecentReviewView() {
  const recentReviews = await fetchRecentReview();

  return (
    <Section>
      <Section.Header
        title={
          <>
            <span className='font-tossFace'>✨</span> 최근 리뷰
          </>
        }
        subtitle='최근에 작성된 리뷰들이에요!'
      />
      <div className='flex flex-col gap-2'>
        {recentReviews.map((review, index) => (
          <ReviewCard
            key={review.reviewId}
            review={review}
            index={index}
            foodCourt={review.restaurantType}
            foodCourtId={FOOD_COURT_ID[review.restaurantType]}
          />
        ))}
      </div>
    </Section>
  );
}

async function ReviewCard({
  review,
  index,
  foodCourt,
  foodCourtId,
}: {
  review: RecentReview;
  index: number;
  foodCourt: FoodCourt;
  foodCourtId: string;
}) {
  const relativeDate = getRelativeDate(parseReviewDate(review.createdAt));
  const menuName = await fetchCampusMenuName(foodCourt, review.foodId);
  return (
    <ReviewAnimatedCard index={index}>
      <Card
        href={`/review/${foodCourtId}/${review.foodId}`}
        className='max-h-34 min-h-30'
      >
        <div className='flex items-center justify-between'>
          <span className='font-tossFace'>{'⭐️'.repeat(review.rating)}</span>
          <p className='flex items-center gap-1 text-sm'>{relativeDate}</p>
        </div>
        <p className='flex items-center gap-1.5 text-sm font-semibold'>
          <span className='rounded-full border px-1.5 py-0.5 text-xs font-medium'>
            {FOOD_COURT_NAME[foodCourt]}
          </span>
          <span>{menuName.name}</span>
        </p>

        <p className='line-clamp-2 text-sm'>{review.content}</p>
      </Card>
    </ReviewAnimatedCard>
  );
}

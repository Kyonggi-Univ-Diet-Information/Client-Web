import { Section } from '@kiryong/design-system';

import { fetchCampusMenuName } from '@/features/campus/api/fetchCampusMenuName';
import { fetchRecentReview } from '@/features/review/api/fetchRecentReview';

import type { RecentReview } from '@/entities/review/api/api.type';

import { FOOD_COURT_ID, FOOD_COURT_NAME } from '@/shared/api';
import { getRelativeDate, parseReviewDate } from '@/shared/lib/date';

import ReviewAnimatedCard from './ReviewAnimatedCard';
import ReviewPreviewCard from './ReviewPreviewCard';

export default async function RecentReviewView() {
  const recentReviews = await fetchRecentReview();

  return (
    <Section className='min-w-0'>
      <Section.Header
        title={
          <h2 className='text-grey-900 text-lg leading-[26px] font-semibold tracking-[-0.36px]'>
            <span className='font-tossFace'>✨</span> 최근 리뷰
          </h2>
        }
        subtitle='최근에 작성된 리뷰들이에요!'
      />
      <div className='scrollbar-hide md:-mx-gutter md:px-gutter -mx-4 flex snap-x snap-mandatory scroll-px-4 gap-2.5 overflow-x-scroll px-4 pb-1 md:scroll-px-gutter lg:mx-0 lg:scroll-px-0 lg:px-0'>
        {recentReviews.map((review, index) => (
          <ReviewCard key={review.reviewId} review={review} index={index} />
        ))}
      </div>
    </Section>
  );
}

async function ReviewCard({
  review,
  index,
}: {
  review: RecentReview;
  index: number;
}) {
  const foodCourt = review.restaurantType;
  const menuName = await fetchCampusMenuName(foodCourt, review.foodId);

  return (
    <ReviewAnimatedCard index={index} className='shrink-0 snap-start'>
      <ReviewPreviewCard
        {...review}
        href={`/review/${FOOD_COURT_ID[foodCourt]}/${review.foodId}`}
        menuName={menuName.name}
        menuPrefix={
          <span className='shrink-0 rounded-full bg-[#f2f2f7] px-2 py-0.5 text-xs font-medium text-[#555]'>
            {FOOD_COURT_NAME[foodCourt]}
          </span>
        }
        dateLabel={getRelativeDate(parseReviewDate(review.createdAt))}
        className='w-[293px] pb-5'
      />
    </ReviewAnimatedCard>
  );
}

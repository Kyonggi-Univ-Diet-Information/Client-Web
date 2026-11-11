import { AnimatedCard } from '@kiryong/design-system';
import { ChevronRight, Star } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

import CampusMenuImage from '@/widgets/campus/CampusMenuImage';
import CampusMenuSet from '@/widgets/campus/CampusMenuSet';
import ReviewPreviewCarousel from '@/widgets/review/ReviewPreviewCarousel';

import { fetchCampusMenuDetail } from '@/features/campus/api/fetchCampusMenuDetail';
import { fetchReviewCount } from '@/features/review/api/fetchReviewCount';
import { getReviewsAction } from '@/features/review/api/getReviewsAction';

import { FOOD_COURT, FOOD_COURT_NAME, getFoodCourtById } from '@/shared/api';
import { CAMPUS_RESTAURANT } from '@/shared/constants/campus/restaurant';
import { AuthService } from '@/shared/lib/auth';
import { Loader } from '@/shared/ui';

import RecordRecentMenu from './RecordRecentMenu';
import ReviewWriteButton from './ReviewWriteButton';

export interface ReviewPageProps {
  params: Promise<{ foodCourtId: string; foodId: string }>;
}

export default async function ReviewPage({ params }: ReviewPageProps) {
  const [{ foodCourtId, foodId: foodIdParam }, isAuthenticated] =
    await Promise.all([params, AuthService.isAuthenticated()]);

  const foodCourt = getFoodCourtById(foodCourtId);
  if (!foodCourt) {
    notFound();
  }

  const foodId = Number(foodIdParam);
  if (isNaN(foodId) || !Number.isInteger(foodId) || foodId <= 0) {
    notFound();
  }

  const [menuDetail, reviewCount, initialReviews] = await Promise.all([
    fetchCampusMenuDetail(foodCourt, foodId),
    fetchReviewCount(foodCourt, foodId),
    getReviewsAction(foodCourt, foodId, 0),
  ]);

  const reviewListHref = `/review/${foodCourtId}/${foodId}/detail`;

  return (
    <div className='flex flex-col pb-10'>
      <RecordRecentMenu
        foodCourt={foodCourt}
        foodId={foodId}
        name={menuDetail.name}
        subRestaurant={menuDetail.subRestaurant}
      />
      <AnimatedCard index={0}>
        <div className='flex flex-col'>
          <CampusMenuImage
            foodCourt={foodCourt}
            menuId={foodId}
            className='h-[380px] w-full rounded-none'
            sizes='100vw'
          />

          <div className='md:px-gutter flex flex-col gap-2 px-4 pt-5'>
            <div className='flex items-center justify-between'>
              <h1 className='text-grey-900 text-lg font-semibold'>
                {menuDetail.name}
              </h1>
              {menuDetail.averageRating != null && (
                <div className='flex items-center gap-[1px]'>
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star
                      key={index}
                      size={18}
                      className={
                        index < Math.round(menuDetail.averageRating!)
                          ? 'fill-grey-900 text-grey-900'
                          : 'fill-grey-300 text-grey-300'
                      }
                    />
                  ))}
                </div>
              )}
            </div>
            <div className='flex items-center justify-between'>
              <div className='text-grey-600 flex items-center gap-0.5 text-sm'>
                <span>{FOOD_COURT_NAME[foodCourt]}</span>
                <ChevronRight size={14} />
                <span>{CAMPUS_RESTAURANT[menuDetail.subRestaurant]}</span>
              </div>
              {menuDetail.averageRating != null && (
                <span className='text-grey-900 text-sm font-semibold'>
                  {menuDetail.averageRating.toFixed(1)}점
                </span>
              )}
            </div>
            <p className='text-grey-900 text-2xl font-semibold'>
              {menuDetail.price.toLocaleString()}원
            </p>
          </div>

          <div className='border-grey-100 mt-5 border-t-6' />

          <Link
            href={reviewListHref}
            className='md:px-gutter mt-2 flex items-center justify-between px-4 py-2'
          >
            <div className='flex items-center gap-2'>
              <Star size={24} className='fill-primary-500 text-primary-500' />
              {menuDetail.averageRating != null && (
                <span className='text-grey-900 text-xl font-semibold'>
                  {menuDetail.averageRating.toFixed(1)}
                </span>
              )}
              <span className='text-grey-900 text-xl'>
                후기 <b className='font-medium'>{reviewCount}</b>
              </span>
            </div>
            <ChevronRight size={22} className='text-grey-400' />
          </Link>

          {initialReviews.content.length > 0 && (
            <ReviewPreviewCarousel
              reviews={initialReviews.content.slice(0, 5)}
              menuName={menuDetail.name}
              href={reviewListHref}
            />
          )}
        </div>
      </AnimatedCard>

      <Suspense fallback={<Loader />}>
        {foodCourt === FOOD_COURT.KYONGSUL && (
          <CampusMenuSet type={foodCourt} baseFoodId={foodId} />
        )}
      </Suspense>

      <ReviewWriteButton
        foodCourtId={foodCourtId}
        foodId={foodId}
        isAuthenticated={isAuthenticated}
      />
    </div>
  );
}

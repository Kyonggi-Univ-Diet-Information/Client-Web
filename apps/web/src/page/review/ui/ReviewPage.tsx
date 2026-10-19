import { Modal, Button, AnimatedCard } from '@kiryong/design-system';
import { ChevronRight, Star } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

import CampusMenuImage from '@/widgets/campus/CampusMenuImage';
import CampusMenuSet from '@/widgets/campus/CampusMenuSet';
import ReviewFormSection from '@/widgets/review/ReviewFormSection';
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
  searchParams: Promise<{
    reviewMode?: string;
  }>;
}

export default async function ReviewPage({
  params,
  searchParams,
}: ReviewPageProps) {
  const [
    { foodCourtId, foodId: foodIdParam },
    { reviewMode },
    isAuthenticated,
  ] = await Promise.all([params, searchParams, AuthService.isAuthenticated()]);

  const foodCourt = getFoodCourtById(foodCourtId);
  if (!foodCourt) {
    notFound();
  }

  const foodId = Number(foodIdParam);
  if (isNaN(foodId) || !Number.isInteger(foodId) || foodId <= 0) {
    notFound();
  }

  const isReviewMode = reviewMode === 'true';

  const [menuDetail, reviewCount, initialReviews] = await Promise.all([
    fetchCampusMenuDetail(foodCourt, foodId),
    fetchReviewCount(foodCourt, foodId),
    getReviewsAction(foodCourt, foodId, 0),
  ]);

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
              <h1 className='text-lg font-semibold text-gray-900'>
                {menuDetail.name}
              </h1>
              {menuDetail.averageRating != null && (
                <div className='flex items-center -space-x-[3px]'>
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star
                      key={index}
                      size={18}
                      className={
                        index < Math.round(menuDetail.averageRating!)
                          ? 'fill-gray-900 text-gray-900'
                          : 'fill-[#bbbbbb] text-[#bbbbbb]'
                      }
                    />
                  ))}
                </div>
              )}
            </div>
            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-0.5 text-sm text-gray-600'>
                <span>{FOOD_COURT_NAME[foodCourt]}</span>
                <ChevronRight size={14} />
                <span>{CAMPUS_RESTAURANT[menuDetail.subRestaurant]}</span>
              </div>
              {menuDetail.averageRating != null && (
                <span className='text-sm font-semibold text-gray-900'>
                  {menuDetail.averageRating.toFixed(1)}점
                </span>
              )}
            </div>
            <p className='text-2xl font-semibold text-gray-900'>
              {menuDetail.price.toLocaleString()}원
            </p>
          </div>

          <div className='mt-5 border-t-6 border-gray-100' />

          <Link
            href={`/review/${foodCourtId}/${foodId}/detail`}
            className='md:px-gutter mt-2 flex items-center justify-between px-4 py-2'
          >
            <div className='flex items-center gap-2'>
              <Star size={24} className='fill-point text-point' />
              {menuDetail.averageRating != null && (
                <span className='text-xl font-semibold text-gray-900'>
                  {menuDetail.averageRating.toFixed(1)}
                </span>
              )}
              <span className='text-xl text-gray-900'>
                후기 <b className='font-medium'>{reviewCount}</b>
              </span>
            </div>
            <ChevronRight size={22} className='text-gray-400' />
          </Link>

          {initialReviews.content.length > 0 && (
            <ReviewPreviewCarousel
              reviews={initialReviews.content.slice(0, 5)}
            />
          )}
        </div>
      </AnimatedCard>

      <Suspense fallback={<Loader />}>
        {isAuthenticated && isReviewMode && (
          <Modal href={`/review/${foodCourtId}/${foodId}`}>
            <ReviewFormSection foodCourt={foodCourt} foodId={foodId} />
          </Modal>
        )}
        {!isAuthenticated && isReviewMode && (
          <LoginModal foodCourtId={foodCourtId} foodId={foodId} />
        )}

        {foodCourt === FOOD_COURT.KYONGSUL && (
          <div className='md:px-gutter border-t-6 border-gray-100 px-4 pt-4'>
            <CampusMenuSet type={foodCourt} baseFoodId={foodId} />
          </div>
        )}
      </Suspense>

      {!isReviewMode && (
        <div className='fixed bottom-12 left-1/2 z-40 w-full max-w-md -translate-x-1/2 px-6'>
          <ReviewWriteButton
            foodCourtId={foodCourtId}
            foodId={foodId}
            isAuthenticated={isAuthenticated}
          />
        </div>
      )}
    </div>
  );
}

function LoginModal({
  foodCourtId,
  foodId,
}: {
  foodCourtId: string;
  foodId: number;
}) {
  const currentPath = `/review/${foodCourtId}/${foodId}`;

  return (
    <Modal href={`/review/${foodCourtId}/${foodId}`}>
      <Modal.Header title='로그인이 필요해요!' />
      <p>로그인 후 리뷰를 작성할 수 있어요.</p>
      <Link
        href={{
          pathname: '/auth/login',
          query: { returnUrl: currentPath },
        }}
        className='self-end'
      >
        <Button variant='secondary' size='lg' className='w-fit'>
          로그인 하러가기
        </Button>
      </Link>
    </Modal>
  );
}

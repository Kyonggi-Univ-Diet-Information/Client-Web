import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';



import {
  CampusMenuName,
  CampusMenuPrice,
  CampusMenuSet,
} from '@/widgets/campus';
import CampusMenuImage from '@/widgets/campus/CampusMenuImage';
import ReviewFormSection from '@/widgets/review/ReviewFormSection';
import ReviewPagedView from '@/widgets/review/ReviewPagedView';
import ReviewRating from '@/widgets/review/ReviewRating';

import { FOOD_COURT, getFoodCourtById } from '@/shared/api';
import { AuthService } from '@/shared/lib/auth';
import { Loader, Modal, Button, AnimatedCard } from '@/shared/ui';

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

  return (
    <div className='flex flex-col gap-8 pb-10'>
      <AnimatedCard index={0}>
        <div className='flex flex-col gap-4'>
          <div className='space-y-1.5'>
            <p className='text-[10px] font-bold tracking-widest text-gray-400 uppercase'>
              Menu Review
            </p>
            <CampusMenuName
              foodCourt={foodCourt}
              menuId={foodId}
              className='block text-xl leading-tight font-bold text-gray-900'
            />
          </div>

          <div className='flex items-start gap-6'>
            <div className='relative size-20 shrink-0 overflow-hidden rounded-2xl bg-gray-50/50'>
              <CampusMenuImage
                foodCourt={foodCourt}
                menuId={foodId}
                className='h-full w-full object-cover'
              />
            </div>

            <div className='flex min-w-0 flex-1 flex-col justify-center'>
              <div className='space-y-1'>
                <p className='text-[10px] font-bold tracking-widest text-gray-400 uppercase'>
                  Price
                </p>
                <div className='text-point text-xl leading-none font-black whitespace-nowrap'>
                  <CampusMenuPrice foodCourt={foodCourt} menuId={foodId} />
                </div>
              </div>
            </div>
          </div>

          {foodCourt === FOOD_COURT.KYONGSUL && (
            <CampusMenuSet type={foodCourt} baseFoodId={foodId} />
          )}

          <Suspense
            fallback={
              <div className='h-12 w-full animate-pulse rounded-xl bg-gray-50' />
            }
          >
            <ReviewRating type={foodCourt} foodId={foodId} />
          </Suspense>
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

        <AnimatedCard index={2}>
          <div className='flex flex-col gap-8'>
            <div className='flex flex-col gap-4'>
              <div className='flex items-center justify-between px-1'>
                <h3 className='font-brBold text-lg text-gray-900'>리뷰 목록</h3>
              </div>
              <ReviewPagedView type={foodCourt} foodId={foodId} />
            </div>
          </div>
        </AnimatedCard>
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

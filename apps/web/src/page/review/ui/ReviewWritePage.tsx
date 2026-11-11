import { notFound, redirect } from 'next/navigation';

import CampusMenuImage from '@/widgets/campus/CampusMenuImage';
import ReviewWriteForm from '@/widgets/review/ReviewWriteForm';
import ReviewWriteHeader from '@/widgets/review/ReviewWriteHeader';

import { fetchCampusMenuDetail } from '@/features/campus/api/fetchCampusMenuDetail';
import {
  parseReviewReferrer,
  withReviewReferrer,
} from '@/features/review/model/reviewFunnel';

import { getFoodCourtById } from '@/shared/api';
import { AuthService } from '@/shared/lib/auth';

export interface ReviewWritePageProps {
  params: Promise<{ foodCourtId: string; foodId: string }>;
  searchParams: Promise<{ referrer?: string }>;
}

export default async function ReviewWritePage({
  params,
  searchParams,
}: ReviewWritePageProps) {
  const [{ foodCourtId, foodId: foodIdParam }, { referrer }, isAuthenticated] =
    await Promise.all([params, searchParams, AuthService.isAuthenticated()]);

  const foodCourt = getFoodCourtById(foodCourtId);
  const foodId = Number(foodIdParam);
  if (!foodCourt || !Number.isInteger(foodId) || foodId <= 0) {
    notFound();
  }

  if (!isAuthenticated) {
    const returnUrl = withReviewReferrer(
      `/review/${foodCourtId}/${foodId}/write`,
      parseReviewReferrer(referrer),
    );
    redirect(`/auth/login?returnUrl=${encodeURIComponent(returnUrl)}`);
  }

  const menuDetail = await fetchCampusMenuDetail(foodCourt, foodId);

  return (
    <div className='mx-auto flex min-h-dvh w-full max-w-md flex-col bg-[#fefefe]'>
      <ReviewWriteHeader />
      <ReviewWriteForm
        foodCourt={foodCourt}
        foodId={foodId}
        menuName={menuDetail.name}
        price={menuDetail.price}
        menuImage={
          <CampusMenuImage
            foodCourt={foodCourt}
            menuId={foodId}
            className='h-[94px] w-[90px] shrink-0 rounded-none'
            sizes='90px'
          />
        }
      />
    </div>
  );
}

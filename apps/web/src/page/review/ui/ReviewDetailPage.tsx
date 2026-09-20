import { ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import ReviewPagedView from '@/widgets/review/ReviewPagedView';
import ReviewRating from '@/widgets/review/ReviewRating';

import { fetchReviewCount } from '@/features/review/api/fetchReviewCount';
import { getReviewsAction } from '@/features/review/api/getReviewsAction';

import type { ReviewSort } from '@/entities/review/api/api.type';

import { getFoodCourtById } from '@/shared/api';

const SORT_LABEL: Record<ReviewSort, string> = {
  recent: '최신순',
  'rating-desc': '평점 높은순',
  'rating-asc': '평점 낮은순',
};

export interface ReviewDetailPageProps {
  params: Promise<{ foodCourtId: string; foodId: string }>;
  searchParams: Promise<{ sort?: ReviewSort }>;
}

export default async function ReviewDetailPage({
  params,
  searchParams,
}: ReviewDetailPageProps) {
  const [{ foodCourtId, foodId: foodIdParam }, { sort }] = await Promise.all([
    params,
    searchParams,
  ]);

  const foodCourt = getFoodCourtById(foodCourtId);
  if (!foodCourt) {
    notFound();
  }

  const foodId = Number(foodIdParam);
  if (isNaN(foodId) || !Number.isInteger(foodId) || foodId <= 0) {
    notFound();
  }

  const [reviewCount, initialReviews] = await Promise.all([
    fetchReviewCount(foodCourt, foodId),
    getReviewsAction(foodCourt, foodId, 0, sort),
  ]);

  const currentPath = `/review/${foodCourtId}/${foodId}/detail`;
  const sortHref = `/review/sort?from=${encodeURIComponent(currentPath)}${sort ? `&sort=${sort}` : ''}`;

  return (
    <div className='flex flex-col pb-10'>
      <ReviewRating type={foodCourt} foodId={foodId} />

      <div className='border-t-6 border-gray-100 px-4 py-4'>
        <h1 className='text-lg font-semibold text-gray-900'>
          전체 리뷰 {reviewCount}
        </h1>
      </div>

      <div className='flex justify-end px-4 py-2'>
        <Link
          href={sortHref}
          className='flex items-center gap-1 py-1 text-[13px] font-medium text-gray-500'
        >
          {SORT_LABEL[sort ?? 'recent']}
          <ChevronDown size={14} className='text-gray-500' />
        </Link>
      </div>

      
      <ReviewPagedView
        type={foodCourt}
        foodId={foodId}
        initialData={initialReviews}
        sort={sort}
      />
     
    </div>
  );
}

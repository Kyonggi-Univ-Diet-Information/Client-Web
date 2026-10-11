import type { PagedReviewResponse } from '@/features/review/api/reviewSWR';

import type { ReviewSort } from '@/entities/review/api/api.type';


import { type FoodCourt } from '@/shared/api';

import ReviewInfiniteList from './ReviewInfiniteList';

interface ReviewPagedViewProps {
  type: FoodCourt;
  foodId: number;
  initialData: PagedReviewResponse;
  sort?: ReviewSort;
}

export default function ReviewPagedView({
  type,
  foodId,
  initialData,
  sort,
}: ReviewPagedViewProps) {
  if (initialData.content.length === 0) {
    return (
      <div className='mt-10 text-center font-medium text-gray-500'>
        아직 작성된 리뷰가 없어요.
      </div>
    );
  }

  return (
    <ReviewInfiniteList
      key={sort}
      type={type}
      foodId={foodId}
      initialData={initialData}
      sort={sort}
    />
  );
}

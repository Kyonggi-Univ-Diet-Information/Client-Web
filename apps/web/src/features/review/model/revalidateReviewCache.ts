import { revalidateTag, revalidatePath } from 'next/cache';

import { ENDPOINT, type FoodCourt } from '@/shared/api';
import { memberKeys, menuKeys, reviewKeys } from '@/shared/lib/queryKey';


interface RevalidateReviewOptions {
  type: FoodCourt;
  foodId: number;
  specificPage?: number;
}

export function revalidateReviewCache({
  type,
  foodId,
  specificPage,
}: RevalidateReviewOptions): void {
  revalidateTag(reviewKeys.byFood.tag(type, foodId));
  revalidateTag(reviewKeys.count.tag(type, foodId));
  revalidateTag(reviewKeys.averageRating.tag(type, foodId));
  revalidateTag(reviewKeys.ratingCount.tag(type, foodId));

  if (specificPage !== undefined) {
    revalidateTag(reviewKeys.paged.tag(type, foodId, specificPage));
  } else {
    revalidatePath(ENDPOINT.REVIEW_R.PAGED(type, foodId));
  }

  revalidateTag(memberKeys.reviews.tag(0));
  revalidateTag(menuKeys.top.tag());
  revalidateTag(reviewKeys.recent.tag());
}

export function revalidateReviewFavCache(
  type: FoodCourt,
  reviewId: number,
): void {
  revalidateTag(reviewKeys.favedCount.tag(type, reviewId));
  revalidateTag(reviewKeys.faved.tag(type));
  revalidateTag(memberKeys.favReviews.tag(0));
}

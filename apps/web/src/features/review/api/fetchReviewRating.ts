
import type { Rating } from '@/entities/review/api/api.type';

import { ENDPOINT, type FoodCourt } from '@/shared/api';
import { Http } from '@/shared/api/api-handlers';
import { reviewKeys } from '@/shared/lib/queryKey';



export const fetchReviewRating = async (
  type: FoodCourt,
  foodId: number,
): Promise<Rating> => {
  const data = await Http.get<{ result: Rating }>({
    request: ENDPOINT.REVIEW_R.RATING(type, foodId),
    cache: 'force-cache',
    next: {
      tags: [reviewKeys.ratingCount.tag(type, foodId)],
      revalidate: 60 * 5,
    },
  });

  return data.result;
};


import type { FetchReviewRatingAverageResponse } from '@/entities/review/api/api.model';

import { ENDPOINT, type FoodCourt } from '@/shared/api';
import { Http } from '@/shared/api/api-handlers';
import { reviewKeys } from '@/shared/lib/queryKey';


export const fetchReviewRatingAverage = async (
  type: FoodCourt,
  foodId: number,
): Promise<FetchReviewRatingAverageResponse> => {
  const data = await Http.get<FetchReviewRatingAverageResponse>({
    request: ENDPOINT.REVIEW_R.AVERAGE_RATING(type, foodId),
    cache: 'force-cache',
    next: {
      tags: [reviewKeys.averageRating.tag(type, foodId)],
      revalidate: 60 * 5,
    },
  });

  return data;
};

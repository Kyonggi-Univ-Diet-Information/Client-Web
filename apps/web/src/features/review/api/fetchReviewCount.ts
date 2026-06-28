
import type { FetchReviewCountResponse } from '@/entities/review/api/api.model';

import { ENDPOINT, type FoodCourt } from '@/shared/api';
import { Http } from '@/shared/api/api-handlers';
import { reviewKeys } from '@/shared/lib/queryKey';


export const fetchReviewCount = async (
  type: FoodCourt,
  foodId: number,
): Promise<FetchReviewCountResponse> => {
  const data = await Http.getDirect<FetchReviewCountResponse>({
    request: ENDPOINT.REVIEW_R.COUNT(type, foodId),
    cache: 'force-cache',
    next: {
      tags: [reviewKeys.count.tag(type, foodId)],
      revalidate: 60 * 5,
    },
  });

  return data;
};

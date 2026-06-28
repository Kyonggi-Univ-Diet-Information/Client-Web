
import type { FetchReviewFavCountResponse } from '@/entities/review/api/api.model';

import { ENDPOINT, type FoodCourt } from '@/shared/api';
import { Http } from '@/shared/api/api-handlers';
import { reviewKeys } from '@/shared/lib/queryKey';


export const fetchReviewFavCount = async (
  type: FoodCourt,
  reviewId: number,
): Promise<FetchReviewFavCountResponse> => {
  const data = await Http.get<FetchReviewFavCountResponse>({
    request: ENDPOINT.REVIEW_LIKE.LIKED_COUNT(type, reviewId),
    cache: 'force-cache',
    next: {
      tags: [reviewKeys.favedCount.tag(type, reviewId)],
      revalidate: 60 * 5,
    },
  });

  return data;
};

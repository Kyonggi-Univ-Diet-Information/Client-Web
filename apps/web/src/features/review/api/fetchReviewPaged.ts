
import type { Review } from '@/entities/review/api/api.type';

import { ENDPOINT, type FoodCourt } from '@/shared/api';
import type { BasePagedResponse } from '@/shared/api/api-base-types';
import { Http } from '@/shared/api/api-handlers';
import { AuthService } from '@/shared/lib/auth';
import { reviewKeys } from '@/shared/lib/queryKey';


export const fetchReviewPaged = async (
  type: FoodCourt,
  foodId: number,
  page: number = 0,
): Promise<BasePagedResponse<Review[]>> => {
  const isAuthenticated = await AuthService.isAuthenticated();

  const data = await Http.get<BasePagedResponse<Review[]>>({
    request: `${ENDPOINT.REVIEW_R.PAGED(type, foodId)}?pageNo=${page}`,
    cache: 'no-store',
    authorize: isAuthenticated,
    next: {
      tags: [
        reviewKeys.byFood.tag(type, foodId),
        reviewKeys.paged.tag(type, foodId, page),
      ],
    },
  });

  return data;
};

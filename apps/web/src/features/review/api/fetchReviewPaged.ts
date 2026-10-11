
import type { Review, ReviewSort } from '@/entities/review/api/api.type';

import { ENDPOINT, type FoodCourt } from '@/shared/api';
import type { BasePagedResponse } from '@/shared/api/api-base-types';
import { Http } from '@/shared/api/api-handlers';
import { AuthService } from '@/shared/lib/auth';
import { reviewKeys } from '@/shared/lib/queryKey';


export const fetchReviewPaged = async (
  type: FoodCourt,
  foodId: number,
  page: number = 0,
  _sort?: ReviewSort,
): Promise<BasePagedResponse<Review[]>> => {
  const isAuthenticated = await AuthService.isAuthenticated();

  const data = await Http.get<BasePagedResponse<Review[]>>({
    request: ENDPOINT.REVIEW_R.PAGED(type, foodId),
    // TODO: 서버가 sort 쿼리를 지원하면 params: { pageNo: page, sort } 복구
    params: { pageNo: page },
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

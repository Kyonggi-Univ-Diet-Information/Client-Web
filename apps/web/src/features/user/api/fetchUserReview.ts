
import type { RecentReview } from '@/entities/review/api/api.type';

import { ENDPOINT } from '@/shared/api';
import type { BasePagedResponse } from '@/shared/api/api-base-types';
import { Http } from '@/shared/api/api-handlers';
import { memberKeys } from '@/shared/lib/queryKey';



export const fetchUserReview = async (
  page: number,
): Promise<BasePagedResponse<RecentReview[]>> => {
  const data = await Http.get<BasePagedResponse<RecentReview[]>>({
    request: ENDPOINT.MEMBER.MEMBER_REVIEW,
    params: {
      page,
    },
    authorize: true,
    cache: 'force-cache',
    next: {
      tags: [memberKeys.reviews.tag(page)],
      revalidate: 60 * 5,
    },
  });
  return data;
};

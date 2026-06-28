'use server';


import type { FetchReviewLikedRes } from '@/entities/review/api/api.type';

import { ENDPOINT, type FoodCourt } from '@/shared/api';
import { Http } from '@/shared/api/api-handlers';
import { reviewKeys } from '@/shared/lib/queryKey';


export const fetchReviewFaved = async (
  type: FoodCourt,
): Promise<FetchReviewLikedRes[]> => {
  const data = await Http.get<FetchReviewLikedRes[]>({
    request: ENDPOINT.MEMBER.MEMBER_REVIEW_LIKED(type),
    authorize: true,
    cache: 'force-cache',
    next: {
      tags: [reviewKeys.faved.tag(type)],
    },
  });

  return data;
};

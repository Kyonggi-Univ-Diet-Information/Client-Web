'use server';


import { revalidateReviewFavCache } from '@/features/review/model/revalidateReviewCache';

import { ENDPOINT, type FoodCourt } from '@/shared/api';
import { Http } from '@/shared/api/api-handlers';
import { runServerAction, type ServerActionResult } from '@/shared/lib/serverAction';



export const submitReviewFav = async (
  reviewId: number,
  type: FoodCourt,
): Promise<ServerActionResult> =>
  runServerAction(async () => {
    await Http.post({
      request: ENDPOINT.REVIEW_LIKE.LIKE(type, reviewId),
      authorize: true,
    });

    revalidateReviewFavCache(type, reviewId);
  }, '리뷰 좋아요 등록에 실패했습니다');

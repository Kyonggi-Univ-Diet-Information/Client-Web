'use server';


import { revalidateReviewCache } from '@/features/review/model/revalidateReviewCache';

import { ENDPOINT, type FoodCourt } from '@/shared/api';
import { Http } from '@/shared/api/api-handlers';
import { runServerAction, type ServerActionResult } from '@/shared/lib/serverAction';



export const removeReview = async (
  reviewId: number,
  foodId: number,
  type: FoodCourt,
): Promise<ServerActionResult> =>
  runServerAction(async () => {
    await Http.del({
      request: ENDPOINT.REVIEW_CUD.DELETE(type, reviewId),
      authorize: true,
    });

    revalidateReviewCache({ type, foodId });
  }, '리뷰 삭제에 실패했습니다');

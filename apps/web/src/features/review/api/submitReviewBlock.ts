'use server';

import { revalidateReviewCache } from '@/features/review/model/revalidateReviewCache';

import { ENDPOINT, type FoodCourt } from '@/shared/api';
import { Http } from '@/shared/api/api-handlers';
import { runServerAction, type ServerActionResult } from '@/shared/lib/serverAction';



export const submitReviewBlock = async (
  reviewId: number,
  foodId: number,
  type: FoodCourt,
): Promise<ServerActionResult> =>
  runServerAction(async () => {
    await Http.post({
      request: ENDPOINT.REVIEW_BLOCK.BLOCK(type, reviewId),
      authorize: true,
    });

    revalidateReviewCache({ type, foodId });
  }, '사용자 차단에 실패했습니다');

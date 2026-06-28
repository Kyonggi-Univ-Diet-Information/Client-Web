'use server';


import { revalidateReviewCache } from '@/features/review/model/revalidateReviewCache';

import type { ReviewPost } from '@/entities/review/api/api.type';

import { ENDPOINT, FoodCourt } from '@/shared/api';
import { Http } from '@/shared/api/api-handlers';
import { runServerAction, type ServerActionResult } from '@/shared/lib/serverAction';


export const submitReview = async (
  _prevState: ServerActionResult | null,
  formData: FormData,
): Promise<ServerActionResult> => {
  const foodId = Number(formData.get('foodId'));
  const rating = Number(formData.get('rating'));
  const title = '';
  const content = String(formData.get('content'));
  const type = formData.get('foodCourt') as FoodCourt;

  return runServerAction(async () => {
    await Http.post<ReviewPost>({
      request: ENDPOINT.REVIEW_CUD.SUBMIT(type, foodId),
      data: {
        rating: rating,
        title: title,
        content: content,
      },
      authorize: true,
    });

    revalidateReviewCache({ type, foodId });
  }, '리뷰 등록에 실패했습니다');
};

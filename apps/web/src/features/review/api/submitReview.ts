'use server';


import { revalidateReviewCache } from '@/features/review/model/revalidateReviewCache';

import type { ReviewKeywordKey, ReviewPost } from '@/entities/review/api/api.type';
import { REVIEW_KEYWORD_GROUPS } from '@/entities/review/model/reviewKeywords';

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
  const imageKeys = formData.getAll('imageKeys').map(String);

  const keywords = Object.fromEntries(
    REVIEW_KEYWORD_GROUPS.flatMap(({ key }) => {
      const value = formData.get(key);
      return value ? [[key, Number(value)] as [ReviewKeywordKey, number]] : [];
    }),
  );

  // 키워드는 최소 1개가 필수라 없으면 서버 400 전에 막아요
  if (Object.keys(keywords).length === 0) {
    return { success: false, error: '키워드를 1개 이상 선택해주세요' };
  }

  return runServerAction(async () => {
    await Http.post<ReviewPost>({
      request: ENDPOINT.REVIEW_CUD.SUBMIT(type, foodId),
      data: {
        rating: rating,
        title: title,
        content: content,
        ...keywords,
        ...(imageKeys.length > 0 && { imageKeys }),
      },
      authorize: true,
    });

    revalidateReviewCache({ type, foodId });
  }, '리뷰 등록에 실패했습니다');
};

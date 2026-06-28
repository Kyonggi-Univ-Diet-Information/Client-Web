


import { revalidateReviewCache } from '@/features/review/model/revalidateReviewCache';

import { ENDPOINT, FOOD_COURT } from '@/shared/api';
import { Http } from '@/shared/api/api-handlers';

import { submitReviewBlock } from './submitReviewBlock';



// 모듈 모킹
jest.mock('@/shared/api/api-handlers');
jest.mock('@/features/review/model/revalidateReviewCache');

describe('submitReviewBlock', () => {
  const reviewId = 123;
  const foodId = 456;
  const type = FOOD_COURT.KYONGSUL;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('사용자를 성공적으로 차단하고 캐시를 revalidate한다', async () => {
    // Given: Http.post가 성공적으로 응답
    (Http.post as jest.Mock).mockResolvedValue({});

    // When: submitReviewBlock 함수 호출
    const result = await submitReviewBlock(reviewId, foodId, type);

    // Then: Http.post가 올바른 파라미터로 호출됨
    expect(Http.post).toHaveBeenCalledWith({
      request: ENDPOINT.REVIEW_BLOCK.BLOCK(type, reviewId),
      authorize: true,
    });

    // Then: revalidateReviewCache가 호출됨
    expect(revalidateReviewCache).toHaveBeenCalledWith({
      type,
      foodId,
    });

    // Then: 성공 응답 반환
    expect(result).toEqual({ success: true });
  });

  it('차단 실패 시 에러를 반환하고 revalidation하지 않는다', async () => {
    // Given: Http.post가 에러를 throw
    const mockError = new Error('차단 처리 실패');
    (Http.post as jest.Mock).mockRejectedValue(mockError);

    // When: submitReviewBlock 함수 호출
    const result = await submitReviewBlock(reviewId, foodId, type);

    // Then: Http.post가 호출됨
    expect(Http.post).toHaveBeenCalled();

    // Then: revalidateReviewCache가 호출되지 않음
    expect(revalidateReviewCache).not.toHaveBeenCalled();

    // Then: 실패 응답 반환
    expect(result).toEqual({
      success: false,
      error: '차단 처리 실패',
    });
  });

  it('네트워크 에러 발생 시 기본 에러 메시지를 반환한다', async () => {
    // Given: Http.post가 메시지 없는 에러를 throw
    (Http.post as jest.Mock).mockRejectedValue({});

    // When: submitReviewBlock 함수 호출
    const result = await submitReviewBlock(reviewId, foodId, type);

    // Then: revalidateReviewCache가 호출되지 않음
    expect(revalidateReviewCache).not.toHaveBeenCalled();

    // Then: 기본 에러 메시지 반환
    expect(result).toEqual({
      success: false,
      error: '사용자 차단에 실패했습니다',
    });
  });

  it('여러 음식점 타입에서 정상 작동한다', async () => {
    // Given: Http.post가 성공적으로 응답
    (Http.post as jest.Mock).mockResolvedValue({});

    // When: E_SQUARE 타입으로 차단
    await submitReviewBlock(789, 321, FOOD_COURT.E_SQUARE);

    // Then: E_SQUARE 엔드포인트로 호출됨
    expect(Http.post).toHaveBeenCalledWith({
      request: ENDPOINT.REVIEW_BLOCK.BLOCK(FOOD_COURT.E_SQUARE, 789),
      authorize: true,
    });

    // Then: E_SQUARE 타입으로 revalidation
    expect(revalidateReviewCache).toHaveBeenCalledWith({
      type: FOOD_COURT.E_SQUARE,
      foodId: 321,
    });
  });

  it('차단 성공 시에만 캐시를 무효화한다', async () => {
    // Given: 첫 번째 호출은 성공, 두 번째 호출은 실패
    (Http.post as jest.Mock)
      .mockResolvedValueOnce({})
      .mockRejectedValueOnce(new Error('실패'));

    // When: 첫 번째 차단 (성공)
    await submitReviewBlock(111, 222, type);

    // Then: revalidateReviewCache가 한 번 호출됨
    expect(revalidateReviewCache).toHaveBeenCalledTimes(1);

    // When: 두 번째 차단 (실패)
    await submitReviewBlock(333, 444, type);

    // Then: revalidateReviewCache가 여전히 한 번만 호출됨 (실패 시 호출 안 됨)
    expect(revalidateReviewCache).toHaveBeenCalledTimes(1);
  });

  it('인증이 필요한 요청임을 확인한다', async () => {
    // Given: Http.post가 성공적으로 응답
    (Http.post as jest.Mock).mockResolvedValue({});

    // When: submitReviewBlock 함수 호출
    await submitReviewBlock(reviewId, foodId, type);

    // Then: authorize 플래그가 true로 설정됨
    expect(Http.post).toHaveBeenCalledWith(
      expect.objectContaining({
        authorize: true,
      }),
    );
  });

  it('차단 후 리뷰 목록이 새로고침되어야 한다', async () => {
    // Given: Http.post가 성공적으로 응답
    (Http.post as jest.Mock).mockResolvedValue({});

    // When: 여러 리뷰를 차단
    const blockedReviews = [
      { reviewId: 1, foodId: 100 },
      { reviewId: 2, foodId: 200 },
      { reviewId: 3, foodId: 300 },
    ];

    for (const review of blockedReviews) {
      await submitReviewBlock(review.reviewId, review.foodId, type);
    }

    // Then: 각 차단마다 캐시가 무효화됨
    expect(revalidateReviewCache).toHaveBeenCalledTimes(blockedReviews.length);

    // Then: 각 foodId에 대해 정확히 호출됨
    blockedReviews.forEach((review, index) => {
      expect(revalidateReviewCache).toHaveBeenNthCalledWith(index + 1, {
        type,
        foodId: review.foodId,
      });
    });
  });
});

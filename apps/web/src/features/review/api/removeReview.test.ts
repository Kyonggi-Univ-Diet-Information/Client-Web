


import { revalidateReviewCache } from '@/features/review/model/revalidateReviewCache';

import { ENDPOINT, FOOD_COURT } from '@/shared/api';
import { Http } from '@/shared/api/api-handlers';

import { removeReview } from './removeReview';



// 모듈 모킹
jest.mock('@/shared/api/api-handlers');
jest.mock('@/features/review/model/revalidateReviewCache');

describe('removeReview', () => {
  const mockReviewId = 999;
  const mockFoodId = 123;
  const mockType = FOOD_COURT.KYONGSUL;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('리뷰를 성공적으로 삭제하고 캐시를 revalidate한다', async () => {
    // Given: Http.del이 성공적으로 응답
    (Http.del as jest.Mock).mockResolvedValue(undefined);

    // When: removeReview 함수 호출
    const result = await removeReview(mockReviewId, mockFoodId, mockType);

    // Then: Http.del이 올바른 파라미터로 호출됨
    expect(Http.del).toHaveBeenCalledWith({
      request: ENDPOINT.REVIEW_CUD.DELETE(mockType, mockReviewId),
      authorize: true,
    });

    // Then: revalidateReviewCache가 호출됨
    expect(revalidateReviewCache).toHaveBeenCalledWith({
      type: mockType,
      foodId: mockFoodId,
    });

    // Then: 성공 응답 반환
    expect(result).toEqual({ success: true });
  });

  it('리뷰 삭제 실패 시 에러를 반환하고 revalidation하지 않는다', async () => {
    // Given: Http.del이 에러를 throw
    const mockError = new Error('권한이 없습니다');
    (Http.del as jest.Mock).mockRejectedValue(mockError);

    // When: removeReview 함수 호출
    const result = await removeReview(mockReviewId, mockFoodId, mockType);

    // Then: Http.del이 호출됨
    expect(Http.del).toHaveBeenCalled();

    // Then: revalidateReviewCache가 호출되지 않음
    expect(revalidateReviewCache).not.toHaveBeenCalled();

    // Then: 실패 응답 반환
    expect(result).toEqual({
      success: false,
      error: '권한이 없습니다',
    });
  });

  it('Error 인스턴스가 아닌 에러 발생 시 기본 메시지를 반환한다', async () => {
    // Given: Http.del이 일반 객체 에러를 throw
    (Http.del as jest.Mock).mockRejectedValue({ status: 500 });

    // When: removeReview 함수 호출
    const result = await removeReview(mockReviewId, mockFoodId, mockType);

    // Then: 기본 에러 메시지 반환
    expect(result).toEqual({
      success: false,
      error: '리뷰 삭제에 실패했습니다',
    });
  });

  it('여러 음식점 타입에서 정상 작동한다', async () => {
    // Given: DORMITORY 타입
    (Http.del as jest.Mock).mockResolvedValue(undefined);

    // When: removeReview 함수 호출
    await removeReview(mockReviewId, mockFoodId, FOOD_COURT.DORMITORY);

    // Then: DORMITORY 엔드포인트로 호출됨
    expect(Http.del).toHaveBeenCalledWith({
      request: ENDPOINT.REVIEW_CUD.DELETE(FOOD_COURT.DORMITORY, mockReviewId),
      authorize: true,
    });

    // Then: DORMITORY 타입으로 revalidation
    expect(revalidateReviewCache).toHaveBeenCalledWith({
      type: FOOD_COURT.DORMITORY,
      foodId: mockFoodId,
    });
  });

  it('다른 reviewId와 foodId 조합에서도 정상 작동한다', async () => {
    // Given: 다른 ID들
    const differentReviewId = 555;
    const differentFoodId = 777;
    (Http.del as jest.Mock).mockResolvedValue(undefined);

    // When: removeReview 함수 호출
    await removeReview(differentReviewId, differentFoodId, mockType);

    // Then: 올바른 ID로 호출됨
    expect(Http.del).toHaveBeenCalledWith({
      request: ENDPOINT.REVIEW_CUD.DELETE(mockType, differentReviewId),
      authorize: true,
    });

    expect(revalidateReviewCache).toHaveBeenCalledWith({
      type: mockType,
      foodId: differentFoodId,
    });
  });
});

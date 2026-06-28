


import { revalidateReviewCache } from '@/features/review/model/revalidateReviewCache';

import { ENDPOINT, FOOD_COURT } from '@/shared/api';
import { Http } from '@/shared/api/api-handlers';

import { submitReview } from './submitReview';



// 모듈 모킹
jest.mock('@/shared/api/api-handlers');
jest.mock('@/features/review/model/revalidateReviewCache');

describe('submitReview', () => {
  const mockFormData = new FormData();
  mockFormData.append('foodId', '123');
  mockFormData.append('rating', '5');
  mockFormData.append('content', '정말 맛있어요!');
  mockFormData.append('foodCourt', FOOD_COURT.KYONGSUL);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('리뷰를 성공적으로 작성하고 캐시를 revalidate한다', async () => {
    // Given: Http.post가 성공적으로 응답
    (Http.post as jest.Mock).mockResolvedValue({
      rating: 5,
      title: '',
      content: '정말 맛있어요!',
    });

    // When: submitReview 함수 호출
    const result = await submitReview(null, mockFormData);

    // Then: Http.post가 올바른 파라미터로 호출됨
    expect(Http.post).toHaveBeenCalledWith({
      request: ENDPOINT.REVIEW_CUD.SUBMIT(FOOD_COURT.KYONGSUL, 123),
      data: {
        rating: 5,
        title: '',
        content: '정말 맛있어요!',
      },
      authorize: true,
    });

    // Then: revalidateReviewCache가 호출됨
    expect(revalidateReviewCache).toHaveBeenCalledWith({
      type: FOOD_COURT.KYONGSUL,
      foodId: 123,
    });

    // Then: 성공 응답 반환
    expect(result).toEqual({ success: true });
  });

  it('리뷰 작성 실패 시 에러를 반환하고 revalidation하지 않는다', async () => {
    // Given: Http.post가 에러를 throw
    const mockError = new Error('서버 오류');
    (Http.post as jest.Mock).mockRejectedValue(mockError);

    // When: submitReview 함수 호출
    const result = await submitReview(null, mockFormData);

    // Then: Http.post가 호출됨
    expect(Http.post).toHaveBeenCalled();

    // Then: revalidateReviewCache가 호출되지 않음
    expect(revalidateReviewCache).not.toHaveBeenCalled();

    // Then: 실패 응답 반환
    expect(result).toEqual({
      success: false,
      error: '서버 오류',
    });
  });

  it('네트워크 에러 발생 시 기본 에러 메시지를 반환한다', async () => {
    // Given: Http.post가 메시지 없는 에러를 throw
    (Http.post as jest.Mock).mockRejectedValue({});

    // When: submitReview 함수 호출
    const result = await submitReview(null, mockFormData);

    // Then: 기본 에러 메시지 반환
    expect(result).toEqual({
      success: false,
      error: '리뷰 등록에 실패했습니다',
    });
  });

  it('여러 음식점 타입에서 정상 작동한다', async () => {
    // Given: E_SQUARE 타입의 FormData
    const eSquareFormData = new FormData();
    eSquareFormData.append('foodId', '456');
    eSquareFormData.append('rating', '4');
    eSquareFormData.append('content', '괜찮아요');
    eSquareFormData.append('foodCourt', FOOD_COURT.E_SQUARE);

    (Http.post as jest.Mock).mockResolvedValue({});

    // When: submitReview 함수 호출
    await submitReview(null, eSquareFormData);

    // Then: E_SQUARE 엔드포인트로 호출됨
    expect(Http.post).toHaveBeenCalledWith(
      expect.objectContaining({
        request: ENDPOINT.REVIEW_CUD.SUBMIT(FOOD_COURT.E_SQUARE, 456),
      }),
    );

    // Then: E_SQUARE 타입으로 revalidation
    expect(revalidateReviewCache).toHaveBeenCalledWith({
      type: FOOD_COURT.E_SQUARE,
      foodId: 456,
    });
  });
});

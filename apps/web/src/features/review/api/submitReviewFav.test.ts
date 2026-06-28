


import { revalidateReviewFavCache } from '@/features/review/model/revalidateReviewCache';

import { ENDPOINT, FOOD_COURT } from '@/shared/api';
import { Http } from '@/shared/api/api-handlers';

import { submitReviewFav } from './submitReviewFav';



// 모듈 모킹
jest.mock('@/shared/api/api-handlers');
jest.mock('@/features/review/model/revalidateReviewCache');

describe('submitReviewFav', () => {
  const mockReviewId = 888;
  const mockType = FOOD_COURT.KYONGSUL;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('리뷰 좋아요를 성공적으로 추가하고 캐시를 revalidate한다', async () => {
    // Given: Http.post가 성공적으로 응답
    (Http.post as jest.Mock).mockResolvedValue(undefined);

    // When: submitReviewFav 함수 호출
    const result = await submitReviewFav(mockReviewId, mockType);

    // Then: Http.post가 올바른 파라미터로 호출됨
    expect(Http.post).toHaveBeenCalledWith({
      request: ENDPOINT.REVIEW_LIKE.LIKE(mockType, mockReviewId),
      authorize: true,
    });

    // Then: revalidateReviewFavCache가 호출됨
    expect(revalidateReviewFavCache).toHaveBeenCalledWith(
      mockType,
      mockReviewId,
    );

    // Then: 성공 응답 반환
    expect(result).toEqual({ success: true });
  });

  it('좋아요 추가 실패 시 에러를 반환하고 revalidation하지 않는다', async () => {
    // Given: Http.post가 에러를 throw
    const mockError = new Error('이미 좋아요한 리뷰입니다');
    (Http.post as jest.Mock).mockRejectedValue(mockError);

    // When: submitReviewFav 함수 호출
    const result = await submitReviewFav(mockReviewId, mockType);

    // Then: Http.post가 호출됨
    expect(Http.post).toHaveBeenCalled();

    // Then: revalidateReviewFavCache가 호출되지 않음
    expect(revalidateReviewFavCache).not.toHaveBeenCalled();

    // Then: 실패 응답 반환
    expect(result).toEqual({
      success: false,
      error: '이미 좋아요한 리뷰입니다',
    });
  });

  it('Error 인스턴스가 아닌 에러 발생 시 기본 메시지를 반환한다', async () => {
    // Given: Http.post가 일반 객체 에러를 throw
    (Http.post as jest.Mock).mockRejectedValue({ status: 401 });

    // When: submitReviewFav 함수 호출
    const result = await submitReviewFav(mockReviewId, mockType);

    // Then: 기본 에러 메시지 반환
    expect(result).toEqual({
      success: false,
      error: '리뷰 좋아요 등록에 실패했습니다',
    });
  });

  it('여러 음식점 타입에서 정상 작동한다', async () => {
    // Given: E_SQUARE 타입
    (Http.post as jest.Mock).mockResolvedValue(undefined);

    // When: submitReviewFav 함수 호출
    await submitReviewFav(mockReviewId, FOOD_COURT.E_SQUARE);

    // Then: E_SQUARE 엔드포인트로 호출됨
    expect(Http.post).toHaveBeenCalledWith({
      request: ENDPOINT.REVIEW_LIKE.LIKE(FOOD_COURT.E_SQUARE, mockReviewId),
      authorize: true,
    });

    // Then: E_SQUARE 타입으로 revalidation
    expect(revalidateReviewFavCache).toHaveBeenCalledWith(
      FOOD_COURT.E_SQUARE,
      mockReviewId,
    );
  });

  it('다른 reviewId에서도 정상 작동한다', async () => {
    // Given: 다른 reviewId
    const differentReviewId = 12345;
    (Http.post as jest.Mock).mockResolvedValue(undefined);

    // When: submitReviewFav 함수 호출
    await submitReviewFav(differentReviewId, mockType);

    // Then: 올바른 reviewId로 호출됨
    expect(Http.post).toHaveBeenCalledWith({
      request: ENDPOINT.REVIEW_LIKE.LIKE(mockType, differentReviewId),
      authorize: true,
    });

    expect(revalidateReviewFavCache).toHaveBeenCalledWith(
      mockType,
      differentReviewId,
    );
  });

  it('인증 헤더가 포함되어 API를 호출한다', async () => {
    // Given: Http.post 모킹
    (Http.post as jest.Mock).mockResolvedValue(undefined);

    // When: submitReviewFav 함수 호출
    await submitReviewFav(mockReviewId, mockType);

    // Then: authorize: true가 포함되어 호출됨
    expect(Http.post).toHaveBeenCalledWith(
      expect.objectContaining({
        authorize: true,
      }),
    );
  });
});

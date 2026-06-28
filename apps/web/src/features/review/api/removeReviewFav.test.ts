


import { revalidateReviewFavCache } from '@/features/review/model/revalidateReviewCache';

import { ENDPOINT, FOOD_COURT } from '@/shared/api';
import { Http } from '@/shared/api/api-handlers';

import { removeReviewFav } from './removeReviewFav';



// 모듈 모킹
jest.mock('@/shared/api/api-handlers');
jest.mock('@/features/review/model/revalidateReviewCache');

describe('removeReviewFav', () => {
  const mockReviewId = 777;
  const mockType = FOOD_COURT.KYONGSUL;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('리뷰 좋아요를 성공적으로 삭제하고 캐시를 revalidate한다', async () => {
    // Given: Http.del이 성공적으로 응답
    (Http.del as jest.Mock).mockResolvedValue(undefined);

    // When: removeReviewFav 함수 호출
    const result = await removeReviewFav(mockReviewId, mockType);

    // Then: Http.del이 올바른 파라미터로 호출됨
    expect(Http.del).toHaveBeenCalledWith({
      request: ENDPOINT.REVIEW_LIKE.UNLIKE(mockType, mockReviewId),
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

  it('좋아요 삭제 실패 시 에러를 반환하고 revalidation하지 않는다', async () => {
    // Given: Http.del이 에러를 throw
    const mockError = new Error('좋아요를 찾을 수 없습니다');
    (Http.del as jest.Mock).mockRejectedValue(mockError);

    // When: removeReviewFav 함수 호출
    const result = await removeReviewFav(mockReviewId, mockType);

    // Then: Http.del이 호출됨
    expect(Http.del).toHaveBeenCalled();

    // Then: revalidateReviewFavCache가 호출되지 않음
    expect(revalidateReviewFavCache).not.toHaveBeenCalled();

    // Then: 실패 응답 반환
    expect(result).toEqual({
      success: false,
      error: '좋아요를 찾을 수 없습니다',
    });
  });

  it('Error 인스턴스가 아닌 에러 발생 시 기본 메시지를 반환한다', async () => {
    // Given: Http.del이 일반 객체 에러를 throw
    (Http.del as jest.Mock).mockRejectedValue({ status: 500 });

    // When: removeReviewFav 함수 호출
    const result = await removeReviewFav(mockReviewId, mockType);

    // Then: 기본 에러 메시지 반환
    expect(result).toEqual({
      success: false,
      error: '리뷰 좋아요 삭제에 실패했습니다',
    });
  });

  it('여러 음식점 타입에서 정상 작동한다', async () => {
    // Given: SALLY_BOX 타입
    (Http.del as jest.Mock).mockResolvedValue(undefined);

    // When: removeReviewFav 함수 호출
    await removeReviewFav(mockReviewId, FOOD_COURT.SALLY_BOX);

    // Then: SALLY_BOX 엔드포인트로 호출됨
    expect(Http.del).toHaveBeenCalledWith({
      request: ENDPOINT.REVIEW_LIKE.UNLIKE(FOOD_COURT.SALLY_BOX, mockReviewId),
      authorize: true,
    });

    // Then: SALLY_BOX 타입으로 revalidation
    expect(revalidateReviewFavCache).toHaveBeenCalledWith(
      FOOD_COURT.SALLY_BOX,
      mockReviewId,
    );
  });

  it('다른 reviewId에서도 정상 작동한다', async () => {
    // Given: 다른 reviewId
    const differentReviewId = 99999;
    (Http.del as jest.Mock).mockResolvedValue(undefined);

    // When: removeReviewFav 함수 호출
    await removeReviewFav(differentReviewId, mockType);

    // Then: 올바른 reviewId로 호출됨
    expect(Http.del).toHaveBeenCalledWith({
      request: ENDPOINT.REVIEW_LIKE.UNLIKE(mockType, differentReviewId),
      authorize: true,
    });

    expect(revalidateReviewFavCache).toHaveBeenCalledWith(
      mockType,
      differentReviewId,
    );
  });

  it('인증 헤더가 포함되어 API를 호출한다', async () => {
    // Given: Http.del 모킹
    (Http.del as jest.Mock).mockResolvedValue(undefined);

    // When: removeReviewFav 함수 호출
    await removeReviewFav(mockReviewId, mockType);

    // Then: authorize: true가 포함되어 호출됨
    expect(Http.del).toHaveBeenCalledWith(
      expect.objectContaining({
        authorize: true,
      }),
    );
  });

  it('좋아요 추가 후 삭제하는 시나리오를 테스트한다', async () => {
    // Given: Http.del이 성공
    (Http.del as jest.Mock).mockResolvedValue(undefined);

    // When: 좋아요 삭제 (이전에 추가되었다고 가정)
    const result = await removeReviewFav(mockReviewId, mockType);

    // Then: 성공적으로 삭제되고 캐시가 갱신됨
    expect(result.success).toBe(true);
    expect(revalidateReviewFavCache).toHaveBeenCalledTimes(1);
    expect(revalidateReviewFavCache).toHaveBeenCalledWith(
      mockType,
      mockReviewId,
    );
  });
});

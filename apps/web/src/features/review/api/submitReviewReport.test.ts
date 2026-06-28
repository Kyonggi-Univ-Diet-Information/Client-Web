
import { ENDPOINT, FOOD_COURT } from '@/shared/api';
import { Http } from '@/shared/api/api-handlers';

import { submitReviewReport } from './submitReviewReport';


// 모듈 모킹
jest.mock('@/shared/api/api-handlers');

describe('submitReviewReport', () => {
  const reviewId = 123;
  const type = FOOD_COURT.KYONGSUL;
  const reasonType = 'SPAM';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('리뷰를 성공적으로 신고한다', async () => {
    // Given: Http.post가 성공적으로 응답
    (Http.post as jest.Mock).mockResolvedValue({});

    // When: submitReviewReport 함수 호출
    const result = await submitReviewReport(reviewId, type, reasonType);

    // Then: Http.post가 올바른 파라미터로 호출됨
    expect(Http.post).toHaveBeenCalledWith({
      request: ENDPOINT.REVIEW_REPORT.REPORT(type, reviewId, reasonType),
      authorize: true,
    });

    // Then: 성공 응답 반환
    expect(result).toEqual({ success: true });
  });

  it('리뷰 신고 실패 시 에러를 반환한다', async () => {
    // Given: Http.post가 에러를 throw
    const mockError = new Error('신고 처리 실패');
    (Http.post as jest.Mock).mockRejectedValue(mockError);

    // When: submitReviewReport 함수 호출
    const result = await submitReviewReport(reviewId, type, reasonType);

    // Then: Http.post가 호출됨
    expect(Http.post).toHaveBeenCalled();

    // Then: 실패 응답 반환
    expect(result).toEqual({
      success: false,
      error: '신고 처리 실패',
    });
  });

  it('네트워크 에러 발생 시 기본 에러 메시지를 반환한다', async () => {
    // Given: Http.post가 메시지 없는 에러를 throw
    (Http.post as jest.Mock).mockRejectedValue({});

    // When: submitReviewReport 함수 호출
    const result = await submitReviewReport(reviewId, type, reasonType);

    // Then: 기본 에러 메시지 반환
    expect(result).toEqual({
      success: false,
      error: '리뷰 신고에 실패했습니다',
    });
  });

  it('다양한 신고 사유로 정상 작동한다', async () => {
    // Given: Http.post가 성공적으로 응답
    (Http.post as jest.Mock).mockResolvedValue({});

    const reportReasons = ['SPAM', 'INAPPROPRIATE', 'HARASSMENT', 'FALSE_INFO'];

    // When: 각 신고 사유로 호출
    for (const reason of reportReasons) {
      await submitReviewReport(reviewId, type, reason);

      // Then: 해당 사유로 엔드포인트 호출됨
      expect(Http.post).toHaveBeenCalledWith(
        expect.objectContaining({
          request: ENDPOINT.REVIEW_REPORT.REPORT(type, reviewId, reason),
        }),
      );
    }

    // 총 호출 횟수 확인
    expect(Http.post).toHaveBeenCalledTimes(reportReasons.length);
  });

  it('여러 음식점 타입에서 정상 작동한다', async () => {
    // Given: Http.post가 성공적으로 응답
    (Http.post as jest.Mock).mockResolvedValue({});

    // When: E_SQUARE 타입으로 신고
    await submitReviewReport(456, FOOD_COURT.E_SQUARE, 'SPAM');

    // Then: E_SQUARE 엔드포인트로 호출됨
    expect(Http.post).toHaveBeenCalledWith({
      request: ENDPOINT.REVIEW_REPORT.REPORT(FOOD_COURT.E_SQUARE, 456, 'SPAM'),
      authorize: true,
    });
  });

  it('인증이 필요한 요청임을 확인한다', async () => {
    // Given: Http.post가 성공적으로 응답
    (Http.post as jest.Mock).mockResolvedValue({});

    // When: submitReviewReport 함수 호출
    await submitReviewReport(reviewId, type, reasonType);

    // Then: authorize 플래그가 true로 설정됨
    expect(Http.post).toHaveBeenCalledWith(
      expect.objectContaining({
        authorize: true,
      }),
    );
  });
});

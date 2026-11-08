


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
  mockFormData.append('saltLevel', 'MID');
  mockFormData.append('valueLevel', 'HIGH');

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
        saltLevel: 'MID',
        valueLevel: 'HIGH',
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

  it('imageKeys가 있으면 요청 body에 실어 보낸다', async () => {
    (Http.post as jest.Mock).mockResolvedValue({});
    const formData = new FormData();
    mockFormData.forEach((v, k) => formData.append(k, v));
    formData.append('imageKeys', 'tmp/a.jpg');
    formData.append('imageKeys', 'tmp/b.png');

    await submitReview(null, formData);

    expect(Http.post).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          imageKeys: ['tmp/a.jpg', 'tmp/b.png'],
        }),
      }),
    );
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
    eSquareFormData.append('spicyLevel', 'LOW');

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

  it('알 수 없는 키워드 값은 보내지 않는다', async () => {
    (Http.post as jest.Mock).mockResolvedValue({});
    const formData = new FormData();
    formData.append('foodId', '123');
    formData.append('rating', '5');
    formData.append('content', '정말 맛있어요!');
    formData.append('foodCourt', FOOD_COURT.KYONGSUL);
    formData.append('saltLevel', 'HIGH');
    formData.append('spicyLevel', 'EXTREME');

    await submitReview(null, formData);

    const { data } = (Http.post as jest.Mock).mock.calls[0][0];
    expect(data.saltLevel).toBe('HIGH');
    expect(data).not.toHaveProperty('spicyLevel');
  });

  it('키워드를 하나도 선택하지 않으면 요청 없이 에러를 반환한다', async () => {
    const formData = new FormData();
    formData.append('foodId', '123');
    formData.append('rating', '5');
    formData.append('content', '정말 맛있어요!');
    formData.append('foodCourt', FOOD_COURT.KYONGSUL);

    const result = await submitReview(null, formData);

    expect(result).toEqual({
      success: false,
      error: '키워드를 1개 이상 선택해주세요',
    });
    expect(Http.post).not.toHaveBeenCalled();
    expect(revalidateReviewCache).not.toHaveBeenCalled();
  });
});

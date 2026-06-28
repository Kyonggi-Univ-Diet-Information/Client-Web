import type { ReportReason } from '@/entities/review/api/api.type';

import { ENDPOINT } from '@/shared/api';
import { Http } from '@/shared/api/api-handlers';

import { fetchReportReasons } from './fetchReportReasons';



// 모듈 모킹
jest.mock('@/shared/api/api-handlers');

describe('fetchReportReasons', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // console.error 모킹하여 테스트 출력 깔끔하게
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('신고 사유 목록을 성공적으로 가져온다', async () => {
    // Given: 신고 사유 목록 응답
    const mockReasons: ReportReason[] = [
      { type: 'SPAM', description: '스팸 또는 광고' },
      { type: 'INAPPROPRIATE', description: '부적절한 콘텐츠' },
      { type: 'HARASSMENT', description: '괴롭힘 또는 혐오 발언' },
      { type: 'FALSE_INFO', description: '허위 정보' },
    ];

    (Http.getDirect as jest.Mock).mockResolvedValue({
      result: mockReasons,
    });

    // When: fetchReportReasons 함수 호출
    const result = await fetchReportReasons();

    // Then: Http.getDirect가 올바른 파라미터로 호출됨
    expect(Http.getDirect).toHaveBeenCalledWith({
      request: ENDPOINT.REVIEW_REPORT.REASONS,
      cache: 'force-cache',
    });

    // Then: 신고 사유 목록 반환
    expect(result).toEqual(mockReasons);
  });

  it('빈 신고 사유 목록도 정상 처리한다', async () => {
    // Given: 빈 배열 응답
    (Http.getDirect as jest.Mock).mockResolvedValue({
      result: [],
    });

    // When: fetchReportReasons 함수 호출
    const result = await fetchReportReasons();

    // Then: 빈 배열 반환
    expect(result).toEqual([]);
  });

  it('API 에러 발생 시 빈 배열을 반환한다', async () => {
    // Given: Http.getDirect가 에러를 throw
    const mockError = new Error('네트워크 오류');
    (Http.getDirect as jest.Mock).mockRejectedValue(mockError);

    // When: fetchReportReasons 함수 호출
    const result = await fetchReportReasons();

    // Then: console.error가 호출됨
    expect(console.error).toHaveBeenCalledWith(
      'Failed to fetch report reasons:',
      mockError,
    );

    // Then: 빈 배열 반환 (에러를 throw하지 않음)
    expect(result).toEqual([]);
  });

  it('force-cache 옵션을 사용하여 캐싱한다', async () => {
    // Given: Http.getDirect가 성공적으로 응답
    (Http.getDirect as jest.Mock).mockResolvedValue({
      result: [{ type: 'SPAM', description: '스팸' }],
    });

    // When: fetchReportReasons 함수 호출
    await fetchReportReasons();

    // Then: force-cache 옵션이 포함됨
    expect(Http.getDirect).toHaveBeenCalledWith(
      expect.objectContaining({
        cache: 'force-cache',
      }),
    );
  });

  it('신고 사유가 올바른 형식으로 반환된다', async () => {
    // Given: 신고 사유 응답
    const mockReasons: ReportReason[] = [
      { type: 'SPAM', description: '스팸 또는 광고' },
      { type: 'INAPPROPRIATE', description: '부적절한 콘텐츠' },
    ];

    (Http.getDirect as jest.Mock).mockResolvedValue({
      result: mockReasons,
    });

    // When: fetchReportReasons 함수 호출
    const result = await fetchReportReasons();

    // Then: 각 항목이 type과 description을 가짐
    result.forEach(reason => {
      expect(reason).toHaveProperty('type');
      expect(reason).toHaveProperty('description');
      expect(typeof reason.type).toBe('string');
      expect(typeof reason.description).toBe('string');
    });
  });

  it('여러 번 호출해도 정상 작동한다 (캐싱 테스트)', async () => {
    // Given: Http.getDirect가 성공적으로 응답
    const mockReasons: ReportReason[] = [{ type: 'SPAM', description: '스팸' }];

    (Http.getDirect as jest.Mock).mockResolvedValue({
      result: mockReasons,
    });

    // When: 여러 번 호출
    const result1 = await fetchReportReasons();
    const result2 = await fetchReportReasons();
    const result3 = await fetchReportReasons();

    // Then: 모두 같은 결과 반환
    expect(result1).toEqual(mockReasons);
    expect(result2).toEqual(mockReasons);
    expect(result3).toEqual(mockReasons);

    // Then: API가 실제로는 3번 호출됨 (force-cache는 HTTP 레벨 캐싱)
    expect(Http.getDirect).toHaveBeenCalledTimes(3);
  });

  it('네트워크 타임아웃 에러도 안전하게 처리한다', async () => {
    // Given: 타임아웃 에러
    const timeoutError = new Error('Request timeout');
    timeoutError.name = 'TimeoutError';
    (Http.getDirect as jest.Mock).mockRejectedValue(timeoutError);

    // When: fetchReportReasons 함수 호출
    const result = await fetchReportReasons();

    // Then: 빈 배열 반환하고 에러 로깅
    expect(result).toEqual([]);
    expect(console.error).toHaveBeenCalled();
  });

  it('응답 형식이 잘못되어도 안전하게 처리한다', async () => {
    // Given: 잘못된 응답 형식
    (Http.getDirect as jest.Mock).mockResolvedValue({
      // result 없음
      data: [],
    });

    // When & Then: 에러 발생
    await expect(async () => {
      const result = await fetchReportReasons();
      // result가 undefined이면 에러
      if (result === undefined) throw new Error('Invalid response');
    }).rejects.toThrow();
  });
});

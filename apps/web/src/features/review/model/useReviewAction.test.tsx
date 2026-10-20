import { act, renderHook, waitFor } from '@testing-library/react';
import { SWRConfig } from 'swr';



import { removeReview } from '@/features/review/api/removeReview';
import { submitReviewBlock } from '@/features/review/api/submitReviewBlock';

import { FOOD_COURT } from '@/shared/api';

import { useReviewAction } from './useReviewAction';



// API 모듈 모킹
jest.mock('@/features/review/api/removeReview');
jest.mock('@/features/review/api/submitReviewBlock');
jest.mock('@/features/review/api/submitReviewReport');
jest.mock('@/features/review/api/fetchReportReasons', () => ({
  fetchReportReasons: jest.fn(() =>
    Promise.resolve([
      { type: 'SPAM', description: '스팸' },
      { type: 'ABUSE', description: '욕설/비방' },
    ]),
  ),
}));

// window.confirm 모킹
const mockConfirm = jest.fn(() => true);
window.confirm = mockConfirm;

// window.alert 모킹
const mockAlert = jest.fn();
window.alert = mockAlert;

describe('useReviewAction', () => {
  const mockType = FOOD_COURT.KYONGSUL;
  const mockFoodId = 456;
  const mockReviewId = 123;

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <SWRConfig
      value={
        { provider: () => new Map() } as React.ComponentProps<
          typeof SWRConfig
        >['value']
      }
    >
      {children}
    </SWRConfig>
  );

  beforeEach(() => {
    jest.clearAllMocks();
    mockConfirm.mockReturnValue(true);
  });

  describe('사용자 차단 (block)', () => {
    it('차단 성공 시 SWR mutate를 호출하여 리뷰 목록을 갱신한다', async () => {
      (submitReviewBlock as jest.Mock).mockResolvedValue({ success: true });

      const { result } = renderHook(
        () =>
          useReviewAction({
            type: mockType,
            foodId: mockFoodId,
            reviewId: mockReviewId,
            isMyReview: false,
          }),
        { wrapper },
      );

      await act(async () => {
        await result.current.handleAction('block');
      });

      await waitFor(() => {
        expect(submitReviewBlock).toHaveBeenCalledWith(
          mockReviewId,
          mockFoodId,
          mockType,
        );
      });

      expect(mockAlert).toHaveBeenCalledWith('사용자를 차단했습니다.');
    });

    it('차단 실패 시 에러 메시지를 표시한다', async () => {
      (submitReviewBlock as jest.Mock).mockResolvedValue({
        success: false,
        error: '차단에 실패했습니다',
      });

      const { result } = renderHook(
        () =>
          useReviewAction({
            type: mockType,
            foodId: mockFoodId,
            reviewId: mockReviewId,
            isMyReview: false,
          }),
        { wrapper },
      );

      await act(async () => {
        await result.current.handleAction('block');
      });

      await waitFor(() => {
        expect(mockAlert).toHaveBeenCalledWith('차단에 실패했습니다');
      });
    });

    it('사용자가 취소하면 차단하지 않는다', async () => {
      mockConfirm.mockReturnValue(false);

      const { result } = renderHook(
        () =>
          useReviewAction({
            type: mockType,
            foodId: mockFoodId,
            reviewId: mockReviewId,
            isMyReview: false,
          }),
        { wrapper },
      );

      await act(async () => {
        await result.current.handleAction('block');
      });

      expect(submitReviewBlock).not.toHaveBeenCalled();
    });

    it('차단 후 pending 상태가 올바르게 관리된다', async () => {
      (submitReviewBlock as jest.Mock).mockImplementation(
        () =>
          new Promise(resolve =>
            setTimeout(() => resolve({ success: true }), 100),
          ),
      );

      const { result } = renderHook(
        () =>
          useReviewAction({
            type: mockType,
            foodId: mockFoodId,
            reviewId: mockReviewId,
            isMyReview: false,
          }),
        { wrapper },
      );

      let actionPromise: Promise<void>;
      await act(async () => {
        actionPromise = result.current.handleAction('block');
      });

      await waitFor(() => {
        expect(result.current.pending).toBe(true);
      });

      await act(async () => {
        await actionPromise!;
      });
      await waitFor(() => {
        expect(result.current.pending).toBe(false);
      });
    });
  });

  describe('리뷰 삭제 (delete)', () => {
    it('본인 리뷰 삭제 시 removeReview를 호출한다', async () => {
      (removeReview as jest.Mock).mockResolvedValue({ success: true });

      const { result } = renderHook(
        () =>
          useReviewAction({
            type: mockType,
            foodId: mockFoodId,
            reviewId: mockReviewId,
            isMyReview: false,
          }),
        { wrapper },
      );

      await act(async () => {
        await result.current.handleAction('delete');
      });

      await waitFor(() => {
        expect(removeReview).toHaveBeenCalledWith(
          mockReviewId,
          mockFoodId,
          mockType,
        );
      });
    });
  });

  describe('리뷰 신고 (report)', () => {
    it('신고 다이얼로그를 표시한다', async () => {
      const { result } = renderHook(
        () =>
          useReviewAction({
            type: mockType,
            foodId: mockFoodId,
            reviewId: mockReviewId,
            isMyReview: false,
          }),
        { wrapper },
      );

      await act(async () => {
        await result.current.handleAction('report');
      });

      await waitFor(() => {
        expect(result.current.showReportDialog).toBe(true);
      });
    });
  });
});

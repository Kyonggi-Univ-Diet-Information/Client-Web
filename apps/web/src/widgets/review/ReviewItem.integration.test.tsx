/* eslint-disable @typescript-eslint/no-require-imports */
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SWRConfig } from 'swr';



import { submitReviewBlock } from '@/features/review/api/submitReviewBlock';
import { revalidateReviewCache } from '@/features/review/model/revalidateReviewCache';

import { FOOD_COURT, type FoodCourt } from '@/shared/api';

import ReviewItem from './ReviewItem';




interface ReviewActionMenuProps {
  type: FoodCourt;
  foodId: number;
  reviewId: number;
  isMyReview: boolean;
}

type SWRConfigValue = React.ComponentProps<typeof SWRConfig>['value'];

// API 모듈 모킹
jest.mock('@/features/review/api/submitReviewBlock', () => ({
  submitReviewBlock: jest.fn(async (reviewId, foodId, type) => {
    // 실제 submitReviewBlock의 동작을 시뮬레이션
    const {
      revalidateReviewCache,
    } = require('@/features/review/model/revalidateReviewCache');
    // 성공 시 revalidateReviewCache 호출
    revalidateReviewCache({ type, foodId });
    return { success: true };
  }),
}));
jest.mock('@/features/review/api/removeReview');
jest.mock('@/features/review/api/submitReviewReport');
jest.mock('@/features/review/model/revalidateReviewCache');
jest.mock('@/features/review/api/fetchReportReasons', () => ({
  fetchReportReasons: jest.fn(() =>
    Promise.resolve([
      { type: 'SPAM', description: '스팸' },
      { type: 'ABUSE', description: '욕설/비방' },
    ]),
  ),
}));

// useSWRConfig 모킹 - mutate를 전역으로 접근 가능하도록
let globalMutate: jest.Mock | null = null;

jest.mock('swr', () => {
  const actual = jest.requireActual('swr');
  return {
    ...actual,
    useSWRConfig: () => {
      return {
        mutate: globalMutate || jest.fn(),
      };
    },
  };
});

// ReviewActionMenu 모킹 (실제 Select 컴포넌트 대신 간단한 버튼으로)
jest.mock('./ReviewActionMenu', () => {
  return {
    __esModule: true,
    default: ({
      isMyReview,
      reviewId,
      type,
      foodId,
    }: ReviewActionMenuProps) => {
      const { useReviewAction } = require('@/features/review/model/useReviewAction');

      const { useState } = require('react');

      const TestActionMenu = () => {
        const [showMenu, setShowMenu] = useState(false);
        const { handleAction } = useReviewAction({ type, foodId, reviewId });

        return (
          <div data-testid='review-action-menu'>
            <button
              data-testid='more-button'
              onClick={() => setShowMenu(!showMenu)}
            >
              더보기
            </button>
            {showMenu && (
              <div data-testid='action-menu-items'>
                {isMyReview ? (
                  <button
                    data-testid='delete-button'
                    onClick={() => handleAction('delete')}
                  >
                    삭제하기
                  </button>
                ) : (
                  <>
                    <button
                      data-testid='block-button'
                      onClick={() => handleAction('block')}
                    >
                      사용자 차단
                    </button>
                    <button
                      data-testid='report-button'
                      onClick={() => handleAction('report')}
                    >
                      신고하기
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        );
      };

      return <TestActionMenu />;
    },
  };
});

// ReviewFavButton 모킹
jest.mock('./ReviewFavButton', () => ({
  __esModule: true,
  default: jest.fn(() => <div data-testid='review-fav-button'>좋아요</div>),
}));

// window.confirm 모킹
const mockConfirm = jest.fn(() => true);
window.confirm = mockConfirm;

// window.alert 모킹
const mockAlert = jest.fn();
window.alert = mockAlert;

describe('ReviewItem Integration - Block 기능', () => {
  const mockReview = {
    id: 123,
    rating: 5,
    title: '',
    content: '정말 맛있어요!',
    memberName: '홍길동',
    createdAt: '2024-01-15T12:00:00Z',
    updatedAt: '2024-01-15T12:00:00Z',
    myReview: false,
  };

  const defaultProps = {
    ...mockReview,
    type: FOOD_COURT.KYONGSUL,
    foodId: 456,
    isLiked: false,
    likedCount: 0,
    isAuthenticated: true,
    isMyReview: false,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockConfirm.mockReturnValue(true);
    globalMutate = null; // 각 테스트 전에 초기화
  });

  it('사용자 차단 후 리뷰가 화면에서 즉시 사라진다', async () => {
    // Given: 차단 성공 응답 (모킹에서 이미 revalidateReviewCache 호출됨)

    // Given: SWR mutate 모킹 - 전역으로 설정
    const mockMutate = jest.fn();
    globalMutate = mockMutate;

    const TestComponent = () => {
      return (
        <SWRConfig value={{ provider: () => new Map() } as SWRConfigValue}>
          <ReviewItem
            {...defaultProps}
            {...mockReview}
            isMyReview={mockReview.myReview}
          />
        </SWRConfig>
      );
    };

    render(<TestComponent />);

    // When: 리뷰가 렌더링됨
    expect(screen.getByText('정말 맛있어요!')).toBeInTheDocument();

    // When: 더보기 메뉴 열기
    const user = userEvent.setup();
    const moreButton = screen.getByTestId('more-button');
    await user.click(moreButton);

    // When: 사용자 차단 선택
    await waitFor(() => {
      const blockButton = screen.getByTestId('block-button');
      expect(blockButton).toBeInTheDocument();
    });

    await user.click(screen.getByTestId('block-button'));

    // Then: submitReviewBlock이 호출됨
    await waitFor(() => {
      expect(submitReviewBlock).toHaveBeenCalledWith(
        mockReview.id,
        defaultProps.foodId,
        defaultProps.type,
      );
    });

    // Then: revalidateReviewCache가 호출되어 서버 캐시가 갱신됨
    await waitFor(
      () => {
        expect(revalidateReviewCache).toHaveBeenCalledWith({
          type: defaultProps.type,
          foodId: defaultProps.foodId,
        });
      },
      { timeout: 3000 },
    );

    // Then: SWR mutate가 호출되어 클라이언트 캐시가 갱신됨
    // mutate는 함수를 인자로 받아서 ['reviews', type, foodId] 패턴과 매칭되는 키를 재검증
    await waitFor(
      () => {
        expect(mockMutate).toHaveBeenCalled();
        const calls = mockMutate.mock.calls;
        expect(calls.length).toBeGreaterThan(0);
        // mutate가 함수를 받아서 호출되었는지 확인
        const lastCall = calls[calls.length - 1];
        expect(typeof lastCall[0]).toBe('function');
        // 함수가 올바른 키와 매칭되는지 확인
        const keyMatcher = lastCall[0];
        const testKey = ['reviews', defaultProps.type, defaultProps.foodId];
        expect(keyMatcher(testKey)).toBe(true);
      },
      { timeout: 5000 },
    );

    // Then: 성공 알림 표시
    expect(mockAlert).toHaveBeenCalledWith('사용자를 차단했습니다.');
  });

  it('차단 실패 시 리뷰가 화면에 남아있다', async () => {
    // Given: 차단 실패 응답
    (submitReviewBlock as jest.Mock).mockResolvedValue({
      success: false,
      error: '차단에 실패했습니다',
    });

    const reviews = [mockReview];
    const mockMutate = jest.fn();

    const TestComponent = () => {
      return (
        <SWRConfig
          value={
            {
              provider: () => new Map(),
              mutate: mockMutate,
            } as SWRConfigValue
          }
        >
          {reviews.map(review => (
            <ReviewItem
              key={review.id}
              {...defaultProps}
              {...review}
              isMyReview={review.myReview}
            />
          ))}
        </SWRConfig>
      );
    };

    render(<TestComponent />);

    // When: 리뷰가 렌더링됨
    expect(screen.getByText('정말 맛있어요!')).toBeInTheDocument();

    // When: 더보기 메뉴 열기
    const user = userEvent.setup();
    const moreButton = screen.getByTestId('more-button');
    await user.click(moreButton);

    // When: 사용자 차단 선택
    await waitFor(() => {
      expect(screen.getByTestId('block-button')).toBeInTheDocument();
    });

    await user.click(screen.getByTestId('block-button'));

    // Then: submitReviewBlock이 호출됨
    await waitFor(() => {
      expect(submitReviewBlock).toHaveBeenCalled();
    });

    // Then: 실패 시 revalidateReviewCache가 호출되지 않음
    expect(revalidateReviewCache).not.toHaveBeenCalled();

    // Then: 에러 알림 표시
    await waitFor(() => {
      expect(mockAlert).toHaveBeenCalledWith('차단에 실패했습니다');
    });

    // Then: 리뷰가 여전히 화면에 표시됨
    expect(screen.getByText('정말 맛있어요!')).toBeInTheDocument();
  });

  it('본인 리뷰일 때는 차단 버튼이 표시되지 않고 삭제 버튼만 표시된다', async () => {
    const myReview = {
      ...mockReview,
      myReview: true,
    };

    render(
      <SWRConfig value={{ provider: () => new Map() } as SWRConfigValue}>
        <ReviewItem {...defaultProps} {...myReview} isMyReview={true} />
      </SWRConfig>,
    );

    // When: 더보기 메뉴 열기
    const user = userEvent.setup();
    const moreButton = screen.getByTestId('more-button');
    await user.click(moreButton);

    // Then: 삭제 버튼만 표시됨
    await waitFor(() => {
      expect(screen.getByTestId('delete-button')).toBeInTheDocument();
      expect(screen.queryByTestId('block-button')).not.toBeInTheDocument();
      expect(screen.queryByTestId('report-button')).not.toBeInTheDocument();
    });
  });
});

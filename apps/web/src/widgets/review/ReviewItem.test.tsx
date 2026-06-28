import { render, screen } from '@testing-library/react';

import { FOOD_COURT } from '@/shared/api';

import ReviewItem from './ReviewItem';



// ReviewActionMenu와 관련 모듈 모킹
jest.mock('./ReviewActionMenu', () => ({
  __esModule: true,
  default: jest.fn(({ isMyReview, reviewId, type, foodId }) => {
    return (
      <div data-testid='review-action-menu'>
        {isMyReview ? (
          <button data-testid='delete-button'>삭제하기</button>
        ) : (
          <>
            <button data-testid='block-button'>사용자 차단</button>
            <button data-testid='report-button'>신고하기</button>
          </>
        )}
        <span data-testid='review-id'>{reviewId}</span>
        <span data-testid='food-id'>{foodId}</span>
        <span data-testid='food-court'>{type}</span>
      </div>
    );
  }),
}));

// ReviewFavButton 모킹
jest.mock('./ReviewFavButton', () => ({
  __esModule: true,
  default: jest.fn(() => <div data-testid='review-fav-button'>좋아요</div>),
}));

describe('ReviewItem', () => {
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
  });

  it('리뷰 정보가 올바르게 렌더링된다', () => {
    render(<ReviewItem {...defaultProps} />);

    expect(screen.getByText('정말 맛있어요!')).toBeInTheDocument();
    // 마스킹된 이름 "홍**" 확인 (Avatar의 "홍"과 구분)
    expect(screen.getByText('홍**')).toBeInTheDocument();
  });

  describe('본인의 리뷰일 때', () => {
    it('삭제하기 버튼이 렌더링된다', () => {
      render(
        <ReviewItem {...defaultProps} isMyReview={true} myReview={true} />,
      );

      expect(screen.getByTestId('delete-button')).toBeInTheDocument();
      expect(screen.queryByTestId('block-button')).not.toBeInTheDocument();
      expect(screen.queryByTestId('report-button')).not.toBeInTheDocument();
    });

    it('ReviewActionMenu에 isMyReview=true가 전달된다', () => {
      render(
        <ReviewItem {...defaultProps} isMyReview={true} myReview={true} />,
      );

      const actionMenu = screen.getByTestId('review-action-menu');
      expect(actionMenu).toBeInTheDocument();
      expect(screen.getByTestId('delete-button')).toBeInTheDocument();
    });
  });

  describe('다른 사람의 리뷰일 때', () => {
    it('사용자 차단과 신고하기 버튼이 렌더링된다', () => {
      render(
        <ReviewItem {...defaultProps} isMyReview={false} myReview={false} />,
      );

      expect(screen.getByTestId('block-button')).toBeInTheDocument();
      expect(screen.getByTestId('report-button')).toBeInTheDocument();
      expect(screen.queryByTestId('delete-button')).not.toBeInTheDocument();
    });

    it('ReviewActionMenu에 isMyReview=false가 전달된다', () => {
      render(
        <ReviewItem {...defaultProps} isMyReview={false} myReview={false} />,
      );

      const actionMenu = screen.getByTestId('review-action-menu');
      expect(actionMenu).toBeInTheDocument();
      expect(screen.getByTestId('block-button')).toBeInTheDocument();
    });
  });

  it('인증되지 않은 사용자에게는 액션 메뉴가 표시되지 않는다', () => {
    render(<ReviewItem {...defaultProps} isAuthenticated={false} />);

    expect(screen.queryByTestId('review-action-menu')).not.toBeInTheDocument();
  });

  it('좋아요 버튼이 렌더링된다', () => {
    render(<ReviewItem {...defaultProps} />);

    expect(screen.getByTestId('review-fav-button')).toBeInTheDocument();
  });
});

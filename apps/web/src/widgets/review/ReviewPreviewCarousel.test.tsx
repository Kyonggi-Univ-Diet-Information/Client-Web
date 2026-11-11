import { render, screen } from '@testing-library/react';

import type { ReviewWithMetadata } from '@/features/review/api/getReviewsAction';

import ReviewPreviewCarousel from './ReviewPreviewCarousel';

const createReview = (id: number, content: string) =>
  ({
    id,
    content,
    rating: 5,
    memberName: '홍길동',
    createdAt: '2026.11.07 12:00',
  }) as ReviewWithMetadata;

describe('ReviewPreviewCarousel', () => {
  it('각 리뷰 카드를 누르면 리뷰 목록 페이지로 이동한다', () => {
    const href = '/review/ks/7/detail';

    render(
      <ReviewPreviewCarousel
        reviews={[createReview(1, '맛있어요'), createReview(2, '최고예요')]}
        href={href}
      />,
    );

    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(2);
    links.forEach(link => expect(link).toHaveAttribute('href', href));
  });

  it('리뷰에 키워드가 있으면 카드에 키워드 chip을 보여준다', () => {
    render(
      <ReviewPreviewCarousel
        reviews={[
          {
            ...createReview(1, '맛있어요'),
            saltLevel: 'HIGH',
            portionLevel: 'MID',
            spicyLevel: null,
          },
        ]}
        href='/review/ks/7/detail'
      />,
    );

    expect(screen.getByText('간이 짜요')).toBeInTheDocument();
    expect(screen.getByText('양이 딱 좋아요')).toBeInTheDocument();
    expect(screen.getAllByRole('listitem')).toHaveLength(2);
  });

  it('키워드가 없는 리뷰는 chip 목록을 보여주지 않는다', () => {
    render(
      <ReviewPreviewCarousel
        reviews={[createReview(1, '맛있어요')]}
        href='/review/ks/7/detail'
      />,
    );

    expect(screen.queryByRole('list')).not.toBeInTheDocument();
  });
});

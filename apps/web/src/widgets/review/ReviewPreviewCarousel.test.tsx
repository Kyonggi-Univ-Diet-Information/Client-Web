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
        menuName='마라소고기덮밥'
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
        menuName='마라소고기덮밥'
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
        menuName='마라소고기덮밥'
        href='/review/ks/7/detail'
      />,
    );

    expect(screen.queryByRole('list')).not.toBeInTheDocument();
  });

  it('카드에 작성일, 메뉴 이름, 사진을 디자인대로 보여준다', () => {
    render(
      <ReviewPreviewCarousel
        reviews={[
          {
            ...createReview(1, '맛있어요'),
            images: [
              { id: 1, url: 'https://example.com/1.png' },
              { id: 2, url: 'https://example.com/2.png' },
              { id: 3, url: 'https://example.com/3.png' },
            ],
          },
        ]}
        menuName='마라소고기덮밥'
        href='/review/ks/7/detail'
      />,
    );

    expect(screen.getByText('2026.11.07')).toBeInTheDocument();
    expect(screen.getByText('마라소고기덮밥')).toBeInTheDocument();
    expect(screen.getByText('5.0')).toBeInTheDocument();
    expect(screen.getAllByRole('img', { name: /리뷰 사진/ })).toHaveLength(2);
  });
});

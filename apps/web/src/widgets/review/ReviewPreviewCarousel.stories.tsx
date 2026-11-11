import type { Meta, StoryObj } from '@storybook/react';

import type { ReviewWithMetadata } from '@/features/review/api/getReviewsAction';

import ReviewPreviewCarousel from './ReviewPreviewCarousel';

const photo = (color: string) =>
  `data:image/svg+xml;utf8,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="84" height="84"><rect width="84" height="84" fill="${color}"/></svg>`,
  )}`;

const createReview = (
  id: number,
  overrides: Partial<ReviewWithMetadata> = {},
): ReviewWithMetadata => ({
  id,
  rating: 5,
  title: '',
  content:
    '진짜 맛있고 양도 많아요! 세번째 방문 중인거 같은데 만족해여 다음에도 또 먹을게요',
  memberName: '오수빈',
  createdAt: '2026.09.23 12:00',
  updatedAt: '2026.09.23 12:00',
  myReview: false,
  isMyReview: false,
  isLiked: false,
  likedCount: 0,
  ...overrides,
});

const meta = {
  title: 'Review/ReviewPreviewCarousel',
  component: ReviewPreviewCarousel,
  parameters: { layout: 'fullscreen' },
  decorators: [
    Story => (
      <div className='w-[390px] bg-white'>
        <Story />
      </div>
    ),
  ],
  args: {
    menuName: '마라소고기덮밥',
    href: '/review/ks/1/detail',
    reviews: [
      createReview(1, {
        images: [
          { id: 1, url: photo('#c9a27a') },
          { id: 2, url: photo('#a8553a') },
        ],
      }),
      createReview(2, {
        rating: 4,
        memberName: '김기룡',
        content: '간이 조금 짰지만 양이 많아서 좋았어요.',
        saltLevel: 'HIGH',
        portionLevel: 'HIGH',
      }),
    ],
  },
} satisfies Meta<typeof ReviewPreviewCarousel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithKeywordsAndPhotos: Story = {
  args: {
    reviews: [
      createReview(1, {
        saltLevel: 'MID',
        spicyLevel: 'MID',
        portionLevel: 'HIGH',
        valueLevel: 'HIGH',
        images: [
          { id: 1, url: photo('#c9a27a') },
          { id: 2, url: photo('#a8553a') },
          { id: 3, url: photo('#d8c7a8') },
        ],
      }),
    ],
  },
};

export const TextOnly: Story = {
  args: { reviews: [createReview(1, { content: '맛있어요' })] },
};

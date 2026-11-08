import type { Meta, StoryObj } from '@storybook/react';

import { FOOD_COURT } from '@/shared/api';

import ReviewItem from './ReviewItem';

// 음식 사진 대신 쓰는 단색 이미지예요
const photo = (color: string) =>
  `data:image/svg+xml;utf8,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="154" height="154"><rect width="154" height="154" fill="${color}"/></svg>`,
  )}`;

const meta = {
  title: 'Review/ReviewItem',
  component: ReviewItem,
  parameters: { layout: 'padded' },
  decorators: [
    Story => (
      <div className='w-[390px] bg-white'>
        <Story />
      </div>
    ),
  ],
  args: {
    type: FOOD_COURT.KYONGSUL,
    foodId: 1,
    id: 1,
    rating: 5,
    title: '',
    content:
      '후기 보고 많이 매울까 걱정했는데 생각보다 맵지 않고 너무 맛있었어요. 고기도 많고 청경채도 들어 있고 최고입니다. 꼭 드세요! 저는 벌써 두번 먹어봄',
    memberName: '오빈',
    createdAt: '2026-09-23T12:00:00Z',
    updatedAt: '2026-09-23T12:00:00Z',
    myReview: false,
    isMyReview: false,
    isLiked: false,
    likedCount: 3,
    isAuthenticated: true,
    saltLevel: 'MID',
    spicyLevel: null,
    portionLevel: 'HIGH',
    valueLevel: 'HIGH',
    images: [
      { id: 1, url: photo('#c9a27a') },
      { id: 2, url: photo('#a8553a') },
      { id: 3, url: photo('#d8c7a8') },
    ],
  },
} satisfies Meta<typeof ReviewItem>;

export default meta;
type Story = StoryObj<typeof meta>;

// Figma 시안(327:8973)과 같은 구성이에요
export const BestWithKeywords: Story = { args: { isBest: true } };

export const WithKeywords: Story = {};

export const AllKeywords: Story = {
  args: {
    saltLevel: 'LOW',
    spicyLevel: 'MID',
    portionLevel: 'HIGH',
    valueLevel: 'LOW',
  },
};

// 키워드 도입 전에 쓴 리뷰는 값이 null이라 키워드를 안 보여줘요
export const LegacyWithoutKeywords: Story = {
  args: {
    saltLevel: null,
    spicyLevel: null,
    portionLevel: null,
    valueLevel: null,
    images: undefined,
  },
};

export const Liked: Story = { args: { isLiked: true, likedCount: 4 } };

export const LoggedOut: Story = { args: { isAuthenticated: false } };

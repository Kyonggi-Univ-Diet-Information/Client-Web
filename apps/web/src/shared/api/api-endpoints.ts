import type { SubRestaurant } from '@/shared/constants/campus/restaurant';


export const PUBLIC_API_URL =
  process.env.NEXT_PUBLIC_API_URL || 'https://api.kiryong.kr/api';

export const POLICY_URL = {
  TERMS_OF_SERVICE:
    'https://abounding-mice-0a1.notion.site/2e7d8a0f1c3f8007a4d4c53c451fb684',
  PRIVACY_POLICY:
    'https://abounding-mice-0a1.notion.site/2e7d8a0f1c3f8042aea7cd51f36ea27d',
};

export const INQUIRY_URL = 'https://pf.kakao.com/_LxmSxhX/chat';

export const PATCHNOTE_URL =
  'https://abounding-mice-0a1.notion.site/26ad8a0f1c3f804398f1d2baa67d3457';

export const FOOD_COURT = {
  KYONGSUL: 'KYONGSUL',
  DORMITORY: 'DORMITORY',
  E_SQUARE: 'E_SQUARE',
  SALLY_BOX: 'SALLY_BOX',
} as const;

export const FOOD_COURT_ID: Record<FoodCourt, string> = {
  KYONGSUL: 'ks',
  DORMITORY: 'do',
  E_SQUARE: 'es',
  SALLY_BOX: 'sb',
} as const;

export const FOOD_COURT_NAME: Record<FoodCourt, string> = {
  KYONGSUL: '경슐랭',
  DORMITORY: '기숙사식당',
  E_SQUARE: '이스퀘어',
  SALLY_BOX: '샐리박스',
} as const;

export const FOOD_COURT_NAME_EN: Record<FoodCourt, string> = {
  KYONGSUL: 'Kyongsulin',
  DORMITORY: 'Dormitory',
  E_SQUARE: 'E-Square',
  SALLY_BOX: 'Sally Box',
} as const;

export type FoodCourt = keyof typeof FOOD_COURT;
export type FoodCourtId = (typeof FOOD_COURT_ID)[FoodCourt];
export type CampusFoodCourt = Exclude<FoodCourt, 'DORMITORY'>;

export const ID_TO_FOOD_COURT: Record<string, FoodCourt> = {
  ks: 'KYONGSUL',
  do: 'DORMITORY',
  es: 'E_SQUARE',
  sb: 'SALLY_BOX',
} as const;

export const ID_TO_CAMPUS_FOOD_COURT: Record<string, CampusFoodCourt> = {
  ks: 'KYONGSUL',
  es: 'E_SQUARE',
  sb: 'SALLY_BOX',
} as const;

export const getFoodCourtById = (id: string): CampusFoodCourt | undefined => {
  return ID_TO_CAMPUS_FOOD_COURT[id] as CampusFoodCourt | undefined;
};

export const ENDPOINT = {
  AUTH: {
    KAKAO_LOGIN: '/kakao-login',
    KAKAO_REVOKE: '/kakao-revoke',
    GOOGLE_LOGIN: '/google-login',
    GOOGLE_REVOKE: '/google-revoke',
    APPLE_LOGIN: '/apple-login',
    APPLE_LOGIN_URL: '/apple-form',
    APPLE_REVOKE: '/apple-revoke',
    REFRESH: '/token/refresh',
  },
  DORM: {
    DORM_MENU: '/diet-content/dormitory',
  },
  MENU: {
    TOP_MENU: '/food/top5-menu',
    MENU_ALL: (foodCourt: FoodCourt) => `/food/${foodCourt}/all`,
    MENU_BY_RESTAURANT: (
      foodCourt: CampusFoodCourt,
      restaurant: SubRestaurant,
    ) => `/food/${foodCourt}/restaurant/${restaurant}`,
    MENU_NAME: (foodCourt: FoodCourt, foodId: number) =>
      `/food/${foodCourt}/get-names/${foodId}`,
    MENU_BY_CATEGORY: (foodCourt: CampusFoodCourt) =>
      `/food/${foodCourt}/each-category`,
    HAS_SET: (type: CampusFoodCourt, baseFoodId: number) =>
      `/food/${type}/get-sets/${baseFoodId}`,
    MENU_DETAIL: (foodCourt: FoodCourt, foodId: number) =>
      `/food/${foodCourt}/${foodId}`,
    SEARCH: '/search',
  },
  REVIEW_R: {
    RECENT_REVIEW: '/review/top5-recent',
    COUNT: (foodCourt: FoodCourt, foodId: number) =>
      `/review/${foodCourt}/count/${foodId}`,
    PAGED: (foodCourt: FoodCourt, foodId: number) =>
      `/review/${foodCourt}/paged/${foodId}`,
    RATING: (foodCourt: FoodCourt, foodId: number) =>
      `/review/${foodCourt}/rating-count/${foodId}`,
    AVERAGE_RATING: (foodCourt: FoodCourt, foodId: number) =>
      `/review/${foodCourt}/average/${foodId}`,
  },
  REVIEW_CUD: {
    SUBMIT: (foodCourt: FoodCourt, foodId: number) =>
      `/review/${foodCourt}/new/${foodId}`,
    UPDATE: (foodCourt: FoodCourt, reviewId: number) =>
      `/review/${foodCourt}/modify/${reviewId}`,
    DELETE: (foodCourt: FoodCourt, reviewId: number) =>
      `/review/${foodCourt}/delete/${reviewId}`,
  },
  REVIEW_LIKE: {
    LIKE: (foodCourt: FoodCourt, reviewId: number) =>
      `/review/favorite/${foodCourt}/${reviewId}/create-favorite`,
    UNLIKE: (foodCourt: FoodCourt, reviewId: number) =>
      `/review/favorite/${foodCourt}/delete/${reviewId}`,
    LIKED_COUNT: (foodCourt: FoodCourt, reviewId: number) =>
      `/review/favorite/${foodCourt}/count/${reviewId}`,
  },
  REVIEW_BLOCK: {
    BLOCK: (foodCourt: FoodCourt, reviewId: number) =>
      `/review/${foodCourt}/block/${reviewId}`,
  },
  REVIEW_REPORT: {
    REASONS: '/review/report/reasons',
    REPORT: (foodCourt: FoodCourt, reviewId: number, reasonType: string) =>
      `/review/${foodCourt}/report/${reviewId}/${reasonType}`,
  },
  MEMBER: {
    MEMBER_INFO: '/my-page/info',
    MEMBER_PROVIDER: '/member/get-provider',
    MEMBER_REVIEW: '/my-page/reviews/written',
    MEMBER_FAV_REVIEW: '/my-page/reviews/favorited',
    MEMBER_REVIEW_LIKED: (foodCourt: FoodCourt) =>
      `/review/favorite/${foodCourt}/each-member/all`,
    MEMBER_REVOKE_REASON: '/withdraw/reasons',
    MEMBER_REVOKE_REASON_SUBMIT: (reasonType: string) =>
      `/withdraw/create/${reasonType}`,
  },
};

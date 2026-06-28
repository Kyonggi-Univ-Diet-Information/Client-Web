export const FOOD_TYPE = {
  DEFAULT: '',
  RICE_BOWL: 'RICE_BOWL',
  BIBIMBAP: 'BIBIMBAP',
  FRIED_RICE: 'FRIED_RICE',
  MEAT: 'MEAT',
  NOODLE: 'NOODLE',
  FRIED: 'FRIED',
  SNACK: 'SNACK',
  BURGER: 'BURGER',
  SOUP_STEW: 'SOUP_STEW',
  COFFEE: 'COFFEE',
  NON_COFFEE: 'NON_COFFEE',
  ETC: 'ETC',
} as const;

export const SORTING_TYPE = {
  BASIC: 'BASIC',
  REVIEW_COUNT_DESC: 'REVIEW_COUNT_DESC',
  RATING_DESC: 'RATING_DESC',
  PRICE_ASC: 'PRICE_ASC',
  PRICE_DESC: 'PRICE_DESC',
} as const;

export type FoodType = (typeof FOOD_TYPE)[keyof typeof FOOD_TYPE];
export type SortingType = (typeof SORTING_TYPE)[keyof typeof SORTING_TYPE];

export const FOOD_TYPE_NAME: Record<FoodType, string> = {
  [FOOD_TYPE.DEFAULT]: '전체',
  [FOOD_TYPE.RICE_BOWL]: '덮밥',
  [FOOD_TYPE.BIBIMBAP]: '비빔밥',
  [FOOD_TYPE.FRIED_RICE]: '볶음밥',
  [FOOD_TYPE.MEAT]: '고기',
  [FOOD_TYPE.NOODLE]: '면',
  [FOOD_TYPE.FRIED]: '튀김',
  [FOOD_TYPE.SNACK]: '분식',
  [FOOD_TYPE.BURGER]: '버거',
  [FOOD_TYPE.SOUP_STEW]: '국/찌개',
  [FOOD_TYPE.COFFEE]: '커피',
  [FOOD_TYPE.NON_COFFEE]: '음료',
  [FOOD_TYPE.ETC]: '기타',
};

export const SORTING_TYPE_NAME: Record<SortingType, string> = {
  [SORTING_TYPE.BASIC]: '기본',
  [SORTING_TYPE.REVIEW_COUNT_DESC]: '리뷰 많은 순',
  [SORTING_TYPE.RATING_DESC]: '평점 높은 순',
  [SORTING_TYPE.PRICE_ASC]: '가격 낮은 순',
  [SORTING_TYPE.PRICE_DESC]: '가격 높은 순',
};

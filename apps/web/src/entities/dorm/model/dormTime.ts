export const DORM_TIME = {
  BREAKFAST: '아침',
  LUNCH: '점심',
  DINNER: '저녁',
};

export type DormTime = keyof typeof DORM_TIME;

export const DORM_TIME_NAME = Object.keys(DORM_TIME) as DormTime[];

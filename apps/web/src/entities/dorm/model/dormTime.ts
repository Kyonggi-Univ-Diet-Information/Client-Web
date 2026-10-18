export const DORM_TIME = {
  BREAKFAST: '아침',
  LUNCH: '점심',
  DINNER: '저녁',
};

export type DormTime = keyof typeof DORM_TIME;

export const DORM_TIME_NAME = Object.keys(DORM_TIME) as DormTime[];

export const DORM_TIME_RANGE: Record<DormTime, { label: string; start: string; end: string }> = {
  BREAKFAST: { label: '07:30 - 09:00', start: '07:30', end: '09:00' },
  LUNCH: { label: '11:30 - 13:30', start: '11:30', end: '13:30' },
  DINNER: { label: '17:30 - 19:00', start: '17:30', end: '19:00' },
};

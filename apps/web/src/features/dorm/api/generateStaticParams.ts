import { DORM_DAY_KEY } from '@/entities/dorm/model/dormDay';

export interface DormDayParams {
  day: string;
}

export function generateDormDayParams(): DormDayParams[] {
  const days = Object.keys(DORM_DAY_KEY);

  return days.map(day => ({
    day,
  }));
}

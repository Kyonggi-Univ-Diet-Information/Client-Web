import { DormDay } from './dormDay';

/**
 * 특정 날짜가 주말인지 확인하는 함수
 */
export function isWeekend(day: DormDay) {
  return day === 'SATURDAY' || day === 'SUNDAY';
}

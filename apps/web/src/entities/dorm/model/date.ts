import { DORM_DAY_KEY, DormDay } from './dormDay';

/**
 * 현재 날짜를 기준으로 어제/내일 날짜를 계산하는 함수
 */
export function getAdjacentDates(currentDay: DormDay) {
  const currentDayIndex = Object.values(DORM_DAY_KEY).indexOf(currentDay);

  const yesterdayIndex = currentDayIndex === 0 ? 6 : currentDayIndex - 1;
  const tomorrowIndex = currentDayIndex === 6 ? 0 : currentDayIndex + 1;

  const yesterdayDateString = Object.values(DORM_DAY_KEY)[yesterdayIndex];
  const tomorrowDateString = Object.values(DORM_DAY_KEY)[tomorrowIndex];

  return {
    yesterday: yesterdayDateString,
    tomorrow: tomorrowDateString,
  };
}

/**
 * 특정 날짜가 주말인지 확인하는 함수
 */
export function isWeekend(day: DormDay) {
  return day === 'SATURDAY' || day === 'SUNDAY';
}

/**
 * 특정 날짜가 일요일인지 확인하는 함수
 */
export function isSunday(day: DormDay) {
  return day === 'SUNDAY';
}

/**
 * 특정 날짜가 토요일인지 확인하는 함수
 */
export function isSaturday(day: DormDay) {
  return day === 'SATURDAY';
}

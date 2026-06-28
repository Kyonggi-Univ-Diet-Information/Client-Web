import dayjs from 'dayjs-ext';

/**
 * 서버-클라이언트 간 일관된 날짜 처리를 위한 유틸리티 함수들
 */

/**
 * 현재 날짜를 안전하게 가져오는 함수
 * 서버와 클라이언트에서 동일한 결과를 보장
 */
export function getCurrentDate(): Date {
  // 서버에서는 UTC 기준으로, 클라이언트에서는 로컬 시간 기준으로 처리
  return new Date();
}

/**
 * 한국 시간대를 고려한 날짜 포맷팅
 * 서버와 클라이언트에서 일관된 결과를 보장
 */
export function formatKoreanDate(
  date: Date,
  options: Intl.DateTimeFormatOptions = {},
): string {
  const defaultOptions: Intl.DateTimeFormatOptions = {
    timeZone: 'Asia/Seoul',
    ...options,
  };

  return date.toLocaleDateString('ko-KR', defaultOptions);
}

/**
 * 한국 시간대를 고려한 날짜-시간 포맷팅
 */
export function formatKoreanDateTime(
  date: Date,
  options: Intl.DateTimeFormatOptions = {},
): string {
  const defaultOptions: Intl.DateTimeFormatOptions = {
    timeZone: 'Asia/Seoul',
    ...options,
  };

  return date.toLocaleString('ko-KR', defaultOptions);
}

/**
 * 주의 시작일(일요일)을 구하는 함수
 * 한국 시간대 기준으로 처리
 */
export function getWeekStart(date: Date): Date {
  const koreanDate = new Date(
    date.toLocaleString('en-US', { timeZone: 'Asia/Seoul' }),
  );
  const start = new Date(koreanDate);
  start.setDate(koreanDate.getDate() - koreanDate.getDay());
  start.setHours(0, 0, 0, 0);
  return start;
}

/**
 * 주의 날짜들을 구하는 함수
 */
export function getWeekDates(startDate: Date): Date[] {
  return Array.from({ length: 7 }, (_, i) => {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);
    return date;
  });
}

/**
 * 두 날짜가 같은 날인지 확인하는 함수
 * 한국 시간대 기준으로 처리
 */
export function isSameDay(date1: Date, date2: Date): boolean {
  const koreanDate1 = new Date(
    date1.toLocaleString('en-US', { timeZone: 'Asia/Seoul' }),
  );
  const koreanDate2 = new Date(
    date2.toLocaleString('en-US', { timeZone: 'Asia/Seoul' }),
  );

  return (
    koreanDate1.getFullYear() === koreanDate2.getFullYear() &&
    koreanDate1.getMonth() === koreanDate2.getMonth() &&
    koreanDate1.getDate() === koreanDate2.getDate()
  );
}

/**
 * 오늘 날짜인지 확인하는 함수
 */
export function isToday(date: Date): boolean {
  return isSameDay(date, getCurrentDate());
}

export const WEEKDAYS = ['일', '월', '화', '수', '목', '금', '토'] as const;

export type Weekday = (typeof WEEKDAYS)[number];

/**
 * API에서 오는 리뷰 날짜 문자열을 Date로 파싱
 * - "YYYY.MM.DD HH:mm" (예: 2026.01.26 19:47) → 로컬(한국) 기준으로 파싱
 * - ISO 8601 등 그 외 → new Date(value) 폴백
 */
export function parseReviewDate(value: string): Date {
  const match = value.match(/^(\d{4})\.(\d{2})\.(\d{2})\s+(\d{1,2}):(\d{2})$/);
  if (match) {
    const [, y, m, d, h, min] = match;
    return new Date(+y, +m - 1, +d, +h, +min, 0, 0);
  }
  return new Date(value);
}

/**
 * 상대 날짜를 반환하는 함수
 * 한국 시간대 기준으로 처리
 */
export function getRelativeDate(date: Date): string {
  const now = new Date(
    new Date().toLocaleString('en-US', { timeZone: 'Asia/Seoul' }),
  );

  const diffDays = Math.abs(dayjs(date).diff(dayjs(now), 'day'));
  const diffHours = Math.abs(dayjs(date).diff(dayjs(now), 'hour'));
  const diffMinutes = Math.abs(dayjs(date).diff(dayjs(now), 'minute'));

  if (diffMinutes < 1) {
    return '방금 전';
  }

  if (diffMinutes > 0 && diffMinutes < 60) {
    return `${diffMinutes}분 전`;
  }

  if (diffHours > 0 && diffHours < 24) {
    return `${diffHours}시간 전`;
  }

  if (diffDays > 0 && diffDays < 30) {
    return `${diffDays}일 전`;
  }

  return dayjs(date).format('YYYY년 MM월 D일');
}

import {
  formatKoreanDate,
  formatKoreanDateTime,
  getCurrentDate,
  getRelativeDate,
  getWeekDates,
  getWeekStart,
  isSameDay,
  isToday,
  parseReviewDate,
  WEEKDAYS,
} from './date';

describe('Date Utility Functions', () => {
  describe('getCurrentDate', () => {
    it('현재 날짜를 반환한다', () => {
      const result = getCurrentDate();
      expect(result).toBeInstanceOf(Date);
      expect(result.getTime()).toBeLessThanOrEqual(Date.now());
    });
  });

  describe('formatKoreanDate', () => {
    it('한국 시간대로 날짜를 포맷팅한다', () => {
      const date = new Date('2024-01-15T12:00:00Z');
      const formatted = formatKoreanDate(date);

      // 한국어 로케일 형식으로 포맷팅되었는지 확인
      expect(formatted).toMatch(/2024/);
      expect(formatted).toMatch(/1/);
    });

    it('커스텀 옵션으로 날짜를 포맷팅한다', () => {
      const date = new Date('2024-01-15T12:00:00Z');
      const formatted = formatKoreanDate(date, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });

      expect(formatted).toBeTruthy();
    });
  });

  describe('formatKoreanDateTime', () => {
    it('한국 시간대로 날짜와 시간을 포맷팅한다', () => {
      const date = new Date('2024-01-15T12:00:00Z');
      const formatted = formatKoreanDateTime(date);

      expect(formatted).toBeTruthy();
      expect(typeof formatted).toBe('string');
    });
  });

  describe('getWeekStart', () => {
    it('주의 시작일(일요일)을 반환한다', () => {
      // 2024년 1월 17일은 수요일
      const wednesday = new Date('2024-01-17T12:00:00Z');
      const weekStart = getWeekStart(wednesday);

      // 일요일인 1월 14일이어야 함
      expect(weekStart.getDay()).toBe(0); // 0 = 일요일
      expect(weekStart.getHours()).toBe(0);
      expect(weekStart.getMinutes()).toBe(0);
      expect(weekStart.getSeconds()).toBe(0);
    });
  });

  describe('getWeekDates', () => {
    it('주의 모든 날짜를 반환한다 (7일)', () => {
      const startDate = new Date('2024-01-14'); // 일요일
      const weekDates = getWeekDates(startDate);

      expect(weekDates).toHaveLength(7);
      expect(weekDates[0].getDay()).toBe(0); // 일요일
      expect(weekDates[6].getDay()).toBe(6); // 토요일
    });
  });

  describe('isSameDay', () => {
    it('같은 날짜인 경우 true를 반환한다', () => {
      // 한국시간 기준으로 같은 날 (2024-01-15)
      const date1 = new Date('2024-01-15T00:00:00+09:00');
      const date2 = new Date('2024-01-15T23:59:59+09:00');

      expect(isSameDay(date1, date2)).toBe(true);
    });

    it('다른 날짜인 경우 false를 반환한다', () => {
      // 한국시간 기준으로 다른 날
      const date1 = new Date('2024-01-15T23:59:59+09:00');
      const date2 = new Date('2024-01-16T00:00:01+09:00');

      expect(isSameDay(date1, date2)).toBe(false);
    });
  });

  describe('isToday', () => {
    it('오늘 날짜인 경우 true를 반환한다', () => {
      const today = new Date();
      expect(isToday(today)).toBe(true);
    });

    it('어제 날짜인 경우 false를 반환한다', () => {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      expect(isToday(yesterday)).toBe(false);
    });
  });

  describe('parseReviewDate', () => {
    it('YYYY.MM.DD HH:mm 형식을 로컬 Date로 파싱한다', () => {
      const d = parseReviewDate('2026.01.26 19:47');
      expect(d.getFullYear()).toBe(2026);
      expect(d.getMonth()).toBe(0);
      expect(d.getDate()).toBe(26);
      expect(d.getHours()).toBe(19);
      expect(d.getMinutes()).toBe(47);
    });

    it('ISO 8601 형식은 new Date로 폴백한다', () => {
      const iso = '2024-01-15T12:00:00Z';
      const d = parseReviewDate(iso);
      expect(d.getTime()).toBe(new Date(iso).getTime());
    });
  });

  describe('getRelativeDate', () => {
    beforeEach(() => {
      // 현재 시간을 고정 (2024-01-15 12:00:00)
      jest.useFakeTimers();
      jest.setSystemTime(new Date('2024-01-15T03:00:00Z')); // 한국시간 12:00
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    it('1분 미만인 경우 "방금 전"을 반환한다', () => {
      const now = new Date('2024-01-15T03:00:00Z');
      expect(getRelativeDate(now)).toBe('방금 전');
    });

    it('1시간 미만인 경우 "N분 전"을 반환한다', () => {
      const date = new Date('2024-01-15T02:30:00Z'); // 30분 전
      const result = getRelativeDate(date);
      expect(result).toMatch(/분 전/);
    });

    it('24시간 미만인 경우 "N시간 전"을 반환한다', () => {
      const date = new Date('2024-01-14T23:00:00Z'); // 4시간 전
      const result = getRelativeDate(date);
      expect(result).toMatch(/시간 전/);
    });

    it('30일 미만인 경우 "N일 전"을 반환한다', () => {
      const date = new Date('2024-01-10T03:00:00Z'); // 5일 전
      const result = getRelativeDate(date);
      expect(result).toMatch(/일 전/);
    });

    it('30일 이상인 경우 전체 날짜를 반환한다', () => {
      const date = new Date('2023-12-01T03:00:00Z');
      const result = getRelativeDate(date);
      expect(result).toMatch(/2023년/);
    });
  });

  describe('WEEKDAYS', () => {
    it('한글 요일 배열이 올바르게 정의되어 있다', () => {
      expect(WEEKDAYS).toEqual(['일', '월', '화', '수', '목', '금', '토']);
      expect(WEEKDAYS).toHaveLength(7);
    });
  });
});

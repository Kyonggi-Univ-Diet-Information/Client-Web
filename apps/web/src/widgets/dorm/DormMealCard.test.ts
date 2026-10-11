import { isServingNow } from './DormMealCard';

describe('isServingNow', () => {
  afterEach(() => {
    jest.useRealTimers();
  });

  it('배식 시간(07:30~09:00) 이내면 true를 반환한다', () => {
    jest.useFakeTimers().setSystemTime(new Date(2026, 0, 1, 8, 0));
    expect(isServingNow('BREAKFAST')).toBe(true);
  });

  it('배식 시간 종료 직후에는 false를 반환한다', () => {
    jest.useFakeTimers().setSystemTime(new Date(2026, 0, 1, 9, 0));
    expect(isServingNow('BREAKFAST')).toBe(false);
  });

  it('배식 시간 이전에는 false를 반환한다', () => {
    jest.useFakeTimers().setSystemTime(new Date(2026, 0, 1, 7, 0));
    expect(isServingNow('BREAKFAST')).toBe(false);
  });
});

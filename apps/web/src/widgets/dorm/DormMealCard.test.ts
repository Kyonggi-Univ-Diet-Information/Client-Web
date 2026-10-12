import { getServingStatus } from './DormMealCard';

describe('getServingStatus', () => {
  afterEach(() => {
    jest.useRealTimers();
  });

  it('배식 시간(07:30~09:00) 이내면 배식 중을 반환한다', () => {
    jest.useFakeTimers().setSystemTime(new Date(2026, 0, 1, 8, 0));
    expect(getServingStatus('BREAKFAST')).toBe('배식 중');
  });

  it('배식 시간 종료 직후에는 배식 종료를 반환한다', () => {
    jest.useFakeTimers().setSystemTime(new Date(2026, 0, 1, 9, 0));
    expect(getServingStatus('BREAKFAST')).toBe('배식 종료');
  });

  it('배식 시간 이전에는 배식 예정을 반환한다', () => {
    jest.useFakeTimers().setSystemTime(new Date(2026, 0, 1, 7, 0));
    expect(getServingStatus('BREAKFAST')).toBe('배식 예정');
  });
});

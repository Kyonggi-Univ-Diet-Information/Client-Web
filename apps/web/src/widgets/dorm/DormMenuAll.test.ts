import { getDisplayStatus } from './DormMenuAll';

describe('getDisplayStatus', () => {
  it('주말에 메뉴가 없으면 미운영으로 본다', () => {
    expect(
      getDisplayStatus({
        status: 'NO_DATA',
        isWeekend: true,
        isWeekMenuUploaded: false,
      }),
    ).toBe('CLOSED');
    expect(
      getDisplayStatus({
        status: undefined,
        isWeekend: true,
        isWeekMenuUploaded: true,
      }),
    ).toBe('CLOSED');
  });

  it('주말이어도 메뉴가 있으면 그대로 보여준다', () => {
    expect(
      getDisplayStatus({
        status: 'OPEN',
        isWeekend: true,
        isWeekMenuUploaded: true,
      }),
    ).toBe('OPEN');
  });

  it('평일에 주간 메뉴가 업로드되기 전이면 CLOSED여도 정보 없음으로 본다', () => {
    expect(
      getDisplayStatus({
        status: 'CLOSED',
        isWeekend: false,
        isWeekMenuUploaded: false,
      }),
    ).toBe('NO_DATA');
  });

  it('평일에 주간 메뉴가 업로드됐으면 CLOSED는 미운영으로 본다', () => {
    expect(
      getDisplayStatus({
        status: 'CLOSED',
        isWeekend: false,
        isWeekMenuUploaded: true,
      }),
    ).toBe('CLOSED');
  });
});

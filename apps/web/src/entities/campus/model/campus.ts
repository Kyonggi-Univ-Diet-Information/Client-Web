import { FOOD_COURT_ID, FOOD_COURT_NAME } from '@/shared/api';
import { CAMPUS_FOOD_COURTS } from '@/shared/constants/campus/restaurant';


interface MainTab {
  key: string;
  label: string;
  href: string;
}

export function getCampusMainTabs(
  locale: string,
  dormLabel: string,
  today: number = new Date().getDay(),
): MainTab[] {
  return [
    ...CAMPUS_FOOD_COURTS.map(id => ({
      key: FOOD_COURT_ID[id],
      label: FOOD_COURT_NAME[id],
      href: `/campus/${FOOD_COURT_ID[id]}`,
    })),
    {
      key: 'dorm',
      label: dormLabel,
      href: `/campus/dorm/${today}`,
    },
  ];
}

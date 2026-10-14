import type {
  CampusMenuSort,
  CampusMenuWithCategory,
} from '@/entities/campus/api/api.type';

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

const byRating = (a: CampusMenuWithCategory, b: CampusMenuWithCategory) =>
  (b.averageRating ?? -1) - (a.averageRating ?? -1);
const byReviewCount = (a: CampusMenuWithCategory, b: CampusMenuWithCategory) =>
  (b.reviewCount ?? 0) - (a.reviewCount ?? 0);

// 서버 정렬은 카테고리 안에서만 적용돼서, 카테고리를 합친 전체 목록은 같은 기준으로 다시 정렬해요
export function sortCampusMenus(
  menus: CampusMenuWithCategory[],
  sort: CampusMenuSort,
): CampusMenuWithCategory[] {
  const compare = {
    rating: (a: CampusMenuWithCategory, b: CampusMenuWithCategory) =>
      byRating(a, b) || byReviewCount(a, b),
    review_count: (a: CampusMenuWithCategory, b: CampusMenuWithCategory) =>
      byReviewCount(a, b) || byRating(a, b),
    name: (a: CampusMenuWithCategory, b: CampusMenuWithCategory) =>
      a.name.localeCompare(b.name, 'ko'),
  }[sort];

  return [...menus].sort(compare);
}

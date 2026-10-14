import type { CampusMenuWithCategory } from '@/entities/campus/api/api.type';

import { sortCampusMenus } from './campus';

const menu = (
  name: string,
  averageRating: number | null,
  reviewCount: number | null,
) => ({ name, averageRating, reviewCount }) as CampusMenuWithCategory;

describe('sortCampusMenus', () => {
  const menus = [
    menu('다', null, null),
    menu('가', 4, 2),
    menu('나', 5, 1),
    menu('라', 5, 3),
  ];
  const names = (sort: Parameters<typeof sortCampusMenus>[1]) =>
    sortCampusMenus(menus, sort).map(m => m.name);

  it('평점순은 평점이 같으면 리뷰 많은 메뉴를 앞에, 평점 없는 메뉴는 맨 뒤에 둔다', () => {
    expect(names('rating')).toEqual(['라', '나', '가', '다']);
  });

  it('리뷰 많은순은 리뷰가 같으면 평점 높은 메뉴를 앞에 둔다', () => {
    expect(names('review_count')).toEqual(['라', '가', '나', '다']);
  });

  it('가나다순으로 정렬한다', () => {
    expect(names('name')).toEqual(['가', '나', '다', '라']);
  });
});

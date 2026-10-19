import { ChipNavigation } from '@kiryong/design-system';

import { fetchCampusMenuByCategory } from '@/features/campus/api/fetchCampusMenuByCategory';

import type {
  CampusMenuSort,
  CampusMenuWithCategory,
} from '@/entities/campus/api/api.type';
import { sortCampusMenus } from '@/entities/campus/model/campus';

import {
  type FoodCourt,
  type CampusFoodCourt,
  FOOD_COURT_ID,
} from '@/shared/api';
import { CATEGORY_TO_TEXT } from '@/shared/constants/campus/menu';

import CampusMenuCard from './CampusMenuCard';
import CampusMenuListHeader from './CampusMenuListHeader';
import { CAMPUS_SORT_LABEL } from './CampusSortSheet';

interface CampusMenuByFoodCourtProps {
  foodCourt: CampusFoodCourt;
  categoryKey?: string;
  sort?: CampusMenuSort;
}

export default async function CampusMenuByFoodCourt({
  foodCourt,
  categoryKey,
  sort,
}: CampusMenuByFoodCourtProps) {
  const { categories, menusByCategory } = await fetchCampusMenuByCategory(
    foodCourt,
    undefined,
    sort,
  );

  const categoryTexts = CATEGORY_TO_TEXT;

  let displayMenus: CampusMenuWithCategory[] = [];

  let totalCount = 0;

  if (categoryKey && menusByCategory[categoryKey]) {
    displayMenus = menusByCategory[categoryKey];
    totalCount = displayMenus.length;
  } else {
    displayMenus = Object.values(menusByCategory).flat();
    if (sort) displayMenus = sortCampusMenus(displayMenus, sort);
    totalCount = displayMenus.length;
  }

  const foodCourtId = FOOD_COURT_ID[foodCourt as keyof typeof FOOD_COURT_ID];

  const currentPath = categoryKey
    ? `/campus/${foodCourtId}/${categoryKey}`
    : `/campus/${foodCourtId}`;
  const sortHref = `/campus/sort?from=${encodeURIComponent(currentPath)}${sort ? `&sort=${sort}` : ''}`;

  const categoryTabs = [
    { key: 'all', label: '전체', href: `/campus/${foodCourtId}` },
    ...categories.map(key => ({
      key,
      label: categoryTexts[key] || key,
      href: `/campus/${foodCourtId}/${key}`,
    })),
  ];

  return (
    <>
      <ChipNavigation
        tabs={categoryTabs}
        currentTabKey={categoryKey ?? 'all'}
        variant='black'
        size='small'
        className='border-b-0 pb-0'
      />

      <CampusMenuListHeader
        totalCount={totalCount}
        sortHref={sortHref}
        sortLabel={sort && CAMPUS_SORT_LABEL[sort]}
      />

      <div className='flex flex-col md:grid md:grid-cols-2 md:gap-4'>
        {displayMenus.length > 0 &&
          displayMenus.map(menu => (
            <CampusMenuCard
              key={menu.id}
              {...menu}
              foodCourt={foodCourt as FoodCourt}
            />
          ))}
      </div>
    </>
  );
}

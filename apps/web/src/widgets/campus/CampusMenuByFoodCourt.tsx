import { fetchCampusMenuByCategory } from '@/features/campus/api/fetchCampusMenuByCategory';

import type { CampusMenuSort, CampusMenuWithCategory } from '@/entities/campus/api/api.type';

import { type FoodCourt, type CampusFoodCourt, FOOD_COURT_ID } from '@/shared/api';
import { CATEGORY_TO_TEXT } from '@/shared/constants/campus/menu';
import { ChipNavigation } from '@/shared/ui';

import CampusMenuCard from './CampusMenuCard';
import CampusMenuListHeader from './CampusMenuListHeader';


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
    totalCount = displayMenus.length;
  }

  const foodCourtId = FOOD_COURT_ID[foodCourt as keyof typeof FOOD_COURT_ID];


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

      <CampusMenuListHeader totalCount={totalCount} />

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

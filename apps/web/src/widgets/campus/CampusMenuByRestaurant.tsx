import { fetchCampusMenuByCategory } from '@/features/campus/api/fetchCampusMenuByCategory';

import type { CampusMenuSort, CampusMenuWithCategory } from '@/entities/campus/api/api.type';

import { getFoodCourtById } from '@/shared/api';
import { CATEGORY_TO_TEXT } from '@/shared/constants/campus/menu';
import {
  CAMPUS_RESTAURANT_ID,
  hasSubRestaurants,
} from '@/shared/constants/campus/restaurant';
import { ChipNavigation } from '@/shared/ui';

import CampusMenuCard from './CampusMenuCard';
import CampusMenuListHeader from './CampusMenuListHeader';
import { CAMPUS_SORT_LABEL } from './CampusSortSheet';


interface CampusMenuByRestaurantProps {
  foodCourtId: string;
  restaurantId: string;
  categoryKey?: string;
  sort?: CampusMenuSort;
}

export default async function CampusMenuByRestaurant({
  foodCourtId,
  restaurantId,
  categoryKey,
  sort,
}: CampusMenuByRestaurantProps) {
  const foodCourt = getFoodCourtById(foodCourtId);
  if (!foodCourt) {
    return null;
  }

  const currentRestaurant = hasSubRestaurants(foodCourt)
    ? CAMPUS_RESTAURANT_ID[restaurantId]
    : undefined;

  const { categories, menusByCategory } = await fetchCampusMenuByCategory(
    foodCourt,
    currentRestaurant,
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

  const currentPath = categoryKey
    ? `/campus/${foodCourtId}/${restaurantId}/${categoryKey}`
    : `/campus/${foodCourtId}/${restaurantId}`;
  const sortHref = `/campus/sort?from=${encodeURIComponent(currentPath)}${sort ? `&sort=${sort}` : ''}`;

  const categoryTabs = [
    { key: 'all', label: '전체', href: `/campus/${foodCourtId}/${restaurantId}` },
    ...categories.map(key => ({
      key,
      label: categoryTexts[key] || key,
      href: `/campus/${foodCourtId}/${restaurantId}/${key}`,
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
            <CampusMenuCard key={menu.id} {...menu} foodCourt={foodCourt} />
          ))}
      </div>
    </>
  );
}

import Link from 'next/link';



import { fetchCampusMenuByCategory } from '@/features/campus/api/fetchCampusMenuByCategory';

import type { CampusMenuWithCategory } from '@/entities/campus/api/api.type';

import { type FoodCourt, type CampusFoodCourt, FOOD_COURT_ID } from '@/shared/api';
import { CATEGORY_TO_TEXT } from '@/shared/constants/campus/menu';
import { cn } from '@/shared/lib';

import CampusMenuCard from './CampusMenuCard';


interface CampusMenuByFoodCourtProps {
  foodCourt: CampusFoodCourt;
  categoryKey?: string;
}

export default async function CampusMenuByFoodCourt({
  foodCourt,
  categoryKey,
}: CampusMenuByFoodCourtProps) {
  const { categories, menusByCategory } =
    await fetchCampusMenuByCategory(foodCourt);

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

  return (
    <>
      <div className='flex items-center justify-between gap-4'>
        <div className='scrollbar-hide flex items-center divide-x divide-gray-200 overflow-x-scroll text-sm'>
          <Link
            prefetch
            href={`/campus/${foodCourtId}`}
            className={cn(
              !categoryKey ? 'text-point font-bold' : '',
              'cursor-pointer pr-2 text-nowrap',
            )}
          >
            전체
          </Link>
          {categories.map(key => (
            <Link
              prefetch
              key={key}
              href={`/campus/${foodCourtId}/${key}`}
              className={cn(
                categoryKey === key ? 'text-point font-bold' : '',
                'cursor-pointer px-2 text-nowrap',
              )}
            >
              {categoryTexts[key] || key}
            </Link>
          ))}
        </div>
        <span className='rounded-full bg-gray-100 px-3 py-1.5 text-sm whitespace-nowrap text-gray-600'>
          총 {totalCount}개
        </span>
      </div>

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

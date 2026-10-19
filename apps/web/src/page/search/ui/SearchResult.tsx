import { type ReactNode } from 'react';

import { CampusMenuCard } from '@/widgets/campus';
import CampusMenuListHeader from '@/widgets/campus/CampusMenuListHeader';

import { fetchSearch } from '@/features/search/api/fetchSearch';

import {
  SORTING_TYPE_NAME,
  type SortingType,
} from '@/entities/search/model/search';

import { FOOD_COURT_NAME, type FoodCourt } from '@/shared/api/api-endpoints';
import { CAMPUS_RESTAURANT } from '@/shared/constants/campus/restaurant';

export default async function SearchResult({
  q,
  restaurantType,
  sort,
}: {
  q: string;
  restaurantType: FoodCourt;
  sort: SortingType;
}): Promise<ReactNode> {
  const results = await fetchSearch({
    keyword: q,
    restaurantType,
    priceMin: 0,
    priceMax: 100000,
    sortingType: sort,
  });

  if (!results || results.length === 0) {
    return (
      <div className='flex h-[300px] w-full items-center justify-center text-center text-grey-600'>
        해당 조건에 대한 검색 결과가 없습니다.
      </div>
    );
  }

  const params = new URLSearchParams({ q, restaurantType });
  const from = `/search/result?${params.toString()}`;
  const sortHref = `/search/sort?from=${encodeURIComponent(from)}&sort=${sort}`;

  return (
    <>
      <CampusMenuListHeader
        totalCount={results.length}
        sortHref={sortHref}
        sortLabel={SORTING_TYPE_NAME[sort]}
        className='h-[46px]'
      />
      <div className='flex flex-col md:grid md:grid-cols-2 md:gap-4'>
        {results.map(menu => (
          <CampusMenuCard
            key={`${menu.restaurantType}-${menu.menuId}`}
            id={menu.menuId}
            name={menu.name}
            nameEn={menu.nameEn}
            price={menu.price}
            subRestaurant={menu.subRestaurant}
            averageRating={menu.averageRating > 0 ? menu.averageRating : null}
            reviewCount={menu.reviewCount}
            foodCourt={menu.restaurantType}
            location={[
              FOOD_COURT_NAME[menu.restaurantType],
              ...(menu.subRestaurant
                ? [CAMPUS_RESTAURANT[menu.subRestaurant]]
                : []),
            ]}
          />
        ))}
      </div>
    </>
  );
}

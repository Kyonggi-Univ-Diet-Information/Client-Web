import { ChipNavigation } from '@kiryong/design-system';
import { Suspense } from 'react';

import { SearchResult, SearchSkeleton } from '@/page/search';

import { SORTING_TYPE, type SortingType } from '@/entities/search/model/search';

import { FOOD_COURT, FOOD_COURT_NAME, type FoodCourt } from '@/shared/api';

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{
    q: string;
    restaurantType: FoodCourt;
    sort: SortingType;
  }>;
}) {
  const {
    q = '',
    restaurantType = 'ALL' as FoodCourt,
    sort = SORTING_TYPE.BASIC,
  } = await searchParams;

  const tabHref = (type: string) =>
    `/search/result?${new URLSearchParams({ q, restaurantType: type, sort }).toString()}`;
  const restaurantTabs = [
    { key: 'ALL', label: '전체', href: tabHref('ALL') },
    ...Object.values(FOOD_COURT)
      .filter(type => type !== FOOD_COURT.DORMITORY)
      .map(type => ({
        key: type,
        label: FOOD_COURT_NAME[type],
        href: tabHref(type),
      })),
  ];

  return (
    <>
      <ChipNavigation
        tabs={restaurantTabs}
        currentTabKey={restaurantType}
        className='pt-3'
      />
      <div className='h-2.5 shrink-0 bg-grey-100' />
      <Suspense
        key={`${q}-${restaurantType}-${sort}`}
        fallback={
          <>
            <div className='h-[46px]' />
            <SearchSkeleton />
            <SearchSkeleton />
            <SearchSkeleton />
          </>
        }
      >
        <SearchResult q={q} restaurantType={restaurantType} sort={sort} />
      </Suspense>
    </>
  );
}

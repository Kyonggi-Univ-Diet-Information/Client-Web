import { Suspense } from 'react';


import { SearchResult, SearchSkeleton } from '@/page/search';

import { SORTING_TYPE, SortingType } from '@/entities/search/model/search';

import { FoodCourt } from '@/shared/api';



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

  return (
    <Suspense
      key={q}
      fallback={
        <>
          <SearchSkeleton />
          <SearchSkeleton />
          <SearchSkeleton />
        </>
      }
    >
      <SearchResult q={q} restaurantType={restaurantType} sort={sort} />
    </Suspense>
  );
}

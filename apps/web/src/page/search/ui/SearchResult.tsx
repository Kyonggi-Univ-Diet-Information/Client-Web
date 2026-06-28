import { type ReactNode } from 'react';


import { fetchSearch } from '@/features/search/api/fetchSearch';

import { SortingType } from '@/entities/search/model/search';

import { type FoodCourt } from '@/shared/api/api-endpoints';

import SearchMenuCard from './SearchMenuCard';




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
      <div className='col-span-2 flex h-[300px] w-full items-center justify-center text-center text-gray-600'>
        해당 조건에 대한 검색 결과가 없습니다.
      </div>
    );
  }

  return (
    <>
      {results.map((menu, index) => (
        <SearchMenuCard key={index} {...menu} />
      ))}
    </>
  );
}

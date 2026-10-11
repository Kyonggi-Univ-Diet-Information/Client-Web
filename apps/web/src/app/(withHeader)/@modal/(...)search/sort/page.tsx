import SearchSortSheet from '@/widgets/search/SearchSortSheet';

import type { SortingType } from '@/entities/search/model/search';

export default async function SearchSortPage({
  searchParams,
}: {
  searchParams: Promise<{ from?: string; sort?: SortingType }>;
}) {
  const { from, sort } = await searchParams;

  return <SearchSortSheet from={from ?? '/search'} sort={sort} />;
}

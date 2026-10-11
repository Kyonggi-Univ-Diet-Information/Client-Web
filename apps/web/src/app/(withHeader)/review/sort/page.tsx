import ReviewSortSheet from '@/widgets/review/ReviewSortSheet';

import type { ReviewSort } from '@/entities/review/api/api.type';


export default async function ReviewSortPage({
  searchParams,
}: {
  searchParams: Promise<{ from?: string; sort?: ReviewSort }>;
}) {
  const { from, sort } = await searchParams;

  return <ReviewSortSheet from={from ?? '/'} sort={sort} />;
}

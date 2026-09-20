import { CampusSortSheet } from '@/widgets/campus';

import type { CampusMenuSort } from '@/entities/campus/api/api.type';


export default async function CampusSortPage({
  searchParams,
}: {
  searchParams: Promise<{ from?: string; sort?: CampusMenuSort }>;
}) {
  const { from, sort } = await searchParams;

  return <CampusSortSheet from={from ?? '/'} sort={sort} />;
}

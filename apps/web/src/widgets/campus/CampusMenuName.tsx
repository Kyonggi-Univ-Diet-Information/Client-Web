import { Suspense } from 'react';

import { fetchCampusMenuName } from '@/features/campus/api/fetchCampusMenuName';

import { type FoodCourt } from '@/shared/api';



export default async function CampusMenuName({
  foodCourt,
  menuId,
  className,
}: {
  foodCourt: FoodCourt;
  menuId: number;
  className?: string;
}) {
  const menuName = await fetchCampusMenuName(foodCourt, menuId).catch(() => ({
    id: menuId,
    name: '삭제된 메뉴',
    nameEn: 'Deleted menu',
  }));

  return (
    <Suspense>
      <span className={className}>{menuName.name}</span>
    </Suspense>
  );
}

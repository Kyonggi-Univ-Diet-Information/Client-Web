
import { fetchCampusMenuHasSet } from '@/features/campus/api/fetchCampusMenuHasSet';

import type { CampusSetMenu } from '@/entities/campus/api/api.type';

import { CampusFoodCourt } from '@/shared/api';


export default async function CampusMenuSet({
  type,
  baseFoodId,
}: {
  type: CampusFoodCourt;
  baseFoodId: number;
}) {
  const setMenus = await fetchCampusMenuHasSet(type, baseFoodId).catch(() => []);

  if (setMenus.length === 0) return null;

  const description = (setMenu: CampusSetMenu) =>
    setMenu.name.includes('세트')
      ? '단품 + 감자튀김 + 탄산음료'
      : '단품 + 탄산음료';

  return (
    <div className='flex flex-col'>
      <h3 className='text-lg font-semibold mb-4'>연관 세트 메뉴</h3>
      <div className='flex flex-col gap-2.5'>
        {setMenus.map(setMenu => (
          <div
            className='flex items-start flex-col gap-1.5 p-4 border border-grey-100 rounded-[8px]'
            key={setMenu.id}
          >
           <p className='truncate text-grey-900'>
              {setMenu.name}
            </p>
            <p className='text-sm leading-tight text-grey-500'>
              {description(setMenu)}
            </p>
            <p className='flex w-full justify-end shrink-0 text-xl font-black text-grey-900'>
              {setMenu.price.toLocaleString()}원
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

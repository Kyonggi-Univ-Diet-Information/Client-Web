
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
  const setMenus = await fetchCampusMenuHasSet(type, baseFoodId);

  if (setMenus.length === 0) return null;

  const description = (setMenu: CampusSetMenu) =>
    setMenu.name.includes('세트')
      ? '(단품 + 감자튀김 + 탄산음료)'
      : '(단품 + 탄산음료)';

  return (
    <div className='flex flex-col gap-2 rounded-2xl bg-gray-50 p-5'>
      <h3 className='text-xs font-semibold text-gray-400'>연관 세트 메뉴</h3>
      <div className='flex flex-col gap-4'>
        {setMenus.map(setMenu => (
          <div
            className='flex items-start justify-between gap-4'
            key={setMenu.id}
          >
            <div className='flex min-w-0 flex-col gap-1'>
              <p className='truncate text-sm font-bold text-gray-900'>
                {setMenu.name}
              </p>
              <p className='text-xs leading-tight text-gray-500'>
                {description(setMenu)}
              </p>
            </div>
            <p className='shrink-0 text-sm font-black whitespace-nowrap text-gray-900'>
              {setMenu.price.toLocaleString()}원
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

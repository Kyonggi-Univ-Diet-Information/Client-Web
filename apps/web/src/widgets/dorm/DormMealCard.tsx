'use client';

import { Info } from 'lucide-react';

import DormNoDataMessage from '@/widgets/dorm/DormNoDataMessage';

import type { DormMenu, DormMenuStatus } from '@/entities/dorm/api/api.type';
import { DORM_TIME_RANGE, type DormTime } from '@/entities/dorm/model/dormTime';

// ponytail: "배식 중/종료" only reflects real time when viewing today — other days just skip the badge, since a serving-time comparison is meaningless for a day that isn't today
export function isServingNow(mealTime: DormTime): boolean {
  const { start, end } = DORM_TIME_RANGE[mealTime];
  const toMinutes = (time: string) => {
    const [hour, minute] = time.split(':').map(Number);
    return hour * 60 + minute;
  };
  const now = new Date();
  const nowMinutes = now.getHours() * 60 + now.getMinutes();

  return nowMinutes >= toMinutes(start) && nowMinutes < toMinutes(end);
}

export default function DormMealCard({
  mealTime,
  status,
  contents,
  isToday,
}: {
  mealTime: DormTime;
  status: DormMenuStatus;
  contents: DormMenu[];
  isToday: boolean;
}) {
  if (status !== 'OPEN') {
    return <DormNoDataMessage status={status} />;
  }

  return (
    <div className='w-full overflow-hidden rounded-2xl bg-white'>
      <div className='flex items-center justify-between px-5 pt-4 pb-3.5'>
        <span className='text-base font-medium text-gray-900'>
          {DORM_TIME_RANGE[mealTime].label}
        </span>
        {isToday && (
          <span className='rounded-lg bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-700'>
            {isServingNow(mealTime) ? '배식 중' : '배식 종료'}
          </span>
        )}
      </div>
      <div className='flex flex-col px-5 pb-2'>
        {contents.map((menuItem, index) => (
          <div
            key={menuItem.id}
            className={
              index < contents.length - 1
                ? 'flex items-center gap-3 border-b border-gray-50 py-2.5'
                : 'flex items-center gap-3 py-2.5'
            }
          >
            <span className='size-1.5 shrink-0 rounded-full bg-gray-200' />
            <span className='text-sm font-medium text-gray-900'>
              {menuItem.dietFoodDTO.name}
            </span>
          </div>
        ))}
      </div>
      <div className='px-4 pt-3 pb-4'>
        <div className='flex items-center gap-2 rounded-2xl bg-gray-50 px-4 py-3'>
          <Info size={14} className='shrink-0 text-gray-400' />
          <span className='text-xs text-gray-400'>메뉴는 사정에 따라 변경될 수 있어요</span>
        </div>
      </div>
    </div>
  );
}

'use client';

import { Info } from 'lucide-react';

import DormNoDataMessage from '@/widgets/dorm/DormNoDataMessage';

import type { DormMenu, DormMenuStatus } from '@/entities/dorm/api/api.type';
import { DORM_TIME_RANGE, type DormTime } from '@/entities/dorm/model/dormTime';

type ServingStatus = '배식 예정' | '배식 중' | '배식 종료';

const SERVING_STATUS_CLASS: Record<ServingStatus, string> = {
  '배식 예정': 'bg-[rgba(13,116,218,0.06)] text-[#0d74da]',
  '배식 중': 'bg-[rgba(33,170,75,0.06)] text-[#21aa4b]',
  '배식 종료': 'bg-grey-100 text-grey-500',
};

export function getServingStatus(mealTime: DormTime): ServingStatus {
  const { start, end } = DORM_TIME_RANGE[mealTime];
  const toMinutes = (time: string) => {
    const [hour, minute] = time.split(':').map(Number);
    return hour * 60 + minute;
  };
  const now = new Date();
  const nowMinutes = now.getHours() * 60 + now.getMinutes();

  if (nowMinutes < toMinutes(start)) return '배식 예정';
  return nowMinutes < toMinutes(end) ? '배식 중' : '배식 종료';
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
        <span className='text-base font-medium text-grey-900'>
          {DORM_TIME_RANGE[mealTime].label}
        </span>
        {isToday && <ServingStatusBadge status={getServingStatus(mealTime)} />}
      </div>
      <div className='flex flex-col px-5 pb-2'>
        {contents.map((menuItem, index) => (
          <div
            key={menuItem.id}
            className={
              index < contents.length - 1
                ? 'flex items-center gap-3 border-b border-grey-50 py-2.5'
                : 'flex items-center gap-3 py-2.5'
            }
          >
            <span className='size-1.5 shrink-0 rounded-full bg-grey-200' />
            <span className='text-sm font-medium text-grey-900'>
              {menuItem.dietFoodDTO.name}
            </span>
          </div>
        ))}
      </div>
      <div className='px-4 pt-3 pb-4'>
        <div className='flex items-center gap-2 rounded-2xl bg-grey-50 px-4 py-3'>
          <Info size={14} className='shrink-0 text-grey-400' />
          <span className='text-xs text-grey-400'>메뉴는 사정에 따라 변경될 수 있어요</span>
        </div>
      </div>
    </div>
  );
}

function ServingStatusBadge({ status }: { status: ServingStatus }) {
  return (
    <span
      className={`rounded-lg px-3 py-1.5 text-xs leading-[18px] font-medium tracking-[-0.2px] ${SERVING_STATUS_CLASS[status]}`}
    >
      {status}
    </span>
  );
}

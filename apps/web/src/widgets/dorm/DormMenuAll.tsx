'use client';

import { AnimatedCard, Section } from '@kiryong/design-system';

import DormMealCard from '@/widgets/dorm/DormMealCard';
import DormNoDataMessage from '@/widgets/dorm/DormNoDataMessage';

import type { DormDayMenu, DormMenuStatus } from '@/entities/dorm/api/api.type';
import type { DormTime } from '@/entities/dorm/model';

interface DormMenuSectionProps {
  dayMenu: DormDayMenu | null;
  mealTime: DormTime;
  isToday: boolean;
  isWeekend: boolean;
  isWeekMenuUploaded: boolean;
}

export function getDisplayStatus({
  status,
  isWeekend,
  isWeekMenuUploaded,
}: {
  status: DormMenuStatus | undefined;
  isWeekend: boolean;
  isWeekMenuUploaded: boolean;
}): DormMenuStatus {
  if (status === 'OPEN') return 'OPEN';
  if (isWeekend) return 'CLOSED';
  // 주간 메뉴가 업로드되기 전에는 서버가 CLOSED를 내려줄 수 있어, 미운영이 아닌 정보 없음으로 본다
  if (!isWeekMenuUploaded || !status) return 'NO_DATA';
  return status;
}

export default function DormMenuSection({
  dayMenu,
  mealTime,
  isToday,
  isWeekend,
  isWeekMenuUploaded,
}: DormMenuSectionProps) {
  const timeMenu = dayMenu?.[mealTime];
  const status = getDisplayStatus({
    status: timeMenu?.status,
    isWeekend,
    isWeekMenuUploaded,
  });

  return (
    <Section.Content className='mb-10 flex-1'>
      <AnimatedCard index={0} className='flex w-full'>
        {timeMenu ? (
          <DormMealCard
            mealTime={mealTime}
            status={status}
            contents={timeMenu.contents}
            isToday={isToday}
          />
        ) : (
          <DormNoDataMessage status={status} />
        )}
      </AnimatedCard>
    </Section.Content>
  );
}

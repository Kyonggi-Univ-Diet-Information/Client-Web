'use client';

import DormMealCard from '@/widgets/dorm/DormMealCard';
import DormNoDataMessage from '@/widgets/dorm/DormNoDataMessage';

import type { DormDayMenu } from '@/entities/dorm/api/api.type';
import type { DormTime } from '@/entities/dorm/model';

import { AnimatedCard, Section } from '@/shared/ui';

interface DormMenuSectionProps {
  dayMenu: DormDayMenu | null;
  mealTime: DormTime;
  isToday: boolean;
}

export default function DormMenuSection({ dayMenu, mealTime, isToday }: DormMenuSectionProps) {
  const timeMenu = dayMenu?.[mealTime];

  return (
    <Section.Content className='mb-10 h-fit'>
      <AnimatedCard index={0} className='w-full'>
        {timeMenu ? (
          <DormMealCard
            mealTime={mealTime}
            status={timeMenu.status}
            contents={timeMenu.contents}
            isToday={isToday}
          />
        ) : (
          <DormNoDataMessage status='NO_DATA' />
        )}
      </AnimatedCard>
    </Section.Content>
  );
}

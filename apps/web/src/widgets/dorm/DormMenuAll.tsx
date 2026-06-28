'use client';

import React from 'react';

import DormNoDataMessage from '@/widgets/dorm/DormNoDataMessage';

import type { DormDayMenu } from '@/entities/dorm/api/api.type';
import {
  DormTime,
  renderMenuItems,
} from '@/entities/dorm/model';

import { AnimatedCard, Section, Card } from '@/shared/ui';



interface DormMenuSectionProps {
  dayMenu: DormDayMenu | null;
}

export default function DormMenuSection({ dayMenu }: DormMenuSectionProps) {
  const renderContent = (time: DormTime) => {
    if (!dayMenu || dayMenu[time] === undefined) {
      return <DormNoDataMessage status='NO_DATA' />;
    }
    const { status, contents } = dayMenu[time];
    if (status !== 'OPEN') return <DormNoDataMessage status={status} />;
    return renderMenuItems(contents, 'ko');
  };

  return (
    <Section.Content className='mb-10 h-fit overflow-x-scroll overflow-y-hidden'>
      <AnimatedCard index={0}>
        <Card className='h-fit min-h-70'>
          <Card.Header>
            아침 <span className='font-tossFace'>☀️</span>{' '}
          </Card.Header>
          <Card.Content>{renderContent('BREAKFAST')}</Card.Content>
        </Card>
      </AnimatedCard>
      <AnimatedCard index={1}>
        <Card className='h-fit min-h-70'>
          <Card.Header>
            점심 <span className='font-tossFace'>🍽️</span>{' '}
          </Card.Header>
          <Card.Content>{renderContent('LUNCH')}</Card.Content>
        </Card>
      </AnimatedCard>
      <AnimatedCard index={2}>
        <Card className='h-fit min-h-70'>
          <Card.Header>
            저녁 <span className='font-tossFace'>🌙</span>
          </Card.Header>
          <Card.Content>{renderContent('DINNER')}</Card.Content>
        </Card>
      </AnimatedCard>
    </Section.Content>
  );
}

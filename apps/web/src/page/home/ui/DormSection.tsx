'use client';

import { useState } from 'react';

import DormMenuAll from '@/widgets/dorm/DormMenuAll';
import DormMenuAnimatedWrapper from '@/widgets/dorm/DormMenuAnimatedWrapper';

import type { FetchDormMenuResponse } from '@/entities/dorm/api/api.model';
import { DORM_DAY_KEY, type DormDay } from '@/entities/dorm/model/dormDay';
import type { DormTime } from '@/entities/dorm/model/dormTime';

import { getCurrentDate } from '@/shared/lib/date';
import { Section, Tab } from '@/shared/ui';

import WeeklyCalendar from './WeeklyCalendar';

const MEAL_TIME_OPTIONS: { value: DormTime; label: string }[] = [
  { value: 'BREAKFAST', label: '조식' },
  { value: 'LUNCH', label: '중식' },
  { value: 'DINNER', label: '석식' },
];

export default function DormSection({ dormMenu }: { dormMenu: FetchDormMenuResponse | null }) {
  const today = getCurrentDate().getDay();
  const [currentDay, setCurrentDay] = useState<DormDay>(DORM_DAY_KEY[today]);
  const [mealTime, setMealTime] = useState<DormTime>('BREAKFAST');

  return (
    <Section>
      <Section.Header title='이번주 기숙사 메뉴' />
      <WeeklyCalendar currentDay={currentDay} onSelectDay={setCurrentDay} />
      <Tab
        size='sm'
        options={MEAL_TIME_OPTIONS}
        value={mealTime}
        onChange={value => setMealTime(value as DormTime)}
      />
      <Section.Content>
        <DormMenuAnimatedWrapper currentDay={currentDay}>
          <DormMenuAll
            dayMenu={dormMenu?.[currentDay] ?? null}
            mealTime={mealTime}
            isToday={currentDay === DORM_DAY_KEY[today]}
          />
        </DormMenuAnimatedWrapper>
      </Section.Content>
    </Section>
  );
}

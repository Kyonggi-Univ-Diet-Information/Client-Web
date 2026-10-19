'use client';

import { isWeekend } from '@/entities/dorm/model/date';
import { DORM_DAY_NAME, DORM_DAY_SHORT, type DormDay } from '@/entities/dorm/model/dormDay';

import { cn } from '@/shared/lib';

function getWeekDates(today: Date): Date[] {
  const monday = new Date(today);
  const diffToMonday = (today.getDay() + 6) % 7;
  monday.setDate(today.getDate() - diffToMonday);

  return Array.from({ length: 7 }, (_, index) => {
    const date = new Date(monday);
    date.setDate(monday.getDate() + index);
    return date;
  });
}

export default function WeeklyCalendar({
  currentDay,
  onSelectDay,
}: {
  currentDay: DormDay;
  onSelectDay: (day: DormDay) => void;
}) {
  const weekDates = getWeekDates(new Date());

  return (
    <div className='flex items-start gap-1.5 pt-3'>
      {DORM_DAY_NAME.map((day, index) => {
        const isSelected = day === currentDay;
        const weekend = isWeekend(day);

        return (
          <button
            key={day}
            type='button'
            onClick={() => onSelectDay(day)}
            className={cn(
              'flex flex-1 flex-col items-center gap-1 rounded-2xl py-2.5',
              isSelected && 'bg-primary-500 shadow-[2px_4px_6px_rgba(255,101,46,0.2)]',
            )}
          >
            <span className={cn('text-xs font-medium', isSelected ? 'text-white' : 'text-grey-400')}>
              {DORM_DAY_SHORT[day]}
            </span>
            <span
              className={cn(
                'text-base font-semibold',
                isSelected ? 'text-white' : weekend ? 'text-grey-400' : 'text-grey-900',
              )}
            >
              {weekDates[index].getDate()}
            </span>
          </button>
        );
      })}
    </div>
  );
}

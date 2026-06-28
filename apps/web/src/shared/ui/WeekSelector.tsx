'use client';

import React from 'react';


import { cn } from '@/shared/lib';
import {
  WEEKDAYS,
  getCurrentDate,
  getWeekStart,
  getWeekDates,
  formatKoreanDate,
  isSameDay,
} from '@/shared/lib/date';

import { Button } from './Button';

interface WeekSelectorProps {
  selectedDate?: Date;
  onDateSelect: (date: Date) => void;
  className?: string;
}

export default function WeekSelector({
  selectedDate,
  onDateSelect,
  className,
}: WeekSelectorProps) {
  const weekStart = getWeekStart(selectedDate || getCurrentDate());
  const weekDates = getWeekDates(weekStart);
  const today = getCurrentDate();

  return (
    <div className={cn('space-y-4', className)}>
      <div className='text-center'>
        <p className='text-sm text-gray-600'>
          {formatKoreanDate(weekStart, {
            month: 'long',
            day: 'numeric',
          })}{' '}
          -{' '}
          {formatKoreanDate(weekDates[6], {
            month: 'long',
            day: 'numeric',
          })}
        </p>
      </div>

      <div className='grid grid-cols-7 gap-2'>
        {weekDates.map((date, index) => {
          const isToday = isSameDay(date, today);
          const isSelected = selectedDate && isSameDay(date, selectedDate);
          const isWeekend = index === 0 || index === 6;

          return (
            <Button
              key={date.toISOString()}
              variant={isSelected ? 'default' : 'outline'}
              size='sm'
              className={cn(
                'flex h-16 flex-col items-center justify-center p-2 text-xs',
                'hover:bg-primary/10 transition-colors',
                isToday && !isSelected && 'ring-primary/50 ring-2',
                isWeekend && 'text-red-500',
                isSelected && 'bg-primary text-primary-foreground',
              )}
              onClick={() => onDateSelect(date)}
            >
              <span className='font-medium'>{WEEKDAYS[index]}</span>
              <span className='text-lg font-bold'>{date.getDate()}</span>
            </Button>
          );
        })}
      </div>

      {selectedDate && (
        <div className='rounded-lg bg-gray-50 p-3 text-center'>
          <p className='text-sm text-gray-600'>
            {formatKoreanDate(selectedDate, {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              weekday: 'long',
            })}
            의 식단을 확인할게요.
          </p>
        </div>
      )}
    </div>
  );
}

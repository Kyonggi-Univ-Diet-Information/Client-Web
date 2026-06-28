'use client';

import { useState } from 'react';

import { DORM_DAY_KEY, DormDay } from '@/entities/dorm/model';

import { WeekSelector, Button } from '@/shared/ui';


interface DaySelectModalProps {
  onDateSelect: (day: DormDay) => void;
  onClose: () => void;
}

export default function DaySelectModal({
  onDateSelect,
  onClose,
}: DaySelectModalProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date(),
  );

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
  };

  const handleModalSave = () => {
    const dateKey = DORM_DAY_KEY[selectedDate?.getDay() ?? 0];
    onDateSelect(dateKey);
  };

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center'>
      <button
        onClick={onClose}
        className='absolute inset-0 bg-black/30 backdrop-blur-xs'
        aria-label='닫기'
      />

      <div className='relative z-10 mx-4 w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl'>
        <button
          onClick={onClose}
          className='absolute top-4 right-4 flex size-8 items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200'
          aria-label='닫기'
        >
          ✕
        </button>

        <div className='flex flex-col gap-4'>
          <p className='flex flex-col'>
            <span className='font-semibold'>날짜를 선택해주세요</span>
            <span className='text-sm text-gray-600'>
              이번 주 경기드림타워 식단을 확인해보세요.
            </span>
          </p>
          <WeekSelector
            selectedDate={selectedDate}
            onDateSelect={handleDateSelect}
            className='px-4'
          />
          <div className='flex justify-end'>
            <Button onClick={handleModalSave}>저장</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

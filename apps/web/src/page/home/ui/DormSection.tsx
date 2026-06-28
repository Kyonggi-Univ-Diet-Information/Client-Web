'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ReactNode, useState } from 'react';

import DormMenuAll from '@/widgets/dorm/DormMenuAll';
import DormMenuAnimatedWrapper from '@/widgets/dorm/DormMenuAnimatedWrapper';

import type { FetchDormMenuResponse } from '@/entities/dorm/api/api.model';
import { getAdjacentDates, isSaturday, isSunday } from '@/entities/dorm/model';
import { DORM_DAY, DORM_DAY_KEY, type DormDay } from '@/entities/dorm/model/dormDay';

import { getCurrentDate } from '@/shared/lib/date';
import { Section } from '@/shared/ui';

import DaySelectModal from './DaySelectModal';




const getWeekDateString = (date?: DormDay) => {
  if (!date) return '오늘';
  return DORM_DAY[date];
};

export default function DormSection({ dormMenu }: { dormMenu: FetchDormMenuResponse | null }) {
  const today = getCurrentDate().getDay();
  const [currentDay, setCurrentDay] = useState<DormDay>(DORM_DAY_KEY[today]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { yesterday, tomorrow } = getAdjacentDates(currentDay);
  const isCurrentDaySunday = isSunday(currentDay);
  const isCurrentDaySaturday = isSaturday(currentDay);

  const handlePreviousDay = () => {
    if (!isCurrentDaySunday) {
      setCurrentDay(yesterday);
    }
  };

  const handleNextDay = () => {
    if (!isCurrentDaySaturday) {
      setCurrentDay(tomorrow);
    }
  };

  const handleDateSelect = (day: DormDay) => {
    setCurrentDay(day);
    setIsModalOpen(false);
  };

  const handleModalOpen = () => {
    if (!isCurrentDaySaturday && !isCurrentDaySunday) {
      setIsModalOpen(true);
    }
  };

  return (
    <>
      <Section>
        <Section.Header
          title={
            <>
              <span className='text-point'>경기드림타워</span>{' '}
              <button
                onClick={handleModalOpen}
                className='cursor-pointer underline hover:text-gray-600 active:text-gray-600'
              >
                {getWeekDateString(currentDay)}
              </button>
              의 메뉴
              <span className='font-tossFace'> 🍚</span>
            </>
          }
          subtitle='이번 주 경기드림타워 식단을 확인해보세요.'
          action={
            <div className='flex gap-x-2'>
              <DormNavButton
                onClick={handlePreviousDay}
                disabled={isCurrentDaySunday}
              >
                <ChevronLeft className='size-5 text-gray-700' />
              </DormNavButton>
              <DormNavButton
                onClick={handleNextDay}
                disabled={isCurrentDaySaturday || isCurrentDaySunday}
              >
                <ChevronRight className='size-5 text-gray-700' />
              </DormNavButton>
            </div>
          }
        />
        <Section.Content>
          <DormMenuAnimatedWrapper currentDay={currentDay}>
            <DormMenuAll dayMenu={dormMenu?.[currentDay] ?? null} />
          </DormMenuAnimatedWrapper>
        </Section.Content>
      </Section>
      {isModalOpen && (
        <DaySelectModal
          onDateSelect={handleDateSelect}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
}

function DormNavButton({
  onClick,
  disabled,
  children,
}: {
  onClick: () => void;
  disabled: boolean;
  children: ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={
        disabled
          ? 'cursor-not-allowed rounded-full border border-gray-200 bg-gray-100 p-1.5 text-sm font-medium text-gray-400'
          : 'rounded-full border border-gray-300 bg-white p-1.5 text-sm font-medium hover:bg-gray-50'
      }
    >
      {children}
    </button>
  );
}

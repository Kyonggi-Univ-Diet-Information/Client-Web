import { ChevronRight } from 'lucide-react';
import Link from 'next/link';


import DormSection from '@/widgets/dorm/DormSection';
import { PageContainer } from '@/widgets/layout';

import { fetchDormMenu } from '@/features/dorm/api/fetchDormMenu';

import { FOOD_COURT_ID } from '@/shared/api';
import { RESTAURANT_ID_BY_NAME } from '@/shared/constants/campus/restaurant';
import { AnimatedCard, Section } from '@/shared/ui';

import CampusFoodCourtSwitcher from './CampusFoodCourtSwitcher';


export default async function HomePage() {
  const dormMenu = await fetchDormMenu().catch(() => null);
  const CampusFoodCourts = [
    {
      href: `/campus/${FOOD_COURT_ID.KYONGSUL}/${RESTAURANT_ID_BY_NAME.MANKWON}`,
      title: '경슐랭',
      location: '제 1복지관 지하 1층',
      operatingHours: '10:30-19:00',
      orderDeadline: '18:30',
    },
    {
      href: `/campus/${FOOD_COURT_ID.E_SQUARE}`,
      title: '이스퀘어',
      location: '4강의동 옆',
      operatingHours: '07:30-20:30',
      orderDeadline: '19:30',
    },
    {
      href: `/campus/${FOOD_COURT_ID.SALLY_BOX}`,
      title: '샐리박스',
      location: '교수연구동(학생회관 앞) 5층',
      operatingHours: '08:30-19:30',
      orderDeadline: '19:00',
    },
  ];

  return (
    <PageContainer className='gap-0 p-0 bg-[#F3F4F5]'>
      <Section className='px-4 pt-20'>
        <CampusFoodCourtSwitcher campusFoodCourts={CampusFoodCourts} />
      </Section>
      <Section className='p-4'>
        <ReviewLinkButton />
      </Section>
      <div className='flex flex-col gap-8 bg-white px-4 pt-[18px]'>
        <DormSection dormMenu={dormMenu} />
      </div>
    </PageContainer>
  );
}

function ReviewLinkButton() {
  const defaultReviewHref = `/review`;

  return (
    <Link
      href={defaultReviewHref}
      className='flex items-center justify-between rounded-2xl border border-gray-100 bg-white px-4 py-4 transition-colors active:bg-gray-50'
    >
      <AnimatedCard index={0} animationType='spring'>
        <div className='flex items-center gap-3'>
          <div className='flex size-10 shrink-0 items-center justify-center rounded-lg bg-gray-50'>
            <ChatIcon className='size-[26px] text-point opacity-80' />
          </div>
          <div className='flex flex-col'>
            <span className='text-base font-semibold text-gray-900'>식사 후기 남기기</span>
            <span className='text-[13px] text-gray-600'>최근 본 메뉴에서 골라보세요</span>
          </div>
        </div>
      </AnimatedCard>
      <ChevronRight size={18} className='shrink-0 text-gray-400' />
    </Link>
  );
}

function ChatIcon({ className }: { className?: string }) {
  return (
    <svg viewBox='0 0 22 20' fill='none' className={className}>
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M9.75 0H11.9167C17.3014 0 21.6667 4.36522 21.6667 9.75C21.6667 15.1348 17.3014 19.5 11.9167 19.5H4.33333C1.9401 19.5 0 17.5599 0 15.1667V9.75C0 4.36522 4.36522 0 9.75 0ZM10.8333 10.8333C11.4316 10.8333 11.9167 10.3483 11.9167 9.75C11.9167 9.15169 11.4316 8.66667 10.8333 8.66667C10.235 8.66667 9.75 9.15169 9.75 9.75C9.75 10.3483 10.235 10.8333 10.8333 10.8333ZM16.25 9.75C16.25 10.3483 15.765 10.8333 15.1667 10.8333C14.5684 10.8333 14.0833 10.3483 14.0833 9.75C14.0833 9.15169 14.5684 8.66667 15.1667 8.66667C15.765 8.66667 16.25 9.15169 16.25 9.75ZM6.5 10.8333C7.09831 10.8333 7.58333 10.3483 7.58333 9.75C7.58333 9.15169 7.09831 8.66667 6.5 8.66667C5.90169 8.66667 5.41667 9.15169 5.41667 9.75C5.41667 10.3483 5.90169 10.8333 6.5 10.8333Z'
        fill='currentColor'
      />
    </svg>
  );
}

import { ArrowRight, ChevronRight } from 'lucide-react';
import Link from 'next/link';


import { fetchDormMenu } from '@/features/dorm/api/fetchDormMenu';

import { FOOD_COURT_ID } from '@/shared/api';
import { RESTAURANT_ID_BY_NAME } from '@/shared/constants/campus/restaurant';
import { AnimatedCard, Section } from '@/shared/ui';

import CarouselWrapper from './CarouselWrapper';
import DormSection from './DormSection';


export default async function HomePage() {
  const dormMenu = await fetchDormMenu().catch(() => null);
  const CampusFoodCourts = [
    {
      href: `/campus/${FOOD_COURT_ID.KYONGSUL}/${RESTAURANT_ID_BY_NAME.MANKWON}`,
      title: '경슐랭',
      location: '제 1복지관 지하 1층',
      time: '10:30 ~ 19:00 (주문마감 18:30)',
    },
    {
      href: `/campus/${FOOD_COURT_ID.E_SQUARE}`,
      title: '이스퀘어',
      location: '4강의동 옆',
      time: '07:30 ~ 20:30 (주문마감 19:30)',
    },
    {
      href: `/campus/${FOOD_COURT_ID.SALLY_BOX}`,
      title: '샐리박스',
      location: '교수연구동(학생회관 앞) 5층',
      time: '08:30 ~ 19:30 (주문마감 19:00)',
    },
  ];

  return (
    <>
      <div className='scrollbar-hide absolute inset-0 flex flex-col overflow-y-scroll pb-26 focus:outline-none'>
        <Section className='relative z-0'>
          <CarouselWrapper>
            {CampusFoodCourts.map(campusFoodCourt => (
              <CampusFoodCourtCard
                key={campusFoodCourt.href}
                href={campusFoodCourt.href}
                title={campusFoodCourt.title}
                location={campusFoodCourt.location}
                time={campusFoodCourt.time}
                viewMenuText='메뉴 보러가기'
                holidayClosedText='주말 및 공휴일 휴무'
              />
            ))}
          </CarouselWrapper>
        </Section>
        <div className='relative z-10 -mt-6 flex flex-col gap-8 rounded-t-3xl bg-white px-4 pt-8'>
          <Section>
            <ReviewLinkButton />
          </Section>
          <DormSection dormMenu={dormMenu} />
        </div>
      </div>
    </>
  );
}

function ReviewLinkButton() {
  const defaultReviewHref = `/review`;

  return (
    <Link
      href={defaultReviewHref}
      className='group -mt-2 -mb-2 cursor-pointer rounded-2xl bg-gray-100/50 px-2.5 py-1.5 transition-all duration-300 active:bg-gray-100'
    >
      <AnimatedCard index={0} animationType='spring'>
        <div className='flex items-center justify-between'>
          <div className='text-lg font-semibold group-hover:text-gray-900/60 group-active:text-gray-900/60'>
            <span className='font-tossFace'>😋&nbsp;&nbsp;</span>
            식사는 어땠나요?
          </div>
          <div className='flex items-center gap-1 text-sm text-gray-600 group-hover:text-gray-900/60 group-active:text-gray-900/60'>
            인기/최신 리뷰 보러가기
            <ChevronRight size={14} />
          </div>
        </div>
      </AnimatedCard>
    </Link>
  );
}

function CampusFoodCourtCard({
  href,
  title,
  location,
  time,
  viewMenuText,
  holidayClosedText,
}: {
  href: string;
  title: string;
  location: string;
  time: string;
  viewMenuText: string;
  holidayClosedText: string;
}) {
  return (
    <Link
      href={href}
      className='to-point/20 group flex w-screen min-w-0 flex-[0_0_100%] flex-shrink-0 flex-col bg-gradient-to-b from-white px-6 pt-4 pb-20'
    >
      <div className='flex h-full flex-col justify-between'>
        <div className='flex justify-end'>
          <div className='flex items-center gap-2 p-1 transition-all group-active:scale-[0.98] group-active:bg-gray-100/80'>
            <span className='text-sm text-gray-700'>{viewMenuText}</span>
            <ArrowRight className='size-4 text-gray-700' />
          </div>
        </div>

        <div className='space-y-2'>
          <div className='space-y-1'>
            <h3 className='text-2xl font-bold text-gray-900'>{title}</h3>
            <p className='text-sm text-gray-600'>{location}</p>
          </div>
          <div className='border-point/20 flex gap-2 border-t pt-2 text-sm text-gray-700'>
            <span className='font-medium'>{time}</span>
            <span className='text-gray-500'>•</span>
            <span>{holidayClosedText}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

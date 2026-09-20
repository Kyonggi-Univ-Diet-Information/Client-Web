import { ChevronRight } from 'lucide-react';
import Link from 'next/link';


import { PageContainer } from '@/widgets/layout';

import { fetchDormMenu } from '@/features/dorm/api/fetchDormMenu';

import { FOOD_COURT_ID } from '@/shared/api';
import { RESTAURANT_ID_BY_NAME } from '@/shared/constants/campus/restaurant';
import { AnimatedCard, Section } from '@/shared/ui';

import CampusFoodCourtSwitcher from './CampusFoodCourtSwitcher';
import DormSection from './DormSection';


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

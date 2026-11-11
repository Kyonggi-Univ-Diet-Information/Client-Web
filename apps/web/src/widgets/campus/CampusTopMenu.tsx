import { Card, Section } from '@kiryong/design-system';

import { fetchTopMenu } from '@/features/campus/api/fetchTopMenu';

import type { CampusTopMenu } from '@/entities/campus/api/api.type';

import { FOOD_COURT_ID, FOOD_COURT_NAME } from '@/shared/api';

import CampusAnimatedCard from './CampusAnimatedCard';

export default async function CampusTopMenu() {
  const topMenus = await fetchTopMenu();

  return (
    <Section>
      <Section.Header
        title={
          <h2 className='text-grey-900 text-lg leading-[26px] font-semibold tracking-[-0.36px]'>
            <span className='font-tossFace'>💬</span> 리뷰 많은 메뉴
          </h2>
        }
        subtitle='실시간으로 가장 많은 리뷰를 받은 메뉴들이에요!'
      />
      <div className='w-full space-y-2'>
        {topMenus.map((menu, index) => (
          <MenuCard key={menu.id} menu={menu} index={index} />
        ))}
      </div>
    </Section>
  );
}

function MenuCard({ menu, index }: { menu: CampusTopMenu; index: number }) {
  const foodCourtName = FOOD_COURT_NAME[menu.restaurantType];
  const getMedal = (index: number) => {
    switch (index) {
      case 1:
        return <span className='font-tossFace text-center'>🥇</span>;
      case 2:
        return <span className='font-tossFace text-center'>🥈</span>;
      case 3:
        return <span className='font-tossFace text-center'>🥉</span>;
      default:
        return <span className='text-center text-sm font-medium text-[#878b93]'>
            {index}
          </span>;
    }
  };

  return (
    <CampusAnimatedCard index={index}>
      <Card
        href={`/review/${FOOD_COURT_ID[menu.restaurantType]}/${menu.id}`}
        className='rounded-lg border border-[#efefef] bg-white px-5 py-4 hover:bg-[#f9f9fb] active:bg-[#f9f9fb]'
      >
        <div className='grid grid-cols-[1.5rem_1fr_auto] items-center gap-2'>
          {getMedal(index + 1)}
          <div className='flex min-w-0 items-center gap-1.5 text-sm leading-[19px] font-semibold tracking-[-0.26px] text-[#191919]'>
            <span className='shrink-0 rounded-full bg-[#f2f2f7] px-2 py-0.5 text-xs font-medium text-[#555]'>
              {foodCourtName}
            </span>
            <span className='truncate'>{menu.name}</span>
          </div>
          <div className='flex items-center justify-end gap-1 text-[#767676]'>
            <span className='font-tossFace'>💬</span>
            <span className='text-sm font-medium'>{menu.reviewCount}</span>
          </div>
        </div>
      </Card>
    </CampusAnimatedCard>
  );
}

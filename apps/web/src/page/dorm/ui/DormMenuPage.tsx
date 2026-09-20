import { CampusMainTabs } from '@/widgets/campus';
import DormFormattedDate from '@/widgets/dorm/DormFormattedDate';
import DormMenuByDay from '@/widgets/dorm/DormMenuByDay';

import { DORM_DAY_KEY, DORM_DAY_SHORT } from '@/entities/dorm/model/dormDay';

import { Section, StaticTabNavigation } from '@/shared/ui';

export interface DormMenuPageProps {
  params: Promise<{ day: number }>;
}

export default async function DormMenuPage({ params }: DormMenuPageProps) {
  const { day } = await params;

  const dayTabs = Object.keys(DORM_DAY_KEY).map(d => ({
    key: d,
    label: DORM_DAY_SHORT[DORM_DAY_KEY[Number(d)]],
    href: `/campus/dorm/${d}`,
  }));

  return (
    <>
      <Section.Header>
        <CampusMainTabs currentTabKey='dorm' />
      </Section.Header>
      <Section>
        <Section.Content className='flex flex-col gap-4'>
          <StaticTabNavigation tabs={dayTabs} currentTabKey={String(day)} />
          <DormFormattedDate day={day} />
          <div className='flex flex-col gap-3'>
            <DormMenuByDay day={day} />
          </div>
        </Section.Content>
      </Section>
    </>
  );
}

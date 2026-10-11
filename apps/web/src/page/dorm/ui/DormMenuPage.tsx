import { CampusMainTabs } from '@/widgets/campus';
import DormSection from '@/widgets/dorm/DormSection';

import { fetchDormMenu } from '@/features/dorm/api/fetchDormMenu';

import { DORM_DAY_KEY } from '@/entities/dorm/model/dormDay';

import { Section } from '@/shared/ui';

export interface DormMenuPageProps {
  params: Promise<{ day: number }>;
}

export default async function DormMenuPage({ params }: DormMenuPageProps) {
  const { day } = await params;
  const dormMenu = await fetchDormMenu().catch(() => null);

  return (
    <>
      <Section.Header>
        <CampusMainTabs currentTabKey='dorm' />
      </Section.Header>
      <DormSection dormMenu={dormMenu} initialDay={DORM_DAY_KEY[day]} />
    </>
  );
}

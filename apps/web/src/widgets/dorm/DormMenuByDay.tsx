import DormNoDataMessage from '@/widgets/dorm/DormNoDataMessage';

import { fetchDormMenuByDay } from '@/features/dorm/api/fetchDormMenuByDay';

import {
  renderMenuItems,
  DORM_DAY_KEY,
  type DormTime,
} from '@/entities/dorm/model';

import { Section, Card } from '@/shared/ui';


export default async function DormMenuByDay({ day }: { day: number }) {
  const dormMenu = await fetchDormMenuByDay(DORM_DAY_KEY[day]).catch(
    () => null,
  );

  const todayDormMenu = dormMenu?.diet;

  const renderContent = (time: DormTime) => {
    if (!dormMenu || !todayDormMenu || todayDormMenu[time] === undefined) {
      return <DormNoDataMessage status='NO_DATA' />;
    }
    const { status, contents } = todayDormMenu[time];
    if (status !== 'OPEN') return <DormNoDataMessage status={status} />;
    return renderMenuItems(contents, 'ko');
  };

  return (
    <>
      <Section>
        <Section.Content className='flex flex-col gap-4'>
          <div className='flex flex-col gap-3'>
            <Card>
              <Card.Header>
                아침 <span className='font-tossFace'>☀️</span>
              </Card.Header>
              <Card.Content>{renderContent('BREAKFAST')}</Card.Content>
            </Card>
            <Card>
              <Card.Header>
                점심 <span className='font-tossFace'>🍽️</span>
              </Card.Header>
              <Card.Content>{renderContent('LUNCH')}</Card.Content>
            </Card>
            <Card>
              <Card.Header>
                저녁 <span className='font-tossFace'>🌙</span>
              </Card.Header>
              <Card.Content>{renderContent('DINNER')}</Card.Content>
            </Card>
          </div>
        </Section.Content>
      </Section>
    </>
  );
}

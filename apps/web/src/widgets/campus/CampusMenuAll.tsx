import { AnimatedCard, Card } from '@kiryong/design-system';

import { fetchCampusMenu } from '@/features/campus/api/fetchCampusMenu';

import { FOOD_COURT_ID } from '@/shared/api';
import {
  CAMPUS_RESTAURANT,
  CAMPUS_RESTAURANT_NAME,
  RESTAURANT_ID_BY_NAME,
} from '@/shared/constants/campus/restaurant';

export default async function CampusMenuAll() {
  const campusMenu = await fetchCampusMenu();
  const defaultFoodCourtId = FOOD_COURT_ID.KYONGSUL;

  return (
    <>
      {CAMPUS_RESTAURANT_NAME.map((restaurant, index) => (
        <AnimatedCard key={restaurant} index={index}>
          <Card
            className='h-70'
            href={`/campus/${defaultFoodCourtId}/${RESTAURANT_ID_BY_NAME[restaurant]}`}
          >
            <p className='flex items-center justify-between font-semibold'>
              <span>{CAMPUS_RESTAURANT[restaurant]}</span>
            </p>
            <Card.Content>
              {campusMenu[restaurant].slice(0, 8).map(menu => (
                <p
                  className='flex items-center justify-between text-gray-600'
                  key={menu.id}
                >
                  <span className='max-w-[70%] truncate'>{menu.name}</span>
                  <span className='text-sm text-gray-900/40'>
                    {menu.price}원
                  </span>
                </p>
              ))}
            </Card.Content>
          </Card>
        </AnimatedCard>
      ))}
    </>
  );
}

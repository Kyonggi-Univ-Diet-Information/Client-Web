import { CampusMainTabs, CampusMenuByRestaurant } from '@/widgets/campus';

import type { CampusMenuSort } from '@/entities/campus/api/api.type';

import { getFoodCourtById } from '@/shared/api';
import {
  CAMPUS_RESTAURANT,
  RESTAURANT_ID_BY_NAME,
  getRestaurantsByFoodCourt,
} from '@/shared/constants/campus/restaurant';
import { ChipNavigation, Section } from '@/shared/ui';





export interface CampusRestaurantPageProps {
  params: Promise<{
    foodCourtId: string;
    restaurantId: string;
    categoryKey?: string;
  }>;
  searchParams?: Promise<{ sort?: CampusMenuSort }>;
}

export default async function CampusRestaurantPage({
  params,
  searchParams,
}: CampusRestaurantPageProps) {
  const { foodCourtId, restaurantId, categoryKey } = await params;
  const { sort } = (await searchParams) ?? {};

  const foodCourt = getFoodCourtById(foodCourtId);
  if (!foodCourt) {
    throw new Error('Invalid food court id');
  }

  const restaurantsInFoodCourt = getRestaurantsByFoodCourt(foodCourt);
  const restaurantNames = CAMPUS_RESTAURANT;

  const restaurantTabs = restaurantsInFoodCourt.map(restaurant => ({
    key: RESTAURANT_ID_BY_NAME[restaurant],
    label: restaurantNames[restaurant],
    href: `/campus/${foodCourtId}/${RESTAURANT_ID_BY_NAME[restaurant]}`,
  }));

  return (
    <>
      <Section.Header>
        <CampusMainTabs currentTabKey={foodCourtId} />
      </Section.Header>
      {restaurantTabs.length > 0 && (
        <ChipNavigation
          tabs={restaurantTabs}
          currentTabKey={restaurantId}
          variant='point'
          size='md'
        />
      )}
      <CampusMenuByRestaurant
        foodCourtId={foodCourtId}
        restaurantId={restaurantId}
        categoryKey={categoryKey}
        sort={sort}
      />
    </>
  );
}

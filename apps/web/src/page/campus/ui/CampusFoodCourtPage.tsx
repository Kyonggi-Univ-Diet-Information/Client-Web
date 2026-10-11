import {
  CampusMainTabs,
  CampusMenuByFoodCourt,
  CampusMenuByRestaurant,
} from '@/widgets/campus';

import type { CampusMenuSort } from '@/entities/campus/api/api.type';

import { getFoodCourtById } from '@/shared/api';
import {
  CAMPUS_RESTAURANT,
  getRestaurantsByFoodCourt,
  hasSubRestaurants,
  RESTAURANT_ID_BY_NAME,
} from '@/shared/constants/campus/restaurant';
import { ChipNavigation, Section } from '@/shared/ui';





export interface CampusFoodCourtPageProps {
  params: Promise<{
    foodCourtId: string;
    categoryKey?: string;
  }>;
  searchParams?: Promise<{ sort?: CampusMenuSort }>;
}

export default async function CampusFoodCourtPage({
  params,
  searchParams,
}: CampusFoodCourtPageProps) {
  const { foodCourtId, categoryKey } = await params;
  const { sort } = (await searchParams) ?? {};

  const foodCourt = getFoodCourtById(foodCourtId);
  if (!foodCourt) {
    throw new Error('Invalid food court id');
  }

  if (hasSubRestaurants(foodCourt)) {
    const restaurants = getRestaurantsByFoodCourt(foodCourt);
    const firstRestaurant = restaurants[0];
    const firstRestaurantId = RESTAURANT_ID_BY_NAME[firstRestaurant];
    const restaurantNames = CAMPUS_RESTAURANT;

    const restaurantTabs = restaurants.map(restaurant => ({
      key: RESTAURANT_ID_BY_NAME[restaurant],
      label: restaurantNames[restaurant],
      href: `/campus/${foodCourtId}/${RESTAURANT_ID_BY_NAME[restaurant]}`,
    }));

    return (
      <>
        <Section.Header>
          <CampusMainTabs currentTabKey={foodCourtId} />
        </Section.Header>
          <ChipNavigation
            tabs={restaurantTabs}
            currentTabKey={firstRestaurantId}
            variant='point'
            size='md'
          />
        <CampusMenuByRestaurant
          foodCourtId={foodCourtId}
          restaurantId={firstRestaurantId}
          sort={sort}
        />
      </>
    );
  }

  return (
    <>
      <Section.Header>
        <CampusMainTabs currentTabKey={foodCourtId} />
      </Section.Header>
      <CampusMenuByFoodCourt
        foodCourt={foodCourt}
        categoryKey={categoryKey}
        sort={sort}
      />
    </>
  );
}

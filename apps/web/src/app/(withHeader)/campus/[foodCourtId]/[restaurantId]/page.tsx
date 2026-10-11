

import { CampusRestaurantPage, CampusFoodCourtPage } from '@/page/campus';

import type { CampusMenuSort, CategoryMenuResponse } from '@/entities/campus/api/api.type';

import { FOOD_COURT_ID, getFoodCourtById } from '@/shared/api';
import type { BaseResponse } from '@/shared/api/api-base-types';
import { ENDPOINT } from '@/shared/api/api-endpoints';
import { Http } from '@/shared/api/api-handlers';
import {
  CAMPUS_FOOD_COURTS,
  FOOD_COURT_RESTAURANTS,
  RESTAURANT_ID_BY_NAME,
  hasSubRestaurants,
} from '@/shared/constants/campus/restaurant';


export const dynamicParams = true;

export async function generateStaticParams() {
  const params: Array<{
    foodCourtId: string;
    restaurantId: string;
  }> = [];

  CAMPUS_FOOD_COURTS.forEach(foodCourt => {
    const foodCourtId = FOOD_COURT_ID[foodCourt];
    const restaurants = FOOD_COURT_RESTAURANTS[foodCourt];

    if (restaurants.length > 0) {
      restaurants.forEach(restaurant => {
        params.push({
          foodCourtId,
          restaurantId: RESTAURANT_ID_BY_NAME[restaurant],
        });
      });
    }
  });

  for (const foodCourt of CAMPUS_FOOD_COURTS) {
    if (!hasSubRestaurants(foodCourt)) {
      const foodCourtId = FOOD_COURT_ID[foodCourt];

      try {
        const response = await Http.getDirect<
          BaseResponse<CategoryMenuResponse>
        >({
          request: ENDPOINT.MENU.MENU_BY_CATEGORY(foodCourt),
          cache: 'force-cache',
        });

        const categories = Object.keys(response.result);

        categories.forEach(category => {
          params.push({
            foodCourtId,
            restaurantId: category,
          });
        });
      } catch (error) {
        console.error(`Failed to fetch categories for ${foodCourt}:`, error);
      }
    }
  }

  return params;
}

const Page = async (props: {
  params: Promise<{
    foodCourtId: string;
    restaurantId: string;
  }>;
  searchParams: Promise<{ sort?: CampusMenuSort }>;
}) => {
  const { foodCourtId, restaurantId } = await props.params;
  const { sort } = await props.searchParams;
  const foodCourt = getFoodCourtById(foodCourtId);

  if (!foodCourt) {
    throw new Error('Invalid food court id');
  }

  if (hasSubRestaurants(foodCourt)) {
    return (
      <CampusRestaurantPage
        params={Promise.resolve({ foodCourtId, restaurantId })}
        searchParams={Promise.resolve({ sort })}
      />
    );
  }

  return (
    <CampusFoodCourtPage
      params={Promise.resolve({
        foodCourtId,
        categoryKey: restaurantId,
      })}
      searchParams={Promise.resolve({ sort })}
    />
  );
};

export default Page;

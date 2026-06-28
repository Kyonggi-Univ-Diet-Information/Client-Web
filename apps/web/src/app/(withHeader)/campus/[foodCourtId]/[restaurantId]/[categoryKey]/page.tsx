

import { CampusRestaurantPage } from '@/page/campus';

import type { CategoryMenuResponse } from '@/entities/campus/api/api.type';

import { FOOD_COURT_ID } from '@/shared/api';
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
    categoryKey: string;
  }> = [];

  for (const foodCourt of CAMPUS_FOOD_COURTS) {
    if (!hasSubRestaurants(foodCourt)) continue;

    const foodCourtId = FOOD_COURT_ID[foodCourt];
    const restaurants = FOOD_COURT_RESTAURANTS[foodCourt];

    try {
      const response = await Http.getDirect<BaseResponse<CategoryMenuResponse>>(
        {
          request: ENDPOINT.MENU.MENU_BY_CATEGORY(foodCourt),
          cache: 'force-cache',
        },
      );

      const data = response.result;

      restaurants.forEach(restaurant => {
        const restaurantId = RESTAURANT_ID_BY_NAME[restaurant];
        const restaurantData = data[restaurant];

        if (restaurantData && typeof restaurantData === 'object') {
          const categories = Object.keys(restaurantData);

          categories.forEach(category => {
            params.push({
              foodCourtId,
              restaurantId,
              categoryKey: category,
            });
          });
        }
      });
    } catch (error) {
      console.error(`Failed to fetch categories for ${foodCourt}:`, error);
    }
  }

  return params;
}

const Page = async (props: {
  params: Promise<{
    foodCourtId: string;
    restaurantId: string;
    categoryKey: string;
  }>;
}) => {
  const { foodCourtId, restaurantId, categoryKey } = await props.params;

  return (
    <CampusRestaurantPage
      params={Promise.resolve({
        foodCourtId,
        restaurantId,
        categoryKey,
      })}
    />
  );
};

export default Page;

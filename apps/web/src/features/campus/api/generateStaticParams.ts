
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


export interface FoodCourtParams {
  foodCourtId: string;
}

export interface RestaurantParams {
  foodCourtId: string;
  restaurantId: string;
}

export interface CategoryParams {
  foodCourtId: string;
  restaurantId: string;
  categoryKey: string;
}

export function generateFoodCourtParams(): FoodCourtParams[] {
  return CAMPUS_FOOD_COURTS.map(foodCourt => ({
    foodCourtId: FOOD_COURT_ID[foodCourt],
  }));
}

export async function generateRestaurantParams(): Promise<RestaurantParams[]> {
  const params: RestaurantParams[] = [];

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

export async function generateCategoryParams(): Promise<CategoryParams[]> {
  const params: CategoryParams[] = [];

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

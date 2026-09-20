import { cache } from 'react';



import type {
  CategoryMenuResponse,
  CampusMenuSort,
  CampusMenuWithCategory,
} from '@/entities/campus/api/api.type';

import type { CampusFoodCourt } from '@/shared/api';
import type { BaseResponse } from '@/shared/api/api-base-types';
import { ENDPOINT } from '@/shared/api/api-endpoints';
import { Http } from '@/shared/api/api-handlers';
import { hasSubRestaurants } from '@/shared/constants/campus/restaurant';
import type { SubRestaurant } from '@/shared/constants/campus/restaurant';
import { menuKeys } from '@/shared/lib/queryKey';

type CategorizedMenuData = {
  categories: string[];
  menusByCategory: Record<string, CampusMenuWithCategory[]>;
};

export const fetchCampusMenuByCategory = cache(
  async (
    foodCourt: CampusFoodCourt,
    restaurant?: SubRestaurant,
    sort?: CampusMenuSort,
  ): Promise<CategorizedMenuData> => {
    const response = await Http.getDirect<BaseResponse<CategoryMenuResponse>>({
      request: ENDPOINT.MENU.MENU_BY_CATEGORY(foodCourt),
      params: sort ? { sort } : undefined,
      next: { tags: [menuKeys.campus.tag(foodCourt)], revalidate: 60 * 60 },
    });

    const data = response.result;

    if (hasSubRestaurants(foodCourt) && restaurant) {
      const restaurantData = data[restaurant as keyof typeof data];
      if (!restaurantData || typeof restaurantData !== 'object') {
        return { categories: [], menusByCategory: {} };
      }

      const categories = Object.keys(restaurantData);
      const menusByCategory = restaurantData as Record<
        string,
        CampusMenuWithCategory[]
      >;

      return {
        categories,
        menusByCategory,
      };
    }

    const categories = Object.keys(data);
    const menusByCategory = data as Record<string, CampusMenuWithCategory[]>;

    return {
      categories,
      menusByCategory,
    };
  },
);

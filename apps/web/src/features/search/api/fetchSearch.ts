
import type { FoodType, SortingType } from '@/entities/search/model/search';

import { ENDPOINT, type FoodCourt } from '@/shared/api';
import { Http } from '@/shared/api/api-handlers';
import type { SubRestaurant } from '@/shared/constants/campus/restaurant';





export type SearchResult = {
  menuId: number;
  price: number;
  restaurantType: FoodCourt;
  subRestaurant: SubRestaurant;
  name: string;
  nameEn: string;
  cuisine: string;
  foodType: FoodType;
  detailedMenu: string;
  reviewCount: number;
  averageRating: number;
};

export type SearchOption = {
  keyword: string;
  restaurantType: FoodCourt;
  priceMin: number;
  priceMax: number;
  sortingType: SortingType;
};

export const fetchSearch = async (
  option: SearchOption,
): Promise<SearchResult[]> => {
  const { keyword, restaurantType, priceMin, priceMax, sortingType } = option;

  const response: { result: SearchResult[] } = await Http.getDirect({
    request: ENDPOINT.MENU.SEARCH,
    params: {
      keyword,
      restaurantType,
      priceMin,
      priceMax,
      sortingType: sortingType,
    },
  });

  return response.result;
};

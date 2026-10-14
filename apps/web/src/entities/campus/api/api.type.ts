import type { FoodCourt } from '@/shared/api';
import { SET } from '@/shared/constants/campus/menu';
import type { SubRestaurant } from '@/shared/constants/campus/restaurant';
import { FOOD_COURT_RESTAURANTS } from '@/shared/constants/campus/restaurant';

export type RestaurantsOfFoodCourt<T extends FoodCourt> =
  (typeof FOOD_COURT_RESTAURANTS)[T][number];

export type CampusMenuName = {
  id: number;
  name: string;
  nameEn: string;
};

export type SetType = (typeof SET)[keyof typeof SET];

export type CampusMenu = {
  id: number;
  name: string;
  averageRating: number | null;
  nameEn: string;
  price: number;
  subRestaurant: SubRestaurant;
};

export type CampusSetMenu = CampusMenu & {
  baseFoodId: 129;
  setType: SetType;
  category: string;
  categoryKorean: string;
};

export type CampusTopMenu = CampusMenu & {
  restaurantType: FoodCourt;
  reviewCount: 3;
  cuisine: 'KOREAN';
  foodType: 'RICE_BOWL';
  detailedMenu: 'RICE_BOWL';
};

export type CampusMenuWithCategory = CampusMenu & {
  reviewCount: number | null;
  category: string;
  categoryKorean: string;
};

export type KyongsulCategoryMenuResponse = {
  [key in SubRestaurant]?: {
    [category: string]: CampusMenuWithCategory[];
  };
};

export type SimpleCategoryMenuResponse = {
  [category: string]: CampusMenuWithCategory[];
};

export type CategoryMenuResponse =
  | KyongsulCategoryMenuResponse
  | SimpleCategoryMenuResponse;

export type CampusMenuSort = 'rating' | 'name' | 'review_count';

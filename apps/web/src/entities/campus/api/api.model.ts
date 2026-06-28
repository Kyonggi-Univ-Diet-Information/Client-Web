import type { FoodCourt } from '@/shared/api';
import type { SubRestaurant } from '@/shared/constants/campus/restaurant';

import type {
  CampusMenu,
  CampusMenuName,
  CampusMenuWithCategory,
  CampusSetMenu,
  CampusTopMenu,
} from './api.type';


export interface FetchCampusMenuByRestaurantRequest {
  restaurantId: SubRestaurant;
}

export type FetchCampusMenuByRestaurantResponse = CampusMenu[];

export interface FetchCampusMenuNameRequest {
  foodCourt: FoodCourt;
  menuId: number;
}

export type FetchCampusMenuNameResponse = CampusMenuName;

export type FetchTopMenuResponse = CampusTopMenu[];

export interface FetchCategorizedCampusMenuRequest {
  restaurantId: SubRestaurant;
  menuKey: string;
}

export type FetchCategorizedCampusMenuResponse = CampusMenu[];

export interface FetchCampusMenuHasSetRequest {
  type: FoodCourt;
  baseFoodId: number;
}

export type FetchCampusMenuHasSetResponse = CampusSetMenu[];

export type FetchCampusMenuResponse = Record<SubRestaurant, CampusMenu[]>;

export interface FetchCampusMenuDetailRequest {
  type: FoodCourt;
  menuId: number;
}

export type FetchCampusMenuDetailResponse = CampusTopMenu;

export interface FetchCampusMenuByCategoryRequest {
  foodCourt: FoodCourt;
  restaurant?: SubRestaurant;
}

export interface FetchCampusMenuByCategoryResponse {
  categories: string[];
  menusByCategory: Record<string, CampusMenuWithCategory[]>;
}

export interface FetchCampusMenuByFoodCourtRequest {
  foodCourt: FoodCourt;
}

export type FetchCampusMenuByFoodCourtResponse = CampusMenu[];

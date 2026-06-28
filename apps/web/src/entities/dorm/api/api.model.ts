import type { DormDay, DormDayMenu, DormWeekMenu } from './api.type';

export type FetchDormMenuResponse = DormWeekMenu;

export interface FetchDormMenuByDayRequest {
  day: DormDay;
}

export interface FetchDormMenuByDayResponse {
  dayOfWeek: DormDay;
  diet: DormDayMenu;
}

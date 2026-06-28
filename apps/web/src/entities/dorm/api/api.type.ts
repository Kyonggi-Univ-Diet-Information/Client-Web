import type { DormDay } from '@/shared/types/dorm';

export type { DormDay };

export type DormTime = 'BREAKFAST' | 'LUNCH' | 'DINNER';

export type DormMenu = {
  id: number;
  dietFoodDTO: {
    id: number;
    name: string;
    nameEn: string;
    type: string | null;
  };
};

export type DormMenuStatus = 'OPEN' | 'NO_DATA' | 'CLOSED';

export type DormTimeMenu = {
  id: number;
  date: string;
  time: DormTime;
  contents: DormMenu[];
  status: DormMenuStatus;
};

export type DormDayMenu = {
  [key in DormTime]: DormTimeMenu;
};

export type DormWeekMenu = {
  [key in DormDay]: DormDayMenu;
};

import type { FoodCourt } from '@/shared/api';
import type { SubRestaurant } from '@/shared/constants/campus/restaurant';

const RECENT_MENUS_KEY = 'recentMenus';
const MAX_RECENT_MENUS = 3;

export interface RecentMenu {
  foodCourt: FoodCourt;
  foodId: number;
  name: string;
  subRestaurant?: SubRestaurant | null;
}

export function getRecentMenus(): RecentMenu[] {
  try {
    const raw = localStorage.getItem(RECENT_MENUS_KEY);
    return raw ? (JSON.parse(raw) as RecentMenu[]) : [];
  } catch {
    return [];
  }
}

export function addRecentMenu(menu: RecentMenu): void {
  const next = [
    menu,
    ...getRecentMenus().filter(
      item => !(item.foodCourt === menu.foodCourt && item.foodId === menu.foodId),
    ),
  ].slice(0, MAX_RECENT_MENUS);

  localStorage.setItem(RECENT_MENUS_KEY, JSON.stringify(next));
}

'use client';

import { useEffect } from 'react';

import { addRecentMenu, type RecentMenu } from '@/entities/campus/model/recentMenus';

export default function RecordRecentMenu({
  foodCourt,
  foodId,
  name,
  subRestaurant,
}: RecentMenu) {
  useEffect(() => {
    addRecentMenu({ foodCourt, foodId, name, subRestaurant });
  }, [foodCourt, foodId, name, subRestaurant]);

  return null;
}

import { cache } from 'react';



import type { CampusMenu } from '@/entities/campus/api/api.type';

import { ENDPOINT, FOOD_COURT } from '@/shared/api/api-endpoints';
import { Http } from '@/shared/api/api-handlers';
import type { SubRestaurant } from '@/shared/constants/campus/restaurant';
import { menuKeys } from '@/shared/lib/queryKey';

export const fetchCampusMenu = cache(
  async (): Promise<Record<SubRestaurant, CampusMenu[]>> => {
    const response = await Http.get<CampusMenu[]>({
      request: ENDPOINT.MENU.MENU_ALL(FOOD_COURT.KYONGSUL),
      next: { tags: [menuKeys.campus.tag(FOOD_COURT.KYONGSUL)], revalidate: 60 * 60 },
    });

    const grouped = response.reduce(
      (acc, menu) => {
        const restaurant = menu.subRestaurant;
        if (!acc[restaurant]) {
          acc[restaurant] = [];
        }
        acc[restaurant].push(menu);
        return acc;
      },
      {} as Record<SubRestaurant, CampusMenu[]>,
    );

    return grouped;
  },
);

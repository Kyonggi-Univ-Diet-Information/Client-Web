import { cache } from 'react';



import type { CampusMenu } from '@/entities/campus/api/api.type';

import { ENDPOINT, FOOD_COURT } from '@/shared/api/api-endpoints';
import { Http } from '@/shared/api/api-handlers';
import type { SubRestaurant } from '@/shared/constants/campus/restaurant';
import { menuKeys } from '@/shared/lib/queryKey';

export const fetchCategorizedCampusMenu = cache(
  async (
    restaurantId: SubRestaurant,
    menuKey: string,
  ): Promise<CampusMenu[]> => {
    const data = await Http.get<CampusMenu[]>({
      request: ENDPOINT.MENU.MENU_BY_RESTAURANT(
        FOOD_COURT.KYONGSUL,
        restaurantId,
      ),
      next: { tags: [menuKeys.campus.tag(FOOD_COURT.KYONGSUL)], revalidate: 60 * 60 },
    });
    const filtered = data
      .filter(menu => menu.name.includes(menuKey))
      .sort((a, b) => a.name.localeCompare(b.name));

    return filtered;
  },
);

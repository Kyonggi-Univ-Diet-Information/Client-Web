import { cache } from 'react';

import type { FetchCampusMenuByRestaurantResponse } from '@/entities/campus/api/api.model';


import { ENDPOINT, FOOD_COURT } from '@/shared/api/api-endpoints';
import { Http } from '@/shared/api/api-handlers';
import type { SubRestaurant } from '@/shared/constants/campus/restaurant';
import { menuKeys } from '@/shared/lib/queryKey';



export const fetchCampusMenuByRestaurant = cache(
  async (
    restaurantId: SubRestaurant,
  ): Promise<FetchCampusMenuByRestaurantResponse> => {
    const data = await Http.get<FetchCampusMenuByRestaurantResponse>({
      request: ENDPOINT.MENU.MENU_BY_RESTAURANT('KYONGSUL', restaurantId),
      next: { tags: [menuKeys.campus.tag(FOOD_COURT.KYONGSUL)], revalidate: 60 * 60 },
    });

    const sorted = data.sort((a, b) => a.name.localeCompare(b.name));

    return sorted;
  },
);

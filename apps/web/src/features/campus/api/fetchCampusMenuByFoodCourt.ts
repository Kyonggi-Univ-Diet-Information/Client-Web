import { cache } from 'react';


import type { FetchCampusMenuByFoodCourtResponse } from '@/entities/campus/api/api.model';

import { ENDPOINT, FoodCourt } from '@/shared/api/api-endpoints';
import { Http } from '@/shared/api/api-handlers';
import { menuKeys } from '@/shared/lib/queryKey';


export const fetchCampusMenuByFoodCourt = cache(
  async (foodCourt: FoodCourt): Promise<FetchCampusMenuByFoodCourtResponse> => {
    const data = await Http.get<FetchCampusMenuByFoodCourtResponse>({
      request: ENDPOINT.MENU.MENU_ALL(foodCourt),
      next: { tags: [menuKeys.campus.tag(foodCourt)], revalidate: 60 * 60 },
    });

    const sorted = data.sort((a, b) => a.name.localeCompare(b.name));

    return sorted;
  },
);

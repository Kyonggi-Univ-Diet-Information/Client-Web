
import type { FetchCampusMenuNameResponse } from '@/entities/campus/api/api.model';

import { ENDPOINT, type FoodCourt } from '@/shared/api/api-endpoints';
import { Http } from '@/shared/api/api-handlers';
import { menuKeys } from '@/shared/lib/queryKey';


export const fetchCampusMenuName = async (
  foodCourt: FoodCourt,
  menuId: number,
): Promise<FetchCampusMenuNameResponse> => {
  const data = await Http.get<FetchCampusMenuNameResponse>({
    request: ENDPOINT.MENU.MENU_NAME(foodCourt, menuId),
    next: { tags: [menuKeys.campus.tag(foodCourt)], revalidate: 60 * 60 },
  });

  return data;
};

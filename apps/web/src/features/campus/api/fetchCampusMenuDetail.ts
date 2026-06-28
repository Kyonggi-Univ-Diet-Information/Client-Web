import type { FetchCampusMenuDetailResponse } from '@/entities/campus/api/api.model';
import type { CampusTopMenu } from '@/entities/campus/api/api.type';

import { ENDPOINT, FoodCourt } from '@/shared/api';
import { Http } from '@/shared/api/api-handlers';
import { menuKeys } from '@/shared/lib/queryKey';



export const fetchCampusMenuDetail = async (
  type: FoodCourt,
  menuId: number,
): Promise<FetchCampusMenuDetailResponse> => {
  const response = await Http.get<CampusTopMenu>({
    request: ENDPOINT.MENU.MENU_DETAIL(type, menuId),
    next: { tags: [menuKeys.campus.tag(type)], revalidate: 60 * 60 },
  });

  return response;
};

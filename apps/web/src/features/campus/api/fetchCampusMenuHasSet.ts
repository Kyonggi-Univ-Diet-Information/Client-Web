import type { FetchCampusMenuHasSetResponse } from '@/entities/campus/api/api.model';
import type { CampusSetMenu } from '@/entities/campus/api/api.type';

import { type CampusFoodCourt, ENDPOINT } from '@/shared/api';
import type { BaseResponse } from '@/shared/api/api-base-types';
import { Http } from '@/shared/api/api-handlers';
import { menuKeys } from '@/shared/lib/queryKey';



export const fetchCampusMenuHasSet = async (
  type: CampusFoodCourt,
  baseFoodId: number,
): Promise<FetchCampusMenuHasSetResponse> => {
  const response = await Http.get<BaseResponse<CampusSetMenu[]>>({
    request: ENDPOINT.MENU.HAS_SET(type, baseFoodId),
    next: { tags: [menuKeys.campus.tag(type)], revalidate: 60 * 60 },
  });

  return response.result;
};

import type { FetchDormMenuByDayResponse } from '@/entities/dorm/api/api.model';
import type { DormDay } from '@/entities/dorm/api/api.type';

import { ENDPOINT } from '@/shared/api';
import { Http } from '@/shared/api/api-handlers';
import { menuKeys } from '@/shared/lib/queryKey';


interface FetchDormMenuByDayApiResponse {
  result: FetchDormMenuByDayResponse;
}

export const fetchDormMenuByDay = async (
  day: DormDay,
): Promise<FetchDormMenuByDayResponse> => {
  const data = await Http.getDirect<FetchDormMenuByDayApiResponse>({
    request: ENDPOINT.DORM.DORM_MENU_BY_DAY(day),
    next: { tags: [menuKeys.dorm.tag()] },
  });
  return data.result;
};

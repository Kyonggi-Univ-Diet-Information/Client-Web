import type { FetchDormMenuResponse } from '@/entities/dorm/api/api.model';
import type { DormDay, DormTime, DormTimeMenu } from '@/entities/dorm/api/api.type';

import { ENDPOINT } from '@/shared/api';
import { Http } from '@/shared/api/api-handlers';
import { menuKeys } from '@/shared/lib/queryKey';


interface FetchDormMenuApiResponse {
  result: {
    [key in DormDay]: {
      [key in DormTime]: DormTimeMenu;
    };
  };
}

export const fetchDormMenu = async (): Promise<FetchDormMenuResponse> => {
  const data = await Http.getDirect<FetchDormMenuApiResponse>({
    request: ENDPOINT.DORM.DORM_MENU,
    next: { tags: [menuKeys.dorm.tag()] },
  });
  return data.result;
};


import type { FetchTopMenuResponse } from '@/entities/campus/api/api.model';
import type { CampusTopMenu } from '@/entities/campus/api/api.type';

import { ENDPOINT } from '@/shared/api';
import type { BaseResponse } from '@/shared/api/api-base-types';
import { Http } from '@/shared/api/api-handlers';
import { menuKeys } from '@/shared/lib/queryKey';


export const fetchTopMenu = async (): Promise<FetchTopMenuResponse> => {
  const data = await Http.get<BaseResponse<CampusTopMenu[]>>({
    request: ENDPOINT.MENU.TOP_MENU,
    next: { tags: [menuKeys.top.tag()], revalidate: 60 * 5 },
  });

  return data.result;
};


import type { FetchRecentReviewResponse } from '@/entities/review/api/api.model';
import type { RecentReview } from '@/entities/review/api/api.type';

import { ENDPOINT } from '@/shared/api';
import { Http } from '@/shared/api/api-handlers';
import { AuthService } from '@/shared/lib/auth';
import { reviewKeys } from '@/shared/lib/queryKey';


export const fetchRecentReview = async (): Promise<FetchRecentReviewResponse> => {
  const isAuthenticated = await AuthService.isAuthenticated();
  const data = await Http.get<{ result: RecentReview[] }>({
    request: ENDPOINT.REVIEW_R.RECENT_REVIEW,
    cache: 'force-cache',
    authorize: isAuthenticated,
    next: { tags: [reviewKeys.recent.tag()], revalidate: 60 * 5 },
  });

  return data.result;
};

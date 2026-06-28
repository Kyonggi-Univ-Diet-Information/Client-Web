import { type FoodCourt } from '@/shared/api';

import { getReviewsAction, ReviewWithMetadata } from './getReviewsAction';



/** SWR infinite 사용 시 키는 reviewKeys.paged(type, foodId, pageIndex) */
export const reviewsFetcher = async ([, type, foodId, page]: [
  string,
  FoodCourt,
  number,
  number,
]) => {
  return await getReviewsAction(type, foodId, page);
};

export interface PagedReviewResponse {
  content: ReviewWithMetadata[];
  totalPages: number;
  last: boolean;
  pageNo: number;
  isAuthenticated: boolean;
}

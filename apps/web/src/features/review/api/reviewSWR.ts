import type { ReviewSort } from '@/entities/review/api/api.type';

import { type FoodCourt } from '@/shared/api';

import { getReviewsAction, ReviewWithMetadata } from './getReviewsAction';



/** SWR infinite 사용 시 키는 reviewKeys.paged(type, foodId, pageIndex, sort) */
export const reviewsFetcher = async ([, type, foodId, page, sort]: [
  string,
  FoodCourt,
  number,
  number,
  ReviewSort | undefined,
]) => {
  return await getReviewsAction(type, foodId, page, sort);
};

export interface PagedReviewResponse {
  content: ReviewWithMetadata[];
  totalPages: number;
  last: boolean;
  pageNo: number;
  isAuthenticated: boolean;
}

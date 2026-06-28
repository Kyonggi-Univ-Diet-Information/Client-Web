/**
 * Query Key Factory for SWR and Next.js
 *
 * - SWR: 배열 키 사용 (useSWR(key), mutate(matcher))
 * - Next.js fetch: next.tags에는 .tag(...) 문자열 사용 (revalidateTag와 동일)
 *
 * 하나의 팩토리에서 키를 관리하며, 두 캐시 계층 모두에 대응합니다.
 */

import type { CampusFoodCourt, FoodCourt } from '@/shared/api';

export type QueryKey = readonly unknown[];

function startsWith(key: unknown[], prefix: readonly unknown[]): boolean {
  if (prefix.length > key.length) return false;
  return prefix.every((p, i) => key[i] === p);
}

/**
 * 배열 키 → Next.js tag 문자열 (revalidateTag, next.tags)
 * 값에 ':' 가 포함되지 않도록 join하여 사용합니다.
 */
export function toTag(key: QueryKey): string {
  return key.map(String).join(':');
}

/**
 * Query Key Factory: 키 생성 + .tag(...) 지원
 */
function createQueryKeyFactory<T extends QueryKey, A extends unknown[]>(
  keyBuilder: (...args: A) => T,
) {
  const fn = keyBuilder as ((...args: A) => T) & {
    tag: (...args: A) => string;
  };
  fn.tag = (...args: A) => toTag(keyBuilder(...args));
  return fn;
}

// ---------------------------------------------------------------------------
// Auth
// ---------------------------------------------------------------------------

export const authKeys = {
  status: createQueryKeyFactory(() => ['auth-status'] as const),
} as const;

// ---------------------------------------------------------------------------
// Review
// ---------------------------------------------------------------------------

export const reviewKeys = {
  all: createQueryKeyFactory(() => ['reviews'] as const),
  byFood: createQueryKeyFactory(
    (type: FoodCourt, foodId: number) => ['reviews', type, foodId] as const,
  ),
  paged: createQueryKeyFactory(
    (type: FoodCourt, foodId: number, pageIndex: number = 0) =>
      ['reviews', type, foodId, pageIndex] as const,
  ),
  count: createQueryKeyFactory(
    (type: FoodCourt, foodId: number) =>
      ['reviews', 'count', type, foodId] as const,
  ),
  averageRating: createQueryKeyFactory(
    (type: FoodCourt, foodId: number) =>
      ['reviews', 'average-rating', type, foodId] as const,
  ),
  ratingCount: createQueryKeyFactory(
    (type: FoodCourt, foodId: number) =>
      ['reviews', 'rating-count', type, foodId] as const,
  ),
  faved: createQueryKeyFactory(
    (type: FoodCourt) => ['reviews', 'faved', type] as const,
  ),
  favedCount: createQueryKeyFactory(
    (type: FoodCourt, reviewId: number) =>
      ['reviews', 'faved-count', type, reviewId] as const,
  ),
  recent: createQueryKeyFactory(() => ['reviews', 'recent'] as const),
} as const;

// ---------------------------------------------------------------------------
// Member
// ---------------------------------------------------------------------------

export const memberKeys = {
  info: createQueryKeyFactory(() => ['member', 'info'] as const),
  reviews: createQueryKeyFactory(
    (page: number = 0) => ['member', 'reviews', page] as const,
  ),
  favReviews: createQueryKeyFactory(
    (page: number = 0) => ['member', 'fav-reviews', page] as const,
  ),
} as const;

// ---------------------------------------------------------------------------
// Menu
// ---------------------------------------------------------------------------

export const menuKeys = {
  /** 기숙사 메뉴 전체 (fetchDormMenu) */
  dorm: createQueryKeyFactory(() => ['menu', 'dorm'] as const),
  dormByDay: createQueryKeyFactory(
    (day: string) => ['menu', 'dorm', day] as const,
  ),
  campus: createQueryKeyFactory(
    (foodCourt: FoodCourt) => ['menu', 'campus', foodCourt] as const,
  ),
  campusDetail: createQueryKeyFactory(
    (foodCourt: FoodCourt, menuId: number) =>
      ['menu', 'campus', foodCourt, 'detail', menuId] as const,
  ),
  campusSet: createQueryKeyFactory(
    (foodCourt: CampusFoodCourt, baseFoodId: number) =>
      ['menu', 'campus', foodCourt, 'set', baseFoodId] as const,
  ),
  top: createQueryKeyFactory(() => ['menu', 'top'] as const),
} as const;

// ---------------------------------------------------------------------------
// Matcher (SWR mutate)
// ---------------------------------------------------------------------------

/**
 * 주어진 키들에 대해 "key가 prefix로 시작하는지"로 매칭하는 함수 생성.
 * mutate(matcher)로 해당 prefix 하위의 모든 SWR 캐시 무효화 시 사용.
 */
export function createMutateMatcher(
  ...keys: (readonly unknown[])[]
): (key: unknown) => boolean {
  return (key: unknown): boolean => {
    if (!Array.isArray(key)) return false;
    return keys.some(k => startsWith(key, k));
  };
}

/**
 * 도메인 prefix 매칭 (예: 'reviews' → 모든 리뷰 관련 키)
 */
export function matchDomain(key: unknown, domain: string): boolean {
  return Array.isArray(key) && key.length > 0 && key[0] === domain;
}

export function isQueryKey(key: unknown): key is QueryKey {
  return Array.isArray(key) && key.length > 0;
}

export function queryKeyToString(key: unknown): string {
  if (!isQueryKey(key)) return String(key);
  return JSON.stringify(key);
}

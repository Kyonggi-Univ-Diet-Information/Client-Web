/**
 * GA4 이벤트 트래킹 타입 정의
 * 모든 GA4 이벤트 이름과 파라미터 타입의 단일 진실 공급원(single source of truth)
 */

// ─────────────────────────────────────────────────────────────────────────────
// 기본 파라미터 — 모든 이벤트에 공통으로 사용 가능한 옵셔널 필드
// ─────────────────────────────────────────────────────────────────────────────

export interface GA4BaseParams {
  page?: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// 기존 이벤트 파라미터 타입
// ─────────────────────────────────────────────────────────────────────────────

export interface GA4MenuClickParams extends GA4BaseParams {
  menu_id: string;
  menu_name: string;
  time_slot: 'BREAKFAST' | 'LUNCH' | 'DINNER';
  is_mobile: boolean;
  selected_date: string;
}

export interface GA4RatingSelectParams extends GA4BaseParams {
  rating: number;
  menu_id: string;
  language: string;
}

export interface GA4ReviewSubmitSuccessParams extends GA4BaseParams {
  menu_id: string;
  rating: number;
  content_length: number;
  language: string;
}

export interface GA4ReviewLikeParams extends GA4BaseParams {
  review_id: string;
  review_rating: number;
  content_length?: number;
}

export interface GA4ReviewUnlikeParams extends GA4BaseParams {
  review_id: string;
  review_rating: number;
}

export interface GA4ErrorParams extends GA4BaseParams {
  error_message: string;
  error_type?: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// 캠퍼스 이벤트 파라미터 타입
// ─────────────────────────────────────────────────────────────────────────────

export interface GA4CampusTabClickParams extends GA4BaseParams {
  tab_id: string;
  tab_label: string;
}

export interface GA4ReviewButtonClickParams extends GA4BaseParams {
  menu_id: string;
  food_court_id: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// 리뷰 이벤트 파라미터 타입
// ─────────────────────────────────────────────────────────────────────────────

export interface GA4ReviewActionParams extends GA4BaseParams {
  action: 'delete' | 'report' | 'block';
  review_id: string;
  is_my_review: boolean;
}

export interface GA4ReviewWriteClickParams extends GA4BaseParams {
  menu_id: string;
  food_court_id: string;
  is_authenticated: boolean;
}

// ─────────────────────────────────────────────────────────────────────────────
// 검색 이벤트 파라미터 타입
// ─────────────────────────────────────────────────────────────────────────────

export interface GA4SearchFilterChangeParams extends GA4BaseParams {
  filter_type: 'restaurantType';
  filter_value: string;
  query: string;
}

export interface GA4SearchSortChangeParams extends GA4BaseParams {
  sort_value: string;
  query: string;
}

export interface GA4SearchResetParams extends GA4BaseParams {
  query: string;
}

export interface GA4SearchResultClickParams extends GA4BaseParams {
  menu_id: number;
  menu_name: string;
  restaurant_type: string;
  query: string;
  result_index: number;
}

// ─────────────────────────────────────────────────────────────────────────────
// 유저 이벤트 파라미터 타입
// ─────────────────────────────────────────────────────────────────────────────

/** 파라미터가 없는 이벤트는 GA4BaseParams를 alias하여 page? 전달 가능하게 유지 */
export type GA4LogoutParams = GA4BaseParams;

export interface GA4AccountRevokeParams extends GA4BaseParams {
  step: 'open' | 'reason_select' | 'confirm' | 'complete';
  reason_type?: string;
}

export interface GA4UserTabClickParams extends GA4BaseParams {
  tab_key: string;
  tab_label: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// 기숙사 이벤트 파라미터 타입
// ─────────────────────────────────────────────────────────────────────────────

export interface GA4DormDayTabClickParams extends GA4BaseParams {
  day: number;
  day_label: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// GA4 이벤트 이름 유니온
// page_view는 gtag('config', ...) 사용이라 trackEvent 대상에서 제외
// ─────────────────────────────────────────────────────────────────────────────

export type GA4EventName =
  // 기존
  | 'menu_click'
  | 'rating_select'
  | 'review_submit_success'
  | 'review_submit_error'
  | 'review_like'
  | 'review_unlike'
  | 'review_like_error'
  | 'error'
  // 캠퍼스
  | 'campus_tab_click'
  | 'review_button_click'
  // 리뷰
  | 'review_action'
  | 'review_write_click'
  // 검색
  | 'search_filter_change'
  | 'search_sort_change'
  | 'search_reset'
  | 'search_result_click'
  // 유저
  | 'logout'
  | 'account_revoke'
  | 'user_tab_click'
  // 기숙사
  | 'dorm_day_tab_click';

// ─────────────────────────────────────────────────────────────────────────────
// GA4EventParamsMap — 이벤트 이름 → 파라미터 타입 매핑
// trackEvent 제네릭 시그니처의 타입 안전성을 보장하는 핵심 맵
// ─────────────────────────────────────────────────────────────────────────────

export interface GA4EventParamsMap {
  menu_click: GA4MenuClickParams;
  rating_select: GA4RatingSelectParams;
  review_submit_success: GA4ReviewSubmitSuccessParams;
  review_submit_error: GA4ErrorParams;
  review_like: GA4ReviewLikeParams;
  review_unlike: GA4ReviewUnlikeParams;
  review_like_error: GA4ErrorParams;
  error: GA4ErrorParams;
  campus_tab_click: GA4CampusTabClickParams;
  review_button_click: GA4ReviewButtonClickParams;
  review_action: GA4ReviewActionParams;
  review_write_click: GA4ReviewWriteClickParams;
  search_filter_change: GA4SearchFilterChangeParams;
  search_sort_change: GA4SearchSortChangeParams;
  search_reset: GA4SearchResetParams;
  search_result_click: GA4SearchResultClickParams;
  logout: GA4LogoutParams;
  account_revoke: GA4AccountRevokeParams;
  user_tab_click: GA4UserTabClickParams;
  dorm_day_tab_click: GA4DormDayTabClickParams;
}

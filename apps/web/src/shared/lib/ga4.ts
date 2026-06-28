import type { GA4EventName, GA4EventParamsMap } from '@/shared/types/ga4';

/** GA4 Measurement ID */
export const GA4_MEASUREMENT_ID = 'G-NKEL4R473V';

/**
 * Google Analytics 4 설정
 */
export const GA4_CONFIG = {
  MEASUREMENT_ID: GA4_MEASUREMENT_ID,

  // 개발 환경에서 추적 비활성화 여부
  DISABLE_IN_DEV: process.env.NODE_ENV === 'development',

  // 디버그 모드 활성화 여부
  DEBUG_MODE: process.env.NEXT_PUBLIC_GA_DEBUG === 'true',
} as const;

/**
 * GA4 추적이 활성화되어 있는지 확인
 */
export const shouldTrackGA4 = (): boolean => {
  if (typeof window === 'undefined') return false;
  if (GA4_CONFIG.DISABLE_IN_DEV && process.env.NODE_ENV === 'development') {
    return false;
  }
  return !!GA4_CONFIG.MEASUREMENT_ID;
};

/** gtag 전역 타입 확장 */
declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event' | 'js',
      targetId: string | Date,
      config?: Record<string, unknown>,
    ) => void;
    dataLayer: Array<unknown>;
  }
}

export {};

/**
 * review_submit_success는 전환 이벤트로 send_to가 필요
 */
const CONVERSION_EVENTS = new Set<GA4EventName>(['review_submit_success']);

/**
 * GA4 이벤트 추적 — 단일 진입점
 *
 * @example
 * trackEvent('logout');
 * trackEvent('campus_tab_click', { tab_id: 'kyongsul', tab_label: '경술관' });
 * trackEvent('review_submit_success', { menu_id: '1', rating: 5, content_length: 80, language: 'ko' });
 */
export const trackEvent = <T extends GA4EventName>(
  eventName: T,
  params?: GA4EventParamsMap[T],
): void => {
  if (!shouldTrackGA4() || typeof window === 'undefined' || !window.gtag) {
    return;
  }

  const eventParams = CONVERSION_EVENTS.has(eventName)
    ? { ...params, send_to: GA4_CONFIG.MEASUREMENT_ID }
    : params;

  window.gtag('event', eventName, eventParams as Record<string, unknown>);

  if (GA4_CONFIG.DEBUG_MODE) {
    console.log('[GA4] Event tracked:', eventName, eventParams);
  }
};

/**
 * 페이지뷰 추적 (수동)
 * gtag('config', ...) 사용 — trackEvent와 별도
 */
export const trackPageView = (url: string): void => {
  if (!shouldTrackGA4() || typeof window === 'undefined' || !window.gtag) {
    return;
  }

  window.gtag('config', GA4_CONFIG.MEASUREMENT_ID, {
    page_path: url,
  });

  if (GA4_CONFIG.DEBUG_MODE) {
    console.log('[GA4] Page view tracked:', url);
  }
};

export type {
  GA4EventName,
  GA4EventParamsMap,
  GA4BaseParams,
  GA4MenuClickParams,
  GA4RatingSelectParams,
  GA4ReviewSubmitSuccessParams,
  GA4ReviewLikeParams,
  GA4ReviewUnlikeParams,
  GA4ErrorParams,
  GA4CampusTabClickParams,
  GA4ReviewButtonClickParams,
  GA4ReviewActionParams,
  GA4ReviewWriteClickParams,
  GA4SearchFilterChangeParams,
  GA4SearchSortChangeParams,
  GA4SearchResetParams,
  GA4SearchResultClickParams,
  GA4LogoutParams,
  GA4AccountRevokeParams,
  GA4UserTabClickParams,
  GA4DormDayTabClickParams,
} from '@/shared/types/ga4';

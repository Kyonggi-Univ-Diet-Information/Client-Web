import type {
  GA4ReviewReferrer,
  GA4ReviewErrorType,
  GA4ReviewFlowVersion,
} from '@/shared/types/ga4';

export const REVIEW_FLOW_VERSION: GA4ReviewFlowVersion = 'revamp_v1';

export const REVIEW_REFERRER_QUERY_KEY = 'referrer';

const REVIEW_REFERRERS: readonly GA4ReviewReferrer[] = [
  'menu_detail',
  'menu_detail_review_list',
  'home_recent',
];

export const parseReviewReferrer = (
  value: string | null | undefined,
): GA4ReviewReferrer =>
  REVIEW_REFERRERS.find(referrer => referrer === value) ??
  'menu_detail';

export const withReviewReferrer = (
  href: string,
  referrer: GA4ReviewReferrer,
) => {
  if (referrer === 'menu_detail') return href;
  return `${href}${href.includes('?') ? '&' : '?'}${REVIEW_REFERRER_QUERY_KEY}=${referrer}`;
};

export const createReviewAttemptId = () =>
  typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;

export const getReviewErrorType = (error: unknown): GA4ReviewErrorType => {
  if (typeof navigator !== 'undefined' && navigator.onLine === false) {
    return 'network';
  }
  if (error instanceof TypeError) return 'network';
  return 'unknown';
};

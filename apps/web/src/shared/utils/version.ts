import { getNativeBridge, isNativeApp } from '@/shared/lib/nativeBridge';
import { isAppUserAgent } from '@/shared/lib/platform';

// 앱은 이번 신규 버전부터 APP_VERSION을 내려줘요. 값이 없는 앱은 구버전이에요
export const getAppVersion = (): string | undefined => {
  if (typeof window === 'undefined') return undefined;
  return window.APP_VERSION ?? getNativeBridge()?.getAppVersion?.();
};

const isInApp = () => isNativeApp() || isAppUserAgent(navigator.userAgent);

// 서버에서는 앱 여부를 알 수 없어서 false예요. 클라이언트에서 호출해 주세요
export const isPhotoReviewEnabled = (): boolean => {
  if (typeof window === 'undefined') return false;
  return !isInApp() || !!getAppVersion();
};

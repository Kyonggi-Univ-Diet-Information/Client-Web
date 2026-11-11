import { MIN_APP_VERSION } from '@/shared/constants/appVersion';

import { SAFE_AREA_SCRIPT } from './safeArea';

const IOS_APP_UA =
  'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 Mobile/15E148 KiryongIOS';
const ANDROID_APP_UA =
  'Mozilla/5.0 (Linux; Android 14; Pixel 8; wv) AppleWebKit/537.36 Chrome/120.0 Mobile Safari/537.36 KiryongAndroid';
const BROWSER_UA =
  'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 Version/17.0 Mobile/15E148 Safari/604.1';

const setUserAgent = (userAgent: string) =>
  Object.defineProperty(navigator, 'userAgent', {
    value: userAgent,
    configurable: true,
  });

const run = () => new Function(SAFE_AREA_SCRIPT)();
const nativeInset = () => document.documentElement.dataset.nativeInset;

describe('SAFE_AREA_SCRIPT', () => {
  afterEach(() => {
    delete document.documentElement.dataset.nativeInset;
    delete window.APP_VERSION;
    delete window.Android;
  });

  it('브라우저에서는 표시하지 않아요', () => {
    setUserAgent(BROWSER_UA);
    run();
    expect(nativeInset()).toBeUndefined();
  });

  it('버전이 없는 구버전 iOS 앱이면 ios로 표시해요', () => {
    setUserAgent(IOS_APP_UA);
    run();
    expect(nativeInset()).toBe('ios');
  });

  it('기준보다 낮은 Android 앱이면 android로 표시해요', () => {
    setUserAgent(ANDROID_APP_UA);
    window.APP_VERSION = '2.1.0';
    run();
    expect(nativeInset()).toBe('android');
  });

  it('기준 이상 버전 앱이면 표시하지 않아요', () => {
    setUserAgent(IOS_APP_UA);
    window.APP_VERSION = '2.10.0';
    run();
    expect(nativeInset()).toBeUndefined();
  });

  it('window.Android 브릿지로 버전을 읽어요', () => {
    setUserAgent(ANDROID_APP_UA);
    window.Android = {
      getAppVersion: () => MIN_APP_VERSION.WEB_SAFE_AREA,
    } as unknown as Window['Android'];
    run();
    expect(nativeInset()).toBeUndefined();
  });

  it('버전이 늦게 주입되면 DOMContentLoaded에서 다시 확인해요', () => {
    setUserAgent(IOS_APP_UA);
    run();
    expect(nativeInset()).toBe('ios');

    window.APP_VERSION = MIN_APP_VERSION.WEB_SAFE_AREA;
    document.dispatchEvent(new Event('DOMContentLoaded'));
    expect(nativeInset()).toBeUndefined();
  });
});

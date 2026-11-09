import { MIN_APP_VERSION } from '@/shared/constants/appVersion';

import {
  getAppVersion,
  isPhotoReviewEnabled,
  isVersionAtLeast,
} from './version';

const setUserAgent = (ua: string) =>
  jest.spyOn(window.navigator, 'userAgent', 'get').mockReturnValue(ua);

describe('isPhotoReviewEnabled', () => {
  afterEach(() => {
    jest.restoreAllMocks();
    delete window.APP_VERSION;
    delete window.Android;
    delete window.Bridge;
  });

  it('브라우저에서는 켜져요', () => {
    expect(isPhotoReviewEnabled()).toBe(true);
  });

  it('APP_VERSION이 없는 구버전 앱에서는 꺼져요', () => {
    setUserAgent('Mozilla/5.0 ReactNative KiryongIOS');
    expect(isPhotoReviewEnabled()).toBe(false);
  });

  it('기준 버전 이상 앱에서는 켜져요', () => {
    setUserAgent('Mozilla/5.0 KiryongAndroid');
    window.APP_VERSION = MIN_APP_VERSION.PHOTO_REVIEW;
    expect(isPhotoReviewEnabled()).toBe(true);
  });

  it('기준 버전보다 낮은 앱에서는 꺼져요', () => {
    setUserAgent('Mozilla/5.0 KiryongAndroid');
    window.APP_VERSION = '2.0.9';
    expect(isPhotoReviewEnabled()).toBe(false);
  });

  it('window.Bridge가 없으면 window.Android의 getAppVersion으로 버전을 읽어요', () => {
    window.Android = {
      getToken: jest.fn(),
      logout: jest.fn(),
      refreshToken: jest.fn(),
      getAppVersion: () => '2.1.0',
    };
    expect(getAppVersion()).toBe('2.1.0');
    expect(isPhotoReviewEnabled()).toBe(true);
  });
});

describe('isVersionAtLeast', () => {
  it.each([
    ['2.1.0', '2.1.0', true],
    ['2.1.1', '2.1.0', true],
    ['2.10.0', '2.9.0', true],
    ['2.1', '2.1.0', true],
    ['2.0.9', '2.1.0', false],
    ['1.9.9', '2.0.0', false],
  ])('%s >= %s 는 %s예요', (version, min, expected) => {
    expect(isVersionAtLeast(version, min)).toBe(expected);
  });
});

import { getAppVersion, isPhotoReviewEnabled } from './version';

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

  it('APP_VERSION을 내려주는 앱에서는 켜져요', () => {
    setUserAgent('Mozilla/5.0 KiryongAndroid');
    window.APP_VERSION = '2.1.0';
    expect(isPhotoReviewEnabled()).toBe(true);
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

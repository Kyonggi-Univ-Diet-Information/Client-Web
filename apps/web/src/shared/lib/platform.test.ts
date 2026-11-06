import { isAndroidWebView } from './platform';

const setUserAgent = (userAgent: string) =>
  Object.defineProperty(navigator, 'userAgent', {
    value: userAgent,
    configurable: true,
  });

describe('isAndroidWebView', () => {
  it('Android 앱 웹뷰 UA면 true를 반환한다', () => {
    setUserAgent(
      'Mozilla/5.0 (Linux; Android 14; Pixel 8; wv) AppleWebKit/537.36 Chrome/120.0 Mobile Safari/537.36 KiryongAndroid',
    );
    expect(isAndroidWebView()).toBe(true);
  });

  it('Android Chrome 브라우저면 false를 반환한다', () => {
    setUserAgent(
      'Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 Chrome/120.0 Mobile Safari/537.36',
    );
    expect(isAndroidWebView()).toBe(false);
  });

  it('iOS면 false를 반환한다', () => {
    setUserAgent(
      'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 Mobile/15E148 KiryongIOS',
    );
    expect(isAndroidWebView()).toBe(false);
  });
});

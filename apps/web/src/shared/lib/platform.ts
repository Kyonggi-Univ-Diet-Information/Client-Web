export const isIos = () => {
  if (typeof navigator === 'undefined') return false;
  console.log(navigator.userAgent);
  return /iPhone|iPad|iPod|Macintosh/i.test(navigator.userAgent);
};

export const isAndroid = () => {
  if (typeof navigator === 'undefined') return false;
  return /Android/i.test(navigator.userAgent);
};

// Android 앱은 시스템 바 높이를 네이티브에서 비켜주는데 env() 하단 inset에도 같은 값이 들어와서, 더하면 여백이 이중으로 생겨요
export const isAndroidWebView = () =>
  isAndroid() && navigator.userAgent.includes('; wv)');

// 앱은 UA 끝에 KiryongAndroid/KiryongIOS를 붙여요. 2.1.0 이전 앱은 ReactNative도 붙여요
export const isAppUserAgent = (userAgent: string) =>
  /ReactNative|Kiryong(Android|IOS)/.test(userAgent);

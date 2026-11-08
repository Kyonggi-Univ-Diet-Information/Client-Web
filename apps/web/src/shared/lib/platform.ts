export const isIos = () => {
  if (typeof navigator === 'undefined') return false;
  console.log(navigator.userAgent);
  return /iPhone|iPad|iPod|Macintosh/i.test(navigator.userAgent);
};

export const isAndroid = () => {
  if (typeof navigator === 'undefined') return false;
  return /Android/i.test(navigator.userAgent);
};

// 앱은 UA 끝에 KiryongAndroid/KiryongIOS를 붙여요. 2.1.0 이전 앱은 ReactNative도 붙여요
export const isAppUserAgent = (userAgent: string) =>
  /ReactNative|Kiryong(Android|IOS)/.test(userAgent);

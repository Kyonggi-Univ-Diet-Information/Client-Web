import { NextRequest } from 'next/server';

/**
 * 웹뷰 환경인지 확인합니다.
 */
export function isReactNativeWebView(request: NextRequest): boolean {
  const userAgent = request.headers.get('user-agent') || '';
  const customHeader = request.headers.get('x-react-native-webview');
  return userAgent.includes('ReactNative') || customHeader === 'true';
}

/**
 * 웹뷰 환경에 맞는 쿠키 옵션을 반환합니다.
 * 웹뷰 환경에서는 sameSite를 'lax'로 설정하여 쿠키가 정상적으로 작동하도록 합니다.
 */
export function getCookieOptions(request?: NextRequest) {
  const isWebView = request ? isReactNativeWebView(request) : false;
  const isProduction = process.env.NODE_ENV === 'production';

  return {
    httpOnly: true,
    secure: isProduction, // 프로덕션 환경에서는 HTTPS를 사용하므로 secure 플래그 활성화
    sameSite: (isWebView ? 'lax' : 'strict') as 'strict' | 'lax' | 'none',
    // 웹뷰 환경에서는 sameSite: 'lax'를 사용하여 쿠키가 정상적으로 작동하도록 함
    // 일반 브라우저에서는 sameSite: 'strict'를 사용하여 보안 강화
  };
}

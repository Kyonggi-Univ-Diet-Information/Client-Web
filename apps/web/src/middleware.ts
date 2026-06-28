import { NextResponse, type NextRequest } from 'next/server';

import { submitRefresh } from '@/features/auth/api/submitRefresh';

import { COOKIE_KEYS } from '@/shared/api';
import { isReactNativeWebView, getCookieOptions } from '@/shared/lib/cookie';


function isAuthenticated(request: NextRequest): boolean {
  const accessToken = request.cookies.get(COOKIE_KEYS.ACCESS_TOKEN);
  return !!accessToken?.value;
}

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 앱 출시로 웹 브라우저 접속 차단 및 랜딩 페이지로 리다이렉트
  // if (!isReactNativeWebView(request) && !pathname.includes('/auth')) {
  //   return NextResponse.redirect('https://www.kiryong.kr/');
  // }

  if (pathname.includes('/user')) {
    if (!isAuthenticated(request)) {
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }
  }

  if (isReactNativeWebView(request)) {
    // 엔트리 페이지 아닌 경우 패스
    if (pathname !== '/entry') {
      return NextResponse.next();
    }

    // 엔트리 페이지일 경우 + 기존에 둘러보기를 선택한 사용자의 경우
    if (request.cookies.get(COOKIE_KEYS.ENTRY_VISITED)?.value === 'true') {
      return NextResponse.redirect(new URL('/', request.url));
    }

    // 엔트리 페이지일 경우 + 기존 로그인 이력이 있는 사용자의 경우
    if (request.cookies.get(COOKIE_KEYS.REFRESH_TOKEN)) {
      const refreshToken = request.cookies.get(
        COOKIE_KEYS.REFRESH_TOKEN,
      )?.value;
      if (refreshToken) {
        const response = await submitRefresh(refreshToken);
        if (response.success && response.accessToken) {
          const redirectResponse = NextResponse.redirect(
            new URL('/', request.url),
          );
          redirectResponse.cookies.set(
            COOKIE_KEYS.ACCESS_TOKEN,
            response.accessToken,
            {
              ...getCookieOptions(request),
              maxAge: 15 * 60,
            },
          );
          return redirectResponse;
        }
      }
      // 리프레시 토큰 재검증 실패 시 리프레시 토큰 삭제 후 홈으로 리다이렉트
      const failedResponse = NextResponse.redirect(new URL('/', request.url));
      failedResponse.cookies.delete(COOKIE_KEYS.REFRESH_TOKEN);
      return failedResponse;
    }

    // 엔트리 페이지일 경우 + 둘러보기 x + 로그인 이력 없는 사용자
    return NextResponse.next();
  }

  // 유지보수 모드 활성화 시 유지보수 페이지로 리다이렉트
  if (process.env.NEXT_MAINTENANCE_MODE === 'true') {
    if (pathname.startsWith('/maintenance')) {
      return NextResponse.next();
    }

    if (
      !pathname.match(
        /\.(woff|woff2|ttf|otf|eot|jpg|jpeg|png|gif|svg|webp|avif|ico|css|js)$/,
      )
    ) {
      return NextResponse.redirect(new URL('/maintenance', request.url));
    }
  }

  const response = NextResponse.next();

  if (pathname.match(/\.(woff|woff2|ttf|otf|eot)$/)) {
    response.headers.set(
      'Cache-Control',
      'public, max-age=31536000, immutable',
    );
  }

  if (pathname.match(/\.(jpg|jpeg|png|gif|svg|webp|avif|ico)$/)) {
    response.headers.set(
      'Cache-Control',
      'public, max-age=31536000, immutable',
    );
  }

  if (pathname.match(/\.(css|js)$/)) {
    response.headers.set(
      'Cache-Control',
      'public, max-age=31536000, immutable',
    );
  }

  return response;
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};

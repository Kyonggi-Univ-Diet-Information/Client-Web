import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

import { COOKIE_KEYS, PUBLIC_API_URL } from '@/shared/api';

async function handleRequest(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> },
) {
  try {
    const { path } = await params;
    const apiPath = path.join('/');

    const { searchParams } = new URL(request.url);
    const queryString = searchParams.toString();
    const fullPath = queryString ? `${apiPath}?${queryString}` : apiPath;

    const targetUrl = `${PUBLIC_API_URL}/${fullPath}`;

    const headers = new Headers();
    headers.set('Content-Type', 'application/json');

    const forwardHeaders = ['accept', 'accept-language', 'user-agent'];
    forwardHeaders.forEach(header => {
      const value = request.headers.get(header);
      if (value) headers.set(header, value);
    });

    const authHeader = request.headers.get('x-require-auth');
    if (authHeader === 'true') {
      let accessToken: string | undefined;

      const cookieHeader = request.headers.get('cookie');
      if (cookieHeader) {
        const cookies = cookieHeader.split(';').reduce(
          (acc, cookie) => {
            const [key, value] = cookie.trim().split('=');
            acc[key] = value;
            return acc;
          },
          {} as Record<string, string>,
        );
        accessToken = cookies[COOKIE_KEYS.ACCESS_TOKEN];
      }

      if (!accessToken) {
        const cookieStore = await cookies();
        accessToken = cookieStore.get(COOKIE_KEYS.ACCESS_TOKEN)?.value;
      }

      if (!accessToken) {
        return NextResponse.json(
          { error: '인증이 필요합니다.', code: 'UNAUTHORIZED' },
          { status: 401 },
        );
      }

      headers.set('Authorization', `Bearer ${accessToken}`);
    }

    const response = await fetch(targetUrl, {
      method: request.method,
      headers,
      body:
        request.method !== 'GET' && request.method !== 'HEAD'
          ? await request.text()
          : undefined,
      credentials: 'include',
      redirect: 'follow',
    });

    const data = await response.json().catch(() => ({}));

    const forwardSetCookie = (nextResponse: NextResponse) => {
      const setCookieHeaders = response.headers.getSetCookie?.();
      if (setCookieHeaders?.length) {
        setCookieHeaders.forEach(cookie => {
          nextResponse.headers.append('Set-Cookie', cookie);
        });
      }
      return nextResponse;
    };

    if (!response.ok) {
      return forwardSetCookie(
        NextResponse.json(
          {
            error: data.message || '요청에 실패했습니다.',
            status: response.status,
            data,
          },
          { status: response.status },
        ),
      );
    }

    return forwardSetCookie(
      NextResponse.json(data, { status: response.status }),
    );
  } catch (error) {
    console.error('BFF Proxy Error:', error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : '서버 오류가 발생했습니다.',
        code: 'INTERNAL_SERVER_ERROR',
      },
      { status: 500 },
    );
  }
}

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> },
) {
  return handleRequest(request, context);
}

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> },
) {
  return handleRequest(request, context);
}

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> },
) {
  return handleRequest(request, context);
}

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> },
) {
  return handleRequest(request, context);
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> },
) {
  return handleRequest(request, context);
}

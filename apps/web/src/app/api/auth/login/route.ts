import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

import { COOKIE_KEYS } from '@/shared/api';
import { getCookieOptions } from '@/shared/lib/cookie';


export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { accessToken } = body;

    if (!accessToken) {
      return NextResponse.json(
        { error: '토큰이 제공되지 않았습니다.' },
        { status: 400 },
      );
    }

    const cookieStore = await cookies();

    cookieStore.set(COOKIE_KEYS.ACCESS_TOKEN, accessToken, {
      ...getCookieOptions(request),
      maxAge: 15 * 60,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Login token setup error:', error);
    return NextResponse.json(
      { error: '토큰 설정에 실패했습니다.' },
      { status: 500 },
    );
  }
}

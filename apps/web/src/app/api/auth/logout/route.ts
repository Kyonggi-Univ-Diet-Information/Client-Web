import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import { COOKIE_KEYS } from '@/shared/api';

export async function POST() {
  try {
    const cookieStore = await cookies();

    cookieStore.delete(COOKIE_KEYS.ACCESS_TOKEN);
    cookieStore.delete(COOKIE_KEYS.REFRESH_TOKEN);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json(
      { error: '로그아웃에 실패했습니다.' },
      { status: 500 },
    );
  }
}

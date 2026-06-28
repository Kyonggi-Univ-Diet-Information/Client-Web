import { revalidateTag } from 'next/cache';
import { NextResponse } from 'next/server';

import { menuKeys } from '@/shared/lib/queryKey';

export async function GET() {
  try {
    revalidateTag(menuKeys.dorm.tag());
    return NextResponse.json(
      {
        revalidated: true,
        message: '기숙사 메뉴 캐시가 재검증되었습니다.',
        now: Date.now(),
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        revalidated: false,
        message: '기숙사 메뉴 캐시 재검증 중 오류가 발생했습니다.',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 },
    );
  }
}

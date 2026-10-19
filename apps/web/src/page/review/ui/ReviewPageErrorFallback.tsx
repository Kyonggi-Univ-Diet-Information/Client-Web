'use client';

import { Title } from '@kiryong/design-system';
import { Button } from '@kiryong/design-system';

export default function ReviewPageErrorFallback({
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className='flex min-h-[60vh] w-full flex-col items-center justify-center gap-4'>
      <Title>메뉴 정보를 불러오지 못했어요</Title>
      <p className='text-grey-600'>잠시 후 다시 시도해주세요.</p>
      <Button variant='default' size='lg' onClick={reset}>
        다시 시도
      </Button>
    </div>
  );
}

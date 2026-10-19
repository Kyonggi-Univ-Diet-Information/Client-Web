'use client';

import { Button } from '@kiryong/design-system';
import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Global error caught:', error);
  }, [error]);

  return (
    <div className='min-h-screen p-8'>
      <div className='flex flex-col gap-4'>
        <h2 className='text-2xl font-bold'>예상치 못한 오류가 발생했어요</h2>
        <p className='text-gray-600'>
          일시적인 문제가 발생했어요! 잠시 후에 다시 시도해주세요.
        </p>
        <details className='w-full max-w-2xl'>
          <summary className='mb-2 cursor-pointer text-sm font-medium text-gray-700'>
            에러 세부사항 보기
          </summary>
          <div className='rounded-lg bg-gray-100 p-4'>
            <pre className='overflow-auto text-xs whitespace-pre-wrap text-gray-600'>
              {error.message}
              {error.stack && `\n\nStack trace:\n${error.stack}`}
            </pre>
          </div>
        </details>
        <div className='flex gap-4'>
          <Button
            onClick={reset}
            className='bg-point hover:bg-point rounded-lg px-6 py-2 text-white transition-colors'
          >
            다시 시도
          </Button>
          <Button
            onClick={() => (window.location.href = '/')}
            className='rounded-lg bg-gray-500 px-6 py-2 text-white transition-colors hover:bg-gray-600'
          >
            홈으로 이동
          </Button>
        </div>
      </div>
    </div>
  );
}

import Link from 'next/link';

import { Button, Title } from '@/shared/ui';

export default function NotFound() {
  return (
    <div className='flex min-h-[60vh] flex-col items-center justify-center gap-4'>
      <Title>페이지를 찾을 수 없어요</Title>
      <p className='text-gray-600'>
        유효하지 않은 메뉴 ID입니다. 경로를 확인해주세요.
      </p>
      <Link href='/review'>
        <Button variant='default' size='lg'>
          리뷰 목록으로 돌아가기
        </Button>
      </Link>
    </div>
  );
}

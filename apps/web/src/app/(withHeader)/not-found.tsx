import Link from 'next/link';

import { Title } from '@/shared/ui';
import { Button } from '@/shared/ui/Button';

export default function NotFound() {
  return (
    <div className='flex min-h-[60vh] w-full flex-col items-center justify-center gap-4'>
      <Title>페이지를 찾을 수 없어요</Title>
      <p className='text-gray-600'>잘못된 접근입니다. 경로를 확인해주세요.</p>
      <Link href='/'>
        <Button variant='default' size='lg'>
          홈으로 돌아가기
        </Button>
      </Link>
    </div>
  );
}

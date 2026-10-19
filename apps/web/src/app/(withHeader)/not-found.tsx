import { Title } from '@kiryong/design-system';
import { Button } from '@kiryong/design-system';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className='flex min-h-[60vh] w-full flex-col items-center justify-center gap-4'>
      <Title>페이지를 찾을 수 없어요</Title>
      <p className='text-grey-600'>잘못된 접근입니다. 경로를 확인해주세요.</p>
      <Link href='/'>
        <Button variant='default' size='lg'>
          홈으로 돌아가기
        </Button>
      </Link>
    </div>
  );
}

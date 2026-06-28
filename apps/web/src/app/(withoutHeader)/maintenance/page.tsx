import Link from 'next/link';

import { INQUIRY_URL } from '@/shared/api';

export default function MaintenancePage() {
  return (
    <div className='bg-background flex min-h-screen flex-col items-center justify-center px-6 text-center'>
      <div className='mb-8 text-6xl'>🍽️</div>
      <h1 className='text-foreground mb-4 text-2xl font-bold'>
        잠시 쉬어가는 중이에요
      </h1>
      <p className='text-muted-foreground mb-2'>
        방학 기간 동안 서비스 점검 중입니다.
      </p>
      <p className='text-muted-foreground'>
        새학기와 함께 더 나은 모습으로 돌아올게요!
      </p>
      <div className='bg-secondary mt-8 rounded-lg px-6 py-4'>
        <p className='text-muted-foreground text-sm'>
          문의사항이 있으시면 아래로 연락해주세요
        </p>
        <p className='text-point mt-2 font-medium underline'>
          <Link href={INQUIRY_URL} target='_blank'>
            {INQUIRY_URL}
          </Link>
        </p>
      </div>
    </div>
  );
}

'use client';

import { useRouter } from 'next/navigation';

import BackIcon from '../../../public/icons/icon-back.svg';

export default function ReviewWriteHeader() {
  const router = useRouter();

  return (
    <header className='sticky top-0 z-10 flex h-14 items-center border-b border-[#efefef] bg-white pr-4 pl-3'>
      <button
        type='button'
        onClick={() => router.back()}
        className='flex cursor-pointer items-center p-1'
        aria-label='뒤로가기'
      >
        <BackIcon />
      </button>
      <h1 className='absolute left-1/2 -translate-x-1/2 text-lg leading-[26px] font-semibold tracking-[-0.36px] text-[#1a1a1a]'>
        리뷰 작성
      </h1>
    </header>
  );
}

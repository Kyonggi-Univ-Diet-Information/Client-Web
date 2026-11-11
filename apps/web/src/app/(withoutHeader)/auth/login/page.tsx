'use client';

import Image from 'next/image';
import { Suspense } from 'react';

import LoginSection from '@/features/auth/ui/LoginSection';

import { POLICY_URL } from '@/shared/api';
import { ExternalLink } from '@/shared/ui';

function LoginContent() {
  return (
    <main className='mx-auto flex min-h-dvh w-full max-w-[430px] flex-col bg-white pt-[var(--safe-area-top)] pb-[calc(122px+var(--safe-area-bottom))]'>
      <header className='flex h-14 items-center pr-4 pl-3'>
        <button
          type='button'
          onClick={() => window.history.back()}
          className='flex cursor-pointer items-center p-1'
          aria-label='뒤로가기'
        >
          <Image src='/icons/icon-chevron-left.svg' alt='' width={28} height={28} />
        </button>
      </header>

      <section className='flex flex-1 flex-col items-center justify-center gap-4 pb-9'>
        <Image
          src='/images/logo-kibap.png'
          alt='기룡아 밥먹자 로고'
          width={82}
          height={82}
          priority
          className='size-[82px] rounded-[22px] object-cover'
        />
        <h1 className='font-gyeonggiTitleBold text-[28px] leading-[1.45] tracking-[-0.7px] text-[#ff652e]'>
          기룡아 밥먹자
        </h1>
      </section>

      <section className='flex flex-col gap-4 px-5'>
        <div className='flex items-center justify-center gap-[11px]'>
          <Image src='/icons/line-divider.svg' alt='' width={120} height={1} />
          <p className='text-sm leading-8 font-medium tracking-[-0.36px] whitespace-nowrap text-[#767676]'>
            로그인/회원가입
          </p>
          <Image src='/icons/line-divider.svg' alt='' width={120} height={1} />
        </div>

        <div className='flex flex-col items-center gap-6'>
          <LoginSection variant='login' />

          <p className='w-full text-center text-[13px] leading-8 font-medium tracking-[-0.36px] whitespace-pre-wrap text-[#767676]'>
            {'로그인 시  '}
            <ExternalLink
              href={POLICY_URL.PRIVACY_POLICY}
              className='font-semibold underline'
            >
              개인 정보 처리방침
            </ExternalLink>
            {' 및 '}
            <ExternalLink
              href={POLICY_URL.TERMS_OF_SERVICE}
              className='font-semibold underline'
            >
              이용약관
            </ExternalLink>
            에 동의합니다.
          </p>
        </div>
      </section>
    </main>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div>로딩 중...</div>}>
      <LoginContent />
    </Suspense>
  );
}

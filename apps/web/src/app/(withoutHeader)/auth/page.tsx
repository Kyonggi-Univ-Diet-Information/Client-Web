'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

import { useSocialCode } from '@/features/auth/model/useSocialCode';

import { AuthCard, AuthPageWrapper, Button, Loader } from '@/shared/ui';


export default function AuthPage() {
  return (
    <Suspense
      fallback={
        <main className='relative inset-0 flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-[#F9FAFB]'>
          <Loader />
        </main>
      }
    >
      <AuthContent />
    </Suspense>
  );
}

function AuthContent() {
  const searchParams = useSearchParams();
  const hasCode = searchParams.get('code');
  const { error } = useSocialCode();

  return (
    <AuthPageWrapper showTopGradient={false}>
      <AuthCard>
        <div className='flex flex-col items-center text-center'>
          <Logo />
          {!hasCode ? (
            <InvalidAccessView />
          ) : error ? (
            <LoginErrorView />
          ) : (
            <LoadingView />
          )}
        </div>
      </AuthCard>
    </AuthPageWrapper>
  );
}

function InvalidAccessView() {
  return (
    <div className='flex flex-col items-center gap-y-6'>
      <div>
        <h1 className='font-brBold mb-2 text-2xl tracking-tight text-gray-900'>
          잘못된 접근
        </h1>
        <p className='text-sm leading-relaxed text-balance text-gray-500'>
          요청하신 페이지를 찾을 수 없거나
          <br />
          잘못된 접근입니다.
        </p>
      </div>
      <Link href='/' className='w-full'>
        <Button
          variant='outline'
          size='lg'
          className='w-full rounded-2xl py-6 font-semibold'
        >
          홈으로 돌아가기
        </Button>
      </Link>
    </div>
  );
}

function LoginErrorView() {
  return (
    <div className='flex flex-col items-center gap-y-6'>
      <div>
        <h1 className='font-brBold mb-2 text-2xl tracking-tight text-gray-900'>
          로그인 실패
        </h1>
        <p className='text-sm leading-relaxed text-balance text-gray-500'>
          로그인 처리 중 문제가 발생했습니다.
          <br />
          잠시 후 다시 시도해 주세요.
        </p>
      </div>
      <Link href='/' className='w-full'>
        <Button
          variant='primary'
          size='lg'
          className='w-full rounded-2xl py-6 font-semibold shadow-lg shadow-orange-100'
        >
          홈으로 돌아가기
        </Button>
      </Link>
    </div>
  );
}

function LoadingView() {
  return (
    <div className='flex flex-col items-center gap-y-4 py-8'>
      <Loader />
      <p className='font-medium text-gray-500'>로그인 처리 중입니다...</p>
    </div>
  );
}

function Logo() {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className='bg-point mb-6 flex size-16 items-center justify-center rounded-2xl shadow-lg shadow-orange-200'
    >
      <span className='font-brBold text-xl text-white'>기밥</span>
    </motion.div>
  );
}

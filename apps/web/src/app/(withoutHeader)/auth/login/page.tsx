'use client';

import { ChevronLeftIcon } from 'lucide-react';
import { motion } from 'motion/react';
import { Suspense } from 'react';

import LoginSection from '@/features/auth/ui/LoginSection';

import { POLICY_URL } from '@/shared/api';
import { AuthCard, AuthPageWrapper, ExternalLink } from '@/shared/ui';




function LoginContent() {
  return (
    <AuthPageWrapper showBottomGradient showTopGradient={false}>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => window.history.back()}
        className='absolute top-6 left-6 z-30 flex size-10 items-center justify-center rounded-full bg-white/80 ring-1 ring-black/5 backdrop-blur-sm transition-colors hover:bg-white'
        aria-label='뒤로가기'
      >
        <ChevronLeftIcon className='size-5 text-gray-700' />
      </motion.button>

      <AuthCard>
        <div className='mb-8 flex flex-col items-center text-center'>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className='bg-point mb-6 flex size-16 items-center justify-center rounded-2xl shadow-lg shadow-orange-200'
          >
            <span className='font-brBold text-xl text-white'>기밥</span>
          </motion.div>

          <h1 className='font-brBold mb-2 text-2xl tracking-tight text-gray-900'>
            반가워요!
          </h1>
          <p className='text-sm leading-relaxed text-balance text-gray-500'>
            <span className='text-point font-semibold'>소셜 로그인</span>으로
            3초만에 가입하고
            <br />
            메뉴 리뷰 기능을 이용해보세요!
          </p>
        </div>

        <LoginSection />

        <p className='mt-8 text-center text-[11px] leading-relaxed text-gray-400'>
          로그인 시{' '}
          <ExternalLink
            href={POLICY_URL.TERMS_OF_SERVICE}
            className='underline underline-offset-4'
          >
            이용약관
          </ExternalLink>{' '}
          및{' '}
          <ExternalLink
            href={POLICY_URL.PRIVACY_POLICY}
            className='underline underline-offset-4'
          >
            개인정보처리방침
          </ExternalLink>
          에 동의하게 됩니다.
        </p>
      </AuthCard>
    </AuthPageWrapper>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div>로딩 중...</div>}>
      <LoginContent />
    </Suspense>
  );
}

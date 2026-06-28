'use client';

import { motion } from 'motion/react';
import Link from 'next/link';

import { EntryLogoSection, EntryPolicySection } from '@/page/entry/ui';

import LoginSection from '@/features/auth/ui/LoginSection';

import { COOKIE_KEYS } from '@/shared/api';
import { AuthCard, AuthPageWrapper } from '@/shared/ui';




export default function EntryPage() {
  const storeLookAroundChoice = () => {
    localStorage.setItem('isFirstVisit', 'false');
    document.cookie = `${COOKIE_KEYS.ENTRY_VISITED}=true; path=/; max-age=31536000`;
  };

  return (
    <AuthPageWrapper showTopGradient showBottomGradient>
      <EntryLogoSection />

      <AuthCard
        maxWidth={500}
        initialY={100}
        className='p-0! shadow-none! ring-0!'
        roundedBottom={false}
      >
        <p className='mb-6 text-center text-sm font-medium text-gray-400'>
          SNS 계정으로 3초만에 시작하기!
        </p>

        <LoginSection />

        <motion.button
          whileHover={{ y: -1 }}
          className='mt-8 w-full cursor-pointer text-center text-sm font-medium text-gray-500 transition-colors hover:text-gray-900'
        >
          <Link
            href='/'
            replace
            className='underline underline-offset-4'
            onClick={storeLookAroundChoice}
          >
            로그인 없이 둘러보기
          </Link>
        </motion.button>

        <EntryPolicySection />
      </AuthCard>
    </AuthPageWrapper>
  );
}

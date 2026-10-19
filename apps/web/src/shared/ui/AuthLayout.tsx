'use client';

import { motion } from 'motion/react';
import React from 'react';

import { cn } from '@/shared/lib';

interface AuthPageWrapperProps {
  children: React.ReactNode;
  className?: string;
  showTopGradient?: boolean;
  showBottomGradient?: boolean;
}

export function AuthPageWrapper({
  children,
  className,
  showTopGradient = false,
  showBottomGradient = true,
}: AuthPageWrapperProps) {
  return (
    <main
      className={cn(
        'relative inset-0 flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-grey-50',
        className,
      )}
    >
      {showTopGradient && (
        <div className='bg-primary-500/10 pointer-events-none absolute -top-24 -left-24 h-[40vh] w-screen rounded-full blur-[120px]' />
      )}
      {showBottomGradient && (
        <div className='pointer-events-none absolute -right-24 -bottom-24 h-[500px] w-screen rounded-full bg-orange-100 blur-[120px]' />
      )}
      {children}
    </main>
  );
}

interface AuthCardProps {
  children: React.ReactNode;
  className?: string;
  initialY?: number;
  maxWidth?: number;
  roundedBottom?: boolean;
}

export function AuthCard({
  children,
  className,
  initialY = 20,
  maxWidth = 400,
  roundedBottom = true,
}: AuthCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: initialY }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={cn('z-20 w-full px-6', className)}
      style={{ maxWidth }}
    >
      <div
        className={cn(
          'rounded-t-[32px] bg-white/80 p-8 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.1)] ring-1 ring-black/5 backdrop-blur-2xl',
          roundedBottom && 'rounded-b-[32px]',
        )}
      >
        {children}
      </div>
    </motion.div>
  );
}

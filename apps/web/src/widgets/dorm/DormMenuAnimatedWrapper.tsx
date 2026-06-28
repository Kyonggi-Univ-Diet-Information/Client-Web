'use client';

import { AnimatePresence, motion } from 'motion/react';
import { type ReactNode } from 'react';

interface DormMenuAnimatedWrapperProps {
  children: ReactNode;
  currentDay: string;
}

export default function DormMenuAnimatedWrapper({
  children,
  currentDay,
}: DormMenuAnimatedWrapperProps) {
  return (
    <AnimatePresence mode='wait'>
      <motion.div
        key={currentDay}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className='h-fit overflow-hidden'
        style={{ willChange: 'opacity' }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

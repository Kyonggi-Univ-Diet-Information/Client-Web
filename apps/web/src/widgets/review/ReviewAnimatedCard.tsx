'use client';

import { motion } from 'motion/react';
import { type ReactNode } from 'react';

import { cn } from '@/shared/lib';

interface ReviewAnimatedCardProps {
  children: ReactNode;
  index: number;
  className?: string;
}

export default function ReviewAnimatedCard({
  children,
  index,
  className,
}: ReviewAnimatedCardProps) {
  return (
    <motion.div
      className={cn('flex', className)}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        stiffness: 100,
      }}
    >
      {children}
    </motion.div>
  );
}

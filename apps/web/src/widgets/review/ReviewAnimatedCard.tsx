'use client';

import { motion } from 'motion/react';
import { type ReactNode } from 'react';

interface ReviewAnimatedCardProps {
  children: ReactNode;
  index: number;
}

export default function ReviewAnimatedCard({
  children,
  index,
}: ReviewAnimatedCardProps) {
  const isEven = index % 2 === 0;

  return (
    <motion.div
      className={`lg:ml-0 lg:mr-0 ${isEven ? 'mr-6' : 'ml-6'}`}
      initial={{ opacity: 0, y: 20, x: isEven ? -10 : 10 }}
      animate={{ opacity: 1, y: 0, x: 0 }}
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

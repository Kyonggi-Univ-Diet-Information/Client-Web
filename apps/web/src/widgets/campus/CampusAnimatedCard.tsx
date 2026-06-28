'use client';

import { motion } from 'motion/react';
import { type ReactNode } from 'react';

interface CampusAnimatedCardProps {
  children: ReactNode;
  index: number;
}

export default function CampusAnimatedCard({
  children,
  index,
}: CampusAnimatedCardProps) {
  return (
    <motion.div
      className={`lg:ml-0 lg:mr-0`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
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

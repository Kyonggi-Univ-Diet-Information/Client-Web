'use client';

import { motion, type PanInfo } from 'motion/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import type { MouseEvent as ReactMouseEvent, ReactNode } from 'react';

export default function BottomSheet({
  children,
  href,
  onClose,
}: {
  children: ReactNode;
  href?: string;
  onClose?: () => void;
}) {
  const router = useRouter();

  const close = onClose ?? (() => router.back());

  const handleOverlayClick = (e: ReactMouseEvent<HTMLAnchorElement>) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    e.preventDefault();
    close();
  };

  const handleDragEnd = (_: PointerEvent | MouseEvent | TouchEvent, info: PanInfo) => {
    if (info.offset.y > 80 || info.velocity.y > 500) {
      close();
    }
  };

  return (
    <div className='fixed inset-0 z-60 flex items-end justify-center'>
      {href ? (
        <Link
          href={href}
          onClick={handleOverlayClick}
          className='absolute inset-0 bg-black/30 backdrop-blur-xs'
          aria-label='닫기'
        />
      ) : (
        <button
          type='button'
          onClick={close}
          className='absolute inset-0 bg-black/30 backdrop-blur-xs'
          aria-label='닫기'
        />
      )}
      <motion.div
        drag='y'
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={{ top: 0, bottom: 0.5 }}
        onDragEnd={handleDragEnd}
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
        className='relative z-10 flex w-full max-w-[770px] flex-col rounded-t-2xl bg-white pb-6 shadow-2xl'
      >
        <div className='flex items-start justify-center pt-3 pb-1'>
          <span className='h-1 w-9 rounded-full bg-gray-200' />
        </div>
        {children}
      </motion.div>
    </div>
  );
}

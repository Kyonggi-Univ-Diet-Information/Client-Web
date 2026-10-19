'use client';

import { useEffect } from 'react';

interface DialogProps {
  open: boolean;
  title: string;
  description?: string;
  cancelText?: string;
  confirmText: string;
  onClose: () => void;
  onConfirm: () => void;
  pending?: boolean;
}

export default function Dialog({
  open,
  title,
  description,
  cancelText = '취소',
  confirmText,
  onClose,
  onConfirm,
  pending = false,
}: DialogProps) {
  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !pending) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, pending, onClose]);

  if (!open) return null;

  return (
    <div className='fixed inset-0 z-60 flex items-center justify-center'>
      <button
        type='button'
        aria-label='닫기'
        onClick={onClose}
        disabled={pending}
        className='absolute inset-0 bg-black/30'
      />
      <div
        role='alertdialog'
        aria-modal='true'
        aria-labelledby='dialog-title'
        aria-describedby={description ? 'dialog-description' : undefined}
        className='relative z-10 flex w-[264px] flex-col gap-[15px] rounded-2xl bg-white px-[18px] py-5'
      >
        <div className='text-grey-900 flex flex-col gap-[3px]'>
          <h2
            id='dialog-title'
            className='text-xl leading-7 font-semibold tracking-[-0.48px]'
          >
            {title}
          </h2>
          {description && (
            <p
              id='dialog-description'
              className='text-base leading-6 tracking-[-0.32px]'
            >
              {description}
            </p>
          )}
        </div>
        <div className='flex gap-2'>
          <button
            type='button'
            onClick={onClose}
            disabled={pending}
            className='bg-grey-100 text-grey-700 flex-1 rounded-lg py-[9px] text-sm leading-5 font-medium disabled:opacity-50'
          >
            {cancelText}
          </button>
          <button
            type='button'
            onClick={onConfirm}
            disabled={pending}
            className='bg-grey-900 flex-1 rounded-lg py-[9px] text-sm leading-5 font-medium text-white disabled:opacity-50'
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}

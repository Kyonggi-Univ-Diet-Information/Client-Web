import Link from 'next/link';
import type { ReactNode } from 'react';

export default function Modal({
  children,
  href,
  onClose,
  closeDisabled,
}: {
  children: ReactNode;
  href?: string;
  onClose?: () => void;
  closeDisabled?: boolean;
}) {
  const useCallbackClose = typeof onClose === 'function';

  return (
    <div className='fixed inset-0 z-60 flex items-center justify-center'>
      {useCallbackClose ? (
        <button
          type='button'
          onClick={onClose}
          disabled={closeDisabled}
          className='absolute inset-0 bg-black/30 backdrop-blur-xs disabled:pointer-events-none disabled:opacity-50'
          aria-label='닫기'
        />
      ) : (
        <Link
          className='absolute inset-0 bg-black/30 backdrop-blur-xs'
          href={href ?? '/'}
          replace
        />
      )}

      <div className='relative z-10 mx-4 w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl'>
        {useCallbackClose ? (
          <button
            type='button'
            onClick={onClose}
            disabled={closeDisabled}
            className='absolute top-4 right-4 flex size-8 items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 disabled:opacity-50'
            aria-label='닫기'
          >
            ✕
          </button>
        ) : (
          <Link
            href={href ?? '/'}
            replace
            className='absolute top-4 right-4 flex size-8 items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200'
          >
            ✕
          </Link>
        )}

        <div className='flex flex-col gap-4'>{children}</div>
      </div>
    </div>
  );
}

function ModalHeader({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <p className='flex flex-col'>
      <span className='font-semibold'>{title}</span>
      {subtitle && <span className='text-sm text-gray-600'>{subtitle}</span>}
    </p>
  );
}

function ModalFooter({ children }: { children: ReactNode }) {
  return <div className='flex justify-end'>{children}</div>;
}

Modal.Header = ModalHeader;
Modal.Footer = ModalFooter;

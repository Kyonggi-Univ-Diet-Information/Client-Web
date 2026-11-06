'use client';

import { toast, Toaster } from 'sonner';

const DURATION = 3000;

export function Snackbar() {
  return (
    <Toaster
      position='bottom-center'
      toastOptions={{ duration: DURATION, className: 'kiryong-snackbar' }}
    />
  );
}

export const snackbar = {
  error: (message: string) => toast.error(message, { duration: DURATION }),
  success: (message: string) => toast.success(message, { duration: DURATION }),
};

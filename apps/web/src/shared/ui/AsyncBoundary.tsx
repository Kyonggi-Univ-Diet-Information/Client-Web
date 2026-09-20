import { Suspense, type ReactNode } from 'react';

import ErrorBoundary from './ErrorBoundary';

export default function AsyncBoundary({
  children,
  pendingFallback,
  rejectedFallback,
}: {
  children: ReactNode;
  pendingFallback?: ReactNode;
  rejectedFallback?: React.ComponentType<{ error: Error; reset: () => void }>;
}) {
  return (
    <ErrorBoundary fallback={rejectedFallback}>
      <Suspense fallback={pendingFallback}>{children}</Suspense>
    </ErrorBoundary>
  );
}

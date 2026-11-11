'use client';

import { type RefObject, useEffect, useRef } from 'react';

export function useImpression<T extends Element>(
  ref: RefObject<T | null>,
  onImpression: () => void,
  { threshold = 0.5, enabled = true }: { threshold?: number; enabled?: boolean } = {},
) {
  const firedRef = useRef(false);
  const callbackRef = useRef(onImpression);
  callbackRef.current = onImpression;

  useEffect(() => {
    const element = ref.current;
    if (!enabled || firedRef.current || !element) return;
    if (typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      entries => {
        if (firedRef.current) return;
        if (entries.some(entry => entry.isIntersecting)) {
          firedRef.current = true;
          callbackRef.current();
          observer.disconnect();
        }
      },
      { threshold },
    );
    observer.observe(element);

    return () => observer.disconnect();
  }, [ref, enabled, threshold]);
}

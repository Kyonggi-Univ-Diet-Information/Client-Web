'use client';

import Script from 'next/script';
import { useEffect, useRef, useSyncExternalStore } from 'react';

import { cn } from '@/shared/lib';
import { ADSENSE_CLIENT_ID } from '@/shared/lib/adsense';

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

const DESKTOP_MEDIA_QUERY = '(min-width: 1280px)';

function subscribeDesktop(onChange: () => void) {
  const mediaQuery = window.matchMedia(DESKTOP_MEDIA_QUERY);
  mediaQuery.addEventListener('change', onChange);
  return () => mediaQuery.removeEventListener('change', onChange);
}

function useIsDesktop() {
  return useSyncExternalStore(
    subscribeDesktop,
    () => window.matchMedia(DESKTOP_MEDIA_QUERY).matches,
    () => false,
  );
}

export default function GoogleAdSlot({
  slotId,
  className,
}: {
  slotId?: string;
  className?: string;
}) {
  const isDesktop = useIsDesktop();
  const adRef = useRef<HTMLModElement>(null);
  const isEnabled = isDesktop && !!slotId;

  useEffect(() => {
    const ad = adRef.current;
    if (!isEnabled || !ad || ad.dataset.adsbygoogleStatus) return;

    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (error) {
      console.warn('Failed to load Google ad:', error);
    }
  }, [isEnabled]);

  if (!isEnabled) return null;

  return (
    <div className={cn('overflow-hidden rounded-2xl', className)}>
      <Script
        id='google-adsense'
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT_ID}`}
        strategy='afterInteractive'
        crossOrigin='anonymous'
      />
      <ins
        ref={adRef}
        className='adsbygoogle block'
        data-ad-client={ADSENSE_CLIENT_ID}
        data-ad-slot={slotId}
        data-ad-format='auto'
        data-full-width-responsive='true'
      />
    </div>
  );
}

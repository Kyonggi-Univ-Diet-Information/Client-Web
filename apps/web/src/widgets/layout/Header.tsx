'use client';

import { ChevronLeftIcon, MessageSquareWarning, Search } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import React, { useState } from 'react';

import { AuthButton } from '@/features/auth/ui/AuthButton';

import { INQUIRY_URL } from '@/shared/api';
import { cn } from '@/shared/lib';
import { ExternalLink } from '@/shared/ui';

import HeaderSearchOverlay from './HeaderSearchOverlay';

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const isDepthPage = () => {
    if (pathname.startsWith('/search')) {
      return true;
    }
    if (pathname.split('/').length > 2 && !pathname.startsWith('/campus')) {
      return true;
    }
    return false;
  };

  const MobileHeader = () => {
    return (
      <button
        onClick={() => {
          if (isDepthPage()) router.back();
          else router.push('/');
        }}
        className='flex cursor-pointer items-baseline gap-2 focus:outline-none'
      >
        {isDepthPage() ? (
          <ChevronLeftIcon />
        ) : (
          <span className='font-gyeonggiTitleBold text-xl font-bold'>기밥</span>
        )}
      </button>
    );
  };

  return (
    <header
      className={cn(
        'fixed top-0 z-50 flex h-16 w-full items-center bg-white',
        pathname === '/' && 'bg-[#F3F4F5]/70 backdrop-blur-md',
      )}
    >
      <div className='md:px-gutter flex w-full items-center justify-between px-4'>
        <MobileHeader />
        <div className='flex items-center gap-4'>
          {!isDepthPage() && (
            <button
              type='button'
              onClick={() => setIsSearchOpen(true)}
              className='cursor-pointer transition-transform hover:scale-110'
            >
              <Search size={20} className='text-accent-foreground' />
            </button>
          )}

          {/* <ExternalLink
            href={INQUIRY_URL}
            className='cursor-pointer transition-transform hover:scale-110'
          >
            <MessageSquareWarning
              size={20}
              className='text-accent-foreground'
            />
          </ExternalLink>
          <AuthButton /> */}
        </div>
      </div>
      {isSearchOpen && (
        <HeaderSearchOverlay onClose={() => setIsSearchOpen(false)} />
      )}
    </header>
  );
}

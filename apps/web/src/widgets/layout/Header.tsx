'use client';

import { ChevronLeftIcon, MessageSquareWarning, Search } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React, { useState } from 'react';

import { AuthButton } from '@/features/auth/ui/AuthButton';

import { INQUIRY_URL } from '@/shared/api';
import { cn } from '@/shared/lib';
import { ExternalLink } from '@/shared/ui';

import HeaderSearchOverlay from './HeaderSearchOverlay';
import { isNavItemActive, NAV_ITEMS } from './navItems';

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
        className='flex cursor-pointer items-baseline gap-2 focus:outline-none lg:hidden'
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
        'fixed top-0 z-50 w-full bg-white pt-(--safe-area-top)',
        pathname === '/' && 'bg-grey-100/70 backdrop-blur-md',
      )}
    >
      <div className='md:px-gutter flex h-16 w-full items-center justify-between px-4 lg:mx-auto lg:max-w-[1180px]'>
        <MobileHeader />
        <DesktopNav pathname={pathname} />
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

function DesktopNav({ pathname }: { pathname: string }) {
  return (
    <div className='hidden items-center gap-10 lg:flex'>
      <Link href='/' className='font-gyeonggiTitleBold text-xl font-bold'>
        기밥
      </Link>
      <nav className='flex items-center gap-6'>
        {NAV_ITEMS.map(item => (
          <Link
            key={item.href}
            href={item.href}
            prefetch
            className={cn(
              'text-[15px] font-semibold transition-colors hover:text-grey-900',
              isNavItemActive(pathname, item.href)
                ? 'text-grey-900'
                : 'text-grey-400',
            )}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}

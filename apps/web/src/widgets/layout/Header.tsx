'use client';

import { ChevronLeftIcon, MessageSquareWarning, Search } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';


import { AuthButton } from '@/features/auth/ui/AuthButton';

import { FOOD_COURT_ID, INQUIRY_URL } from '@/shared/api';
import {
  FOOD_COURT_RESTAURANTS,
  RESTAURANT_ID_BY_NAME,
} from '@/shared/constants/campus/restaurant';
import { ExternalLink } from '@/shared/ui';



export default function Header() {
  const pathname = usePathname();
  const router = useRouter();

  const defaultFoodCourtId = FOOD_COURT_ID.KYONGSUL;
  const firstRestaurant = FOOD_COURT_RESTAURANTS.KYONGSUL[0];
  const defaultCampusHref = `/campus/${defaultFoodCourtId}/${RESTAURANT_ID_BY_NAME[firstRestaurant]}`;

  const navItems = [
    { href: '/', label: '홈' },
    { href: defaultCampusHref, label: '교내식당' },
    { href: '/review', label: '리뷰' },
    { href: '/user', label: '마이' },
  ];

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
        className='flex cursor-pointer items-baseline gap-2 focus:outline-none md:hidden'
      >
        {isDepthPage() ? (
          <ChevronLeftIcon />
        ) : (
          <>
            <span className='font-brBold text-xl font-bold'>기밥</span>
            <span className='font-brRegular hidden md:block'>
              기룡아 밥먹자
            </span>
          </>
        )}
      </button>
    );
  };

  const DesktopHeader = () => {
    return (
      <>
        <Link
          href='/'
          className='hidden cursor-pointer items-baseline gap-2 md:flex'
        >
          <span className='font-brBold text-2xl font-bold'>기밥</span>
          <span className='font-brRegular hidden md:block'>기룡아 밥먹자</span>
        </Link>
        <div className='hidden items-baseline gap-4 md:flex'>
          {navItems.map(item => {
            const isActive =
              item.href === '/'
                ? pathname === '/'
                : pathname.includes(`${item.href.split('/')[1]}`);

            return (
              <Link
                key={item.href}
                href={item.href}
                prefetch
                className={`text-sm transition-colors ${
                  isActive
                    ? 'text-point font-semibold'
                    : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      </>
    );
  };

  return (
    <header className='fixed top-0 z-50 flex h-16 w-full items-center bg-transparent'>
      <div className='mx-auto flex w-full max-w-[770px] items-center justify-between px-4'>
        <MobileHeader />
        <DesktopHeader />
        <div className='flex items-center gap-4'>
          {!isDepthPage() && (
            <Link
              href='/search'
              className='cursor-pointer transition-transform hover:scale-110'
            >
              <Search size={20} className='text-accent-foreground' />
            </Link>
          )}

          <ExternalLink
            href={INQUIRY_URL}
            className='cursor-pointer transition-transform hover:scale-110'
          >
            <MessageSquareWarning
              size={20}
              className='text-accent-foreground'
            />
          </ExternalLink>
          <AuthButton />
        </div>
      </div>
    </header>
  );
}

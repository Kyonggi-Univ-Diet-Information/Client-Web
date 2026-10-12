'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

import { FOOD_COURT_ID } from '@/shared/api';
import {
  FOOD_COURT_RESTAURANTS,
  RESTAURANT_ID_BY_NAME,
} from '@/shared/constants/campus/restaurant';
import { cn } from '@/shared/lib';
import { isIos } from '@/shared/lib/platform';

import Home from '../../../public/icons/icon-home.svg';
import Restaurant2 from '../../../public/icons/icon-restaurant2.svg';
import Review from '../../../public/icons/icon-review.svg';
import User from '../../../public/icons/icon-user.svg';

export default function BottomNavBar() {
  const pathname = usePathname();
  const [ios, setIos] = useState(false);

  useEffect(() => {
    setIos(isIos());
  }, []);

  const defaultFoodCourtId = FOOD_COURT_ID.KYONGSUL;
  const firstRestaurant = FOOD_COURT_RESTAURANTS.KYONGSUL[0];
  const defaultCampusHref = `/campus/${defaultFoodCourtId}/${RESTAURANT_ID_BY_NAME[firstRestaurant]}`;

  const navItems = [
    {
      href: '/',
      label: '홈',
      icon: <Home className='size-6' />,
      alt: 'home',
    },
    {
      href: defaultCampusHref,
      label: '교내식당',
      icon: <Restaurant2 className='size-6' />,
      alt: 'restaurant2',
    },
    {
      href: '/review',
      label: '리뷰',
      icon: <Review className='size-6' />,
      alt: 'review',
    },
    {
      href: '/user',
      label: '마이',
      icon: <User className='size-6' />,
      alt: 'user',
    },
  ];

  if (pathname.startsWith('/search')) {
    return null;
  }
  if (pathname.split('/').length > 2 && !pathname.startsWith('/campus')) {
    return null;
  }

  if (pathname.startsWith('/auth')) {
    return null;
  }

  // iOS 앱은 네이티브 SafeAreaView가 하단 inset을 일부 상쇄해서(paddingBottom -24) 웹뷰 env()가 0이라 최소 24px을 직접 확보해요
  return (
    <div
      className={cn(
        'fixed bottom-0 z-50 grid w-full grid-cols-4 items-center justify-items-center border-t border-gray-50 bg-white/70 px-[23px] pb-[env(safe-area-inset-bottom)] backdrop-blur-md md:hidden',
        ios && 'pb-[max(env(safe-area-inset-bottom),24px)]',
      )}
    >
      {navItems.map(item => {
        const isActive =
          item.href === '/'
            ? pathname === '/'
            : pathname.startsWith(`/${item.href.split('/')[1]}`);

        return (
          <Link
            key={item.href}
            href={item.href}
            prefetch
            className='flex h-14 w-20 flex-col items-center justify-center gap-1'
          >
            <div className={cn(isActive ? 'text-gray-900' : 'text-gray-400')}>
              {item.icon}
            </div>
            <span
              className={cn(
                'text-xs font-medium',
                isActive ? 'text-gray-900' : 'text-gray-400',
              )}
            >
              {item.label}
            </span>
          </Link>
        );
      })}
    </div>
  );
}

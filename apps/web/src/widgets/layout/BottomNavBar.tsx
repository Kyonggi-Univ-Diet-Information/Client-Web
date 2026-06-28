'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';



import { FOOD_COURT_ID } from '@/shared/api';
import {
  FOOD_COURT_RESTAURANTS,
  RESTAURANT_ID_BY_NAME,
} from '@/shared/constants/campus/restaurant';
import { cn } from '@/shared/lib';

import Home from '../../../public/icons/icon-home.svg';
import Restaurant2 from '../../../public/icons/icon-restaurant2.svg';
import Review from '../../../public/icons/icon-review.svg';
import User from '../../../public/icons/icon-user.svg';



export default function BottomNavBar() {
  const pathname = usePathname();
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    let rafId: number | null = null;

    const handleScroll = (e: Event) => {
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }

      rafId = requestAnimationFrame(() => {
        const target = e.target as HTMLElement;
        const currentScrollY = target.scrollTop || window.scrollY;

        if (currentScrollY > lastScrollY.current && currentScrollY > 50) {
          setHidden(true);
        } else if (currentScrollY < lastScrollY.current) {
          setHidden(false);
        }

        lastScrollY.current = currentScrollY;
        rafId = null;
      });
    };

    const scrollContainers = document.querySelectorAll(
      'main [class*="overflow-y-scroll"], main .scrollbar-hide, .scrollbar-hide',
    );

    if (scrollContainers.length > 0) {
      scrollContainers.forEach(container => {
        container.addEventListener('scroll', handleScroll, { passive: true });
      });
    } else {
      window.addEventListener('scroll', handleScroll, { passive: true });
    }

    return () => {
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
      if (scrollContainers.length > 0) {
        scrollContainers.forEach(container => {
          container.removeEventListener('scroll', handleScroll);
        });
      } else {
        window.removeEventListener('scroll', handleScroll);
      }
    };
  }, [pathname]);

  const defaultFoodCourtId = FOOD_COURT_ID.KYONGSUL;
  const firstRestaurant = FOOD_COURT_RESTAURANTS.KYONGSUL[0];
  const defaultCampusHref = `/campus/${defaultFoodCourtId}/${RESTAURANT_ID_BY_NAME[firstRestaurant]}`;

  const navItems = [
    {
      href: '/',
      label: '홈',
      icon: <Home width={32} height={32} />,
      alt: 'home',
    },
    {
      href: defaultCampusHref,
      label: '교내식당',
      icon: <Restaurant2 width={32} height={32} />,
      alt: 'restaurant2',
    },
    {
      href: '/review',
      label: '리뷰',
      icon: <Review width={32} height={32} />,
      alt: 'review',
    },
    {
      href: '/user',
      label: '마이',
      icon: <User width={32} height={32} />,
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

  return (
    <motion.div
      className='shadow-t-md fixed bottom-0 z-50 grid w-full grid-cols-4 items-center rounded-t-2xl border-t border-gray-100 bg-white px-10 pt-2 pb-6 md:hidden'
      variants={{
        visible: { y: 0 },
        hidden: { y: '100%' },
      }}
      animate={hidden ? 'hidden' : 'visible'}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      style={{ willChange: 'transform' }}
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
            className='flex flex-col items-center'
          >
            <div className={cn(isActive ? 'text-point' : 'text-gray-400')}>
              {item.icon}
            </div>
            <span
              className={`text-xs ${isActive ? 'text-point' : 'text-gray-400'}`}
            >
              {item.label}
            </span>
          </Link>
        );
      })}
    </motion.div>
  );
}

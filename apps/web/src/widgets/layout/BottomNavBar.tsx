'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/shared/lib';

import { isNavItemActive, NAV_ITEMS } from './navItems';

export default function BottomNavBar() {
  const pathname = usePathname();

  if (pathname.startsWith('/search')) {
    return null;
  }
  if (pathname.split('/').length > 2 && !pathname.startsWith('/campus')) {
    return null;
  }

  if (pathname.startsWith('/auth')) {
    return null;
  }

  // 구버전 iOS 앱은 네이티브 SafeAreaView가 하단 inset을 일부 상쇄해서(paddingBottom -24) 최소 24px을 직접 확보해요
  return (
    <div className='fixed bottom-0 z-50 grid lg:hidden w-full grid-cols-4 items-center justify-items-center border-t border-grey-50 bg-white/70 px-[23px] pb-(--safe-area-bottom) backdrop-blur-md [html[data-native-inset=ios]_&]:pb-6'>
      {NAV_ITEMS.map(item => {
        const isActive = isNavItemActive(pathname, item.href);

        return (
          <Link
            key={item.href}
            href={item.href}
            prefetch
            className='flex h-14 w-20 flex-col items-center justify-center gap-1'
          >
            <div className={cn(isActive ? 'text-grey-900' : 'text-grey-400')}>
              {item.icon}
            </div>
            <span
              className={cn(
                'text-xs font-medium',
                isActive ? 'text-grey-900' : 'text-grey-400',
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

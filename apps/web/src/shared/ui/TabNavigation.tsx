'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

import { cn } from '@/shared/lib';

interface TabNavigationProps {
  tabs: Array<{
    key: string;
    label: string;
    href: string;
  }>;
  className?: string;
  paramName?: string;
  initialTab?: string;
}

export default function TabNavigation({
  tabs,
  className,
  paramName,
  initialTab,
}: TabNavigationProps) {
  const searchParams = useSearchParams();
  const currentTab =
    searchParams.get(paramName || 'restaurant') || initialTab || tabs[0]?.key;

  return (
    <div
      className={cn(
        'scrollbar-hide flex h-fit flex-shrink-0 flex-wrap gap-2',
        className,
      )}
    >
      {tabs.map(tab => (
        <Link
          key={tab.key}
          href={tab.href}
          replace
          className={cn(
            'cursor-pointer rounded-full px-4 py-2 text-sm font-medium whitespace-nowrap transition-all duration-200',
            currentTab === tab.key
              ? 'bg-point text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200',
          )}
        >
          {tab.label}
        </Link>
      ))}
    </div>
  );
}

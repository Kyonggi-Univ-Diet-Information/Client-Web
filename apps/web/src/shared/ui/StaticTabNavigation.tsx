import Link from 'next/link';

import { cn } from '@/shared/lib';

interface StaticTabNavigationProps {
  tabs: Array<{
    key: string;
    label: string;
    href: string;
  }>;
  className?: string;
  currentTabKey: string;
  variant?: 'default' | 'header';
}

export default function StaticTabNavigation({
  tabs,
  className,
  currentTabKey,
  variant = 'default',
}: StaticTabNavigationProps) {
  if (variant === 'header') {
    return (
      <div className={cn('flex items-center gap-2', className)}>
        {tabs.map(tab => (
          <Link
            prefetch
            key={tab.key}
            href={tab.href}
            className={cn(
              'font-semibold',
              currentTabKey === tab.key ? 'text-black' : 'text-gray-600/50',
            )}
          >
            {tab.label}
          </Link>
        ))}
      </div>
    );
  }

  return (
    <div
      className={cn(
        'scrollbar-hide flex h-fit w-full flex-shrink-0 gap-2 overflow-x-scroll border-b border-gray-100 pb-4',
        className,
      )}
    >
      {tabs.map((tab, index) => (
        <Link
          prefetch
          key={tab.key}
          href={tab.href}
          replace
          className={cn(
            'cursor-pointer rounded-full px-4 py-2 text-sm font-medium whitespace-nowrap transition-all duration-200',
            currentTabKey === tab.key
              ? 'bg-point text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200',
            index === tabs.length - 1 && 'mr-4',
          )}
        >
          {tab.label}
        </Link>
      ))}
    </div>
  );
}

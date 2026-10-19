import Link from 'next/link';

import { cn } from '../lib/cn';

interface ChipNavigationTab {
  key: string;
  label: string;
  href: string;
}

const CHIP_NAVIGATION_VARIANT_STYLES = {
  point: {
    selected: 'bg-point text-white shadow-[0px_4px_6px_rgba(245,88,0,0.2)]',
    unselected: 'bg-gray-100 text-gray-600',
  },
  black: {
    selected: 'border border-gray-900 bg-gray-900 text-white',
    unselected: 'border border-gray-200 bg-white text-gray-600',
  },
} as const;

const CHIP_NAVIGATION_SIZE_STYLES = {
  md: 'px-4 py-2 text-sm',
  small: 'px-3 py-1.5 text-[13px]',
} as const;

export default function ChipNavigation({
  tabs,
  currentTabKey,
  variant = 'point',
  size = 'md',
  className,
}: {
  tabs: ChipNavigationTab[];
  currentTabKey: string;
  variant?: keyof typeof CHIP_NAVIGATION_VARIANT_STYLES;
  size?: keyof typeof CHIP_NAVIGATION_SIZE_STYLES;
  className?: string;
}) {
  const variantStyles = CHIP_NAVIGATION_VARIANT_STYLES[variant];
  const sizeStyles = CHIP_NAVIGATION_SIZE_STYLES[size];

  return (
    <div
      className={cn(
        'scrollbar-hide flex w-full flex-shrink-0 items-center gap-1.5 overflow-x-scroll border-b border-gray-100 bg-white pb-3',
        className,
      )}
    >
      <div className='size-4 flex-shrink-0' />
      {tabs.map(tab => (
        <Link
          prefetch
          key={tab.key}
          href={tab.href}
          replace
          className={cn(
            'shrink-0 rounded-full font-medium whitespace-nowrap transition-colors',
            sizeStyles,
            currentTabKey === tab.key
              ? variantStyles.selected
              : variantStyles.unselected,
          )}
        >
          {tab.label}
        </Link>
      ))}
    </div>
  );
}

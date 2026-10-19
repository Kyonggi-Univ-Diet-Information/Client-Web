'use client';

import { cn } from '../lib/cn';

interface TabOption {
  value: string;
  label: string;
}

const TAB_SIZE_STYLES = {
  sm: {
    button: 'h-10 rounded-[14px] py-2.5 text-base font-semibold',
    track: 'h-1',
  },
  md: {
    button: 'h-12 rounded-2xl py-3 text-lg font-semibold',
    track: 'h-1',
  },
} as const;

export default function Tab({
  options,
  value,
  onChange,
  size = 'sm',
  className,
}: {
  options: TabOption[];
  value: string;
  onChange: (value: string) => void;
  size?: keyof typeof TAB_SIZE_STYLES;
  className?: string;
}) {
  const selectedIndex = Math.max(
    options.findIndex(option => option.value === value),
    0,
  );
  const styles = TAB_SIZE_STYLES[size];
  const gapPx = 4;

  return (
    <div className={cn('flex flex-col', className)}>
      <div className='flex items-start gap-1 p-1'>
        {options.map(option => (
          <button
            key={option.value}
            type='button'
            onClick={() => onChange(option.value)}
            className={cn(
              'flex-1 text-center transition-colors',
              styles.button,
              option.value === value ? 'text-grey-900' : 'text-grey-400',
            )}
          >
            {option.label}
          </button>
        ))}
      </div>
      <div
        className={cn('relative w-full rounded-full bg-grey-100', styles.track)}
      >
        <div
          className={cn(
            'absolute inset-y-0 rounded-full bg-grey-900 transition-all duration-200',
            styles.track,
          )}
          style={{
            width: `calc((100% - ${(options.length - 1) * gapPx}px) / ${options.length})`,
            left: `calc(${selectedIndex} * ((100% - ${(options.length - 1) * gapPx}px) / ${options.length} + ${gapPx}px))`,
          }}
        />
      </div>
    </div>
  );
}

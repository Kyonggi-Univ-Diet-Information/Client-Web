'use client';

import { cn } from '../lib/cn';

interface SegmentedControlOption {
  value: string;
  label: string;
}

export default function SegmentedControl({
  options,
  value,
  onChange,
  className,
}: {
  options: SegmentedControlOption[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'flex items-center gap-0.5 rounded-lg bg-gray-100 p-1.5',
        className,
      )}
    >
      {options.map(option => (
        <button
          key={option.value}
          type='button'
          onClick={() => onChange(option.value)}
          className={cn(
            'flex-1 rounded-lg px-4 py-2.5 text-base font-medium whitespace-nowrap transition-colors',
            value === option.value
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600',
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

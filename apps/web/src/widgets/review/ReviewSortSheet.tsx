import { BottomSheet } from '@kiryong/design-system';
import { Check } from 'lucide-react';
import Link from 'next/link';

import type { ReviewSort } from '@/entities/review/api/api.type';

import { cn } from '@/shared/lib';

const SORT_OPTIONS: { value: ReviewSort; label: string }[] = [
  { value: 'recent', label: '최신순' },
  { value: 'rating-desc', label: '평점 높은순' },
  { value: 'rating-asc', label: '평점 낮은순' },
];

export default function ReviewSortSheet({
  from,
  sort,
}: {
  from: string;
  sort?: ReviewSort;
}) {
  return (
    <BottomSheet href={from}>
      <p className='px-5 py-4 text-xl font-semibold text-gray-900'>정렬</p>
      <div className='flex flex-col'>
        {SORT_OPTIONS.map(option => {
          const isSelected =
            option.value === sort || (!sort && option.value === 'recent');
          const optionHref = `${from}${from.includes('?') ? '&' : '?'}sort=${option.value}`;

          return (
            <Link
              key={option.value}
              href={optionHref}
              replace
              className={cn(
                'flex items-center justify-between px-5 py-4 text-lg',
                isSelected ? 'text-point font-medium' : 'text-gray-900',
              )}
            >
              {option.label}
              {isSelected && <Check size={22} className='text-point' />}
            </Link>
          );
        })}
      </div>
    </BottomSheet>
  );
}

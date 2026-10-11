import { Check } from 'lucide-react';
import Link from 'next/link';

import type { CampusMenuSort } from '@/entities/campus/api/api.type';

import { cn } from '@/shared/lib';
import { BottomSheet } from '@/shared/ui';

const SORT_OPTIONS: { value: CampusMenuSort; label: string }[] = [
  { value: 'review_count', label: '리뷰 많은순' },
  { value: 'rating', label: '평점 높은순' },
  { value: 'name', label: '가나다순' },
];

export default function CampusSortSheet({
  from,
  sort,
}: {
  from: string;
  sort?: CampusMenuSort;
}) {
  return (
    <BottomSheet href={from}>
      <p className='px-5 py-4 text-xl font-semibold text-gray-900'>정렬</p>
      <div className='flex flex-col'>
        {SORT_OPTIONS.map(option => {
          const isSelected = option.value === sort;
          const optionHref = `${from}${from.includes('?') ? '&' : '?'}sort=${option.value}`;

          return (
            <Link
              key={option.value}
              href={optionHref}
              className={cn(
                'flex items-center justify-between px-5 py-4 text-lg',
                isSelected ? 'font-medium text-point' : 'text-gray-900',
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

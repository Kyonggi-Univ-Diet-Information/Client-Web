import { BottomSheet } from '@kiryong/design-system';
import { Check } from 'lucide-react';
import Link from 'next/link';

import {
  SORTING_TYPE,
  SORTING_TYPE_NAME,
  type SortingType,
} from '@/entities/search/model/search';

import { cn } from '@/shared/lib';

export default function SearchSortSheet({
  from,
  sort = SORTING_TYPE.BASIC,
}: {
  from: string;
  sort?: SortingType;
}) {
  return (
    <BottomSheet href={from}>
      <p className='px-5 py-4 text-xl font-semibold text-grey-900'>정렬</p>
      <div className='flex flex-col'>
        {Object.values(SORTING_TYPE).map(option => {
          const isSelected = option === sort;
          const optionHref = `${from}${from.includes('?') ? '&' : '?'}sort=${option}`;

          return (
            <Link
              key={option}
              href={optionHref}
              replace
              className={cn(
                'flex items-center justify-between px-5 py-4 text-lg',
                isSelected ? 'text-primary-500 font-medium' : 'text-grey-900',
              )}
            >
              {SORTING_TYPE_NAME[option]}
              {isSelected && <Check size={22} className='text-primary-500' />}
            </Link>
          );
        })}
      </div>
    </BottomSheet>
  );
}

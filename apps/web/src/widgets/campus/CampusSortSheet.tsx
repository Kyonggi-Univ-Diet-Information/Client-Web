import { BottomSheet } from '@kiryong/design-system';
import { Check } from 'lucide-react';
import Link from 'next/link';

import type { CampusMenuSort } from '@/entities/campus/api/api.type';

import { cn } from '@/shared/lib';

export const CAMPUS_SORT_LABEL: Record<CampusMenuSort, string> = {
  review_count: '리뷰 많은순',
  rating: '평점 높은순',
  name: '가나다순',
};

export default function CampusSortSheet({
  from,
  sort,
}: {
  from: string;
  sort?: CampusMenuSort;
}) {
  return (
    <BottomSheet href={from}>
      <p className='px-5 py-4 text-xl font-semibold text-grey-900'>정렬</p>
      <div className='flex flex-col'>
        {(Object.keys(CAMPUS_SORT_LABEL) as CampusMenuSort[]).map(option => {
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
              {CAMPUS_SORT_LABEL[option]}
              {isSelected && <Check size={22} className='text-primary-500' />}
            </Link>
          );
        })}
      </div>
    </BottomSheet>
  );
}

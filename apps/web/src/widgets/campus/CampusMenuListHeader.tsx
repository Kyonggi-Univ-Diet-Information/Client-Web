import { ChevronDown } from 'lucide-react';
import Link from 'next/link';

import type { CampusMenuSort } from '@/entities/campus/api/api.type';

const SORT_LABEL: Record<CampusMenuSort, string> = {
  review_count: '리뷰 많은순',
  rating: '평점 높은순',
  name: '가나다순',
};

export default function CampusMenuListHeader({
  totalCount,
  sortHref,
  sort,
}: {
  totalCount: number;
  sortHref: string;
  sort?: CampusMenuSort;
}) {
  return (
    <div className='flex items-center justify-between px-4'>
      <p className='text-[13px] text-gray-500'>
        총 <span className='font-semibold text-gray-900'>{totalCount}개</span>
      </p>
      <Link
        href={sortHref}
        className='flex items-center gap-1 py-1 text-[13px] font-medium text-gray-700'
      >
        {sort ? SORT_LABEL[sort] : '정렬'}
        <ChevronDown size={14} className='text-gray-500' />
      </Link>
    </div>
  );
}

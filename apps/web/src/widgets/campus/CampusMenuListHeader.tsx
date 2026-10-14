import { ChevronDown } from 'lucide-react';
import Link from 'next/link';

import { cn } from '@/shared/lib';

export default function CampusMenuListHeader({
  totalCount,
  sortHref,
  sortLabel,
  className,
}: {
  totalCount: number;
  sortHref?: string;
  sortLabel?: string;
  className?: string;
}) {
  return (
    <div className={cn('flex items-center justify-between px-4', className)}>
      <p className='text-[13px] text-gray-500'>
        총 <span className='font-semibold text-gray-900'>{totalCount}개</span>
      </p>
      {sortHref && (
        <Link
          href={sortHref}
          className='flex items-center gap-1 py-1 text-[13px] font-medium text-gray-700'
        >
          {sortLabel ?? '정렬'}
          <ChevronDown size={14} className='text-gray-500' />
        </Link>
      )}
    </div>
  );
}

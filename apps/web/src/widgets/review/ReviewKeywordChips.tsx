import type { ReviewKeywords } from '@/entities/review/api/api.type';
import { getReviewKeywordLabels } from '@/entities/review/model/reviewKeywords';

import { cn } from '@/shared/lib';

interface ReviewKeywordChipsProps {
  keywords: Partial<ReviewKeywords>;
  className?: string;
}

export default function ReviewKeywordChips({
  keywords,
  className,
}: ReviewKeywordChipsProps) {
  const labels = getReviewKeywordLabels(keywords);

  if (labels.length === 0) return null;

  return (
    <ul className={cn('flex flex-wrap gap-1.5', className)}>
      {labels.map(label => (
        <li
          key={label}
          className='rounded-full bg-[#f2f2f7] px-2.5 py-1 text-xs leading-[18px] text-[#555]'
        >
          {label}
        </li>
      ))}
    </ul>
  );
}

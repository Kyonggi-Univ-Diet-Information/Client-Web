import type { ReviewWithMetadata } from '@/features/review/api/getReviewsAction';

import { formatDotDate, parseReviewDate } from '@/shared/lib/date';

import ReviewPreviewCard from './ReviewPreviewCard';

export default function ReviewPreviewCarousel({
  reviews,
  menuName,
  href,
}: {
  reviews: ReviewWithMetadata[];
  menuName: string;
  href: string;
}) {
  return (
    <div className='scrollbar-hide md:px-gutter flex gap-2.5 overflow-x-scroll px-4 pt-2.5 pb-9'>
      {reviews.map(review => (
        <ReviewPreviewCard
          key={review.id}
          {...review}
          href={href}
          menuName={menuName}
          dateLabel={formatDotDate(parseReviewDate(review.createdAt))}
          className='w-[293px] shrink-0'
        />
      ))}
    </div>
  );
}

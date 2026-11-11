import Image from 'next/image';
import Link from 'next/link';

import type { ReviewWithMetadata } from '@/features/review/api/getReviewsAction';

import { formatDotDate, parseReviewDate } from '@/shared/lib/date';

import ReviewKeywordChips from './ReviewKeywordChips';

const MAX_PREVIEW_IMAGES = 2;

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
      {reviews.map(review => {
        const maskedMemberName = review.memberName
          ? review.memberName.length > 1
            ? review.memberName.charAt(0) + '**'
            : '기**'
          : '기**';

        return (
          <Link
            key={review.id}
            href={href}
            className='flex w-[293px] shrink-0 flex-col gap-[25px] rounded-lg border border-[#efefef] bg-white px-5 pt-5 pb-11'
          >
            <div className='flex flex-col gap-2.5'>
              <div className='flex items-center gap-6'>
                <div className='flex w-[174px] flex-col gap-0.5'>
                  <p className='text-[13px] leading-[19px] font-semibold tracking-[-0.26px] text-[#191919]'>
                    {maskedMemberName}
                  </p>
                  <p className='text-xs leading-[21px] font-medium tracking-[-0.28px] text-[#878b93]'>
                    {formatDotDate(parseReviewDate(review.createdAt))}
                  </p>
                </div>
                <div className='flex items-center gap-0.5'>
                  <Image
                    src='/icons/icon-star-rounded.svg'
                    alt=''
                    width={26}
                    height={26}
                  />
                  <span className='text-xl leading-7 font-medium tracking-[-0.48px] text-[#191919]'>
                    {review.rating.toFixed(1)}
                  </span>
                </div>
              </div>
              <div className='flex flex-col gap-2 text-sm'>
                <p className='leading-[19px] font-semibold tracking-[-0.26px] text-[#191919]'>
                  {menuName}
                </p>
                <p className='line-clamp-2 leading-[21px] font-medium tracking-[-0.28px] break-words whitespace-pre-wrap text-[#767676]'>
                  {review.content}
                </p>
              </div>
              <ReviewKeywordChips keywords={review} />
            </div>
            {review.images && review.images.length > 0 && (
              <ul className='flex gap-1'>
                {review.images
                  .slice(0, MAX_PREVIEW_IMAGES)
                  .map(({ id, url }, i) => (
                    <li key={id} className='size-[84px] shrink-0 bg-[#d9d9d9]'>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={url}
                        alt={`리뷰 사진 ${i + 1}`}
                        className='size-full object-cover'
                      />
                    </li>
                  ))}
              </ul>
            )}
          </Link>
        );
      })}
    </div>
  );
}

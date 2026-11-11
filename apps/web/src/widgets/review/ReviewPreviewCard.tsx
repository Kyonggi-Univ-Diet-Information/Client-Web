import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';

import type { Review } from '@/entities/review/api/api.type';

import { cn } from '@/shared/lib';

import ReviewKeywordChips from './ReviewKeywordChips';

const MAX_PREVIEW_IMAGES = 2;

const maskMemberName = (memberName?: string) =>
  memberName && memberName.length > 1 ? memberName.charAt(0) + '**' : '기**';

export interface ReviewPreviewCardProps
  extends Pick<
    Review,
    | 'memberName'
    | 'rating'
    | 'content'
    | 'images'
    | 'saltLevel'
    | 'spicyLevel'
    | 'portionLevel'
    | 'valueLevel'
  > {
  href: string;
  menuName: string;
  dateLabel: string;
  menuPrefix?: ReactNode;
  className?: string;
}

export default function ReviewPreviewCard({
  href,
  memberName,
  dateLabel,
  rating,
  menuName,
  menuPrefix,
  content,
  images,
  saltLevel,
  spicyLevel,
  portionLevel,
  valueLevel,
  className,
}: ReviewPreviewCardProps) {
  return (
    <Link
      href={href}
      className={cn(
        'flex flex-col gap-[25px] rounded-lg border border-[#efefef] bg-white px-5 pt-5 pb-11',
        className,
      )}
    >
      <div className='flex flex-col gap-2.5'>
        <div className='flex items-center justify-between gap-6'>
          <div className='flex min-w-0 flex-col gap-0.5'>
            <p className='text-[13px] leading-[19px] font-semibold tracking-[-0.26px] text-[#191919]'>
              {maskMemberName(memberName)}
            </p>
            <p className='text-xs leading-[21px] font-medium tracking-[-0.28px] text-[#878b93]'>
              {dateLabel}
            </p>
          </div>
          <div className='flex shrink-0 items-center gap-0.5'>
            <Image
              src='/icons/icon-star-rounded.svg'
              alt=''
              width={26}
              height={26}
            />
            <span className='text-xl leading-7 font-medium tracking-[-0.48px] text-[#191919]'>
              {rating.toFixed(1)}
            </span>
          </div>
        </div>
        <div className='flex flex-col gap-2 text-sm'>
          <p className='flex items-center gap-1.5 leading-[19px] font-semibold tracking-[-0.26px] text-[#191919]'>
            {menuPrefix}
            <span className='truncate'>{menuName}</span>
          </p>
          <p className='line-clamp-2 leading-[21px] font-medium tracking-[-0.28px] break-words whitespace-pre-wrap text-[#767676]'>
            {content}
          </p>
        </div>
        <ReviewKeywordChips
          keywords={{ saltLevel, spicyLevel, portionLevel, valueLevel }}
        />
      </div>
      {images && images.length > 0 && (
        <ul className='flex gap-1'>
          {images.slice(0, MAX_PREVIEW_IMAGES).map(({ id, url }, i) => (
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
}

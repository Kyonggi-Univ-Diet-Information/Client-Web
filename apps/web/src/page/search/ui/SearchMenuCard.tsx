import { MessageSquareText } from 'lucide-react';
import Link from 'next/link';





import CampusMenuImage from '@/widgets/campus/CampusMenuImage';

import type { SearchResult } from '@/features/search/api/fetchSearch';

import { FOOD_TYPE_NAME } from '@/entities/search/model/search';

import { FOOD_COURT_ID, FOOD_COURT_NAME } from '@/shared/api';
import { CATEGORY_TO_TEXT } from '@/shared/constants/campus/menu';
import { CAMPUS_RESTAURANT } from '@/shared/constants/campus/restaurant';




export default function SearchMenuCard({
  menuId,
  price,
  restaurantType,
  subRestaurant,
  name,
  reviewCount,
  averageRating,
  foodType,
  detailedMenu,
}: SearchResult) {
  const cardContent = (
    <>
      <div className='flex flex-col gap-1'>
        <span className='text-sm leading-none text-gray-900/40'>
          {FOOD_COURT_NAME[restaurantType]} {CAMPUS_RESTAURANT[subRestaurant]}
        </span>
        <span className='font-semibold'>{name}</span>
        <span className='text-sm'>{price.toLocaleString()}원</span>
        <span className='flex items-center gap-1 text-xs text-gray-900/80'>
          {averageRating > 0 && (
            <>
              <span className='font-tossFace'>
                {'⭐️'.repeat(Math.floor(averageRating))}
              </span>
              <b className='font-semibold'> {averageRating.toFixed(1)} </b>
            </>
          )}
          <span>
            리뷰 <b className='font-semibold'>{reviewCount.toLocaleString()}</b>
            개
          </span>
        </span>
        <div className='flex items-center gap-1'>
          <span className='text-xs text-gray-900/40'>
            #{FOOD_TYPE_NAME[foodType]}
          </span>
          {foodType !== detailedMenu && (
            <span className='text-xs text-gray-900/40'>
              #{CATEGORY_TO_TEXT[detailedMenu]}
            </span>
          )}
        </div>
      </div>
      <CampusMenuImage foodCourt={restaurantType} menuId={menuId} />
    </>
  );

  return (
    <>
      <Link
        href={`/review/${FOOD_COURT_ID[restaurantType]}/${menuId}`}
        className='border-b border-gray-100 focus:outline-none md:hidden'
      >
        <div
          className='group flex cursor-pointer justify-between p-4 text-gray-600 active:bg-gray-100/50'
          key={menuId}
        >
          {cardContent}
        </div>
      </Link>

      <div
        className='hidden h-fit w-full justify-between rounded-2xl bg-gray-100/50 p-4 text-gray-600 md:flex'
        key={menuId}
      >
        <div className='flex flex-col justify-between'>
          <span className='mb-2 font-medium'>{name}</span>
          <span className='text-sm text-gray-900/40'>
            {price.toLocaleString()}원
          </span>
        </div>
        <div className='flex items-start'>
          <Link
            href={`/review/${FOOD_COURT_ID[restaurantType]}/${menuId}`}
            className='group flex cursor-pointer items-center gap-1 rounded-xl border bg-white px-2 py-1 duration-200 hover:bg-gray-200 active:bg-gray-300'
          >
            <MessageSquareText
              size={14}
              className='text-gray-900/40 group-hover:text-gray-900/80 group-active:text-gray-900/80'
            />
            <div className='text-sm text-gray-900/40 group-hover:text-gray-900/80 group-active:text-gray-900/80'>
              리뷰 {reviewCount.toLocaleString()}
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}

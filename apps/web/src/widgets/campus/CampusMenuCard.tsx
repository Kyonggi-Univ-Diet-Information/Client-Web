import { MessageSquareText } from 'lucide-react';
import Link from 'next/link';


import { fetchReviewCount } from '@/features/review/api/fetchReviewCount';

import type { CampusMenu } from '@/entities/campus/api/api.type';

import { type FoodCourt, FOOD_COURT_ID } from '@/shared/api';

import CampusMenuImage from './CampusMenuImage';


interface CampusMenuCardProps extends CampusMenu {
  foodCourt: FoodCourt;
}

export default async function CampusMenuCard({
  id,
  name,
  price,
  foodCourt,
}: CampusMenuCardProps) {
  const reviewCount = await fetchReviewCount(foodCourt, id);
  const foodCourtId = FOOD_COURT_ID[foodCourt];

  const cardContent = (
    <>
      <div className='flex flex-col gap-1'>
        <span className='font-semibold'>{name}</span>
        <span className='text-sm'>{price.toLocaleString()}원</span>
        <span className='mt-0.5 text-xs text-gray-900/80'>
          리뷰 <b className='font-semibold'>{reviewCount}</b>개
        </span>
      </div>
      <CampusMenuImage foodCourt={foodCourt} menuId={id} />
    </>
  );

  return (
    <>
      <Link
        href={`/review/${foodCourtId}/${id}`}
        className='w-screen -translate-x-4 border-b border-gray-100 md:hidden'
      >
        <div
          className='group flex cursor-pointer justify-between p-4 text-gray-600 active:bg-gray-100/50'
          key={id}
        >
          {cardContent}
        </div>
      </Link>

      <div
        className='hidden w-full justify-between rounded-2xl bg-gray-100/50 p-4 text-gray-600 md:flex'
        key={id}
      >
        <div className='flex flex-col justify-between'>
          <span className='mb-2 font-medium'>{name}</span>
          <span className='text-sm text-gray-900/40'>
            {price.toLocaleString()}원
          </span>
        </div>
        <div className='flex items-start'>
          <Link
            href={`/review/${foodCourtId}/${id}`}
            className='group flex cursor-pointer items-center gap-1 rounded-xl border bg-white px-2 py-1 duration-200 hover:bg-gray-200 active:bg-gray-300'
          >
            <MessageSquareText
              size={14}
              className='text-gray-900/40 group-hover:text-gray-900/80 group-active:text-gray-900/80'
            />
            <div className='text-sm text-gray-900/40 group-hover:text-gray-900/80 group-active:text-gray-900/80'>
              리뷰 {reviewCount}
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}

import { Star } from 'lucide-react';
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
  averageRating,
  foodCourt,
}: CampusMenuCardProps) {
  const reviewCount = await fetchReviewCount(foodCourt, id);
  const foodCourtId = FOOD_COURT_ID[foodCourt];

  return (
    <Link
      href={`/review/${foodCourtId}/${id}`}
      className='flex gap-3 border-t border-gray-100 px-4 py-3.5'
    >
      <CampusMenuImage
        foodCourt={foodCourt}
        menuId={id}
        className='size-[116px] rounded-lg'
      />
      <div className='flex flex-col gap-1.5 px-1'>
        <div className='flex flex-col gap-1'>
          <span className='text-base font-medium text-gray-900'>{name}</span>
          <span className='text-lg font-semibold text-gray-900'>
            {price.toLocaleString()}원
          </span>
        </div>
        <div className='flex items-center gap-2.5'>
          {averageRating && (
            <div className='flex items-center gap-0.5'>
              <Star size={20} className='fill-point text-point' />
              <span className='text-sm font-semibold text-gray-600'>
                {averageRating.toFixed(1)}
              </span>
            </div>
          )}
          {reviewCount > 0 ? (
            <span className='text-sm text-gray-600'>
            후기 <b className='font-semibold'>{reviewCount}</b>
          </span>) : (
            <span className='text-sm text-gray-600'>
              아직 후기가 없어요
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}

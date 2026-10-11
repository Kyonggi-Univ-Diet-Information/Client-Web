'use client';

import { ChevronRight, X } from 'lucide-react';
import Link from 'next/link';

import CampusMenuImage from '@/widgets/campus/CampusMenuImage';

import type { RecentMenu } from '@/entities/campus/model/recentMenus';

import { FOOD_COURT_ID, FOOD_COURT_NAME } from '@/shared/api';
import { CAMPUS_RESTAURANT } from '@/shared/constants/campus/restaurant';
import { BottomSheet } from '@/shared/ui';

export default function RecentMenuSheet({
  menus,
  campusHref,
  onClose,
}: {
  menus: RecentMenu[];
  campusHref: string;
  onClose: () => void;
}) {
  return (
    <BottomSheet onClose={onClose}>
      <div className='flex items-start justify-between pt-4 pr-4 pl-5'>
        <div className='flex flex-col'>
          <p className='text-xl font-semibold text-gray-900'>
            먹어본 메뉴를 선택해주세요
          </p>
          <p className='pt-1 text-sm text-gray-500'>
            최근 본 메뉴 중에서 골라주세요.
          </p>
        </div>
        <button
          type='button'
          onClick={onClose}
          aria-label='닫기'
          className='flex size-8 items-center justify-center text-gray-400'
        >
          <X size={18} />
        </button>
      </div>

      <div className='flex flex-col pt-3.5'>
        {menus.map(menu => (
          <Link
            key={`${menu.foodCourt}-${menu.foodId}`}
            href={`/review/${FOOD_COURT_ID[menu.foodCourt]}/${menu.foodId}`}
            className='flex h-[76px] items-center gap-3 border-t border-gray-100 px-5 active:bg-gray-50'
          >
            <CampusMenuImage
              foodCourt={menu.foodCourt}
              menuId={menu.foodId}
              className='size-12 shrink-0 rounded-lg'
              sizes='48px'
            />
            <div className='flex min-w-0 flex-1 flex-col gap-0.5'>
              <span className='flex items-center text-[13px] text-gray-500'>
                {FOOD_COURT_NAME[menu.foodCourt]}
                {menu.subRestaurant && (
                  <>
                    <ChevronRight size={12} />
                    {CAMPUS_RESTAURANT[menu.subRestaurant]}
                  </>
                )}
              </span>
              <span className='truncate text-base font-medium text-gray-900'>
                {menu.name}
              </span>
            </div>
            <ChevronRight size={20} className='shrink-0 text-gray-400' />
          </Link>
        ))}
      </div>

      <div className='mt-4 border-t border-gray-100 pt-4 text-center text-[13px] text-gray-500'>
        찾는 메뉴가 없나요?{' '}
        <Link href={campusHref} className='font-medium text-point underline'>
          다른 메뉴 찾기
        </Link>
      </div>
    </BottomSheet>
  );
}

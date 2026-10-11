'use client';

import type { DormMenuStatus } from '@/entities/dorm/api/api.type';

export default function DormNoDataMessage({ status }: { status: DormMenuStatus }) {
  const message = status === 'CLOSED' ? '미운영' : '아직 정보가 없어요!';
  return <p className='flex w-full items-start justify-center pt-10 text-center text-gray-600'>{message}</p>;
}

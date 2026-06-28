import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import { BottomNavBar, Header } from '@/widgets/layout';

export const metadata: Metadata = {
  title: '기룡아 밥먹자',
  description: '경기대학교 내부 식당 정보를 쉽게 찾아봐요!',
};

type Props = {
  children: ReactNode;
};

export default function HeaderLayout({ children }: Props) {
  return (
    <>
      <Header />
      <div className='size-full pt-[65px]'>
        <main className='relative mx-auto flex min-h-[calc(100vh-65px)] max-w-[770px]'>
          <div className='scrollbar-hide pb-26 absolute inset-0 flex flex-col gap-8 overflow-x-visible overflow-y-scroll p-4 pt-6 focus:outline-none'>
            {children}
          </div>
        </main>
      </div>
      <BottomNavBar />
    </>
  );
}

import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import { BottomNavBar, Header } from '@/widgets/layout';

export const metadata: Metadata = {
  title: '기룡아 밥먹자',
  description: '경기대학교 내부 식당 정보를 쉽게 찾아봐요!',
};

type Props = {
  children: ReactNode;
  modal: ReactNode;
};

export default function HeaderLayout({ children, modal }: Props) {
  return (
    <>
      <Header />
      {/* body에 safe-area padding이 있어 100vh를 쓰면 문서 자체가 넘쳐 바깥 스크롤이 생겨요 */}
      <main className='relative mx-auto flex min-h-[calc(100dvh-env(safe-area-inset-bottom))] max-w-[770px]'>
        {children}
      </main>
      <BottomNavBar />
      {modal}
    </>
  );
}

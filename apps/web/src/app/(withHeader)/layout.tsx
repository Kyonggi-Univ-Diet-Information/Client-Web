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
      <main className='relative flex min-h-dvh'>{children}</main>
      <BottomNavBar />
      {modal}
    </>
  );
}

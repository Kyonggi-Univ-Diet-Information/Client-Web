import type { ReactNode } from 'react';

import { PageContainer } from '@/widgets/layout';

export default function SearchLayout({ children }: { children: ReactNode }) {
  // 검색은 하단 네비바를 숨겨서 네비바 높이만큼의 여백이 필요 없어요
  return (
    <PageContainer className='pb-[env(safe-area-inset-bottom)]'>
      {children}
    </PageContainer>
  );
}

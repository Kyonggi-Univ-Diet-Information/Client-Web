import type { ReactNode } from 'react';

import { PageContainer } from '@/widgets/layout';

export default function SearchLayout({ children }: { children: ReactNode }) {
  return (
    <PageContainer className='pb-[env(safe-area-inset-bottom)]'>
      {children}
    </PageContainer>
  );
}

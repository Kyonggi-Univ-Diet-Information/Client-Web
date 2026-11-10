import type { ReactNode } from 'react';

import { PageContainer } from '@/widgets/layout';

export default function SearchLayout({ children }: { children: ReactNode }) {
  return (
    <PageContainer className='pb-(--safe-area-bottom)'>
      {children}
    </PageContainer>
  );
}

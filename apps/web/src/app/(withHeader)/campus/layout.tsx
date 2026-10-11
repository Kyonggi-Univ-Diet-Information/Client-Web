import type { ReactNode } from 'react';

import { PageContainer } from '@/widgets/layout';

export default function CampusLayout({ children }: { children: ReactNode }) {
  return <PageContainer className='gap-4'>{children}</PageContainer>;
}

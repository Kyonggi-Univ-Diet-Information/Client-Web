import type { ReactNode } from 'react';

import { PageContainer } from '@/widgets/layout';

export default function UserLayout({ children }: { children: ReactNode }) {
  return <PageContainer>{children}</PageContainer>;
}

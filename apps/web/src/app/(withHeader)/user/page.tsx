import { UserPage } from '@/page/user';

import { PageContainer } from '@/widgets/layout';

export const dynamic = 'force-dynamic';

export default async function Page() {
  return (
    <PageContainer className='gap-0 bg-grey-100'>
      <UserPage />
    </PageContainer>
  );
}

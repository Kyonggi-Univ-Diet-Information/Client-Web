import { UserReviewPage } from '@/page/user';

import { PageContainer } from '@/widgets/layout';

export const dynamic = 'force-dynamic';

const Page = () => {
  return (
    <PageContainer>
      <UserReviewPage />
    </PageContainer>
  );
};

export default Page;

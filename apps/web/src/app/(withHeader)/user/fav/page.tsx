import { UserFavReviewPage } from '@/page/user';

import { PageContainer } from '@/widgets/layout';

export const dynamic = 'force-dynamic';

const Page = () => {
  return (
    <PageContainer>
      <UserFavReviewPage />
    </PageContainer>
  );
};

export default Page;

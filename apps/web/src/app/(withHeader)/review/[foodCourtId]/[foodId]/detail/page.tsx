import { ReviewDetailPage, ReviewPageErrorFallback, ReviewDetailPageProps } from '@/page/review';

import { AsyncBoundary, Loader } from '@/shared/ui';

const Page = async (props: ReviewDetailPageProps) => {
  return (
    <AsyncBoundary
      pendingFallback={<Loader />}
      rejectedFallback={ReviewPageErrorFallback}
    >
      <ReviewDetailPage {...props} />
    </AsyncBoundary>
  );
};

export default Page;

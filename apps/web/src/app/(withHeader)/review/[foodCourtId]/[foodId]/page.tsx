import { ReviewPage, ReviewPageErrorFallback, ReviewPageProps } from '@/page/review';

import { AsyncBoundary, Loader } from '@/shared/ui';

const Page = async (props: ReviewPageProps) => {
  return (
    <AsyncBoundary
      pendingFallback={<Loader />}
      rejectedFallback={ReviewPageErrorFallback}
    >
      <ReviewPage {...props} />
    </AsyncBoundary>
  );
};

export default Page;

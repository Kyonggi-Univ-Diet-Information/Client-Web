import { Suspense } from 'react';




import { fetchUserFavReview } from '@/features/user/api/fetchUserFavReview';
import { fetchUserInfo } from '@/features/user/api/fetchUserInfo';
import { fetchUserReview } from '@/features/user/api/fetchUserReview';

import { Loader } from '@/shared/ui';

import UserPageClient from './UserPageClient';



export default async function UserPage() {
  const [userInfo, userFavReview, userReview] = await Promise.all([
    fetchUserInfo(),
    fetchUserFavReview(0),
    fetchUserReview(0),
  ]);

  return (
    <Suspense fallback={<Loader />}>
      <UserPageClient
        userInfo={userInfo}
        likedReviewCount={userFavReview.totalElements}
        writtenReviewCount={userReview.totalElements}
      />
    </Suspense>
  );
}

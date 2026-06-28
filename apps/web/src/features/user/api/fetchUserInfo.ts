import { ENDPOINT } from '@/shared/api';
import { Http } from '@/shared/api/api-handlers';

interface UserInfoResponse {
  email: string;
  name: string;
  createdAt: string;
}

export const fetchUserInfo = async (): Promise<UserInfoResponse> => {
  const data = await Http.get<UserInfoResponse>({
    request: ENDPOINT.MEMBER.MEMBER_INFO,
    authorize: true,
    cache: 'force-cache',
    next: {
      revalidate: 60 * 5,
    },
  });
  return data;
};

import { ENDPOINT } from '@/shared/api';
import { Http } from '@/shared/api/api-handlers';

interface AppleLoginUrlResponse {
  url: string;
}

export const fetchAppleLoginUrl = async (): Promise<AppleLoginUrlResponse> => {
  const response = await Http.get<AppleLoginUrlResponse>({
    request: ENDPOINT.AUTH.APPLE_LOGIN_URL,
  });
  return response;
};

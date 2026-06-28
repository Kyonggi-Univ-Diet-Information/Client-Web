
import { ENDPOINT } from '@/shared/api';
import { Http } from '@/shared/api/api-handlers';

import { LoginResponse } from './api.model';

interface AppleUser {
  name?: {
    firstName?: string;
    lastName?: string;
  };
  email?: string;
}

export async function submitAppleLogin(
  code: string,
  state: string | null,
  user?: AppleUser | null,
) {
  try {
    const response = await Http.postDirect<
      { code: string; state?: string | null; user?: AppleUser | null },
      LoginResponse
    >({
      request: ENDPOINT.AUTH.APPLE_LOGIN,
      data: {
        code,
        ...(state && { state }),
        ...(user && { user }),
      },
    });

    if (response.token) {
      return {
        success: true,
        accessToken: response.token,
      };
    }

    return { success: false, error: '토큰을 받지 못했습니다.' };
  } catch (error) {
    console.error('Apple login error:', error);
    return { success: false, error: '로그인에 실패했습니다.' };
  }
}


import { ENDPOINT } from '@/shared/api';
import { Http } from '@/shared/api/api-handlers';

import { LoginResponse } from './api.model';


export async function submitKakaoLogin(code: string) {
  try {
    const response = await Http.get<LoginResponse, { code: string }>({
      request: ENDPOINT.AUTH.KAKAO_LOGIN,
      params: { code },
    });

    if (response.token) {
      return {
        success: true,
        accessToken: response.token,
      };
    }

    return { success: false, error: '토큰을 받지 못했습니다.' };
  } catch (error) {
    console.error('Kakao login error:', error);
    return { success: false, error: '로그인에 실패했습니다.' };
  }
}

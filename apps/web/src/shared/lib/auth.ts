import { cookies } from 'next/headers';

import { COOKIE_KEYS, ENDPOINT } from '@/shared/api';
import { Http } from '@/shared/api/api-handlers';

export class AuthService {
  private static async getAccessToken(): Promise<string | null> {
    const cookieStore = await cookies();
    return cookieStore.get(COOKIE_KEYS.ACCESS_TOKEN)?.value || null;
  }

  static async isAuthenticated(): Promise<boolean> {
    const accessToken = await this.getAccessToken();
    return !!accessToken;
  }

  static async getUserInfo(): Promise<{ email: string; name: string } | null> {
    if (!(await this.isAuthenticated())) return null;

    const user = await Http.get<{ email: string; name: string }>({
      request: ENDPOINT.MEMBER.MEMBER_INFO,
      authorize: true,
      cache: 'force-cache',
    });
    return { email: user.email, name: user.name };
  }
}

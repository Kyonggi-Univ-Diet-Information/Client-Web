import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { mutate } from 'swr';

import { submitAppleLogin } from '@/features/auth/api/submitAppleLogin';
import { submitGoogleLogin } from '@/features/auth/api/submitGoogleLogin';
import { submitKakaoLogin } from '@/features/auth/api/submitKakaoLogin';

import { getLoginState, isAndroid } from '@/shared/lib';
import { isNativeApp } from '@/shared/lib/nativeBridge';
import { authKeys } from '@/shared/lib/queryKey';

import { setAuthCookies } from './setAuthCookies';

function getAppDeepLink(): string {
  if (typeof window === 'undefined') return '';
  return `kiryong://${window.location.host}${window.location.pathname}${window.location.search}`;
}

export const useSocialCode = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const code = searchParams.get('code');
  const state = searchParams.get('state');
  const userParam = searchParams.get('user');

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (code) login();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code]);

  const login = async () => {
    if (!code) return setError(true);

    setIsLoading(true);
    try {
      const loginInfo = state ? getLoginState(state) : null;

      const provider = loginInfo?.provider || 'apple';
      const returnUrl = loginInfo?.returnUrl || '/';

      let result;
      switch (provider) {
        case 'kakao':
          result = await submitKakaoLogin(code);
          break;
        case 'google':
          if (isAndroid() && !isNativeApp()) {
            window.location.href = getAppDeepLink();
            return;
          }
          result = await submitGoogleLogin(code);
          break;
        case 'apple': {
          let appleUser = null;
          if (userParam) {
            try {
              appleUser = JSON.parse(userParam);
            } catch (e) {
              console.error('Failed to parse Apple user data:', e);
            }
          }
          result = await submitAppleLogin(code, state, appleUser);
          break;
        }
        default:
          throw new Error(`Unknown provider: ${provider}`);
      }

      if (result.accessToken) {
        await setAuthCookies({
          accessToken: result.accessToken,
        });
        await mutate(authKeys.status());

        router.replace(`${returnUrl}`);
      }
    } catch (err) {
      console.error('Login error:', err);
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, error };
};

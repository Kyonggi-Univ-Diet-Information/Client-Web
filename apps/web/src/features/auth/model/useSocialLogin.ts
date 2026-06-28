


import { fetchAppleLoginUrl } from '@/features/auth/api/fetchAppleLoginUrl';

import { isAndroid, setLoginState } from '@/shared/lib';

import { useKakaoLogin } from './useKakaoLogin';


interface SocialLoginParams {
  provider: 'kakao' | 'apple' | 'google';
}

export const useSocialLogin = (params: SocialLoginParams) => {
  const { provider } = params;

  const handleAppleLogin = async () => {
    const { url } = await fetchAppleLoginUrl();
    return (window.location.href = url);
  };

  const handleKakaoLogin = () => {
    if (isAndroid()) {
      handleKakaoLoginAndroid();
    } else {
      handleKakaoLoginIos();
    }
  };

  const { handleKakaoLogin: handleKakaoLoginIos } = useKakaoLogin({
    onSuccess: () => {},
    onError: loginError => {
      console.error(`로그인 실패 ${loginError.message}`);
    },
  });

  const handleKakaoLoginAndroid = () => {
    window.location.href = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}&redirect_uri=${process.env.NEXT_PUBLIC_REDIRECT_URL}&state=${setLoginState('kakao')}`;
  };

  const handleGoogleLogin = async () => {
    const href = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URL}&response_type=code&scope=openid%20email%20profile&access_type=offline&prompt=consent&state=${setLoginState('google')}`;

    if (
      typeof window !== 'undefined' &&
      window.ReactNativeWebView?.postMessage
    ) {
      window.ReactNativeWebView.postMessage(
        JSON.stringify({ type: 'OPEN_EXTERNAL', url: href }),
      );
    } else {
      window.location.href = href;
    }
  };

  const login = async () => {
    if (provider === 'kakao') {
      return handleKakaoLogin();
    }
    if (provider === 'apple') {
      return handleAppleLogin();
    }
    if (provider === 'google') {
      return handleGoogleLogin();
    }
  };

  return { login };
};

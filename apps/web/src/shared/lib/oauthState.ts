type SocialProvider = 'kakao' | 'google' | 'apple';

interface LoginInfo {
  provider: SocialProvider;
  returnUrl?: string;
}

interface OAuthLoginState {
  loginInfo: LoginInfo;
}

/**
 * OAuth loginState 파라미터를 생성합니다.
 * provider 식별을 위한 커스텀 파라미터입니다.
 * @param provider - 소셜 로그인 제공자 ('kakao' | 'google' | 'apple')
 * @param returnUrl - 로그인 후 리다이렉트할 URL (선택사항)
 * @returns 인코딩된 loginState 문자열
 */
export function setLoginState(
  provider: SocialProvider,
  returnUrl?: string,
): string {
  const stateObject: OAuthLoginState = {
    loginInfo: {
      provider,
      ...(returnUrl && { returnUrl }),
    },
  };

  return encodeURIComponent(JSON.stringify(stateObject));
}

/**
 * OAuth loginState 파라미터를 파싱합니다.
 * @param loginState - 인코딩된 loginState 문자열
 * @returns 파싱된 LoginInfo 객체 또는 null
 */
export function getLoginState(loginState: string | null): LoginInfo | null {
  if (!loginState) return null;

  try {
    const decodedState: OAuthLoginState = JSON.parse(
      decodeURIComponent(loginState),
    );
    return decodedState.loginInfo || null;
  } catch (error) {
    console.error('Failed to parse OAuth loginState:', error);
    return null;
  }
}

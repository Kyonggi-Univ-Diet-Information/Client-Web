import { useKakaoSDK } from '@/features/auth/model/useKakaoSDK';
import { useSocialLogin } from '@/features/auth/model/useSocialLogin';

import { isAndroid, isIos } from '@/shared/lib';
import { LoginButton } from '@/shared/ui';


export default function LoginSection() {
  useKakaoSDK();
  return (
    <div className='flex flex-col gap-3.5'>
      <KakaoLoginButton />
      <AppleLoginButton />
      <GoogleLoginButton />
    </div>
  );
}

function KakaoLoginButton() {
  const { login } = useSocialLogin({ provider: 'kakao' });

  return (
    <LoginButton
      iconSrc='/icons/icon-kakao.svg'
      iconAlt='kakao'
      className='bg-[#FEE500] text-[#191919] hover:bg-[#e8d102]'
      iconClassName='mr-2'
      onClick={login}
    >
      카카오로 시작하기
    </LoginButton>
  );
}

function AppleLoginButton() {
  const { login } = useSocialLogin({ provider: 'apple' });

  if (!isIos()) return null;

  return (
    <LoginButton
      iconSrc='/icons/icon-apple.svg'
      iconAlt='apple'
      className='bg-black text-white'
      iconClassName='mt-[3px] scale-150'
      iconSize={{ width: 40, height: 40 }}
      onClick={login}
    >
      Apple로 시작하기
    </LoginButton>
  );
}

function GoogleLoginButton() {
  const { login } = useSocialLogin({ provider: 'google' });

  if (!isAndroid()) return null;

  return (
    <LoginButton
      iconSrc='/icons/icon-google.svg'
      iconAlt='google'
      className='bg-black text-white'
      iconClassName='mr-2'
      onClick={login}
    >
      Google로 시작하기
    </LoginButton>
  );
}

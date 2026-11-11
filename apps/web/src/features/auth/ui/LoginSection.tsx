import { Button } from '@kiryong/design-system';
import Image from 'next/image';
import { useEffect, useState, type ReactNode } from 'react';

import { useKakaoSDK } from '@/features/auth/model/useKakaoSDK';
import { useSocialLogin } from '@/features/auth/model/useSocialLogin';

import { cn, isAndroid, isInApp, isIos } from '@/shared/lib';
import { LoginButton } from '@/shared/ui';

type LoginSectionVariant = 'entry' | 'login';

interface Providers {
  apple: boolean;
  google: boolean;
}

const useAvailableProviders = () => {
  const [providers, setProviders] = useState<Providers>({
    apple: false,
    google: false,
  });

  useEffect(() => {
    const inApp = isInApp();
    setProviders({
      apple: inApp && isIos(),
      google: inApp && isAndroid(),
    });
  }, []);

  return providers;
};

export default function LoginSection({
  variant = 'entry',
}: {
  variant?: LoginSectionVariant;
}) {
  useKakaoSDK();
  const providers = useAvailableProviders();

  if (variant === 'login') {
    return (
      <div className='flex w-full flex-col gap-4'>
        <KakaoLoginButtonL />
        {providers.apple && <AppleLoginButtonL />}
        {providers.google && <GoogleLoginButtonL />}
      </div>
    );
  }

  return (
    <div className='flex flex-col gap-3.5'>
      <KakaoLoginButton />
      {providers.apple && <AppleLoginButton />}
      {providers.google && <GoogleLoginButton />}
    </div>
  );
}

function KakaoLoginButton() {
  const { login } = useSocialLogin({ provider: 'kakao' });

  return (
    <LoginButton
      iconSrc='/icons/icon-kakao.svg'
      iconAlt='kakao'
      className='bg-[#FEE500] text-grey-900 hover:bg-[#e8d102]'
      iconClassName='mr-2'
      onClick={login}
    >
      카카오로 시작하기
    </LoginButton>
  );
}

function AppleLoginButton() {
  const { login } = useSocialLogin({ provider: 'apple' });

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

function LoginButtonL({
  icon,
  className,
  children,
  onClick,
}: {
  icon: ReactNode;
  className: string;
  children: ReactNode;
  onClick: () => void;
}) {
  return (
    <Button
      onClick={onClick}
      className={cn(
        'h-[52px] w-full gap-2.5 rounded-lg px-5 text-base leading-6 font-semibold text-[#1a1a1a] transition-all active:scale-[0.98]',
        className,
      )}
    >
      {icon}
      {children}
    </Button>
  );
}

function KakaoLoginButtonL() {
  const { login } = useSocialLogin({ provider: 'kakao' });

  return (
    <LoginButtonL
      onClick={login}
      className='bg-[#fde500] hover:bg-[#e8d102]'
      icon={
        <Image src='/icons/icon-kakao-talk.svg' alt='' width={20} height={20} />
      }
    >
      카카오로 시작하기
    </LoginButtonL>
  );
}

function AppleLoginButtonL() {
  const { login } = useSocialLogin({ provider: 'apple' });

  return (
    <LoginButtonL
      onClick={login}
      className='bg-black text-white hover:bg-black/90'
      icon={
        <Image
          src='/icons/icon-apple.svg'
          alt=''
          width={28}
          height={28}
          className='mt-[3px] scale-150'
        />
      }
    >
      Apple로 시작하기
    </LoginButtonL>
  );
}

function GoogleLoginButtonL() {
  const { login } = useSocialLogin({ provider: 'google' });

  return (
    <LoginButtonL
      onClick={login}
      className='border border-[#e4e6ea] bg-white hover:bg-grey-50'
      icon={
        <Image
          src='/icons/icon-google-logo.svg'
          alt=''
          width={20}
          height={20}
        />
      }
    >
      구글로 시작하기
    </LoginButtonL>
  );
}

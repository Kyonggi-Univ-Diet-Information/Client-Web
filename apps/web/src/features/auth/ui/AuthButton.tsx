'use client';

import { Button } from '@kiryong/design-system';
import Link from 'next/link';

import { useAuth } from '@/features/auth/model/useIsAuthenticated';

import { logout } from '../model/logout';

export function AuthButton() {
  const { isAuthenticated, isLoading, refresh } = useAuth();

  const handleLogout = async () => {
    const result = await logout();
    if (result.success) {
      await refresh();
      window.location.href = '/';
    }
  };

  if (isLoading) {
    return (
      <Button variant='outline' size='sm' disabled>
        로딩 중...
      </Button>
    );
  }

  if (isAuthenticated) {
    return (
      <Button variant='outline' size='sm' onClick={handleLogout}>
        로그아웃
      </Button>
    );
  }

  return (
    <Link href='/auth/login' prefetch>
      <Button variant='outline' size='sm'>
        로그인
      </Button>
    </Link>
  );
}

'use client';

import { Dialog } from '@kiryong/design-system';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { type ReactNode, useState } from 'react';

import { logout } from '@/features/auth/model/logout';
import { useAuth } from '@/features/auth/model/useIsAuthenticated';
import { fetchUserProvider } from '@/features/user/api/fetchUserProvider';
import { submitRevokeReason } from '@/features/user/api/submitRevokeReason';
import { submitUserRevoke } from '@/features/user/api/submitUserRevoke';

import { PATCHNOTE_URL, INQUIRY_URL } from '@/shared/api';
import { ExternalLink } from '@/shared/ui';

import UserRevokeModal from './UserRevokeModal';
import AlertHexagon from '../../../../public/icons/icon-alert-hexagon.svg';
import ArrowRight from '../../../../public/icons/icon-arrow-right.svg';
import LogOut from '../../../../public/icons/icon-logout.svg';
import Mail from '../../../../public/icons/icon-mail.svg';
import UserDelete from '../../../../public/icons/icon-user-delete.svg';

interface UserPageClientProps {
  userInfo: {
    email: string;
    name: string;
    createdAt: string;
  };
  likedReviewCount: number;
  writtenReviewCount: number;
}

export default function UserPageClient({
  userInfo,
  likedReviewCount,
  writtenReviewCount,
}: UserPageClientProps) {
  const { refresh } = useAuth();
  const router = useRouter();
  const [isRevokeModalOpen, setIsRevokeModalOpen] = useState(false);
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);
  const [isRevokeDialogOpen, setIsRevokeDialogOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [selectedReasonType, setSelectedReasonType] = useState<string>('');
  const [isRevoking, setIsRevoking] = useState(false);

  const handleLogout = async () => {
    const result = await logout();
    if (result.success) {
      await refresh();
      window.location.href = '/';
    }
  };

  const handleRevoke = async (reasonType: string) => {
    try {
      setIsRevoking(true);
      await submitRevokeReason(reasonType);
      const provider = await fetchUserProvider();
      const result = await submitUserRevoke(provider);
      if (result.success) {
        await handleLogout();
      }
    } catch (error) {
      alert('회원 탈퇴에 실패했어요. 오류가 반복되면 관리자에게 문의해주세요.');
      console.error(error);
    } finally {
      setIsRevoking(false);
    }
  };

  const stats = [
    { label: '작성한 리뷰', count: writtenReviewCount, href: '/user/my' },
    { label: '공감한 리뷰', count: likedReviewCount, href: '/user/fav' },
  ];

  const rowClassName =
    'flex w-full items-center justify-between px-3.5 py-2.5 text-start';
  const rowContent = (icon: ReactNode, label: string) => (
    <>
      <span className='text-grey-900 flex items-center gap-2.5 text-base'>
        {icon}
        {label}
      </span>
      <ArrowRight className='size-5' />
    </>
  );

  return (
    <div className='flex flex-col pt-2.5'>
      <div className='md:pr-gutter flex flex-col items-end gap-3 bg-white pt-2.5 pr-5 pb-5'>
        <p className='text-grey-900 text-xl font-semibold'>{userInfo.name}님</p>
        <p className='text-grey-500 text-base font-semibold'>
          {userInfo.email}
        </p>
      </div>
      <div className='md:px-gutter border-grey-200 flex gap-2.5 border-t bg-white px-5 pt-[18px] pb-6'>
        {stats.map(stat => (
          <Link
            key={stat.href}
            href={stat.href}
            className='flex w-[110px] flex-col gap-0.5'
          >
            <span className='text-grey-900 text-sm font-semibold'>
              {stat.label}
            </span>
            <span className='text-grey-900 px-0.5 text-5xl leading-normal'>
              {stat.count}
            </span>
          </Link>
        ))}
      </div>
      <div className='md:mx-gutter mx-4 mt-3.5 flex flex-col rounded-[14px] bg-white py-2'>
        <p className='text-grey-900 px-3.5 py-1.5 text-sm font-semibold'>
          고객지원
        </p>
        <ExternalLink href={PATCHNOTE_URL} className={rowClassName}>
          {rowContent(<AlertHexagon />, '패치노트')}
        </ExternalLink>
        <ExternalLink href={INQUIRY_URL} className={rowClassName}>
          {rowContent(<Mail />, '의견 남기기')}
        </ExternalLink>
        <button
          onClick={() => setIsLogoutDialogOpen(true)}
          className={rowClassName}
        >
          {rowContent(<LogOut />, '로그아웃')}
        </button>
        <button
          onClick={() => setIsRevokeDialogOpen(true)}
          className={rowClassName}
        >
          {rowContent(<UserDelete />, '탈퇴하기')}
        </button>
      </div>

      <Dialog
        open={isLogoutDialogOpen}
        title='로그아웃'
        description='정말 로그아웃할까요?'
        confirmText='로그아웃'
        onClose={() => setIsLogoutDialogOpen(false)}
        onConfirm={async () => {
          setIsLoggingOut(true);
          await handleLogout();
          setIsLoggingOut(false);
        }}
        pending={isLoggingOut}
      />

      <Dialog
        open={isRevokeDialogOpen}
        title='탈퇴하기'
        description='정말 탈퇴할까요?'
        confirmText='탈퇴하기'
        onClose={() => setIsRevokeDialogOpen(false)}
        onConfirm={() => {
          setIsRevokeDialogOpen(false);
          setIsRevokeModalOpen(true);
        }}
      />

      <UserRevokeModal
        isOpen={isRevokeModalOpen}
        onClose={() => setIsRevokeModalOpen(false)}
        onConfirm={handleRevoke}
        isLoading={isRevoking}
        refresh={refresh}
        router={router}
        selectedReasonType={selectedReasonType}
        setSelectedReasonType={setSelectedReasonType}
      />
    </div>
  );
}

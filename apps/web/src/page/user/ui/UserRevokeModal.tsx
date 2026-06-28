'use client';

import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { useEffect, useState } from 'react';


import { fetchRevokeReason } from '@/features/user/api/fetchRevokeReason';

import { cn } from '@/shared/lib/string';
import { Button, Modal } from '@/shared/ui';




interface UserRevokeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (reasonType: string) => void;
  isLoading?: boolean;
  refresh: () => void;
  router: AppRouterInstance;
  selectedReasonType: string;
  setSelectedReasonType: (type: string) => void;
}

interface RevokeReason {
  type: string;
  description: string;
}

export default function UserRevokeModal({
  isOpen,
  onClose,
  onConfirm,
  isLoading,
  selectedReasonType,
  setSelectedReasonType,
}: UserRevokeModalProps) {
  const [step, setStep] = useState<'reason' | 'confirm'>('reason');
  const [reasons, setReasons] = useState<RevokeReason[]>([]);

  useEffect(() => {
    if (isOpen) {
      fetchRevokeReason().then(res => {
        setReasons(res.result);
      });
    }
    setStep('reason');
    setSelectedReasonType('');
  }, [isOpen]);

  if (!isOpen) return null;

  const handleNextStep = () => {
    if (selectedReasonType) {
      setStep('confirm');
    }
  };

  const handleBackStep = () => {
    setStep('reason');
  };

  const handleConfirm = () => {
    onConfirm(selectedReasonType);
  };

  return (
    <Modal href='/user'>
      <Modal.Header
        title={step === 'reason' ? '탈퇴 사유 선택' : '회원 탈퇴'}
      />
      <div className='flex flex-col gap-4'>
        {step === 'reason' ? (
          <UserRevokeReasonStep
            reasons={reasons}
            selectedReasonType={selectedReasonType}
            setSelectedReasonType={setSelectedReasonType}
          />
        ) : (
          <UserRevokeConfirmStep />
        )}
      </div>
      <Modal.Footer>
        <div className='flex w-full gap-2'>
          <Button
            variant='outline'
            className='h-12 flex-1 rounded-xl'
            onClick={step === 'reason' ? onClose : handleBackStep}
            disabled={isLoading}
          >
            {step === 'reason' ? '취소' : '이전'}
          </Button>
          {step === 'reason' ? (
            <Button
              variant='primary'
              className='h-12 flex-1 rounded-xl'
              onClick={handleNextStep}
              disabled={!selectedReasonType || isLoading}
            >
              다음
            </Button>
          ) : (
            <Button
              variant='primary'
              className='h-12 flex-1 rounded-xl border-none bg-red-500 hover:bg-red-600'
              onClick={handleConfirm}
              disabled={isLoading}
            >
              {isLoading ? '처리 중...' : '탈퇴하기'}
            </Button>
          )}
        </div>
      </Modal.Footer>
    </Modal>
  );
}

interface UserRevokeReasonStepProps {
  reasons: RevokeReason[];
  selectedReasonType: string;
  setSelectedReasonType: (type: string) => void;
}

function UserRevokeReasonStep({
  reasons,
  selectedReasonType,
  setSelectedReasonType,
}: UserRevokeReasonStepProps) {
  return (
    <>
      <p className='text-sm text-gray-600'>
        탈퇴하시는 이유를 알려주시면 서비스 개선에 큰 도움이 됩니다.
      </p>
      <div className='flex flex-col gap-2'>
        {reasons.length > 0 ? (
          reasons
            .filter(reason => reason.type !== 'ETC')
            .map(reason => (
              <button
                key={reason.type}
                onClick={() => setSelectedReasonType(reason.type)}
                className={cn(
                  'w-full rounded-xl border p-4 text-left text-sm transition-all active:scale-[0.98]',
                  selectedReasonType === reason.type
                    ? 'border-point bg-point/5 text-point font-semibold'
                    : 'border-gray-100 bg-gray-50 text-gray-600 hover:bg-gray-100',
                )}
              >
                {reason.description}
              </button>
            ))
        ) : (
          <div className='flex h-40 items-center justify-center'>
            <div className='border-t-point size-6 animate-spin rounded-full border-2 border-gray-200' />
          </div>
        )}
      </div>
    </>
  );
}

function UserRevokeConfirmStep() {
  return (
    <div className='space-y-4'>
      <div className='rounded-2xl bg-red-50 p-4'>
        <p className='mb-2 text-base font-semibold text-red-500'>
          잠깐만요! 탈퇴하면 정보가 사라져요
        </p>
        <ul className='list-inside space-y-1 text-sm font-medium text-red-500/80'>
          <li>작성하신 모든 리뷰가 삭제됩니다.</li>
          <li>좋아요한 리뷰 목록이 초기화됩니다.</li>
          <li>계정 정보는 즉시 파기되며 복구할 수 없습니다.</li>
        </ul>
      </div>
      <p className='px-1 text-[15px] text-gray-600'>정말로 탈퇴하시겠습니까?</p>
    </div>
  );
}

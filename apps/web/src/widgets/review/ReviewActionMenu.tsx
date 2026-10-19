'use client';

import {
  Modal,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from '@kiryong/design-system';
import { AlertCircle, Ban, MoreVertical, Trash2Icon } from 'lucide-react';

import { useReviewAction } from '@/features/review/model/useReviewAction';

import type { ReportReason } from '@/entities/review/api/api.type';

import { type FoodCourt } from '@/shared/api';
import { cn } from '@/shared/lib';

interface ReviewActionMenuProps {
  type: FoodCourt;
  foodId: number;
  reviewId: number;
  isMyReview: boolean;
}

interface ReviewActionSelectProps {
  isMyReview: boolean;
  pending: boolean;
  value: string;
  onActionChange: (value: string) => void;
}

interface ReviewReportDialogProps {
  reportReasons: ReportReason[];
  selectedReason: string;
  pending: boolean;
  onSelectReason: (reason: string) => void;
  onClose: () => void;
  onConfirm: () => void;
}

export default function ReviewActionMenu({
  type,
  foodId,
  reviewId,
  isMyReview,
}: ReviewActionMenuProps) {
  const {
    pending,
    showReportDialog,
    reportReasons,
    selectedReason,
    selectValue,
    setSelectedReason,
    handleAction,
    handleReport,
    handleCloseReportDialog,
  } = useReviewAction({ type, foodId, reviewId, isMyReview });

  return (
    <>
      <ReviewActionSelect
        isMyReview={isMyReview}
        pending={pending}
        value={selectValue}
        onActionChange={handleAction}
      />

      {showReportDialog && (
        <ReviewReportDialog
          reportReasons={reportReasons}
          selectedReason={selectedReason}
          pending={pending}
          onSelectReason={setSelectedReason}
          onClose={handleCloseReportDialog}
          onConfirm={handleReport}
        />
      )}
    </>
  );
}

function ReviewActionSelect({
  isMyReview,
  pending,
  value,
  onActionChange,
}: ReviewActionSelectProps) {
  return (
    <Select value={value} onValueChange={onActionChange} disabled={pending}>
      <SelectTrigger
        icon={false}
        className='size flex items-center justify-center border-none bg-transparent p-0 hover:bg-gray-100 focus:ring-0 focus:ring-offset-0 active:scale-95'
      >
        <MoreVertical className='size-5 text-gray-400' />
      </SelectTrigger>
      <SelectContent align='end' className='min-w-[120px]'>
        {isMyReview ? (
          <SelectItem
            value='delete'
            className='text-destructive focus:text-destructive'
          >
            <div className='flex items-center gap-2'>
              <Trash2Icon className='size-4' />
              <span>삭제하기</span>
            </div>
          </SelectItem>
        ) : (
          <>
            <SelectItem value='block'>
              <div className='flex items-center gap-2'>
                <Ban className='size-4' />
                <span>사용자 차단</span>
              </div>
            </SelectItem>
            <SelectItem
              value='report'
              className='text-destructive focus:text-destructive'
            >
              <div className='flex items-center gap-2'>
                <AlertCircle className='size-4' />
                <span>신고하기</span>
              </div>
            </SelectItem>
          </>
        )}
      </SelectContent>
    </Select>
  );
}

function ReviewReportDialog({
  reportReasons,
  selectedReason,
  pending,
  onSelectReason,
  onClose,
  onConfirm,
}: ReviewReportDialogProps) {
  return (
    <Modal onClose={onClose} closeDisabled={pending}>
      <Modal.Header title='리뷰 신고' subtitle='신고 사유를 선택해주세요' />
      <ReviewReportReasonList
        reasons={reportReasons}
        selectedReason={selectedReason}
        pending={pending}
        onSelectReason={onSelectReason}
      />
      <Modal.Footer>
        <ReviewReportDialogFooter
          pending={pending}
          disabled={!selectedReason}
          onClose={onClose}
          onConfirm={onConfirm}
        />
      </Modal.Footer>
    </Modal>
  );
}

interface ReviewReportReasonListProps {
  reasons: ReportReason[];
  selectedReason: string;
  pending: boolean;
  onSelectReason: (reason: string) => void;
}

function ReviewReportReasonList({
  reasons,
  selectedReason,
  pending,
  onSelectReason,
}: ReviewReportReasonListProps) {
  if (reasons.length === 0) {
    return (
      <div className='flex h-40 items-center justify-center'>
        <div className='border-t-point size-6 animate-spin rounded-full border-2 border-gray-200' />
      </div>
    );
  }

  return (
    <div className='flex max-h-[300px] flex-col gap-2 overflow-y-auto'>
      {reasons
        .filter(reason => reason.type !== 'ETC')
        .map(reason => (
          <button
            key={reason.type}
            onClick={() => onSelectReason(reason.type)}
            disabled={pending}
            className={cn(
              'w-full rounded-xl border p-4 text-left text-sm transition-all active:scale-[0.98]',
              selectedReason === reason.type
                ? 'border-point bg-point/5 text-point font-semibold'
                : 'border-gray-100 bg-gray-50 text-gray-600 hover:bg-gray-100',
              pending && 'opacity-50',
            )}
          >
            {reason.description}
          </button>
        ))}
    </div>
  );
}

interface ReviewReportDialogFooterProps {
  pending: boolean;
  disabled: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

function ReviewReportDialogFooter({
  pending,
  disabled,
  onClose,
  onConfirm,
}: ReviewReportDialogFooterProps) {
  return (
    <div className='flex justify-end gap-2'>
      <button
        onClick={onClose}
        className='rounded-xl px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 disabled:opacity-50'
        disabled={pending}
      >
        취소
      </button>
      <button
        onClick={onConfirm}
        className='rounded-xl bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-600 disabled:opacity-50'
        disabled={pending || disabled}
      >
        {pending ? '처리 중...' : '신고하기'}
      </button>
    </div>
  );
}

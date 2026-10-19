'use client';

import { Button } from '@kiryong/design-system';
import { SendIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { memo, useActionState, useEffect, useState } from 'react';
import { useForm, UseFormRegisterReturn } from 'react-hook-form';
import { useSWRConfig } from 'swr';

import { submitReview } from '@/features/review/api/submitReview';

import type { ReviewPost } from '@/entities/review/api/api.type';

import { type FoodCourt, FOOD_COURT_ID } from '@/shared/api';
import { cn } from '@/shared/lib';
import { trackEvent } from '@/shared/lib/ga4';
import { createMutateMatcher, reviewKeys } from '@/shared/lib/queryKey';

import ReviewStarSelector from './ReviewStarSelector';

interface ReviewTextAreaProps {
  register: UseFormRegisterReturn<'content'>;
  value: string;
}

const ReviewTextArea = memo(({ register, value }: ReviewTextAreaProps) => {
  return (
    <div className='relative flex flex-col gap-2'>
      <textarea
        className={cn(
          'focus:border-primary-500/20 min-h-[120px] w-full resize-none rounded-2xl bg-white p-4 text-[15px] leading-relaxed text-grey-900 transition-all outline-none placeholder:text-grey-300 focus:border-1',
        )}
        placeholder='맛, 양, 서비스 등 솔직한 후기를 남겨주세요.'
        {...register}
      />
      <div className='absolute right-4 bottom-3 flex items-center gap-1'>
        <span
          className={cn(
            'text-[11px] font-bold',
            value?.length > 0 ? 'text-primary-500' : 'text-grey-300',
          )}
        >
          {value?.length || 0}
        </span>
      </div>
    </div>
  );
});

interface ReviewFormSectionProps {
  foodCourt: FoodCourt;
  foodId: number;
}

export default function ReviewFormSection({
  foodCourt,
  foodId,
}: ReviewFormSectionProps) {
  const router = useRouter();
  const { mutate } = useSWRConfig();
  const { register, watch, reset } = useForm<ReviewPost>();
  const contentValue = watch('content') || '';

  const [selectedStars, setSelectedStars] = useState(3);
  const [state, formAction, isPending] = useActionState(submitReview, null);

  const isFormValid = contentValue.trim().length >= 2;

  useEffect(() => {
    if (state?.error) {
      trackEvent('review_submit_error', { error_message: state.error });
      alert(state.error);
    } else if (state?.success) {
      trackEvent('review_submit_success', {
        menu_id: String(foodId),
        rating: selectedStars,
        content_length: contentValue.length,
        language: navigator.language || 'ko',
      });

      reset();
      setSelectedStars(3);
      mutate(
        createMutateMatcher(
          reviewKeys.all(),
          reviewKeys.byFood(foodCourt, foodId),
        ),
      );

      const foodCourtId = FOOD_COURT_ID[foodCourt];
      router.replace(`/review/${foodCourtId}/${foodId}`);
    }
  }, [
    state,
    reset,
    mutate,
    router,
    foodCourt,
    foodId,
    selectedStars,
    contentValue.length,
  ]);

  return (
    <form className='flex w-full flex-col gap-4' action={formAction}>
      <input type='hidden' name='foodId' value={foodId} readOnly />
      <input type='hidden' name='foodCourt' value={foodCourt} readOnly />
      <input type='hidden' name='rating' value={selectedStars} readOnly />

      <div className='flex flex-col gap-4'>
        <div className='space-y-1 px-1'>
          <h3 className='text-lg leading-none font-bold text-grey-900'>
            이 메뉴는 어땠나요?
          </h3>
          <p className='text-xs font-medium text-grey-400'>
            별점을 선택하고 후기를 남겨주세요.
          </p>
        </div>

        <div className='flex justify-center py-2'>
          <ReviewStarSelector
            selectedStars={selectedStars}
            setSelectedStars={(stars: number) => {
              setSelectedStars(stars);
              trackEvent('rating_select', {
                rating: stars,
                menu_id: String(foodId),
                language: navigator.language || 'ko',
              });
            }}
          />
        </div>
      </div>

      <ReviewTextArea register={register('content')} value={contentValue} />

      <div className='flex items-center justify-between px-1'>
        <p className='text-[11px] font-medium text-grey-400'>
          {isFormValid
            ? '멋진 리뷰네요! 이제 등록해보세요.'
            : '최소 2글자 이상 작성해주세요.'}
        </p>
        <Button
          variant='primary'
          size='lg'
          className={cn(
            'h-11 gap-2 rounded-full px-6 shadow-lg shadow-orange-100 transition-all active:scale-95',
            !isFormValid && 'pointer-events-none opacity-50 grayscale',
          )}
          disabled={!isFormValid || isPending}
        >
          {isPending ? (
            <div className='size-4 animate-spin rounded-full border-2 border-white/30 border-t-white' />
          ) : (
            <>
              <span className='text-sm font-semibold'>등록하기</span>
              <SendIcon size={14} className='opacity-80' />
            </>
          )}
        </Button>
      </div>
    </form>
  );
}

ReviewTextArea.displayName = 'ReviewTextArea';

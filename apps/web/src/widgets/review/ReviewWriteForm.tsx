'use client';

import { snackbar } from '@kiryong/design-system';
import { XIcon } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import {
  type ChangeEvent,
  type ReactNode,
  startTransition,
  useActionState,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  FormProvider,
  useController,
  useForm,
  useFormContext,
  useFormState,
  useWatch,
} from 'react-hook-form';
import { useSWRConfig } from 'swr';

import { submitReview } from '@/features/review/api/submitReview';
import { uploadReviewImages } from '@/features/review/api/uploadReviewImages';

import type { ReviewKeywords } from '@/entities/review/api/api.type';
import {
  EMPTY_REVIEW_KEYWORDS,
  REVIEW_KEYWORD_GROUPS,
} from '@/entities/review/model/reviewKeywords';

import { type FoodCourt, FOOD_COURT_ID, FOOD_COURT_NAME } from '@/shared/api';
import { cn } from '@/shared/lib';
import { trackEvent } from '@/shared/lib/ga4';
import { isNativeApp, pickNativePhoto } from '@/shared/lib/nativeBridge';
import { createMutateMatcher, reviewKeys } from '@/shared/lib/queryKey';
import type { ServerActionResult } from '@/shared/lib/serverAction';
import { isPhotoReviewEnabled } from '@/shared/utils/version';

import CameraIcon from '../../../public/icons/icon-camera-lg.svg';
import CheckIcon from '../../../public/icons/icon-check.svg';
import StarEmptyLgIcon from '../../../public/icons/icon-star-empty-lg.svg';
import StarFilledLgIcon from '../../../public/icons/icon-star-filled-lg.svg';

const MAX_CONTENT_LENGTH = 100;
const MAX_PHOTOS = 3;

const readAsDataUrl = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });

interface ReviewWriteFormProps {
  foodCourt: FoodCourt;
  foodId: number;
  menuName: string;
  price: number;
  menuImage: ReactNode;
}

interface ReviewWriteValues {
  rating: number;
  content: string;
  photos: string[];
  keywords: ReviewKeywords;
}

export default function ReviewWriteForm({
  foodCourt,
  foodId,
  menuName,
  price,
  menuImage,
}: ReviewWriteFormProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { mutate } = useSWRConfig();
  const form = useForm<ReviewWriteValues>({
    mode: 'onChange',
    defaultValues: {
      rating: 3,
      content: '',
      photos: [],
      keywords: EMPTY_REVIEW_KEYWORDS,
    },
  });
  // 앱 여부는 window로만 알 수 있어서 마운트 후에 판단해요
  const [canAttachPhoto, setCanAttachPhoto] = useState(false);
  const [state, formAction, isPending] = useActionState(
    async (prev: ServerActionResult | null, values: ReviewWriteValues) => {
      const formData = new FormData();
      formData.append('foodId', String(foodId));
      formData.append('foodCourt', foodCourt);
      formData.append('rating', String(values.rating));
      formData.append('content', values.content);
      Object.entries(values.keywords).forEach(([key, level]) => {
        if (level !== null) formData.append(key, String(level));
      });
      try {
        const images = await Promise.all(
          values.photos.map(async src => (await fetch(src)).blob()),
        );
        const keys = await uploadReviewImages(images);
        keys.forEach(key => formData.append('imageKeys', key));
      } catch (error) {
        return {
          success: false,
          error:
            error instanceof Error ? error.message : '사진 업로드에 실패했어요',
        };
      }
      return submitReview(prev, formData);
    },
    null,
  );

  useEffect(() => {
    setCanAttachPhoto(isPhotoReviewEnabled());
  }, []);

  useEffect(() => {
    if (state?.error) {
      trackEvent('review_submit_error', { error_message: state.error });
      snackbar.error(state.error);
    } else if (state?.success) {
      const { rating, content } = form.getValues();
      trackEvent('review_submit_success', {
        menu_id: String(foodId),
        rating,
        content_length: content.length,
        language: navigator.language || 'ko',
      });
      mutate(
        createMutateMatcher(
          reviewKeys.all(),
          reviewKeys.byFood(foodCourt, foodId),
        ),
      );
      router.replace(`/review/${FOOD_COURT_ID[foodCourt]}/${foodId}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  const onSubmit = form.handleSubmit(values => {
    startTransition(() => formAction(values));
  });

  const keywords = useWatch({ control: form.control, name: 'keywords' });
  const hasKeyword = Object.values(keywords).some(level => level !== null);
  // 키워드 없이 상세 단계 주소로 바로 들어오면 첫 단계부터 시작해요
  const step =
    searchParams.get('step') === 'detail' && hasKeyword ? 'detail' : 'keyword';

  const menuSummary = (
    <div className='flex gap-2.5'>
      {menuImage}
      <div className='flex flex-col gap-3'>
        <div className='flex flex-col gap-1 px-1'>
          <div className='flex items-center gap-[9px] text-sm leading-[21px] tracking-[-0.28px] text-[#333]'>
            <span>{FOOD_COURT_NAME[foodCourt]}</span>
            <span>{price.toLocaleString()}원</span>
          </div>
          <p className='text-base leading-6 font-semibold tracking-[-0.32px] text-[#191919]'>
            {menuName}
          </p>
        </div>
        <RatingField />
      </div>
    </div>
  );

  if (step === 'keyword') {
    return (
      <FormProvider {...form}>
        <div className='flex flex-1 flex-col'>
          <section className='flex flex-col gap-[38px] bg-white px-5 pt-[30px] pb-8'>
            <h2 className='flex gap-0.5 text-[28px] leading-8 font-semibold tracking-[-0.48px] text-[#333]'>
              <span>
                식사는
                <br />
                어떠셨나요?
              </span>
              <span className='text-2xl leading-normal font-bold text-[#ff6b2c]'>
                *
              </span>
            </h2>
            {menuSummary}
          </section>

          <section className='border-t-2 border-[#f9f9f9] bg-white px-5 pt-[46px] pb-40'>
            <KeywordField />
          </section>

          <div className='sticky bottom-0 mt-auto border-t border-[#f1f1f1] bg-white/35 px-5 pt-3 pb-[calc(24px+var(--safe-area-bottom))]'>
            <button
              type='button'
              disabled={!hasKeyword}
              onClick={() => router.push(`${pathname}?step=detail`)}
              className='flex h-[46px] w-full cursor-pointer items-center justify-center rounded-lg bg-[#25251f] text-base leading-6 font-semibold text-white disabled:cursor-default disabled:opacity-40'
            >
              다음
            </button>
          </div>
        </div>
      </FormProvider>
    );
  }

  return (
    <FormProvider {...form}>
      <form onSubmit={onSubmit} className='flex flex-1 flex-col'>
        <section className='flex flex-1 flex-col bg-white'>
          <div className='flex flex-col gap-1.5 px-5 pt-7 pb-[13px]'>
            <h2 className='text-lg leading-7 font-semibold tracking-[-0.48px] text-[#191919]'>
              더 남기고 싶은 내용이 있나요?
            </h2>
            <p className='text-sm leading-[21px] tracking-[-0.28px] text-[#767676]'>
              {canAttachPhoto
                ? '사진과 한줄 후기는 선택이에요.'
                : '한줄 후기는 선택이에요.'}
            </p>
          </div>
          <div className='h-px bg-[#f3f4f6]' />
          <div className='flex flex-col gap-7 px-5 pt-[15px] pb-8'>
            {canAttachPhoto && (
              <>
                <PhotoField />
                <div className='h-px bg-[#f3f4f6]' />
              </>
            )}
            <ContentField />
          </div>
        </section>

        <div className='sticky bottom-0 mt-auto border-t border-[#f1f1f1] bg-white/35 px-5 pt-3 pb-[calc(24px+var(--safe-area-bottom))]'>
          <SubmitButton isPending={isPending} />
        </div>
      </form>
    </FormProvider>
  );
}

function RatingField() {
  const { field } = useController<ReviewWriteValues, 'rating'>({
    name: 'rating',
    rules: { min: 1 },
  });

  return (
    <div className='flex items-center' role='radiogroup' aria-label='별점'>
      {Array.from({ length: 5 }).map((_, i) => (
        <button
          key={i}
          type='button'
          role='radio'
          aria-checked={field.value === i + 1}
          aria-label={`${i + 1}점`}
          onClick={() => field.onChange(i + 1)}
          className='-mr-0.5 cursor-pointer last:mr-0'
        >
          {i < field.value ? <StarFilledLgIcon /> : <StarEmptyLgIcon />}
        </button>
      ))}
    </div>
  );
}

function KeywordField() {
  const { field } = useController<ReviewWriteValues, 'keywords'>({
    name: 'keywords',
    rules: { validate: v => Object.values(v).some(level => level !== null) },
  });

  return (
    <div className='flex flex-col gap-11'>
      {REVIEW_KEYWORD_GROUPS.map(({ key, question, options }) => (
        <div key={key} className='flex flex-col gap-4'>
          <h2 className='pl-1 text-xl leading-7 font-semibold tracking-[-0.48px] text-[#333]'>
            {question}
          </h2>
          <div className='flex gap-[7px]' role='group' aria-label={question}>
            {options.map(({ level, label }) => {
              const selected = field.value[key] === level;
              return (
                <button
                  key={level}
                  type='button'
                  aria-pressed={selected}
                  onClick={() =>
                    field.onChange({
                      ...field.value,
                      [key]: selected ? null : level,
                    })
                  }
                  className={cn(
                    'flex flex-1 cursor-pointer items-center justify-center gap-2 border-[1.8px] py-2 text-base leading-5 font-medium',
                    selected
                      ? 'border-[#ff652e] text-[#ff652e]'
                      : 'border-[#ededed] text-[#999]',
                  )}
                >
                  {label}
                  {selected && <CheckIcon aria-hidden />}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

function ContentField() {
  const { register, control } = useFormContext<ReviewWriteValues>();
  const content = useWatch({ control, name: 'content' });

  return (
    <div className='flex flex-col gap-3'>
      <div className='flex items-center gap-1.5'>
        <h2 className='text-lg leading-6 font-semibold tracking-[-0.32px] text-[#191919]'>
          한줄 후기를 남겨주세요
        </h2>
        <span className='text-xs leading-[18px] text-[#999]'>선택</span>
      </div>
      <div className='relative h-[126px] rounded-xl border border-[#e5e7eb] bg-white'>
        <textarea
          {...register('content')}
          maxLength={MAX_CONTENT_LENGTH}
          placeholder='먹어본 느낌을 한 줄로 남겨주세요.'
          className='size-full resize-none rounded-xl px-4 pt-3 pb-8 text-[15px] leading-6 text-[#191919] outline-none placeholder:text-[#191919]/50'
        />
        <p className='absolute right-4 bottom-3 text-xs leading-[18px] text-[#999]'>
          {content.length}/{MAX_CONTENT_LENGTH}
        </p>
      </div>
    </div>
  );
}

function PhotoField() {
  const { control, getValues, setValue } = useFormContext<ReviewWriteValues>();
  const photos = useWatch({ control, name: 'photos' });
  const [isPicking, setIsPicking] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 사진은 비동기로 들어오니 그 사이 바뀐 값을 덮어쓰지 않도록 최신 값에 더해요
  const addPhotos = (dataUrls: string[]) => {
    setValue(
      'photos',
      [...getValues('photos'), ...dataUrls].slice(0, MAX_PHOTOS),
    );
  };

  const handleAttachClick = async () => {
    if (photos.length >= MAX_PHOTOS || isPicking) return;
    if (!isNativeApp()) {
      fileInputRef.current?.click();
      return;
    }
    // 앱 picker가 떠 있는 동안 재호출하면 앞 결과가 유실돼서 응답 전까지 막아요
    setIsPicking(true);
    const dataUrl = await pickNativePhoto();
    setIsPicking(false);
    if (dataUrl) addPhotos([dataUrl]);
  };

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []).slice(
      0,
      MAX_PHOTOS - photos.length,
    );
    e.target.value = '';
    addPhotos(await Promise.all(files.map(readAsDataUrl)));
  };

  return (
    <div className='flex flex-col gap-3'>
      {photos.length > 0 && (
        <ul className='flex gap-2'>
          {photos.map((src, i) => (
            <li key={i} className='relative size-[72px]'>
              {/* dataUrl 미리보기라 next/image 최적화 대상이 아니에요 */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt={`첨부한 사진 ${i + 1}`}
                className='size-full rounded-lg object-cover'
              />
              <button
                type='button'
                onClick={() =>
                  setValue(
                    'photos',
                    getValues('photos').filter((_, j) => j !== i),
                  )
                }
                className='absolute -top-1.5 -right-1.5 flex size-5 cursor-pointer items-center justify-center rounded-full bg-[#191919] text-white'
                aria-label={`사진 ${i + 1} 삭제`}
              >
                <XIcon size={12} />
              </button>
            </li>
          ))}
        </ul>
      )}
      <button
        type='button'
        onClick={handleAttachClick}
        disabled={photos.length >= MAX_PHOTOS || isPicking}
        className='flex w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-[0.8px] border-dashed border-[#e5e7eb] py-8 disabled:cursor-default disabled:opacity-50'
      >
        <span className='flex size-12 items-center justify-center rounded-full bg-[#f3f4f6]'>
          <CameraIcon />
        </span>
        <span className='text-[15px] leading-[22.5px] font-medium text-[#6b7280]'>
          사진 {photos.length}/{MAX_PHOTOS}
        </span>
      </button>
      <input
        ref={fileInputRef}
        type='file'
        accept='image/jpeg,image/png,image/webp'
        multiple
        hidden
        onChange={handleFileChange}
      />
      <p className='text-[13px] leading-[19.5px] text-[#767676]'>
        실제 메뉴 사진은 다른 학생에게 도움이 돼요!
      </p>
    </div>
  );
}

function SubmitButton({ isPending }: { isPending: boolean }) {
  const { control } = useFormContext<ReviewWriteValues>();
  const { isValid } = useFormState({ control });

  return (
    <button
      type='submit'
      disabled={!isValid || isPending}
      className={cn(
        'flex h-[46px] w-full cursor-pointer items-center justify-center rounded-lg bg-[#25251f] text-base leading-6 font-semibold text-white',
        'disabled:cursor-default disabled:opacity-40',
      )}
    >
      {isPending ? (
        <span className='size-4 animate-spin rounded-full border-2 border-white/30 border-t-white' />
      ) : (
        '리뷰 등록하기'
      )}
    </button>
  );
}

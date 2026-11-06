'use client';

import { XIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import {
  type ChangeEvent,
  type ReactNode,
  useActionState,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useSWRConfig } from 'swr';

import { submitReview } from '@/features/review/api/submitReview';
import { uploadReviewImages } from '@/features/review/api/uploadReviewImages';

import { type FoodCourt, FOOD_COURT_ID, FOOD_COURT_NAME } from '@/shared/api';
import { cn } from '@/shared/lib';
import { trackEvent } from '@/shared/lib/ga4';
import { isNativeApp, pickNativePhoto } from '@/shared/lib/nativeBridge';
import { isAndroidWebView } from '@/shared/lib/platform';
import { createMutateMatcher, reviewKeys } from '@/shared/lib/queryKey';
import type { ServerActionResult } from '@/shared/lib/serverAction';
import { isPhotoReviewEnabled } from '@/shared/utils/version';

import CameraIcon from '../../../public/icons/icon-camera.svg';
import MoodGoodIcon from '../../../public/icons/icon-mood-good.svg';
import StarEmptyIcon from '../../../public/icons/icon-star-empty.svg';
import StarFilledIcon from '../../../public/icons/icon-star-filled.svg';

const MAX_CONTENT_LENGTH = 1000;
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

export default function ReviewWriteForm({
  foodCourt,
  foodId,
  menuName,
  price,
  menuImage,
}: ReviewWriteFormProps) {
  const router = useRouter();
  const { mutate } = useSWRConfig();
  const [rating, setRating] = useState(3);
  const [content, setContent] = useState('');
  const [photos, setPhotos] = useState<string[]>([]);
  const [isPicking, setIsPicking] = useState(false);
  // 앱 여부는 window로만 알 수 있어서 마운트 후에 판단해요
  const [canAttachPhoto, setCanAttachPhoto] = useState(false);
  const [androidWebView, setAndroidWebView] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [state, formAction, isPending] = useActionState(
    async (prev: ServerActionResult | null, formData: FormData) => {
      try {
        const images = await Promise.all(
          photos.map(async src => (await fetch(src)).blob()),
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
    setAndroidWebView(isAndroidWebView());
  }, []);

  useEffect(() => {
    if (state?.error) {
      trackEvent('review_submit_error', { error_message: state.error });
      alert(state.error);
    } else if (state?.success) {
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
    if (dataUrl) setPhotos(prev => [...prev, dataUrl].slice(0, MAX_PHOTOS));
  };

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []).slice(
      0,
      MAX_PHOTOS - photos.length,
    );
    e.target.value = '';
    const dataUrls = await Promise.all(files.map(readAsDataUrl));
    setPhotos(prev => [...prev, ...dataUrls].slice(0, MAX_PHOTOS));
  };

  const isFormValid = rating > 0 && content.trim().length > 0;

  return (
    <form action={formAction} className='flex flex-1 flex-col'>
      <input type='hidden' name='foodId' value={foodId} />
      <input type='hidden' name='foodCourt' value={foodCourt} />
      <input type='hidden' name='rating' value={rating} />

      <section className='flex items-center gap-3 border-b border-[#efefef] bg-white px-5 py-[26px]'>
        {menuImage}
        <div className='flex flex-col gap-1'>
          <div className='flex flex-col'>
            <div className='flex items-center gap-[9px] text-xs leading-[18px] text-[#767676]'>
              <span>{FOOD_COURT_NAME[foodCourt]}</span>
              <span>{price.toLocaleString()}원</span>
            </div>
            <p className='text-sm leading-[18px] font-semibold tracking-[-0.28px] text-[#191919]'>
              {menuName}
            </p>
          </div>
          <div
            className='flex items-center'
            role='radiogroup'
            aria-label='별점'
          >
            {Array.from({ length: 5 }).map((_, i) => (
              <button
                key={i}
                type='button'
                role='radio'
                aria-checked={rating === i + 1}
                aria-label={`${i + 1}점`}
                onClick={() => setRating(i + 1)}
                className='cursor-pointer'
              >
                {i < rating ? <StarFilledIcon /> : <StarEmptyIcon />}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className='flex flex-col gap-4 bg-white px-5 py-4'>
        <div className='flex flex-col gap-4'>
          <div className='flex items-center gap-1.5'>
            <h2 className='text-lg leading-6 font-semibold tracking-[-0.32px] text-[#191919]'>
              더 남길 이야기가 있나요?
            </h2>
          </div>
          <div className='relative h-[152px] rounded-lg border border-[#e5e7eb] bg-white'>
            <textarea
              name='content'
              value={content}
              onChange={e => setContent(e.target.value)}
              maxLength={MAX_CONTENT_LENGTH}
              placeholder='식감, 재료 등 음식에 대한 리뷰를 자유롭게 적어주세요'
              className='size-full resize-none rounded-lg px-3.5 pt-3 pb-10 text-sm leading-6 tracking-[-0.28px] text-[#191919] outline-none placeholder:text-[#999]'
            />
            <p className='absolute right-3 bottom-3 text-xs leading-[18px]'>
              <span className='text-[#767676]'>
                {content.length.toLocaleString()}{' '}
              </span>
              <span className='text-[#ccc]'>
                / {MAX_CONTENT_LENGTH.toLocaleString()}
              </span>
            </p>
            {content.trim().length === 0 && (
              <p className='absolute left-3 bottom-3 text-xs leading-[18px] text-[#999]'>
                1자 이상 작성해야 등록할 수 있어요
              </p>
            )}
          </div>
        </div>

        {canAttachPhoto && (
          <>
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
                        setPhotos(prev => prev.filter((_, j) => j !== i))
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
              className='flex h-[46px] cursor-pointer items-center justify-center gap-1.5 rounded-lg border border-[#767676] bg-white text-sm leading-[21px] font-medium text-[#191919] disabled:cursor-default disabled:opacity-50'
            >
              <CameraIcon />
              <span>사진 첨부하기</span>
              <span className='tracking-[-0.28px]'>
                {photos.length}/{MAX_PHOTOS}
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
            <p className='flex items-center gap-2 rounded-lg bg-[#f7f8fa] p-3 text-[13px] leading-[19px] tracking-[-0.26px] text-[#767676]'>
              <MoodGoodIcon />
              직접 찍은 음식 사진은 메뉴 선택에 도움이 돼요!
            </p>
          </>
        )}
      </section>

      <div
        className={cn(
          'sticky bottom-0 mt-auto border-t border-[#f1f1f1] bg-white/35 px-5 pt-3 pb-[calc(24px+env(safe-area-inset-bottom))]',
          androidWebView && 'pb-6',
        )}
      >
        <button
          type='submit'
          disabled={!isFormValid || isPending}
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
      </div>
    </form>
  );
}

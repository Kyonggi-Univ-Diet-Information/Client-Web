'use client';

import Image from 'next/image';
import { useState } from 'react';


import { FOOD_COURT, type FoodCourt } from '@/shared/api';
import { cn } from '@/shared/lib';
import { Skeleton } from '@/shared/ui';


interface CampusMenuImageProps {
  menuId: number;
  foodCourt: FoodCourt;
  className?: string;
  sizes?: string;
}

export default function CampusMenuImage({
  foodCourt,
  menuId,
  className,
  sizes = '100px',
}: CampusMenuImageProps) {
  const imageKey: Record<FoodCourt, string> = {
    [FOOD_COURT.KYONGSUL]: '',
    [FOOD_COURT.DORMITORY]: 'do_',
    [FOOD_COURT.E_SQUARE]: 'es_',
    [FOOD_COURT.SALLY_BOX]: 'sb_',
  };

  const [imageFormat, setImageFormat] = useState<'jpg' | 'png' | 'fallback'>(
    'jpg',
  );
  const [isLoading, setIsLoading] = useState(true);

  const imageSrc =
    imageFormat === 'fallback'
      ? '/images/no-image.png'
      : `https://res.cloudinary.com/dm77jlwuj/image/upload/v1761492742/${imageKey[foodCourt]}${menuId}.${imageFormat}`;

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    if (imageFormat === 'jpg') {
      setIsLoading(true);
      setImageFormat('png');
    } else if (imageFormat === 'png') {
      setIsLoading(true);
      setImageFormat('fallback');
    } else {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={cn(
        'relative h-[100px] w-[100px] overflow-hidden rounded-xl focus:outline-none',
        className,
      )}
    >
      {isLoading && (
        <Skeleton className='absolute inset-0 size-full rounded-xl' />
      )}
      <Image
        loading='lazy'
        src={imageSrc}
        alt={menuId.toString()}
        fill
        sizes={sizes}
        onLoad={handleLoad}
        onError={handleError}
        className={cn(
          'absolute inset-0 size-full object-cover transition-opacity duration-300',
          isLoading ? 'opacity-0' : 'opacity-100',
        )}
      />
    </div>
  );
}

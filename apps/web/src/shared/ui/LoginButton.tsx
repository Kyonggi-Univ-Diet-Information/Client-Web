import Image from 'next/image';

import { cn } from '@/shared/lib';

import { Button } from './Button';

interface LoginButtonProps {
  iconSrc: string;
  iconAlt: string;
  children: React.ReactNode;
  className: string;
  iconClassName?: string;
  iconSize?: { width: number; height: number };
  onClick?: () => void;
}

export default function LoginButton({
  iconSrc,
  iconAlt,
  children,
  className,
  iconClassName,
  iconSize = { width: 22, height: 22 },
  onClick,
}: LoginButtonProps) {
  return (
    <Button
      className={cn(
        'h-14 w-full rounded-2xl border-none text-base font-semibold transition-all active:scale-[0.98]',
        className,
      )}
      onClick={onClick}
    >
      <Image
        src={iconSrc}
        alt={iconAlt}
        width={iconSize.width}
        height={iconSize.height}
        className={iconClassName}
      />
      {children}
    </Button>
  );
}

import React, { ReactNode } from 'react';

import { cn } from '../lib/cn';

export default function Section({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={cn('flex flex-col gap-4', className)}>{children}</div>;
}

function SectionHeader({
  className,
  children,
  title,
  subtitle,
  action,
}: {
  className?: string;
  children?: ReactNode;
  title?: ReactNode;
  subtitle?: ReactNode;
  action?: ReactNode;
}) {
  return (
    <header className={cn('flex flex-col', className)}>
      <div className='flex items-center justify-between'>
        <div className='flex flex-col gap-1'>
          {title && <div className='text-xl font-bold'>{title}</div>}
          {subtitle && <div className='text-grey-600 text-sm'>{subtitle}</div>}
        </div>
        {action}
      </div>
      {children}
    </header>
  );
}

function SectionContent({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'scrollbar-hide flex max-w-full gap-4 overflow-x-scroll',
        className,
      )}
    >
      {children}
    </div>
  );
}

Section.Header = SectionHeader;
Section.Content = SectionContent;

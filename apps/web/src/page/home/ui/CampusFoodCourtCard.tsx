import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

export interface CampusFoodCourt {
  href: string;
  title: string;
  location: string;
  operatingHours: string;
  orderDeadline: string;
}

export default function CampusFoodCourtCard({
  href,
  location,
  operatingHours,
  orderDeadline,
  viewMenuText,
}: CampusFoodCourt & {
  viewMenuText: string;
}) {
  const isOpen = isWithinOperatingHours(operatingHours);

  return (
    <Link
      href={href}
      className='flex flex-col rounded-2xl border border-gray-100 bg-white pt-4 pr-3 pb-5 pl-4'
    >
      <div className='flex items-center justify-between'>
        <h3 className='text-lg font-semibold text-gray-900'>{location}</h3>
        <div className='flex items-center gap-0.5 text-point'>
          <span className='text-sm font-medium'>{viewMenuText}</span>
          <ChevronRight size={16} />
        </div>
      </div>
      <div className='mt-1 flex items-center gap-1'>
        <span className='size-1.5 rounded-full bg-point' />
        <span className='text-[13px] font-medium text-gray-600'>
          {isOpen ? '운영중' : '운영종료'}
        </span>
      </div>
      <div className='mt-5 flex flex-col gap-3'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-1.5'>
            <CalendarIcon className='size-4 text-gray-900' />
            <span className='text-sm font-medium text-gray-900'>평일 운영</span>
          </div>
          <span className='text-[13px] text-gray-900'>{operatingHours}</span>
        </div>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-1.5'>
            <ClockIcon className='size-4 text-gray-900' />
            <span className='text-sm font-medium text-gray-900'>주문 마감</span>
          </div>
          <span className='text-[13px] text-gray-900'>{orderDeadline}</span>
        </div>
      </div>
    </Link>
  );
}

// ponytail: weekday + hours-range check only, no holiday calendar — wire up a holiday data source if that matters
function isWithinOperatingHours(operatingHours: string): boolean {
  const [start, end] = operatingHours.split('-');
  const now = new Date();
  const day = now.getDay();
  if (day === 0 || day === 6) return false;

  const toMinutes = (time: string) => {
    const [hour, minute] = time.split(':').map(Number);
    return hour * 60 + minute;
  };
  const nowMinutes = now.getHours() * 60 + now.getMinutes();

  return nowMinutes >= toMinutes(start) && nowMinutes < toMinutes(end);
}

function CalendarIcon({ className }: { className?: string }) {
  return (
    <svg viewBox='0 0 16 16' fill='none' className={className}>
      <path
        d='M5.16667 2.66667C5.16667 2.39052 4.94281 2.16667 4.66667 2.16667C4.39052 2.16667 4.16667 2.39052 4.16667 2.66667V3.87762C3.17128 4.01834 2.38492 4.80563 2.2518 5.80989L2.1941 6.24519C2.18432 6.319 2.17496 6.39284 2.16604 6.46672C2.14236 6.6627 2.29676 6.83333 2.49417 6.83333H13.5058C13.7032 6.83333 13.8576 6.6627 13.8339 6.46672C13.825 6.39284 13.8156 6.31899 13.8059 6.24519L13.7482 5.80989C13.615 4.80565 12.8287 4.01836 11.8333 3.87762V2.66667C11.8333 2.39052 11.6095 2.16667 11.3333 2.16667C11.0572 2.16667 10.8333 2.39052 10.8333 2.66667V3.77842C8.94818 3.61054 7.05182 3.61053 5.16667 3.77842V2.66667Z'
        fill='currentColor'
      />
      <path
        d='M13.963 8.15037C13.9572 7.97275 13.8104 7.83333 13.6327 7.83333H2.36724C2.18953 7.83333 2.04275 7.97275 2.03692 8.15037C1.99732 9.35547 2.07052 10.5631 2.25634 11.7572C2.39701 12.6613 3.13145 13.3556 4.04195 13.4454L4.83728 13.5239C6.94065 13.7313 9.05931 13.7313 11.1627 13.5239L11.958 13.4454C12.8685 13.3556 13.6029 12.6613 13.7436 11.7572C13.9294 10.5631 14.0026 9.35547 13.963 8.15037Z'
        fill='currentColor'
      />
    </svg>
  );
}

function ClockIcon({ className }: { className?: string }) {
  return (
    <svg viewBox='0 0 16 16' fill='none' className={className}>
      <path
        d='M8 1.33333C4.32667 1.33333 1.33333 4.32667 1.33333 8C1.33333 11.6733 4.32667 14.6667 8 14.6667C11.6733 14.6667 14.6667 11.6733 14.6667 8C14.6667 4.32667 11.6733 1.33333 8 1.33333ZM10.9 10.38C10.8067 10.54 10.64 10.6267 10.4667 10.6267C10.38 10.6267 10.2933 10.6067 10.2133 10.5533L8.14667 9.32C7.63333 9.01333 7.25333 8.34 7.25333 7.74667V5.01333C7.25333 4.74 7.48 4.51333 7.75333 4.51333C8.02667 4.51333 8.25333 4.74 8.25333 5.01333V7.74667C8.25333 7.98667 8.45333 8.34 8.66 8.46L10.7267 9.69333C10.9667 9.83333 11.0467 10.14 10.9 10.38Z'
        fill='currentColor'
      />
    </svg>
  );
}

import { Skeleton } from '@/shared/ui';

export default function SearchSkeleton() {
  return (
    <div className='md:px-gutter flex gap-3 border-t border-gray-100 px-4 py-3.5'>
      <Skeleton className='size-[116px] rounded-lg' />
      <div className='flex flex-col gap-1.5 px-1'>
        <Skeleton className='h-5 w-28' />
        <Skeleton className='h-4 w-20' />
        <Skeleton className='h-6 w-16' />
      </div>
    </div>
  );
}

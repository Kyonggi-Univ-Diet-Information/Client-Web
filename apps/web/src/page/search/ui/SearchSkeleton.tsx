import { Skeleton } from '@/shared/ui';

export default function SearchSkeleton() {
  return (
    <>
      <div className='border-b border-gray-100 md:hidden'>
        <div className='flex justify-between p-4'>
          <div className='flex flex-col gap-1'>
            <Skeleton className='h-5 w-32' />
            <Skeleton className='h-4 w-20' />
            <Skeleton className='mt-0.5 h-3 w-24' />
          </div>
          <Skeleton className='h-20 w-20 rounded-lg' />
        </div>
      </div>

      <div className='hidden w-full justify-between rounded-2xl bg-gray-100/50 p-4 md:flex'>
        <div className='flex flex-col justify-between'>
          <Skeleton className='mb-2 h-5 w-40' />
          <Skeleton className='h-4 w-24' />
        </div>
        <div className='flex items-start'>
          <Skeleton className='h-8 w-24 rounded-xl' />
        </div>
      </div>
    </>
  );
}

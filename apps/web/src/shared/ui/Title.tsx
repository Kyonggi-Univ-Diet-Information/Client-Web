import type { ReactNode } from 'react';

export default function Title({ children }: { children: ReactNode }) {
  return <p className='text-xl font-semibold'>{children}</p>;
}

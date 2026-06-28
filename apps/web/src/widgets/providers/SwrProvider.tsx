'use client';
import type { ReactNode } from 'react';
import { SWRConfig } from 'swr';

export default function SWRProvider({ children }: { children: ReactNode }) {
  return <SWRConfig>{children}</SWRConfig>;
}

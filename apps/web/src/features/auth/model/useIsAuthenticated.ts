'use client';

import useSWR from 'swr';

import { authKeys } from '@/shared/lib/queryKey';

import { fetchIsAuthenticated } from './fetchIsAuthenticated';


export function useAuth() {
  const { data, error, isLoading, mutate } = useSWR(
    authKeys.status(),
    () => fetchIsAuthenticated(),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      dedupingInterval: 1000 * 60 * 60 * 24,
    },
  );

  return {
    isAuthenticated: data?.isAuthenticated ?? false,
    isLoading,
    error,
    refresh: mutate,
  };
}

'use server';

import { AuthService } from '@/shared/lib/auth';

export async function fetchIsAuthenticated() {
  try {
    const isAuthenticated = await AuthService.isAuthenticated();

    return {
      isAuthenticated,
    };
  } catch (error) {
    console.error('Check auth error:', error);
    return {
      isAuthenticated: false,
    };
  }
}

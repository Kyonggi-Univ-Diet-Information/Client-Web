/**
 * Jest 테스트 환경에서 사용하는 전역 타입 선언
 */

import type { SWRResponse } from 'swr';

declare global {
  var __SWR_MOCK__:
    | Partial<
        SWRResponse<{ isAuthenticated: boolean }, Error> & {
          error: Error | null;
        }
      >
    | undefined;
}

export {};

import { renderHook } from '@testing-library/react';

import { useAuth } from './useIsAuthenticated';

// SWR 모킹
jest.mock('swr', () => ({
  __esModule: true,
  default: jest.fn(() => {
    const mockData = { isAuthenticated: true };
    const mockError = null;
    const mockIsLoading = false;
    const mockMutate = jest.fn();

    // 테스트에서 반환값을 제어할 수 있도록 전역 변수 사용
    if (global.__SWR_MOCK__) {
      return global.__SWR_MOCK__;
    }

    return {
      data: mockData,
      error: mockError,
      isLoading: mockIsLoading,
      mutate: mockMutate,
    };
  }),
}));

describe('useAuth Hook', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    global.__SWR_MOCK__ = undefined;
  });

  it('인증된 사용자 상태를 반환한다', () => {
    // Given: 인증된 상태 모킹
    global.__SWR_MOCK__ = {
      data: { isAuthenticated: true },
      error: null,
      isLoading: false,
      mutate: jest.fn(),
    };

    // When: useAuth 훅 호출
    const { result } = renderHook(() => useAuth());

    // Then: 인증 상태가 true
    expect(result.current.isAuthenticated).toBe(true);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('인증되지 않은 사용자 상태를 반환한다', () => {
    // Given: 인증되지 않은 상태 모킹
    global.__SWR_MOCK__ = {
      data: { isAuthenticated: false },
      error: undefined,
      isLoading: false,
      mutate: jest.fn(),
    };

    // When: useAuth 훅 호출
    const { result } = renderHook(() => useAuth());

    // Then: 인증 상태가 false
    expect(result.current.isAuthenticated).toBe(false);
  });

  it('로딩 상태를 올바르게 반환한다', () => {
    // Given: 로딩 중 상태 모킹
    global.__SWR_MOCK__ = {
      data: undefined,
      error: undefined,
      isLoading: true,
      mutate: jest.fn(),
    };

    // When: useAuth 훅 호출
    const { result } = renderHook(() => useAuth());

    // Then: 로딩 상태가 true
    expect(result.current.isLoading).toBe(true);
    expect(result.current.isAuthenticated).toBe(false); // 데이터가 없으므로 기본값 false
  });

  it('에러 상태를 올바르게 반환한다', () => {
    // Given: 에러 상태 모킹
    const mockError = new Error('Authentication failed');
    global.__SWR_MOCK__ = {
      data: undefined,
      error: mockError,
      isLoading: false,
      mutate: jest.fn(),
    };

    // When: useAuth 훅 호출
    const { result } = renderHook(() => useAuth());

    // Then: 에러가 반환됨
    expect(result.current.error).toBe(mockError);
    expect(result.current.isAuthenticated).toBe(false);
  });

  it('refresh 함수를 제공한다', () => {
    // Given: 모킹된 mutate 함수
    const mockMutate = jest.fn();
    global.__SWR_MOCK__ = {
      data: { isAuthenticated: true },
      error: undefined,
      isLoading: false,
      mutate: mockMutate,
    };

    // When: useAuth 훅 호출 및 refresh 함수 호출
    const { result } = renderHook(() => useAuth());
    result.current.refresh();

    // Then: mutate가 호출됨
    expect(mockMutate).toHaveBeenCalledTimes(1);
  });

  it('데이터가 없을 때 기본값으로 false를 반환한다', () => {
    // Given: 데이터가 undefined인 상태
    global.__SWR_MOCK__ = {
      data: undefined,
      error: undefined,
      isLoading: false,
      mutate: jest.fn(),
    };

    // When: useAuth 훅 호출
    const { result } = renderHook(() => useAuth());

    // Then: 기본값인 false 반환
    expect(result.current.isAuthenticated).toBe(false);
  });
});

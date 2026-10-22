const REFRESH_CALLBACK = '__onNativeTokenRefreshed';
const REFRESH_TIMEOUT_MS = 10_000;

let pendingRefresh: Promise<boolean> | null = null;

export const getNativeBridge = () =>
  typeof window === 'undefined' ? undefined : (window.Bridge ?? window.Android);

export const isNativeApp = () => !!getNativeBridge();

// 동시에 401이 여러 건 나도 네이티브 재발급은 한 번만 요청해요
export function refreshNativeToken(): Promise<boolean> {
  pendingRefresh ??= new Promise<boolean>(resolve => {
    const timer = setTimeout(() => finish(false), REFRESH_TIMEOUT_MS);
    const finish = (ok: boolean) => {
      clearTimeout(timer);
      delete window[REFRESH_CALLBACK];
      pendingRefresh = null;
      resolve(ok);
    };
    window[REFRESH_CALLBACK] = finish;
    getNativeBridge()?.refreshToken(REFRESH_CALLBACK);
  });
  return pendingRefresh;
}

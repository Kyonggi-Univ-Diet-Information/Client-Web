interface NativeBridge {
  getToken(): string;
  logout(): void;
  refreshToken(callbackName: string): void;
  getAppVersion?(): string;
  openGallery?(callbackName: string): void;
}

declare global {
  interface Window {
    Bridge?: NativeBridge;
    // 이미 배포된 Android 앱은 window.Android로 브릿지를 노출해요
    Android?: NativeBridge;
    APP_VERSION?: string;
    __onNativeTokenRefreshed?: (ok: boolean) => void;
  }
}

export {};

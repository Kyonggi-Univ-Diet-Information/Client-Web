interface ReactNativeWebViewBridge {
  postMessage(message: string): void;
}

interface AndroidBridge {
  getToken(): string;
  logout(): void;
  refreshToken(callbackName: string): void;
}

declare global {
  interface Window {
    Android?: AndroidBridge;
    ReactNativeWebView?: ReactNativeWebViewBridge;
    IS_REACT_NATIVE_WEBVIEW?: boolean;
    __onNativeTokenRefreshed?: (ok: boolean) => void;
  }
}

export {};

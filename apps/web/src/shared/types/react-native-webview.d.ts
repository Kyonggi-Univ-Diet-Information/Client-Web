interface ReactNativeWebViewBridge {
  postMessage(message: string): void;
}

declare global {
  interface Window {
    ReactNativeWebView?: ReactNativeWebViewBridge;
    IS_REACT_NATIVE_WEBVIEW?: boolean;
  }
}

export {};

import { StyleSheet, BackHandler, Platform } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import { useCallback, useEffect, useRef, useState } from 'react';
import * as Linking from 'expo-linking';

import { WebView } from 'react-native-webview';

import { router, SplashScreen, useLocalSearchParams } from 'expo-router';
import {
  BASE_URL,
  buildWebUrl,
  isExpoDevClientUrl,
  isValidWebViewUrl,
  WEB_URL_PARAM_KEY,
} from '@/lib/webUrl';

export default function Index() {
  // 웹뷰 내부에서 외부 링크 열기
  function navigateTo(url: string) {
    if (!isValidWebViewUrl(url)) return;
    if (isExpoDevClientUrl(url)) return;

    if (webViewRef.current) {
      webViewRef.current.injectJavaScript(`
        window.location.href = ${JSON.stringify(url)};
        true;
      `);
    } else {
      setInitialUrl(url);
    }
  }

  // expo router에서 쿼리 파라미터 조회
  function getQueryParam(
    params: Record<string, string | string[] | undefined>,
    key: string,
  ): string | undefined {
    const v = params[key];
    if (typeof v === 'string') return v;
    if (Array.isArray(v)) return v[0];
    return undefined;
  }

  // 뒤로가기 처리
  useEffect(() => {
    const backAction = () => {
      if (router.canGoBack()) {
        router.back();
        return true;
      }
      if (webViewRef.current) {
        webViewRef.current.goBack();
        return true;
      }

      return false;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  // 스플래시 스크린 처리
  const handleWebViewLoad = useCallback(() => {
    SplashScreen.hideAsync();
  }, []);

  const handleWebViewError = useCallback((event: any) => {
    SplashScreen.hideAsync();
  }, []);

  // 배경색 UI 관련 처리
  const [currentUrl, setCurrentUrl] = useState('');
  const isTransparentPath =
    currentUrl.includes('/entry') || currentUrl.includes('/maintenance');

  const webViewRef = useRef<WebView>(null);
  const params = useLocalSearchParams();

  // 딥링크 처리

  // 앱이 최초 실행될 때 전달된 링크 쿼리 파라미터
  const webUrlFromIntent = getQueryParam(params, WEB_URL_PARAM_KEY);

  // 전달된 링크 쿼리 파라미터 디코딩
  const resolvedFromIntent =
    typeof webUrlFromIntent === 'string' && webUrlFromIntent.trim() !== ''
      ? decodeURIComponent(webUrlFromIntent)
      : undefined;

  const [initialUrl, setInitialUrl] = useState(BASE_URL);

  useEffect(() => {
    // 앱이 최초 실행될 때 딥링크로 들어왔을 시 전달된 링크로 이동
    if (resolvedFromIntent) {
      navigateTo(resolvedFromIntent);
      return;
    }
  }, []);

  useEffect(() => {
    // 앱이 실행 중일 때 딥링크 수신 시 전달된 링크로 이동
    const subscription = Linking.addEventListener('url', ({ url }) => {
      const webUrl = buildWebUrl(Linking.parse(url));
      navigateTo(webUrl);
    });

    return () => subscription.remove();
  }, []);

  return (
    <SafeAreaProvider>
      <SafeAreaView
        edges={Platform.OS === 'android' ? [] : undefined}
        style={[
          styles.container,
          {
            paddingBottom: Platform.OS === 'ios' ? -24 : 0,
            backgroundColor: isTransparentPath ? 'transparent' : '#ffffff',
          },
        ]}
      >
        <WebView
          ref={webViewRef}
          onLoad={handleWebViewLoad}
          onError={handleWebViewError}
          source={{
            uri: initialUrl,
            headers: {
              'X-React-Native-WebView': 'true',
            },
          }}
          onNavigationStateChange={navState => {
            setCurrentUrl(navState.url);
          }}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          originWhitelist={['*']}
          injectedJavaScript={`
            window.IS_REACT_NATIVE_WEBVIEW = true;
            true;
          `}
          onMessage={event => {
            try {
              const { type, url } = JSON.parse(event.nativeEvent.data);
              if (type === 'OPEN_EXTERNAL' && url) {
                Linking.openURL(url);
              }
            } catch {}
          }}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

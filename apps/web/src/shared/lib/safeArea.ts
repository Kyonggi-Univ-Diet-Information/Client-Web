import { MIN_APP_VERSION } from '@/shared/constants/appVersion';

// 구버전 앱은 네이티브가 safe area를 비켜줘서 웹의 --safe-area-*를 0으로 덮어요.
// 첫 페인트 전에 판단해야 깜빡이지 않아서 <head> 인라인 스크립트로 넣어요
export const SAFE_AREA_SCRIPT = `(function () {
  var MIN = ${JSON.stringify(MIN_APP_VERSION.WEB_SAFE_AREA)};
  var root = document.documentElement;
  var isAtLeast = function (version, min) {
    var a = String(version).split('.');
    var b = min.split('.');
    for (var i = 0; i < Math.max(a.length, b.length); i++) {
      var diff = (parseInt(a[i], 10) || 0) - (parseInt(b[i], 10) || 0);
      if (diff !== 0) return diff > 0;
    }
    return true;
  };
  var check = function () {
    try {
      var ua = navigator.userAgent;
      var bridge = window.Bridge || window.Android;
      if (!bridge && !/ReactNative|Kiryong(Android|IOS)/.test(ua)) return true;
      var version =
        window.APP_VERSION ||
        (bridge && bridge.getAppVersion && bridge.getAppVersion());
      if (version && isAtLeast(version, MIN)) {
        delete root.dataset.nativeInset;
        return true;
      }
      root.dataset.nativeInset = /Android/i.test(ua) ? 'android' : 'ios';
      return !!version;
    } catch (e) {
      return true;
    }
  };
  // 버전 주입이 문서 로드보다 늦을 수 있어서 한 번 더 확인해요
  if (!check()) {
    document.addEventListener('DOMContentLoaded', check, { once: true });
    window.addEventListener('load', check, { once: true });
  }
})();`;

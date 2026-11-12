import { onMount } from 'solid-js';

const WEB_APP_URL = 'https://kiryong-app.vercel.app/';

export default function Web() {
  onMount(() => window.location.replace(WEB_APP_URL));

  return (
    <div class='flex min-h-screen items-center justify-center text-sm font-semibold text-grey-500'>
      웹 버전으로 이동 중...
    </div>
  );
}

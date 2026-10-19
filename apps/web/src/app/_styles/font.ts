import localFont from 'next/font/local';

export const pretendard = localFont({
  src: '../../../public/fonts/PretendardVariable.woff2',
  weight: '45 920',
  variable: '--font-pretendard',
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'arial'],
  adjustFontFallback: 'Arial',
});

export const gyeonggiTitleBold = localFont({
  src: [
    {
      path: '../../../public/fonts/gyeonggiTitleBold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-gyeonggiTitleBold',
  display: 'swap',
  preload: true,
  fallback: ['serif'],
});

export const tossFace = localFont({
  src: [
    {
      path: '../../../public/fonts/tossFace.ttf',
      weight: '400',
      style: 'normal',
    },
  ],
  variable: '--font-tossFace',
  display: 'swap',
  preload: false,
});

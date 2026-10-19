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

export const brBold = localFont({
  src: [
    {
      path: '../../../public/fonts/brBold.otf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-brBold',
  display: 'swap',
  preload: false,
  fallback: ['system-ui', 'arial'],
});

export const brRegular = localFont({
  src: [
    {
      path: '../../../public/fonts/brRegular.otf',
      weight: '400',
      style: 'normal',
    },
  ],
  variable: '--font-brRegular',
  display: 'swap',
  preload: false,
  fallback: ['system-ui', 'arial'],
});

// 앱바 로고 글자(기밥, 기룡아 밥먹자)만 서브셋한 파일이라 다른 글자는 fallback으로 보여요
// 글자 추가 시: pyftsubset 경기천년제목OTF_Bold.otf --text="..." --flavor=woff2
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

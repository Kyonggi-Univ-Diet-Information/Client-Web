import '@/app/_styles/globals.css';
import { Analytics as VercelAnalytics } from '@vercel/analytics/next';
import type { Metadata } from 'next';
import Script from 'next/script';
import type { ReactNode } from 'react';

import {
  brBold,
  brRegular,
  gyeonggiTitleBold,
  pretendard,
  tossFace,
} from '@/app/_styles/font';

import { ErrorProvider, SWRProvider } from '@/widgets/providers';

import { GA4_MEASUREMENT_ID } from '@/shared/lib/ga4';

export const metadata: Metadata = {
  title: '기룡아 밥먹자',
  description: '경기대학교 내부 식당 정보를 쉽게 찾아봐요!',
};

type Props = {
  children: ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <html
      lang='ko'
      className={`${pretendard.variable} ${brBold.variable} ${brRegular.variable} ${gyeonggiTitleBold.variable} ${tossFace.variable}`}
      suppressHydrationWarning
    >
      <head>
        <link rel='icon' href='/favicon/favicon.png' type='image/png' />
        <link rel='manifest' href='/config/manifest.json' />
        <link rel='dns-prefetch' href='https://www.googletagmanager.com' />
        <link rel='preconnect' href='https://www.googletagmanager.com' />
        <link
          rel='preconnect'
          href='https://res.cloudinary.com'
          crossOrigin='anonymous'
        />

        <meta property='og:image' content='/thumbnail/thumbnail.png' />
        <meta property='og:url' content='https://www.kiryong.kr/' />
        <meta property='og:type' content='website' />
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover'
        />
        <meta
          name='naver-site-verification'
          content='93445f88fb84c2015b74933d1b6deabbba65014e'
        />
        <meta
          name='google-site-verification'
          content='V1odmpWgms6ZPdD3-m_eVSDwWliOCiVEehL6LawaKXs'
        />
      </head>
      <body className='antialiased' suppressHydrationWarning>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA4_MEASUREMENT_ID}`}
          strategy='afterInteractive'
        />
        <Script
          id='google-analytics'
          strategy='afterInteractive'
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA4_MEASUREMENT_ID}');
            `,
          }}
        />
        <ErrorProvider>
          <VercelAnalytics />
          <SWRProvider>{children}</SWRProvider>
        </ErrorProvider>
      </body>
    </html>
  );
}

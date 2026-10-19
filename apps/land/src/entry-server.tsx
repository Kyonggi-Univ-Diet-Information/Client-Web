// @refresh reload
import { createHandler, StartServer } from '@solidjs/start/server';

export default createHandler(() => (
  <StartServer
    document={({ assets, children, scripts }) => (
      <html lang='ko'>
        <head>
          <meta charset='utf-8' />
          <meta
            name='viewport'
            content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no'
          />
          <meta
            name='naver-site-verification'
            content='93445f88fb84c2015b74933d1b6deabbba65014e'
          />
          <meta
            name='google-site-verification'
            content='V1odmpWgms6ZPdD3-m_eVSDwWliOCiVEehL6LawaKXs'
          />
          <link rel='dns-prefetch' href='https://www.googletagmanager.com' />
          <link rel='preconnect' href='https://www.googletagmanager.com' />
          <script
            async
            src='https://www.googletagmanager.com/gtag/js?id=G-NKEL4R473V'
          ></script>
          <script
            innerHTML={`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-NKEL4R473V');
              `}
          />
          <title>기룡아 밥먹자!</title>
          <meta
            name='description'
            content='오늘의 학식, 더 이상 고민 말고 기밥하세요!'
          />
          <link rel='icon' href='/favicon/favicon.png' type='image/png' />
          <link rel='manifest' href='/config/manifest.json' />
          <meta property='og:title' content='기룡아 밥먹자!' />
          <meta
            property='og:description'
            content='오늘의 학식, 더 이상 고민 말고 기밥하세요!'
          />
          <meta property='og:image' content='/thumbnail/thumbnail.png' />
          <meta property='og:url' content='https://www.kiryong.kr/' />
          <meta property='og:type' content='website' />
          {assets}
        </head>
        <body class='antialiased'>
          <div id='app'>{children}</div>
          {scripts}
        </body>
      </html>
    )}
  />
));

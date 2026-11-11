import { resolve } from 'path';

import type { StorybookConfig } from '@storybook/react-vite';

const mock = (name: string) => resolve(__dirname, `./mocks/${name}`);

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(ts|tsx)'],
  addons: ['@storybook/addon-essentials'],
  framework: { name: '@storybook/react-vite', options: {} },
  core: { disableTelemetry: true },
  staticDirs: ['../public'],
  viteFinal: async config => {
    const { default: tailwindcss } = await import('@tailwindcss/vite');
    const { default: svgr } = await import('vite-plugin-svgr');
    config.plugins = [
      ...(config.plugins ?? []),
      tailwindcss(),
      svgr({
        include: '**/*.svg',
        svgrOptions: { exportType: 'default' },
      }),
    ];
    // tsconfig가 jsx: preserve라 vite에서는 자동 런타임을 직접 지정해요
    // Next는 process.env를 빌드 때 채워주지만 vite는 안 해서 빈 객체로 둬요
    config.define = { ...config.define, 'process.env': {} };
    config.esbuild = { ...config.esbuild, jsx: 'automatic' };
    config.resolve = {
      ...config.resolve,
      alias: [
        // 서버 액션은 브라우저에서 못 돌아서 스토리에서는 목으로 바꿔요
        {
          find: /^@\/features\/review\/api\/(fetchReportReasons|removeReview|removeReviewFav|submitReviewBlock|submitReviewFav|submitReviewReport)$/,
          replacement: mock('reviewActions.ts'),
        },
        { find: 'next/image', replacement: mock('NextImage.tsx') },
        { find: 'next/link', replacement: mock('NextLink.tsx') },
        { find: 'next/navigation', replacement: mock('next-navigation.ts') },
        { find: /^@\//, replacement: `${resolve(__dirname, '../src')}/` },
      ],
    };
    return config;
  },
};

export default config;

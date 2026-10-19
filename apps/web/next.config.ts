import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },
  outputFileTracingRoot: process.env.OUTPUT_FILE_TRACING_ROOT || '../..',
  serverExternalPackages: [],
  transpilePackages: ['@kiryong/design-system'],

  compress: true,
  poweredByHeader: false,

  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    if (config.mode === 'production') {
      config.optimization = {
        ...config.optimization,
        minimize: true,
      };
    }

    return config;
  },

  experimental: {
    optimizePackageImports: ['lucide-react'],
    optimizeCss: true,
  },

  ...(process.env.NODE_ENV === 'development' && {
    onDemandEntries: {
      maxInactiveAge: 25 * 1000,
      pagesBufferLength: 2,
    },
  }),
};

export default nextConfig;

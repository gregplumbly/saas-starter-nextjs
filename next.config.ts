import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    ppr: true
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;

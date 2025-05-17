import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    ppr: true
  },
  images: {
    domains: ['cdn.sanity.io'],
  },
};

export default nextConfig;

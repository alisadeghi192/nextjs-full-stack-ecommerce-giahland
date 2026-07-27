import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    serverActions: {
      bodySizeLimit: '50mb', 
    },
    middlewareClientMaxBodySize: '50mb',
  },
};

export default nextConfig;

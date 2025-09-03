import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Server external packages for Node.js runtime
  serverExternalPackages: ['postgres'],
  
  // Experimental features
  experimental: {
    nodeMiddleware: true,
  },
  
  // Images optimization for Netlify
  images: {
    unoptimized: true,
  },
  
  // Webpack configuration for better compatibility
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        crypto: false,
        stream: false,
        url: false,
        zlib: false,
        http: false,
        https: false,
        assert: false,
        os: false,
        path: false,
      };
    }
    return config;
  },
  
  // Disable features that can cause issues with Netlify Functions
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
};

export default nextConfig;

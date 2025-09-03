import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Minimal configuration for troubleshooting
  reactStrictMode: true,
  
  // Experimental features for middleware
  experimental: {
    nodeMiddleware: true,
  },
  
  // Images optimization for Netlify
  images: {
    unoptimized: true,
  },
  
  // Disable features that can cause issues
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
};

export default nextConfig;
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Server external packages for Node.js runtime
  serverExternalPackages: ['postgres'],
  
  // Enable React Strict Mode for better development experience
  reactStrictMode: true,
  
  // Experimental features
  experimental: {
    nodeMiddleware: true,
  },
  
  // Allow cross-origin requests for Clacky development environment
  allowedDevOrigins: [
    '3000-caef452ff99a-web.clackypaas.com',
    'localhost:3000',
  ],
  
  // Optimize build caching for faster rebuilds
  onDemandEntries: {
    // Period (in ms) where the server will keep pages in the buffer
    maxInactiveAge: 25 * 1000,
    // Number of pages that should be kept simultaneously without being disposed
    pagesBufferLength: 2,
  },
  
  // Enable build caching
  generateBuildId: async () => {
    // Use git commit hash for consistent build IDs across deployments
    return process.env.NETLIFY_BUILD_ID || process.env.GITHUB_SHA || 'development'
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

import { withContentlayer } from 'next-contentlayer';
import withMDX from '@next/mdx';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  images: {
    domains: [
      'user-images.githubusercontent.com',
      'i.ibb.co',
      'avatars.githubusercontent.com',
    ],
    formats: ['image/webp', 'image/avif'],
  },
  // Performance optimizations
  experimental: {
    optimizePackageImports: ['@heroicons/react', 'framer-motion'],
  },
  // Bundle optimization
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Client-side optimizations
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      };
    }
    return config;
  },
  // Cache headers
  async headers() {
    return [
      {
        source: '/projects/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, s-maxage=3600, stale-while-revalidate=86400',
          },
        ],
      },
    ];
  },
};

export default withContentlayer(withMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  }
})(nextConfig));

import { withContentlayer } from 'next-contentlayer';
import withMDX from '@next/mdx';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
};

export default withContentlayer(withMDX({
  extension: /\.mdx?$/
})(nextConfig));

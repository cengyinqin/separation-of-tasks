/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@sot/shared'],
  output: 'export',
  distDir: 'out',
};

module.exports = nextConfig;

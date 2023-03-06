/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';


const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  assetPrefix: isProd ? '/princess-type-mbti/' : '',
  basePath: '/princess-type-mbti'
}

module.exports = nextConfig

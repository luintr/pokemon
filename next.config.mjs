/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  reactStrictMode: false,
  experimental: {
    scrollRestoration: true,
  },
  sassOptions: {
    additionalData: `
        @import "./src/styles/_function.scss";
      `,
  },
  images: {
    // remotePatterns: [
    //   {
    //     hostname: "images.prismic.io",
    //     protocol: "https",
    //   },
    // ],
    formats: ['image/avif', 'image/webp'],
  },
};

export default nextConfig;

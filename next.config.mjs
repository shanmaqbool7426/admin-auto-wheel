/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'res.cloudinary.com',
          pathname: '/**',
        },
      ],
    },
    webpack: (config, { isServer }) => {
      return config;
    },
    reactStrictMode: true,
    swcMinify: true,
    output: 'standalone',
  };
  
  export default nextConfig;
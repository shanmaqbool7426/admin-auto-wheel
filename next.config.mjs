/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'res.cloudinary.com',
          pathname: '/**',
        },
        {
          protocol:"https",
          hostname:"via.placeholder.com",
          pathname:"/**"
        },
        {
          protocol:"http",
          hostname:"res.cloudinary.com",
          pathname:"/**"
        },
        {
          protocol: 'https',
          hostname: 'auto-wheels.s3.eu-north-1.amazonaws.com'  // Add your S3 bucket path
        },
        {
          protocol: 'https',
          hostname: 'auto-wheels.s3.amazonaws.com'  // Add your S3 bucket path
        }

      ],
    },
    webpack: (config, { isServer }) => {
      return config;
    },
    reactStrictMode: true,
    // swcMinify: true,
    output: 'standalone',
  };
  
  export default nextConfig;
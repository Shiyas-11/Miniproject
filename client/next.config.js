/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable React strict mode for development
  reactStrictMode: true,

  // Configure image domains for next/image
  images: {
    domains: ["example.com", "images.unsplash.com"],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "2mb",
    },
  },
  // Add redirects
  async redirects() {
    return [
      {
        source: "/old-page",
        destination: "/new-page",
        permanent: true,
      },
    ];
  },

  // Add headers
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;

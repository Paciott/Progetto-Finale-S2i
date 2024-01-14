/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/login",
        permanent: true,
        missing: [
          {
            type: "cookie",
            key: "jwt_token",
          },
        ],
      },
      {
        source: "/login",
        destination: "/",
        permanent: true,
        has: [
          {
            type: "cookie",
            key: "jwt_token",
          },
        ],
      },
      {
        source: "/user",
        destination: "/login",
        permanent: true,
        missing: [
          {
            type: "cookie",
            key: "jwt_token",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;

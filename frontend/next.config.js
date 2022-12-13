/**
 * @type {import('next').NextConfig}
 **/
module.exports = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/login",
        permanent: true,
      },
      {
        source: "/api/:path*",
        destination: `${process.env.HOST_API}/api/:path*`,
        permanent: true,
      },
    ];
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
  env: {
    REACT_APP_API_KEY: process.env.REACT_APP_API_KEY,
    REACT_APP_AUTH_DOMAIN: process.env.REACT_APP_AUTH_DOMAIN,
    REACT_APP_PROJECT_ID: process.env.REACT_APP_PROJECT_ID,
    REACT_APP_STORAGE_BUCKET: process.env.REACT_APP_STORAGE_BUCKET,
    REACT_APP_MESSAGING_SENDER_ID: process.env.REACT_APP_MESSAGING_SENDER_ID,
    REACT_APP_APP_ID: process.env.REACT_APP_APP_ID,
    REACT_APP_BUCKET_URL: process.env.REACT_APP_BUCKET_URL,
  }
};

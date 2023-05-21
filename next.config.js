/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/api/:slug*",
        destination: "http://tinhoccaogiaphat.com/:slug*",
      },
      {
        source: "/auth/:slug",
        destination: "http://tinhoccaogiaphat.com/auth/:slug",
      },
    ];
  },
  webpack(config, options) {
    config.module.rules.push({
      test: /\.mp3$/,
      use: {
        loader: "file-loader",
      },
    });

    return config;
  },
};

module.exports = nextConfig;

// const compose = require("next-compose");
// module.exports = compose([
//   {
//     webpack(config, options) {
//       config.module.rules.push({
//         test: /\.mp3$/,
//         use: {
//           loader: "file-loader",
//         },
//       });
//       return config;
//     },
//   },
//   {
//     async rewrites() {
//       return [
//         {
//           source: "/auth/signup",
//           destination: "http://atseeds.com/v1/auth/signup",
//         },
//       ];
//     },
//   },
// ]);

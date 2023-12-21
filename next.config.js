/** @type {import('next').NextConfig} */
module.exports = {
  compiler: {
    // Enables the styled-components SWC transform
    styledComponents: true
  },
  webpack: (config) => {
    config.resolve.fallback = {
      "mongodb-client-encryption": false,
      "aws4": false
    };

    return config;
  },
  reactStrictMode: true,
}

/** @type {import('next').NextConfig}*/

const nextConfig = {
   reactStrictMode: true,
   swcMinify: true,
   eslint: {
      ignoreDuringBuilds: true,
   },
   // async rewrites() {
   //    return process.env.NODE_ENV !== "production"
   //       ? [
   //            {
   //               source: "/api/:path*",
   //               destination: "https://api.emotionchip.dev/v1/:path*",
   //            },
   //         ]
   //       : [];
   // },
   webpack(config) {
      config.module.rules.push({
         test: /\.svg$/,
         use: ["@svgr/webpack"],
      });

      return config;
   },

   images: {
      unoptimized: true,
      remotePatterns: [
         {
            protocol: "https",
            hostname: "res.cloudinary.com",
            port: "",
            pathname: "/**",
         },
      ],
   },
};

module.exports = nextConfig;

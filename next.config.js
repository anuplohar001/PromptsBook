
// const { withSentryConfig } = require("@sentry/nextjs");

// const withBundleAnalyzer = require("@next/bundle-analyzer")({
//   enabled: process.env.ANALYZE === 'true',
// });

// const moduleExports = {

//   env: {
//     NEXT_PUBLIC_ENV: 'PRODUCTION', //your next configs goes here
//   },

//   images: {
//     domains: ["i.scdn.co", "tailwindui.com", "scontent-ort2-2.xx.fbcdn.net", 'lh3.googleusercontent.com'],
//     remotePatterns: [
//       {
//         protocol: "https",
//         hostname: "i.scdn.co",
//       },
//       {
//         protocol: "https",
//         hostname: "scontent**",
//       },
//       {
//         protocol: "https",
//         hostname: "platform**",
//       },
//     ],
//   }
// };

// const SentryWebpackPluginOptions = {
//   silent: true,
// };

// // Ensure Sentry and other plugins are integrated properly.
// module.exports = withBundleAnalyzer(
//   withSentryConfig(moduleExports, SentryWebpackPluginOptions)
// );

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['lh3.googleusercontent.com'],
    },
    webpack(config) {
        config.experiments = {
            ...config.experiments,
            topLevelAwait: true,
        }
        return config
    }
}

module.exports = nextConfig



/** @type {import('next').NextConfig} */
const withPWA = require("next-pwa")({
  dest: 'public'
  // disable: process.env.NODE_ENV === 'development',
  // register: true,
  // scope: '/app',
  // sw: 'service-worker.js',
  //...
})


const nextConfig = withPWA({
  experimental: {
    appDir: true,
  },
})

module.exports = nextConfig

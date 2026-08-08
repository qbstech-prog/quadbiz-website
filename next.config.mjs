/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    // Remote patterns can be added here once we host images off-site (e.g. Sanity CDN).
    remotePatterns: [],
  },
};

export default nextConfig;

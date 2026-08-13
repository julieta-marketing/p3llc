/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    // `unoptimized: true` was making every visitor download the full-resolution
    // original of each photo — the hero JPEGs are multi-megabyte, and `sizes`
    // and `quality` are both ignored in that mode. Letting the optimizer run
    // serves a correctly sized AVIF/WebP instead.
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1440, 1920, 2048],
  },
}

export default nextConfig

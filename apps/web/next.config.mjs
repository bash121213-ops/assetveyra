/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: ['**.manuspre.computer', '127.0.0.1', 'localhost'],
  images: {
    qualities: [65, 78, 82],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.supabase.co',
        pathname: '/storage/v1/object/sign/property-images/**',
      },
    ],
    minimumCacheTTL: 3600,
  },
  async headers() {
    return [{
      source: '/(.*)',
      headers: [
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
        { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
      ],
    }];
  },
};

export default nextConfig;

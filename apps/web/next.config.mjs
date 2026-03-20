/** @type {import('next').NextConfig} */
const nextConfig = {
  cacheComponents: true,
  transpilePackages: [
    "@workspace/auth",
    "@workspace/config",
    "@workspace/content",
    "@workspace/db",
    "@workspace/ui",
    "@workspace/validation",
  ],
}

export default nextConfig

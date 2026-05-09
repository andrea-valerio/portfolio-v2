/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  reactStrictMode: true,
  // Next.js 16+ blocks `/_next/*` and the dev HMR WebSocket unless the
  // browser Origin host is allowlisted. `-H 0.0.0.0` does not add your LAN
  // IP, so Safari/Chrome on a phone would spin while dev assets/HMR 403.
  // Wildcards follow the same rules as `images.remotePatterns` host patterns.
  allowedDevOrigins: [
    "192.168.*.*",
    "10.*.*.*",
    "172.*.*.*",
    ...(process.env.ALLOWED_DEV_ORIGINS?.split(",")
      .map((s) => s.trim())
      .filter(Boolean) ?? []),
  ],
};

export default nextConfig;

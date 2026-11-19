import { withPayload } from "@payloadcms/next/withPayload";
import type { NextConfig } from "next";

// Department pages were merged into /anmeldung; old links land on the matching section.
export const departmentRedirects = [
  { source: "/abteilungen", destination: "/anmeldung#ablauf", permanent: true },
  { source: "/abteilungen/primarstufe", destination: "/anmeldung#primarstufe", permanent: true },
  { source: "/abteilungen/mittelstufe", destination: "/anmeldung#mittelstufe", permanent: true },
  { source: "/abteilungen/oberstufe", destination: "/anmeldung#oberstufe", permanent: true },
];

const nextConfig: NextConfig = {
  // Self-contained server bundle for the Docker image (Dockerfile).
  output: "standalone",
  experimental: {
    // The on-disk Turbopack dev cache kept serving stale components after edits; start fresh instead.
    turbopackFileSystemCacheForDev: false,
  },
  async redirects() {
    return departmentRedirects;
  },
  // Vercel only: uploads are copied to public/media at build time (scripts/vercel-media.mjs) and served statically.
  async rewrites() {
    return {
      beforeFiles: process.env.VERCEL ? [{ source: "/api/media/file/:file", destination: "/media/:file" }] : [],
      afterFiles: [],
      fallback: [],
    };
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "3000",
        pathname: "/api/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "3000",
        pathname: "/media/**",
      },
    ],
  },
};

export default withPayload(nextConfig);

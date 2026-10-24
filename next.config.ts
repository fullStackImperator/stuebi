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
  async redirects() {
    return departmentRedirects;
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

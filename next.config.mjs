import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export — preserves the existing "build → serve static" Docker/deploy model.
  output: "export",
  trailingSlash: true,
  // Pin the workspace root (the monorepo parent has its own lockfile).
  turbopack: { root: __dirname },
  images: {
    // next/image optimization is unavailable in static export.
    unoptimized: true,
  },
  // Routes map 1:1 to the previous Docusaurus site, so no redirects are required.
};

export default nextConfig;

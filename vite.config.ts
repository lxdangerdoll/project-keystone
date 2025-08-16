import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
import fs from "fs";

// Dynamic base: root on custom domain (CNAME present), project path on project pages.
const isProd = process.env.NODE_ENV === "production";
const rootDir = path.resolve(import.meta.dirname);
const cnamePath = path.join(rootDir, "client", "public", "CNAME");
const hasCNAME = fs.existsSync(cnamePath);
const resolvedBase = !isProd
  ? "/"
  : (process.env.BASE_PATH ?? (hasCNAME ? "/" : "/project-keystone/"));

export default defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    ...(process.env.NODE_ENV !== "production" &&
    process.env.REPL_ID !== undefined
      ? [
          await import("@replit/vite-plugin-cartographer").then((m) =>
            m.cartographer(),
          ),
        ]
      : []),
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
  },
  root: path.resolve(import.meta.dirname, "client"),
  // Use project base only for production builds (GitHub Pages). In dev, use "/".
  base: resolvedBase,
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
  },
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },
});

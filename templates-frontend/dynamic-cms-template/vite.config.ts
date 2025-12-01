import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/blogs/api": {
        target: "https://esign-admin.signmary.com",
        changeOrigin: true,
        secure: false,
        configure: (proxy, _options) => {
          proxy.on("proxyReq", (proxyReq, req, _res) => {
            const frontendUrl =
              req.headers["x-frontend-url"] || "http://localhost:5173";
            proxyReq.setHeader("X-Frontend-Url", frontendUrl);
          });
        },
        rewrite: (path) => path,
      },
    },
  },
  build: {
    outDir: "dist",
  },
});

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { imagetools } from "vite-imagetools";
import path from "path";

export default defineConfig(({ mode }) => {
  const plugins = [react(), imagetools()];

  const isProduction = process.env.NODE_ENV === "production";

  return {
    // ❗ FIXED: Correct base path for production
    base: "/",

    build: {
      outDir: "dist",
      assetsDir: "assets",
      emptyOutDir: true,
      rollupOptions: {
        output: {
          assetFileNames: "assets/[name]-[hash][extname]",
          chunkFileNames: "assets/[name]-[hash].js",
          entryFileNames: "assets/[name]-[hash].js",
        },
      },
    },

    server: {
      host: "::",
      port: 8080,
      proxy: {
        "/api": {
          target: "http://localhost:5002",
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/api/, ""),
          ws: true,
        },
      },
    },

    plugins,

    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },

    define: {
      "import.meta.env.API_BASE_URL": isProduction
        ? JSON.stringify("https://dos.suncitysolar.in/api")
        : JSON.stringify("/api"),
    },
  };
});

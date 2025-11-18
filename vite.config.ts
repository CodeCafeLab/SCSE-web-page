import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { imagetools } from "vite-imagetools";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const plugins = [react(), imagetools()];
  
  // lovable-tagger is ESM-only and causes build issues
  // It's only for development tooling, so skip it in production builds
  // For development, you can manually add it if needed

  const isProduction = process.env.NODE_ENV === 'production';
  
  return {
    base: isProduction ? '/suncity/' : '/',
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      emptyOutDir: true,
      rollupOptions: {
        output: {
          assetFileNames: 'assets/[name]-[hash][extname]',
          chunkFileNames: 'assets/[name]-[hash].js',
          entryFileNames: 'assets/[name]-[hash].js',
        },
      },
    },
    server: {
      host: "::",
      port: 8080,
      proxy: {
        // Proxy API requests to the backend server in development
        '/api': {
          target: 'http://localhost:5000',
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/api/, ''), // Remove /api prefix when proxying
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
    // Add environment variables
    define: {
      'import.meta.env.API_BASE_URL': isProduction 
        ? JSON.stringify('https://dos.suncitysolar.in/api') 
        : JSON.stringify('/api') // Use proxy in development
    },
  };
});

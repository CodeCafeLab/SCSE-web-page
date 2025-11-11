import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const plugins = [react()];
  
  // lovable-tagger is ESM-only and causes build issues
  // It's only for development tooling, so skip it in production builds
  // For development, you can manually add it if needed

  return {
    server: {
      host: "::",
      port: 8080,
      proxy: {
        // Proxy API requests to the backend server
        '/api': {
          target: 'http://localhost:5000',
          changeOrigin: true,
          secure: false,
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
      'import.meta.env.API_BASE_URL': JSON.stringify(process.env.API_BASE_URL || '')
    },
  };
});

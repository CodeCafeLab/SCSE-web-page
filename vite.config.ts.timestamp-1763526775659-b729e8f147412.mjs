// vite.config.ts
import { defineConfig } from "file:///C:/Users/Antima%20P/OneDrive/Desktop/SCSE%20web%20page/suncity-enroll-flow/node_modules/vite/dist/node/index.js";
import react from "file:///C:/Users/Antima%20P/OneDrive/Desktop/SCSE%20web%20page/suncity-enroll-flow/node_modules/@vitejs/plugin-react-swc/index.js";
import { imagetools } from "file:///C:/Users/Antima%20P/OneDrive/Desktop/SCSE%20web%20page/suncity-enroll-flow/node_modules/vite-imagetools/dist/index.js";
import path from "path";
var __vite_injected_original_dirname = "C:\\Users\\Antima P\\OneDrive\\Desktop\\SCSE web page\\suncity-enroll-flow";
var vite_config_default = defineConfig(({ mode }) => {
  const plugins = [react(), imagetools()];
  const isProduction = process.env.NODE_ENV === "production";
  return {
    base: isProduction ? "/suncity/" : "/",
    build: {
      outDir: "dist",
      assetsDir: "assets",
      emptyOutDir: true,
      rollupOptions: {
        output: {
          assetFileNames: "assets/[name]-[hash][extname]",
          chunkFileNames: "assets/[name]-[hash].js",
          entryFileNames: "assets/[name]-[hash].js"
        }
      }
    },
    server: {
      host: "::",
      port: 8080,
      proxy: {
        // Proxy API requests to the backend server in development
        "/api": {
          target: "http://localhost:5002",
          changeOrigin: true,
          secure: false,
          rewrite: (path2) => path2.replace(/^\/api/, ""),
          // Remove /api prefix when proxying
          ws: true
        }
      }
    },
    plugins,
    resolve: {
      alias: {
        "@": path.resolve(__vite_injected_original_dirname, "./src")
      }
    },
    // Add environment variables
    define: {
      "import.meta.env.API_BASE_URL": isProduction ? JSON.stringify("https://dos.suncitysolar.in/api") : JSON.stringify("/api")
      // Use proxy in development
    }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxBbnRpbWEgUFxcXFxPbmVEcml2ZVxcXFxEZXNrdG9wXFxcXFNDU0Ugd2ViIHBhZ2VcXFxcc3VuY2l0eS1lbnJvbGwtZmxvd1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcQW50aW1hIFBcXFxcT25lRHJpdmVcXFxcRGVza3RvcFxcXFxTQ1NFIHdlYiBwYWdlXFxcXHN1bmNpdHktZW5yb2xsLWZsb3dcXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzL0FudGltYSUyMFAvT25lRHJpdmUvRGVza3RvcC9TQ1NFJTIwd2ViJTIwcGFnZS9zdW5jaXR5LWVucm9sbC1mbG93L3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcclxuaW1wb3J0IHJlYWN0IGZyb20gXCJAdml0ZWpzL3BsdWdpbi1yZWFjdC1zd2NcIjtcclxuaW1wb3J0IHsgaW1hZ2V0b29scyB9IGZyb20gXCJ2aXRlLWltYWdldG9vbHNcIjtcclxuaW1wb3J0IHBhdGggZnJvbSBcInBhdGhcIjtcclxuXHJcbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZygoeyBtb2RlIH0pID0+IHtcclxuICBjb25zdCBwbHVnaW5zID0gW3JlYWN0KCksIGltYWdldG9vbHMoKV07XHJcbiAgXHJcbiAgLy8gbG92YWJsZS10YWdnZXIgaXMgRVNNLW9ubHkgYW5kIGNhdXNlcyBidWlsZCBpc3N1ZXNcclxuICAvLyBJdCdzIG9ubHkgZm9yIGRldmVsb3BtZW50IHRvb2xpbmcsIHNvIHNraXAgaXQgaW4gcHJvZHVjdGlvbiBidWlsZHNcclxuICAvLyBGb3IgZGV2ZWxvcG1lbnQsIHlvdSBjYW4gbWFudWFsbHkgYWRkIGl0IGlmIG5lZWRlZFxyXG5cclxuICBjb25zdCBpc1Byb2R1Y3Rpb24gPSBwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gJ3Byb2R1Y3Rpb24nO1xyXG4gIFxyXG4gIHJldHVybiB7XHJcbiAgICBiYXNlOiBpc1Byb2R1Y3Rpb24gPyAnL3N1bmNpdHkvJyA6ICcvJyxcclxuICAgIGJ1aWxkOiB7XHJcbiAgICAgIG91dERpcjogJ2Rpc3QnLFxyXG4gICAgICBhc3NldHNEaXI6ICdhc3NldHMnLFxyXG4gICAgICBlbXB0eU91dERpcjogdHJ1ZSxcclxuICAgICAgcm9sbHVwT3B0aW9uczoge1xyXG4gICAgICAgIG91dHB1dDoge1xyXG4gICAgICAgICAgYXNzZXRGaWxlTmFtZXM6ICdhc3NldHMvW25hbWVdLVtoYXNoXVtleHRuYW1lXScsXHJcbiAgICAgICAgICBjaHVua0ZpbGVOYW1lczogJ2Fzc2V0cy9bbmFtZV0tW2hhc2hdLmpzJyxcclxuICAgICAgICAgIGVudHJ5RmlsZU5hbWVzOiAnYXNzZXRzL1tuYW1lXS1baGFzaF0uanMnLFxyXG4gICAgICAgIH0sXHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAgc2VydmVyOiB7XHJcbiAgICAgIGhvc3Q6IFwiOjpcIixcclxuICAgICAgcG9ydDogODA4MCxcclxuICAgICAgcHJveHk6IHtcclxuICAgICAgICAvLyBQcm94eSBBUEkgcmVxdWVzdHMgdG8gdGhlIGJhY2tlbmQgc2VydmVyIGluIGRldmVsb3BtZW50XHJcbiAgICAgICAgJy9hcGknOiB7XHJcbiAgICAgICAgICB0YXJnZXQ6ICdodHRwOi8vbG9jYWxob3N0OjUwMDAnLFxyXG4gICAgICAgICAgY2hhbmdlT3JpZ2luOiB0cnVlLFxyXG4gICAgICAgICAgc2VjdXJlOiBmYWxzZSxcclxuICAgICAgICAgIHJld3JpdGU6IChwYXRoKSA9PiBwYXRoLnJlcGxhY2UoL15cXC9hcGkvLCAnJyksIC8vIFJlbW92ZSAvYXBpIHByZWZpeCB3aGVuIHByb3h5aW5nXHJcbiAgICAgICAgICB3czogdHJ1ZSxcclxuICAgICAgICB9LFxyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICAgIHBsdWdpbnMsXHJcbiAgICByZXNvbHZlOiB7XHJcbiAgICAgIGFsaWFzOiB7XHJcbiAgICAgICAgXCJAXCI6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsIFwiLi9zcmNcIiksXHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAgLy8gQWRkIGVudmlyb25tZW50IHZhcmlhYmxlc1xyXG4gICAgZGVmaW5lOiB7XHJcbiAgICAgICdpbXBvcnQubWV0YS5lbnYuQVBJX0JBU0VfVVJMJzogaXNQcm9kdWN0aW9uIFxyXG4gICAgICAgID8gSlNPTi5zdHJpbmdpZnkoJ2h0dHBzOi8vZG9zLnN1bmNpdHlzb2xhci5pbi9hcGknKSBcclxuICAgICAgICA6IEpTT04uc3RyaW5naWZ5KCcvYXBpJykgLy8gVXNlIHByb3h5IGluIGRldmVsb3BtZW50XHJcbiAgICB9LFxyXG4gIH07XHJcbn0pO1xyXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQWtaLFNBQVMsb0JBQW9CO0FBQy9hLE9BQU8sV0FBVztBQUNsQixTQUFTLGtCQUFrQjtBQUMzQixPQUFPLFVBQVU7QUFIakIsSUFBTSxtQ0FBbUM7QUFNekMsSUFBTyxzQkFBUSxhQUFhLENBQUMsRUFBRSxLQUFLLE1BQU07QUFDeEMsUUFBTSxVQUFVLENBQUMsTUFBTSxHQUFHLFdBQVcsQ0FBQztBQU10QyxRQUFNLGVBQWUsUUFBUSxJQUFJLGFBQWE7QUFFOUMsU0FBTztBQUFBLElBQ0wsTUFBTSxlQUFlLGNBQWM7QUFBQSxJQUNuQyxPQUFPO0FBQUEsTUFDTCxRQUFRO0FBQUEsTUFDUixXQUFXO0FBQUEsTUFDWCxhQUFhO0FBQUEsTUFDYixlQUFlO0FBQUEsUUFDYixRQUFRO0FBQUEsVUFDTixnQkFBZ0I7QUFBQSxVQUNoQixnQkFBZ0I7QUFBQSxVQUNoQixnQkFBZ0I7QUFBQSxRQUNsQjtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsSUFDQSxRQUFRO0FBQUEsTUFDTixNQUFNO0FBQUEsTUFDTixNQUFNO0FBQUEsTUFDTixPQUFPO0FBQUE7QUFBQSxRQUVMLFFBQVE7QUFBQSxVQUNOLFFBQVE7QUFBQSxVQUNSLGNBQWM7QUFBQSxVQUNkLFFBQVE7QUFBQSxVQUNSLFNBQVMsQ0FBQ0EsVUFBU0EsTUFBSyxRQUFRLFVBQVUsRUFBRTtBQUFBO0FBQUEsVUFDNUMsSUFBSTtBQUFBLFFBQ047QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLElBQ0E7QUFBQSxJQUNBLFNBQVM7QUFBQSxNQUNQLE9BQU87QUFBQSxRQUNMLEtBQUssS0FBSyxRQUFRLGtDQUFXLE9BQU87QUFBQSxNQUN0QztBQUFBLElBQ0Y7QUFBQTtBQUFBLElBRUEsUUFBUTtBQUFBLE1BQ04sZ0NBQWdDLGVBQzVCLEtBQUssVUFBVSxpQ0FBaUMsSUFDaEQsS0FBSyxVQUFVLE1BQU07QUFBQTtBQUFBLElBQzNCO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbInBhdGgiXQp9Cg==

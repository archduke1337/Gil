import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// Vercel Analytics and Speed Insights plugin
const vercelAnalytics = {
  name: 'vercel-analytics',
  transformIndexHtml: (html: string) => {
    return html.replace(
      '</head>',
      `
        <script>
          window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };
        </script>
        <script defer src="/_vercel/insights/script.js"></script>
        <script defer src="/_vercel/speed-insights/script.js"></script>
      </head>`
    );
  }
};

export default defineConfig({
  plugins: [
    react(),
    vercelAnalytics,
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
  },
  root: "client",
  build: {
    outDir: "../dist/client",
    emptyOutDir: true,
    sourcemap: true,
    chunkSizeWarningLimit: 2000, // Size in kB (2MB)
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        }
      }
    }
  },
  server: {
    headers: {
      'Cache-Control': 'public, max-age=31536000',
    },
  },
  define: {
    'process.env.VERCEL': JSON.stringify(process.env.VERCEL),
    'process.env.VERCEL_ENV': JSON.stringify(process.env.VERCEL_ENV),
  },
  // Vercel-specific optimizations
  base: process.env.VERCEL ? '/' : '/',
});

import path from "path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],

  build: {
    outDir: "dist",
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo && assetInfo.name) {
            let extType = assetInfo.name.split(".")[0];
            if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
              extType = "img";
            }
            return `assets/${extType}/[name]-[hash][extname]`;
          }
          return "";
        },

        chunkFileNames: "assets/js/[name]-[hash].js",

        entryFileNames: "assets/js/[name]-[hash].js",

        manualChunks(id) {
          if (id.includes("node_modules")) {
            return id
              .toString()
              .split("node_modules/")[1]
              .split("/")[0]
              .toString();
          }
        },
      },
    },
  },



  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});

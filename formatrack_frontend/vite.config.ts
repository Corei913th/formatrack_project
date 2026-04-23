import path from "path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react-swc";
import { defineConfig, loadEnv } from "vite";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  console.log("--- BROWSER BUILD ENV CHECK ---");
  console.log("VITE_API_BASE_URL:", env.VITE_API_BASE_URL || "NOT FOUND");
  console.log("-------------------------------");

  return {
    define: {
      "import.meta.env.VITE_API_BASE_URL": JSON.stringify(env.VITE_API_BASE_URL),
    },
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
              const name = id.toString().split("node_modules/")[1].split("/")[0].toString();
              // Supprimer le préfixe .pnpm et les caractères spéciaux qui pourraient bloquer Apache
              return name.replace(/^\./, "").replace(/@/g, "");
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
  };
});

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { fileURLToPath, URL } from "url";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  build: {
    rollupOptions: {
      external: [
        "images/Volume.svg",
        "images/Esc.svg",
        "images/Back.svg",
        "images/coins/Iconx2.svg",
        "images/CoinAmount.svg",
      ],
    },
  },
});

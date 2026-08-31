import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { viteStaticCopy } from "vite-plugin-static-copy";

export default defineConfig({
  base: "./",
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        { src: "css", dest: "." },
        { src: "js", dest: "." },
        { src: "characters", dest: "." },
        { src: "ficha.pdf", dest: "." },
      ],
    }),
  ],
  server: {
    host: "127.0.0.1",
    port: 5173,
    watch: {
      // Perfis locais de browser/CDP podem manter Cookies/lockfiles abertos.
      // Eles não são código-fonte e nunca devem reiniciar ou derrubar o Vite.
      ignored: ["**/scratch/**", "**/cdp-profile/**"],
    },
    proxy: {
      "/api": "http://127.0.0.1:8080",
    },
  },
  test: {
    environment: "jsdom",
    setupFiles: "./src/test/setup.ts",
    exclude: ["**/node_modules/**", "**/dist/**", "**/scratch/**"],
  },
});

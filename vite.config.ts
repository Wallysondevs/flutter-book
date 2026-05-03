import { defineConfig } from "vite";
  import react from "@vitejs/plugin-react";
  import tailwindcss from "@tailwindcss/vite";
  import path from "path";

  // GitHub Pages deploy: https://wallysondevs.github.io/flutter-book/
  // Override with VITE_BASE=/ for local builds
  const base = process.env.VITE_BASE ?? "/flutter-book/";

  export default defineConfig({
    base,
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
    build: {
      outDir: "dist",
      emptyOutDir: true,
    },
    server: {
      port: 5173,
      host: "0.0.0.0",
    },
  });
  
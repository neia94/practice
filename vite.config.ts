import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/practice/", // GitHub Pages 저장소 이름
  build: {
    outDir: "docs", // GitHub Pages /docs 폴더로 빌드
    emptyOutDir: true,
  },
});

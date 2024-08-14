import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import { createHtmlPlugin } from "vite-plugin-html"

export default defineConfig({
  root: "src",
  plugins: [react()],
  build: {
    rollupOptions: {
      input: "./src/index.html",
      output: {
        dir: "dist/",
      },
    },
  },
})

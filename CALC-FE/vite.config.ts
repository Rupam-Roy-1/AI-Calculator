import path from "path"               // Importing the 'path' module to resolve file paths
import react from "@vitejs/plugin-react" // React plugin for Vite
import eslint from 'vite-plugin-eslint'; // ESLint plugin for Vite
import { defineConfig } from "vite"     // defineConfig function from Vite for better typing support

export default defineConfig({
  plugins: [react(), eslint()], // Array of plugins used by Vite, including React and ESLint
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // Setting up an alias '@' to point to the './src' folder
    },
  },
})

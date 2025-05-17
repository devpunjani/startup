import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  root: "frontend",  // Ensure Vite looks inside "frontend"
  plugins: [react()],
});

import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import commonjs from "vite-plugin-commonjs";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths(), commonjs()],
  server: {
    port: 3000,
  },
});

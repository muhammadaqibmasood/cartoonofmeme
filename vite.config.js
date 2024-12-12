import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { nodePolyfills } from "vite-plugin-node-polyfills";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // nodePolyfills({
    //   include: ["path", "stream", "util"],
    //   exclude: ["http"],
    //   globals: {
    //     Buffer: true,
    //     global: true,
    //     process: true,
    //     crypto: true,
    //   },
    //   overrides: {
    //     fs: "memfs",
    //   },
    //   protocolImports: true,
    // }),
    nodePolyfills(),
  ],
});

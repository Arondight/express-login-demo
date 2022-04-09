import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
const config = defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd());

  switch (command) {
    case "build":
      return {
        base: env.VITE_PUBLIC_PATH || "/dist",
        plugins: [vue()],
      };
    default:
      return {
        plugins: [vue()],
      };
  }
});

export default config;

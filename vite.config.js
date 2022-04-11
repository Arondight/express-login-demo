import vue from "@vitejs/plugin-vue";
import path from "path";
import { defineConfig, loadEnv } from "vite";
import AutoImport from "unplugin-auto-import/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import Components from "unplugin-vue-components/vite";
import { config as _config } from "#@src/lib";

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, _config.dir.root);
  const root = path.resolve(_config.dir.root, "src", "web");
  const dir = {
    components: path.resolve(root, "components"),
    root,
    views: path.resolve(root, "views"),
  };
  const base = { production: env.VITE_PUBLIC_PATH || "/" };
  const plugins = [
    AutoImport({ resolvers: [ElementPlusResolver()] }),
    Components({ resolvers: [ElementPlusResolver()] }),
    vue(),
  ];
  const resolve = {
    alias: {
      "@_": dir.root,
      "@components": dir.components,
      "@views": dir.views,
    },
  };
  const server = { host: true, port: 8000 };
  const config = { base: base[mode], plugins, resolve };

  if ("serve" === command) {
    config.server = server;
  }

  return config;
});

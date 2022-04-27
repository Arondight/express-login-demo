import vue from "@vitejs/plugin-vue";
import path from "path";
import { defineConfig, loadEnv } from "vite";
import AutoImport from "unplugin-auto-import/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import Components from "unplugin-vue-components/vite";
import { config as _config } from "#@src/lib";

// https://vitejs.dev/config/
function getConfig({ command, mode }) {
  const env = loadEnv(mode, _config.dir.root);
  const root = path.resolve(_config.dir.root, "src", "web");
  const dir = {
    components: path.resolve(root, "components"),
    css: path.resolve(root, "css"),
    root,
    router: path.resolve(root, "router"),
    views: path.resolve(root, "views"),
  };
  const base = env.VITE_PUBLIC_PATH || "/";
  const build = { target: "es6" };
  const plugins = [
    AutoImport({ resolvers: [ElementPlusResolver()] }),
    Components({ resolvers: [ElementPlusResolver()] }),
    vue(),
  ];
  const resolve = {
    alias: {
      "@_": dir.root,
      "@components": dir.components,
      "@css": dir.css,
      "@router": dir.router,
      "@views": dir.views,
    },
  };
  const server = { host: true, port: 8000 };
  const config = { base, build, plugins, resolve };

  if ("serve" === command) {
    config.server = server;
  }

  return config;
}

export default defineConfig(getConfig);

// popup 模块的 vite 配置
import { defineConfig, mergeConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import baseConfig from "./vite.base.config";
import { BUILD_OUTDIR } from "./globalConfig";

export default mergeConfig(
  defineConfig({
    build: {
      // 输出目录
      outDir: BUILD_OUTDIR,
    },
    server: {
      port: 3000,
      // 自动打开浏览器运行以下页面
      open: "/",
      // 设置反向代理
      proxy: {
        // 如果请求URL中含有"/api", 反向代理到http://localhost
        "/api": {
          target: "http://localhost/",
          changeOrigin: true,
        },
      },
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
    plugins: [react()],
  }),
  baseConfig
);

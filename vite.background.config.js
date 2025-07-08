// background 模块的 vite 配置
import { defineConfig, mergeConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import baseConfig from "./vite.base.config";
import { BUILD_BACKGROUND_OUTDIR } from "./globalConfig";

export default mergeConfig(
  defineConfig({
    build: {
      // 输出目录
      outDir: BUILD_BACKGROUND_OUTDIR,
      lib: {
        entry: [path.resolve(__dirname, "src/background/index.jsx")],
        // background script不支持ES6，不用使用 es 模式, 改为cjs模式
        formats: ["cjs"],
        // 设置生成文件的文件名
        fileName: () => {
          // 将文件后缀名强制定为js，否则会生成cjs的后缀名
          return "background.js";
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

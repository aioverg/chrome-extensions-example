// content 模块的 vite 配置
import { defineConfig, mergeConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import baseConfig from "./vite.base.config";
import { BUILD_CONTENT_OUTDIR } from "./globalConfig";

export default mergeConfig(
  defineConfig({
    build: {
      // 输出目录
      outDir: BUILD_CONTENT_OUTDIR,
      lib: {
        entry: [path.resolve(__dirname, "src/content/index.jsx")],
        // content script不支持ES6，不用使用 es 模式, 改为cjs模式
        formats: ["cjs"],
        // 设置生成文件的文件名
        fileName: () => {
          // 将文件后缀名强制定为js，否则会生成cjs的后缀名
          return "content.js";
        },
      },
      rollupOptions: {
        output: {
          assetFileNames: (assetInfo) => {
            // 附属文件命名，content script会生成配套的css
            return "content.css";
          },
        },
      },
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
    // 解决 react 代码中包含 process.env.NODE_ENV 导致无法使用的问题
    define: {
      "process.env.NODE_ENV": null,
    },
    plugins: [react()],
  }),
  baseConfig
);

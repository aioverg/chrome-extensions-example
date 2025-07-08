基于 vite + antd 的 chrome 插件脚手架。

实现了以下功能：

1. popup、content、background 目录独立。
2. 根据 Chrome Extension 要求配置 Vite 打包。
3. 实现 content 与 background 的通信

## 安装项目

```
npm install
```
## 开发环境

```
npm run dev
```

## 插件打包

```
npm run build
```

注意：执行build前一定检查 `src/main.jsx` 代码中，注释掉 `import '@/content'`。这段代码是用来在开发环境调试 content 的，不然 content 会被集成到 popup 页面中。
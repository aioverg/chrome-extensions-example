import React from "react";
import ReactDOM from "react-dom/client";
import { ConfigProvider } from "antd";

// 引入 Ant Design 中文语言包
import zhCN from "antd/locale/zh_CN";

// 全局样式
import "@/common/styles/index.scss";

import Popup from "@/popup";

// 在popup页面调试content, 仅用于开发环境, build前一定要注释掉
// import '@/content'

ReactDOM.createRoot(document.getElementById("root")).render(
  <ConfigProvider locale={zhCN}>
    <Popup />
  </ConfigProvider>
);

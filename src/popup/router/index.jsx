import { createHashRouter, Navigate } from "react-router-dom";
import Login from "@/popup/pages/Login";
import Home from "@/popup/pages/Home";
import User from "@/popup/pages/User";
import Setting from "@/popup/pages/Setting";

// 全局路由
export const globalRouters = createHashRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <Home />,
    children: [
      {
        path: "/user",
        element: <User />,
      },
      {
        path: "/setting",
        element: <Setting />,
      },
      {
        // 没有"#路由"，跳转Home页面
        path: "/",
        element: <Navigate to="/user" />,
      },
      {
        // 未匹配，跳转Login页面
        path: "*",
        element: <Navigate to="/user" />,
      },
    ],
  },
]);

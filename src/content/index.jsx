import ReactDOM from "react-dom/client";
import Home from "@/content/Home";

// 创建挂载 conent 的元素
const app = document.createElement("div");
app.id = "content-root";
document.body.appendChild(app);
const crxContent = ReactDOM.createRoot(
  document.getElementById("content-root")
);
crxContent.render(<Home />);

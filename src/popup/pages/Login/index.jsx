import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Input } from "antd";
import { API } from "@/api";
import imgLogo from "/public/images/128.png";
import "./index.scss";

const Component = () => {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    account: "",
    password: "",
  });

  // 登录
  const onLogin = () => {
    navigate("/user");
    API.login({
      data: {
        account,
        password,
      },
    })
      .then((res) => {
        console.log("登录成功", res);
      })
      .catch((res) => {
        console.log("登录失败", res);
      });
  };
  return (
    <div className="p-login">
      <img src={imgLogo} alt="" className="p-login-logo" />
      <div className="p-login-chunk">
        <Input
          placeholder="账号"
          value={form.account}
          onChange={(e) => setForm({ ...form, account: e.target.value })}
        />
      </div>
      <div className="p-login-chunk">
        <Input.Password
          placeholder="密码"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
      </div>
      <div className="p-login-chunk">
        <Button type="primary" block={true} onClick={onLogin}>
          登录
        </Button>
      </div>
    </div>
  );
};

Component.displayName = "Login";
export default Component;

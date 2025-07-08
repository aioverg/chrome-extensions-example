import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { Button, Tabs } from "antd";
import "./index.scss";

function Entry() {
  const location = useLocation();
  const navigate = useNavigate();

  const onTabChange = (key) => {
    navigate(key);
  };

  const logout = () => {
    navigate("/login");
  };

  return (
    <div className="p-home">
      <div>
        <Tabs
          activeKey={location.pathname}
          items={[
            {
              key: "/user",
              label: "Home",
            },
            {
              key: "/setting",
              label: "Setting",
            },
          ]}
          onChange={onTabChange}
          centered
        />
        <Button className="btn-exit" type="primary" onClick={logout}>
          退出
        </Button>
      </div>

      <div className="p-home-container">
        <Outlet />
      </div>
    </div>
  );
}

export default Entry;

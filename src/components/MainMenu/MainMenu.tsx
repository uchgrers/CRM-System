import React from "react";
import { Menu } from "antd";
import { useNavigate } from "react-router-dom";
import { ProfileFilled, UnorderedListOutlined } from "@ant-design/icons";

const MainManu = () => {
  const navigationItems = [
    { label: "Profile", key: "/user/profile", icon: <ProfileFilled /> },
    {
      label: "Todos List",
      key: "/todos",
      icon: <UnorderedListOutlined />,
    },
  ];
  const navigate = useNavigate();
  return (
    <Menu
      defaultSelectedKeys={["/todos"]}
      style={{ height: "100%", backgroundColor: "var(--color-bg-primary)" }}
      onClick={({ key }) => navigate(key)}
      items={navigationItems}
    />
  );
};

export default MainManu;

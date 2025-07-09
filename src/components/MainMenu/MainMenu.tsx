import React from "react";
import { Button, Menu } from "antd";
import { useNavigate } from "react-router-dom";
import { ProfileFilled, UnorderedListOutlined } from "@ant-design/icons";
import { useAppDispatch } from "../../hooks";
import { logoutThunk, resetTokens } from "../../state_manager/authSlice";

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
  const dispatch = useAppDispatch();

  const logoutUser = async () => {
    try {
      await dispatch(logoutThunk());
    } catch (error) {
      throw error;
    } finally {
      dispatch(resetTokens(""));
      navigate("/");
    }
  };

  return (
    <>
      <Menu
        defaultSelectedKeys={["/todos"]}
        style={{
          height: "100%",
          backgroundColor: "var(--color-bg-primary)",
          position: "relative",
        }}
        onClick={({ key }) => navigate(key)}
        items={navigationItems}
      />
      <Button
        onClick={logoutUser}
        style={{
          position: "absolute",
          top: "92vh",
          transform: "translate(-50%,-50%)",
          color: "var(--color-danger)",
        }}
      >
        Logout
      </Button>
    </>
  );
};

export default MainManu;

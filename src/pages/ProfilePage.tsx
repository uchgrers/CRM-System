import { Layout } from "antd";
import Sider from "antd/es/layout/Sider";
import MainManu from "../components/MainMenu/MainMenu";
import { useEffect } from "react";
import { getProfile } from "../api/profileApi";

const ProfilePage = () => {
  useEffect(() => {
    getProfile();
  }, []);

  return (
    <Layout>
      <Sider
        style={{
          color: "var(--color-bg-secondary)",
          backgroundColor: "var(--color-button-primary)",
        }}
      >
        <MainManu />
      </Sider>
      <Layout style={{ minHeight: "100vh" }}>
        <div>Hello</div>
        <div>Hello</div>
        <div>Hello</div>
      </Layout>
    </Layout>
  );
};

export default ProfilePage;

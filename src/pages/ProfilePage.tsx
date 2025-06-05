import { Layout } from "antd";
import Sider from "antd/es/layout/Sider";
import MainManu from "../components/MainMenu/MainMenu";

const ProfilePage = () => {
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
      <Layout style={{minHeight: '100vh'}}>
        <div>Hello</div>
      </Layout>
    </Layout>
  );
};

export default ProfilePage;

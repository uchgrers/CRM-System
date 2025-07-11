import { Layout } from "antd";
import Sider from "antd/es/layout/Sider";
import MainManu from "../components/MainMenu/MainMenu";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { getProfileThunk } from "../state_manager/profileSlice";

const ProfilePage = () => {
  const dispatch = useAppDispatch();
  const username = useAppSelector((state) => state.profile.username);
  const email = useAppSelector((state) => state.profile.email);
  const phoneNumber = useAppSelector((state) => state.profile.phoneNumber);

  useEffect(() => {
    dispatch(getProfileThunk());
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
        <div>Username: {username}</div>
        <div>Email: {email}</div>
        <div>Phone number: {phoneNumber || '-'}</div>
      </Layout>
    </Layout>
  );
};

export default ProfilePage;

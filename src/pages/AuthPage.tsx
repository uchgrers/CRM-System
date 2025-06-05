import React from "react";
import logo from "./../icons/logo.svg";
import cross from "./../icons/cross.svg";
import { Typography, Image, Button, Flex } from "antd";
import AuthForm from "../components/AuthForm/AuthForm";
import { Link, useNavigate } from "react-router-dom";

const AuthPage = () => {
  const { Title } = Typography;
  return (
    <Flex
      style={{
        backgroundColor: "var(--color-bg-secondary)",
        minHeight: "100vh",
        padding: "4px",
      }}
    >
      <Image
        src={logo}
        alt="Auth page image"
        preview={false}
        width={"53%"}
        style={{
          borderTopLeftRadius: "10px",
          borderBottomLeftRadius: "10px",
        }}
      />
      <Flex
        style={{
          width: "47%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Flex style={{ width: "420px" }}>
          <Image
            src={cross}
            alt="Cross logo"
            preview={false}
            style={{ marginTop: "10px", width: "72px" }}
          />
        </Flex>
        <Flex
          vertical
          style={{ width: "392px", padding: 0, marginTop: "20px" }}
        >
          <Title
            level={1}
            style={{
              margin: "0",
              padding: 0,
              color: "var(--color-auth-primary)",
            }}
          >
            Login to your Account
          </Title>
          <Typography
            style={{
              textAlign: "left",
              paddingInline: "6px",
              color: "var(--color-auth-primary)",
            }}
          >
            See what is going on with your business
          </Typography>
        </Flex>
        <AuthForm />

        <Typography style={{ color: "var(--color-auth-primary)" }}>
          Not Registered Yet?{" "}
          <Link to={'/register'} style={{color: "var(--color-auth-secondary)"}}>Create an account</Link>
        </Typography>
      </Flex>
    </Flex>
  );
};

export default AuthPage;

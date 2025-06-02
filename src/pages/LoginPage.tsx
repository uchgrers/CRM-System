import React from "react";
import logo from "./../constants/illustration.png";
import { Button, Checkbox, Flex, Input } from "antd";
import Form from "antd/es/form";
import { Typography } from "antd";
import cross from "./../constants/cross.png";

const LoginPage = () => {
  const { Title } = Typography;
  return (
    <Flex
      style={{
        backgroundColor: "var(--color-bg-secondary)",
        height: "100%",
        padding: "8px",
      }}
    >
      <img
        src={logo}
        alt="Auth page image"
        width={"52%"}
        style={{
          borderTopLeftRadius: "10px",
          borderBottomLeftRadius: "10px",
        }}
      />
      <Flex
        style={{
          width: "50%",
          display: "flex",
          flexDirection: "column",
          // justifyContent: "center",
          alignItems: "center",
          // border: 'green solid'
        }}
      >
        <div style={{ width: "60%", display: "flex" }}>
          <img
            src={cross}
            alt="Cross logo"
            style={{ marginTop: "40px", width: "72px" }}
          />
        </div>
        <Title level={2} style={{ margin: "10px", width: "90%" }}>
          Login to your Account
        </Title>
        <Typography
          style={{
            width: "90%",
            textAlign: "left",
            marginBottom: "10px",
            paddingInline: "4px",
          }}
        >
          See what is going on with your business
        </Typography>
        <Form
          layout="vertical"
          style={{
            width: "60%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            marginTop: "10px",
            rowGap: "20px",
          }}
        >
          <Form.Item label="Email" style={{ width: "100%" }}>
            <Input placeholder="mail@abc.com" />
          </Form.Item>
          <Form.Item label="Password" style={{ width: "100%" }}>
            <Input placeholder="********" type="password" />
          </Form.Item>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Checkbox>Remember me</Checkbox>
            <Typography>
              <a href="">Forgot Password?</a>
            </Typography>
          </div>
          <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
            Login
          </Button>
        </Form>
        <Typography>
          Not Registered Yet? <a href="">Create an account</a>
        </Typography>
      </Flex>
    </Flex>
  );
};

export default LoginPage;

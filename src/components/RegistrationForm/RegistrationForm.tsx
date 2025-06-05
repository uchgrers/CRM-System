import React from "react";
import { Button, Input } from "antd";
import Form from "antd/es/form";

const RegistrationForm = () => {
  return (
    <Form
      layout="vertical"
      style={{
        width: "420px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Form.Item label="Username" style={{ width: "100%", margin: "0" }}>
        <Input placeholder="mail@abc.com" />
      </Form.Item>
      <Form.Item label="Password" style={{ width: "100%", margin: "0" }}>
        <Input type="password" placeholder="********" />
      </Form.Item>
      <Form.Item
        label="Confirm password"
        style={{ width: "100%", margin: "0" }}
      >
        <Input type="password" placeholder="********" />
      </Form.Item>
      <Form.Item label="Email" style={{ width: "100%", margin: "0" }}>
        <Input type="email" placeholder="mail@abc.com" />
      </Form.Item>
      <Form.Item label="Phone number" style={{ width: "100%", margin: "0" }}>
        <Input type="tel" placeholder="+7" />
      </Form.Item>
      <Button
        type="primary"
        htmlType="submit"
        style={{
          marginTop: "40px",
          width: "100%",
          height: "50px",
          backgroundColor: "var(--color-auth-secondary)",
        }}
      >
        Register
      </Button>
    </Form>
  );
};

export default RegistrationForm;

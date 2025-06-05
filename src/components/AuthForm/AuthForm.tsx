import { Button, Checkbox, Input, Typography } from "antd";
import Form from "antd/es/form";

const AuthForm = () => {
  return (
    <Form
      layout="vertical"
      style={{
        width: "420px",
        height: "376px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Form.Item label="Email" style={{ width: "100%", margin: "0" }}>
        <Input
          placeholder="mail@abc.com"
          style={{ color: "var(--color-auth-primary)" }}
        />
      </Form.Item>
      <Form.Item label="Password" style={{ width: "100%", margin: "0" }}>
        <Input
          placeholder="********"
          type="password"
          style={{ color: "var(--color-auth-primary)" }}
        />
      </Form.Item>
      <Form.Item
        style={{
          width: "100%",
          columnCount: "2",
          columnGap: "175px",
          padding: "0",
        }}
      >
        <Checkbox style={{ color: "var(--color-auth-primary)" }}>
          Remember me
        </Checkbox>
        <Typography>
          <a style={{ color: "var(--color-auth-secondary)" }} href="">
            Forgot Password?
          </a>
        </Typography>
      </Form.Item>
      <Button
        type="primary"
        htmlType="submit"
        style={{
          width: "100%",
          height: "50px",
          backgroundColor: "var(--color-auth-secondary)",
        }}
      >
        Login
      </Button>
    </Form>
  );
};

export default AuthForm;

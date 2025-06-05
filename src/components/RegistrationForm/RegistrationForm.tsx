import React from "react";
import { Button, Input } from "antd";
import Form from "antd/es/form";
import { AuthFieldsLength, ErrorMessageType } from "../../constants/auth";
import s from "./RegistrationForm.module.scss";

const RegistrationForm = () => {
  const [form] = Form.useForm();
  return (
    <Form
      className={s.form}
      form={form}
      layout="vertical"
      style={{
        width: "420px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        rowGap: 0,
      }}
    >
      <Form.Item
        label="Username"
        name="username"
        style={{ width: "100%", margin: "0" }}
        rules={[
          { required: true, message: ErrorMessageType.UserNameIsTooShort },
          {
            min: AuthFieldsLength.UserNameMin,
            message: ErrorMessageType.UserNameIsTooShort,
          },
          { max: AuthFieldsLength.Max, message: ErrorMessageType.TooLong },
        ]}
      >
        <Input placeholder="mail@abc.com" size="small" />
      </Form.Item>
      <Form.Item
        label="Login"
        name="login"
        style={{ width: "100%", margin: "0" }}
        rules={[
          { required: true, message: ErrorMessageType.LoginIsTooShort },
          {
            min: AuthFieldsLength.LoginMin,
            message: ErrorMessageType.LoginIsTooShort,
          },
          { max: AuthFieldsLength.Max, message: ErrorMessageType.TooLong },
        ]}
      >
        <Input placeholder="Login" />
      </Form.Item>
      <Form.Item
        label="Password"
        name="password"
        style={{ width: "100%", margin: "0" }}
        rules={[
          { required: true, message: ErrorMessageType.PasswordIsTooShort },
          {
            min: AuthFieldsLength.PasswordMin,
            message: ErrorMessageType.PasswordIsTooShort,
          },
          { max: AuthFieldsLength.Max, message: ErrorMessageType.TooLong },
        ]}
      >
        <Input type="password" placeholder="********" />
      </Form.Item>
      <Form.Item
        label="Confirm password"
        name="confirmPassword"
        style={{ width: "100%", margin: "0" }}
        dependencies={["password"]}
        rules={[
          { required: true, message: ErrorMessageType.PasswordsDontMatch },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(ErrorMessageType.PasswordsDontMatch);
            },
          }),
        ]}
      >
        <Input type="password" placeholder="********" />
      </Form.Item>
      <Form.Item
        label="Email"
        name="email"
        style={{ width: "100%", margin: "0" }}
        rules={[
          {
            required: true,
            message: ErrorMessageType.EmailIsNotValid,
            type: "email",
          },
        ]}
      >
        <Input type="email" placeholder="mail@abc.com" />
      </Form.Item>
      <Form.Item
        label="Phone number"
        name="phoneNumber"
        style={{ width: "100%", margin: "0" }}
        rules={[
          {
            pattern: /^\+?[1-9][0-9]{7,14}$/,
            message: ErrorMessageType.PhoneNumberIsNotValid,
          },
        ]}
      >
        <Input placeholder="+7" />
      </Form.Item>
      <Button
        type="primary"
        htmlType="submit"
        style={{
          marginTop: "30px",
          width: "100%",
          height: "30px",
          backgroundColor: "var(--color-auth-secondary)",
        }}
      >
        Register
      </Button>
    </Form>
  );
};

export default RegistrationForm;

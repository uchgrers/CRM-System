import { Button, Checkbox, Input, Typography } from "antd";
import Form from "antd/es/form";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { AuthData } from "../../types/types";
import { setErrorMessage, signinThunk } from "../../state_manager/authSlice";
import { useNavigate } from "react-router-dom";
import { AuthFieldsLength, ErrorMessageType } from "../../constants/auth";

const AuthForm = () => {
  const dispatch = useAppDispatch();
  const authUser = async (authData: AuthData) => {
    try {
      await dispatch(signinThunk(authData));
    } catch (error) {
      throw error;
    }
  };

  const signinError = useAppSelector((state) => state.auth.error);
  const handleFormFieldsChange = () => {
    dispatch(setErrorMessage(''))
  }

  return (
    <Form
      onFinish={authUser}
      onChange={handleFormFieldsChange}
      layout="vertical"
      style={{
        width: "420px",
        height: "376px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <p style={{ color: "var(--color-danger)" }}>{signinError}</p>
      <Form.Item
        label="Login"
        style={{ width: "100%", margin: "0" }}
        name="login"
        rules={[
          { required: true, message: ErrorMessageType.LoginIsTooShort },
          {
            min: AuthFieldsLength.LoginMin,
            message: ErrorMessageType.LoginIsTooShort,
          },
          { max: AuthFieldsLength.Max, message: ErrorMessageType.TooLong },
        ]}
      >
        <Input
          placeholder="Login"
          style={{ color: "var(--color-auth-primary)" }}
        />
      </Form.Item>
      <Form.Item
        label="Password"
        style={{ width: "100%", margin: "0" }}
        name="password"
        rules={[
          { required: true, message: ErrorMessageType.PasswordIsTooShort },
          {
            min: AuthFieldsLength.PasswordMin,
            message: ErrorMessageType.PasswordIsTooShort,
          },
          { max: AuthFieldsLength.Max, message: ErrorMessageType.TooLong },
        ]}
      >
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

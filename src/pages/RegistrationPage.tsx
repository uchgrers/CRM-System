import { Typography, Image, Flex } from "antd";
import logo from "./../icons/logo.svg";
import RegistrationForm from "../components/RegistrationForm/RegistrationForm";
import { Link } from "react-router-dom";
import { useAppSelector } from "../hooks";

const RegisterPage = () => {
  const isUserCreated = useAppSelector((state) => state.auth.created);
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
          justifyContent: "space-around",
        }}
      >
        {isUserCreated ? (
          <Typography style={{ color: "var(--color-auth-primary)" }}>
            Success!{<br />}
            <Link to={"/auth"} style={{ color: "var(--color-auth-secondary)" }}>
              Login here
            </Link>
          </Typography>
        ) : (
          <>
            <RegistrationForm />
            <Typography style={{ color: "var(--color-auth-primary)" }}>
              Already have an account?{" "}
              <Link
                to={"/auth"}
                style={{ color: "var(--color-auth-secondary)" }}
              >
                Login here
              </Link>
            </Typography>
          </>
        )}
      </Flex>
    </Flex>
  );
};

export default RegisterPage;

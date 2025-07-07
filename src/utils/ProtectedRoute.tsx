import { Navigate } from "react-router-dom";
import { useAppSelector } from "../hooks";
import { ReactNode } from "react";

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const isAuth = useAppSelector((state) => state.auth.isAuth);
  const accessToken = useAppSelector((state) => state.auth.accessToken);

  if (!isAuth && !accessToken) {
    return <Navigate to={"/"} />;
  }

  return children;
};

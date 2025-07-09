import { Navigate } from "react-router-dom";
import { useAppSelector } from "../hooks";
import { ReactNode } from "react";

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const accessToken = useAppSelector((state) => state.auth.accessToken);

  if (!accessToken) {
    return <Navigate to={"/"} />;
  }

  return children;
};

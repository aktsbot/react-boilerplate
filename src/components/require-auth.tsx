// implements protected routes

import useAuthStore from "@/store/auth";
import { FC, ReactNode } from "react";
import { Navigate } from "react-router";

interface IRequireAuth {
  children?: ReactNode;
}

export const RequireAuth: FC<IRequireAuth> = ({ children }) => {
  const { isLoggedIn } = useAuthStore();

  return isLoggedIn ? children : <Navigate to="/login" replace />;
};

export default RequireAuth;

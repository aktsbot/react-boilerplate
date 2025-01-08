// implements protected routes
// from the excellent writeup at ui.dev
// https://ui.dev/react-router-protected-routes-authentication

import { FC, ReactNode } from "react";
import { Navigate, useLocation } from "react-router";

import useAuthStore from "@/store/auth";

interface IRequireAuth {
  children?: ReactNode;
}

export const RequireAuth: FC<IRequireAuth> = ({ children }) => {
  const { isLoggedIn } = useAuthStore();
  const location = useLocation();

  return isLoggedIn ? (
    children
  ) : (
    <Navigate to="/login" replace state={{ path: location.pathname }} />
  );
};

export default RequireAuth;

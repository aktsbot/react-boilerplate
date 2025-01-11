// building this as a page because we
// can force logout by visiting just a route
// instead of quirky workarounds

import { useEffect } from "react";
import { Navigate } from "react-router";

import useAuthStore from "@/store/auth";

export const LogoutPage = () => {
  const { isLoggedIn, clearSession } = useAuthStore();

  useEffect(() => {
    // TODO: do api call to clear token
    clearSession();
  }, []);

  return isLoggedIn ? <></> : <Navigate to="/" />;
};

export default LogoutPage;

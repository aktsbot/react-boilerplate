import { useEffect } from "react";

import useAuthStore from "@/store/auth";
import { api_userinfo } from "@/api/auth";
import { logger } from "@/utils";

export const AppInit = () => {
  const { accessToken, user, isLoggedIn, setTokensAndLogin, setUser } =
    useAuthStore();

  // on first load, get access token from browser
  useEffect(() => {
    const storageAccessToken = localStorage.getItem("access_token") || "";

    // if no access token found, dont do anything
    if (!storageAccessToken) {
      return;
    }

    //
    // if we reached this far, then the user has tokens
    // in their browser, log them in and let the load user
    // info call validate the token with api.
    // Note: the browser cookie will have an x-refresh-token
    // that will be sent along with all requests to the backend by axios
    //
    setTokensAndLogin({
      accessToken: storageAccessToken,
      refreshToken: "",
      isLoggedIn: true,
    });
  }, []);

  // get and load user info
  useEffect(() => {
    async function loadUserInfo() {
      try {
        const { data: apiData } = await api_userinfo();
        setUser({
          uuid: apiData.uuid,
          fullName: apiData.fullName,
          email: apiData.email,
        });
      } catch (error) {
        logger(error);
      }
    }
    if (isLoggedIn && !user) {
      loadUserInfo();
    }
  }, [user, isLoggedIn]);

  // update tokens in storage
  useEffect(() => {
    localStorage.setItem("access_token", accessToken);
  }, [accessToken]);

  return <></>;
};

export default AppInit;

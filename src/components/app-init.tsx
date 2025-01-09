import { useEffect } from "react";
import axios from "axios";

import useAuthStore from "@/store/auth";
import { api_userinfo } from "@/api/auth";
import { logger } from "@/utils";
import { setBearerTokenHeader } from "@/api/http";

export const AppInit = () => {
  const { accessToken, user, isLoggedIn, setTokenAndLogin, setUser } =
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
    setTokenAndLogin({
      accessToken: storageAccessToken,
      isLoggedIn: true,
    });
  }, []);

  // get and load user info
  useEffect(() => {
    const request = axios.CancelToken.source();
    async function loadUserInfo() {
      try {
        const { data: apiData } = await api_userinfo({
          cancelToken: request.token,
        });
        setUser({
          uuid: apiData.uuid,
          fullName: apiData.fullName,
          email: apiData.email,
        });
      } catch (error) {
        // if the user info fetch failed due to an expired token
        // get a new token. this is done in http.ts via response interceptor
        logger(error);
      }
    }

    // updating token in storage and axios
    if (accessToken) {
      localStorage.setItem("access_token", accessToken);
      setBearerTokenHeader({ accessToken });
    } else {
      localStorage.removeItem("access_token");
      setBearerTokenHeader({ accessToken: "" });
    }

    // fetching user info
    if (isLoggedIn && !user && accessToken) {
      loadUserInfo();
      // prevent 2 time calls to backend
      return () => request.cancel();
    }
  }, [user, isLoggedIn, accessToken]);

  return <></>;
};

export default AppInit;

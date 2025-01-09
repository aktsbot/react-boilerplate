import axios, { AxiosError } from "axios";

import useGeneralStore from "@/store/general";
import useAuthStore from "@/store/auth";

import { logger } from "@/utils";
import { api_token } from "./auth";

type TApiError = {
  message: string;
  errors: string[];
  messageCode: string;
};

// https://blog.theashishmaurya.me/handling-jwt-access-and-refresh-token-using-axios-in-react-app
const checkAccessTokenExpiredError = async (e: AxiosError) => {
  const { setTokenAndLogin, clearSession } = useAuthStore.getState();
  try {
    const originalRequest = {
      ...e.config,
      _retry: false,
    };

    const errorData = e.response?.data as TApiError;

    // If the error status is 403 and there is no originalRequest._retry flag,
    // it means the token has expired and we need to refresh it
    if (
      errorData.messageCode == "ACCESS_TOKEN_JWT_EXPIRED" &&
      !originalRequest._retry
    ) {
      // to tell app-init to not call user info endpoint again
      setTokenAndLogin({
        accessToken: "",
        isLoggedIn: true,
      });

      originalRequest._retry = true;
      const { data: apiData } = await api_token();

      setTokenAndLogin({
        accessToken: apiData.accessToken,
        isLoggedIn: true,
      });
      // Retry the original request with the new token
      if (originalRequest.headers) {
        originalRequest.headers.Authorization = `Bearer ${apiData.accessToken}`;
        return axios(originalRequest);
      }
    }
  } catch (error) {
    logger(error);
    clearSession();
  }
};

const errorHandler = async (error: AxiosError) => {
  await checkAccessTokenExpiredError(error);

  let message = "Unknown error in backend call";
  const data = error.response?.data as TApiError;
  if (data && data["message"]) {
    message = data["message"];
  }

  const { addAlertMessage } = useGeneralStore.getState();
  addAlertMessage({
    text: message,
    type: "error",
  });

  return Promise.reject({ ...error });
};

const http = axios.create({
  // we expect the frontend and backend to be one the same domain
  // by doing this, we can use the browser's ability to set and get
  // cookies
  // withCredentials ensures cookies set, will be send as well.
  // we do this, so that xss scripts cant access the tokens.
  withCredentials: true, // needed for cookies to be set
  baseURL: "/api",
});

http.interceptors.response.use(
  (response) => response,
  (error) => errorHandler(error)
);

export const setBearerTokenHeader = ({
  accessToken,
}: {
  accessToken: string;
}) => {
  http.defaults.headers.common = { Authorization: `Bearer ${accessToken}` };
  return;
};

export default http;

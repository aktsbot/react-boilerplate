import axios, { AxiosError } from "axios";

import useGeneralStore from "@/store/general";

type TApiError = {
  message: string;
  errors: string[];
  messageCode: string;
};

const errorHandler = (error: AxiosError) => {
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

export default http;

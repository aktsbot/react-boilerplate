import { AxiosRequestConfig } from "axios";
import http from "./http";

import { TSignupSchema } from "@/lib/schemas/signup";
import { TLoginSchema } from "@/lib/schemas/login";

type TLoginPayload = TLoginSchema;
export const api_login = (payload: TLoginPayload) => {
  return http.post("/auth/login", payload);
};

type TSignupPayload = Omit<TSignupSchema, "confirmPassword">;
export const api_signup = (payload: TSignupPayload) => {
  return http.post("/auth/signup", payload);
};

/**
 * Used for getting new access and refresh tokens
 * cookie must have x-refresh-token, otherwise it'll fail
 */
export const api_token = () => {
  return http.post("/auth/token");
};

export const api_userinfo = ({ cancelToken }: AxiosRequestConfig) => {
  return http.get("/auth/user-info", { cancelToken });
};

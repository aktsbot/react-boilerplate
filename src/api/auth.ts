import http from "./http";

import { TSignupSchema } from "@/lib/schemas/Signup";
import { TLoginSchema } from "@/lib/schemas/Login";

type TLoginPayload = TLoginSchema;
export const api_login = (payload: TLoginPayload) => {
  return http.post("/auth/login", payload);
};

type TSignupPayload = Omit<TSignupSchema, "confirmPassword">;
export const api_signup = (payload: TSignupPayload) => {
  return http.post("/auth/signup", payload);
};

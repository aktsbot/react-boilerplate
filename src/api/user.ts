import http from "./http";

import { TChangeUserInfoSchema } from "@/lib/schemas/account";

type TChangeUserInfodPayload = TChangeUserInfoSchema;
export const api_changeUserInfo = (payload: TChangeUserInfodPayload) => {
  return http.patch("/users", payload);
};

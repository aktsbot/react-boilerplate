import { z } from "zod";

export const ChangeUserInfoSchema = z.object({
  email: z.string().email("Please enter your email address"),
  fullName: z.string().min(1, "Please enter your name"),
});
export type TChangeUserInfoSchema = z.infer<typeof ChangeUserInfoSchema>;

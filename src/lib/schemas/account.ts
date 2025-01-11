import { z } from "zod";

export const ChangePasswordSchema = z.object({
  oldPassword: z.string().min(1, "Please enter your current password"),
  newPassword: z.string().min(1, "Please enter a new password"),
});
export type TChangePasswordSchema = z.infer<typeof ChangePasswordSchema>;

export const ChangeUserInfoSchema = z.object({
  email: z.string().email("Please enter your email address"),
  fullName: z.string().min(1, "Please enter your name"),
});
export type TChangeUserInfoSchema = z.infer<typeof ChangeUserInfoSchema>;

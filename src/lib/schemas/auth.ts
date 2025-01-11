import { z } from "zod";

export const ForgotPasswordSchema = z.object({
  email: z.string().email("Please enter an email address"),
});
export type TForgotPasswordSchema = z.infer<typeof ForgotPasswordSchema>;

export const LoginSchema = z.object({
  email: z.string().email("Please enter an email address"),
  password: z.string().min(1, "Please enter a password"),
});
export type TLoginSchema = z.infer<typeof LoginSchema>;

export const SignupSchema = z
  .object({
    email: z.string().email("Please enter an email address"), // email() makes it required
    password: z.string().min(1, "Please enter a password"),
    confirmPassword: z.string().min(1, "Please enter your password again"),
    fullName: z.string().min(1, "Please enter your name"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });
export type TSignupSchema = z.infer<typeof SignupSchema>;

export const ResetPasswordSchema = z.object({
  userId: z.string(), // in the url's query string
  resetCode: z.string(), // in the url's query string
  password: z.string().min(1, "Please enter a password"),
});
export type TResetPasswordSchema = z.infer<typeof ResetPasswordSchema>;

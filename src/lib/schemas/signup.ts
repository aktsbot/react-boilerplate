import { z } from "zod";

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

import { z } from "zod";

export const SignupSchema = z
  .object({
    email: z.string().email(), // email() makes it required
    password: z.string().min(1),
    confirmPassword: z.string().min(1),
    fullName: z.string().min(1),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });

export type TSignupSchema = z.infer<typeof SignupSchema>;

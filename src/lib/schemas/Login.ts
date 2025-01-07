import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().email("Please enter an email address"),
  password: z.string().min(1, "Please enter a password"),
});

export type TLoginSchema = z.infer<typeof LoginSchema>;

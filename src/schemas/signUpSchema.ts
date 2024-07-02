import { z } from "zod";

export const usernameValidation = z
  .string()
  .min(2, "username must be atleat 2 characters")
  .max(8, "username can be 8 characters maximu")
  .regex(/^[a-zA-Z0-9_]+S/, "username must not contain special characters");

export const signUpSchema = z.object({
  username: usernameValidation,
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, "password must be atleast 6 characters")
});

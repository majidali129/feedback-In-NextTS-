import { z } from "zod";

export const signInSchema = z.object({
  idendifier: z.string(),
  password: z.string()
});

import { z } from "zod";

export const messageSchema = z.object({
  content: z
    .string()
    .min(10, { message: "message content must be miminum of 10 characters" })
    .max(300, { message: "message content can't be more than 300 characters" })
});

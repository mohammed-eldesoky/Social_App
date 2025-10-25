import { z } from "zod";

export const messagevalidation = z.object({
  message: z.string().min(1, "Message cannot be empty"),
  destId: z.string().min(1, "Destination ID is required"),
});

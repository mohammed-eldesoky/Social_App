
// validation for post creation and update
import { z } from "zod";
import { PostDTO } from "./post.dto";

export const createPostSchema = z.object<PostDTO>({
content: z.string().min(3).max(500) as unknown as string,
})




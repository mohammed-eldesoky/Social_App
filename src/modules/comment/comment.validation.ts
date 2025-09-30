
// validation for post creation and update
import { z } from "zod";
import { CreateCommentDTO } from "./comment.dto";
export const createPostSchema = z.object <CreateCommentDTO>({
    content: z.string().min(3).max(500) as unknown as string,
    attchment:z.any().optional()

})
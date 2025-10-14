
// validation for post creation and update
import { z } from "zod";
import { CreateCommentDTO, UpdateCommentDTO } from "./comment.dto";
export const createPostSchema = z.object <CreateCommentDTO>({
    content: z.string().min(3).max(500) as unknown as string,
    attchment:z.any().optional()

})

export const updatePostSchema = z.object <UpdateCommentDTO>({
    content: z.string().min(3).max(500) as unknown as string,

})
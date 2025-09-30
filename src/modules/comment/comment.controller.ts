import { Router } from "express";
import { isAuthenticated, isValid } from "../../middleware";
import commentService from "./comment.service";
import { createPostSchema } from "./comment.validation";


const router = Router({mergeParams:true});
// add comment  : /post/postId/comment
router.post("{/:id}",isAuthenticated(),isValid(createPostSchema) ,commentService.createComment)  
export default router;
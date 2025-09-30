import { Router } from "express";
import { isAuthenticated } from "../../middleware";
import commentService from "./comment.service";


const router = Router({mergeParams:true});
// add comment  : /post/postId/comment
router.post("{/:id}",isAuthenticated(),commentService.createComment)  
export default router;
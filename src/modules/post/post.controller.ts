import { Router } from "express";
import { isAuthenticated } from "../../middleware";
import postService from "./post.service";


const router = Router();
//create post
router.post("/", isAuthenticated(),postService.createPost)

// react to post
router.patch("/:id",isAuthenticated(), postService.reactPost)

export default router;
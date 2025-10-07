import { Router } from "express";
import { isAuthenticated, isValid } from "../../middleware";
import postService from "./post.service";
import { commentRouter } from "..";
import { createPostSchema } from "./post.vallidation";


const router = Router();
//create post
router.post("/", isAuthenticated(),isValid(createPostSchema),postService.createPost);

// react to post
router.patch("/:id", isAuthenticated(), postService.reactPost);

// get specific post
router.get("/:id", isAuthenticated(), postService.getSpecificPost);

// delete post
router.delete("/:id", isAuthenticated(), postService.deletePost);


/**
 * @route_Comment
 */
router.use("/:postId/comment", commentRouter);

export default router;

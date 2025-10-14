import { Router } from "express";
import { isAuthenticated, isValid } from "../../middleware";
import postService from "./post.service";
import { commentRouter } from "..";
import { createPostSchema, updatePostSchema } from "./post.vallidation";


const router = Router();
//create post
router.post("/", isAuthenticated(),isValid(createPostSchema),postService.createPost);

// react to post
router.patch("/:id", isAuthenticated(), postService.reactPost);

// get specific post
router.get("/:id", isAuthenticated(), postService.getSpecificPost);

// delete post
router.delete("/:id", isAuthenticated(), postService.deletePost);

// freeze post
router.patch("/:id/freeze", isAuthenticated(), postService.freezePost);

// update post
router.patch("/:id/update", isAuthenticated(),isValid(updatePostSchema),postService.updatePost);
/**
 * @route_Comment
 */
router.use("/:postId/comment", commentRouter);

export default router;

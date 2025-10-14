import { Router } from "express";
import { isAuthenticated, isValid } from "../../middleware";
import commentService from "./comment.service";
import { createPostSchema } from "./comment.validation";

const router = Router({ mergeParams: true });
// add comment  : /post/postId/comment
router.post(
  "{/:id}",
  isAuthenticated(),
  isValid(createPostSchema),
  commentService.createComment
);

// get specific comment  : /post/postId/comment/id

router.get("/:id", isAuthenticated(), commentService.getSpecificComment);
// delete comment  : /post/postId/comment/id
router.delete("/:id", isAuthenticated(), commentService.deleteComment);
// react to comment  : /post/postId/comment/id
router.patch("/:id", isAuthenticated(), commentService.reactComment);
// freeze comment  : /post/postId/comment/id
router.patch("/:id/freeze", isAuthenticated(), commentService.freezeComment);
export default router;

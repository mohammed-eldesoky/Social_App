import { Router } from "express";
import { isAuthenticated, isValid } from "../../middleware";
import commentService from "./comment.service";
import { createPostSchema, updatePostSchema } from "./comment.validation";

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
//______________________________________________________________________________

// delete comment  : /post/postId/comment/id
router.delete("/:id", isAuthenticated(), commentService.deleteComment);
//______________________________________________________________________________

// react to comment  : /post/postId/comment/id
router.patch("/:id", isAuthenticated(), commentService.reactComment);
//______________________________________________________________________________

// freeze comment  : /post/postId/comment/id
router.patch("/:id/freeze", isAuthenticated(), commentService.freezeComment);
//______________________________________________________________________________

// update comment  : /post/postId/comment/id
router.put("/:id/update", isAuthenticated(),isValid(updatePostSchema) ,commentService.updateComment);
export default router;

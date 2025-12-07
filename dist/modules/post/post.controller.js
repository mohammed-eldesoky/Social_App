"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const middleware_1 = require("../../middleware");
const post_service_1 = __importDefault(require("./post.service"));
const __1 = require("..");
const post_vallidation_1 = require("./post.vallidation");
const router = (0, express_1.Router)();
//create post
router.post("/", (0, middleware_1.isAuthenticated)(), (0, middleware_1.isValid)(post_vallidation_1.createPostSchema), post_service_1.default.createPost);
// react to post
router.patch("/:id", (0, middleware_1.isAuthenticated)(), post_service_1.default.reactPost);
// get specific post
router.get("/:id", (0, middleware_1.isAuthenticated)(), post_service_1.default.getSpecificPost);
// get all posts
router.get("/", post_service_1.default.getAllPosts);
// delete post
router.delete("/:id", (0, middleware_1.isAuthenticated)(), post_service_1.default.deletePost);
// freeze post
router.patch("/:id/freeze", (0, middleware_1.isAuthenticated)(), post_service_1.default.freezePost);
// update post
router.patch("/:id/update", (0, middleware_1.isAuthenticated)(), (0, middleware_1.isValid)(post_vallidation_1.updatePostSchema), post_service_1.default.updatePost);
/**
 * @route_Comment
 */
router.use("/:postId/comment", __1.commentRouter);
exports.default = router;

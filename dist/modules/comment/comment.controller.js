"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const middleware_1 = require("../../middleware");
const comment_service_1 = __importDefault(require("./comment.service"));
const comment_validation_1 = require("./comment.validation");
const router = (0, express_1.Router)({ mergeParams: true });
// add comment  : /post/postId/comment
router.post("{/:id}", (0, middleware_1.isAuthenticated)(), (0, middleware_1.isValid)(comment_validation_1.createPostSchema), comment_service_1.default.createComment);
// get specific comment  : /post/postId/comment/id
router.get("/:id", (0, middleware_1.isAuthenticated)(), comment_service_1.default.getSpecificComment);
exports.default = router;

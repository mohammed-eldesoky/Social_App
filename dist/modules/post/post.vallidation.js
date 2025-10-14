"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePostSchema = exports.createPostSchema = void 0;
// validation for post creation and update
const zod_1 = require("zod");
exports.createPostSchema = zod_1.z.object({
    content: zod_1.z.string().min(3).max(500),
});
exports.updatePostSchema = zod_1.z.object({
    content: zod_1.z.string().min(3).max(500),
});

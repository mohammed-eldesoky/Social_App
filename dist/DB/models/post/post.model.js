"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const post_schema_1 = require("./post.schema");
//post model
const Post = (0, mongoose_1.model)("Post", post_schema_1.postSchema);
exports.default = Post;

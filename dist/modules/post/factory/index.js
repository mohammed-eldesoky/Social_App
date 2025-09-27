"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postFactory = void 0;
const entity_1 = require("../entity");
class postFactory {
    // any factory pattern create or update
    createPost(postDTO, user) {
        const newPost = new entity_1.Post();
        newPost.userId = user._id;
        newPost.reactions = [];
        newPost.attachments = [];
        newPost.content = postDTO.content;
        return newPost;
    }
    ;
    updatePost() { }
    ;
}
exports.postFactory = postFactory;

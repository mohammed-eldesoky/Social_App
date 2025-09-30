"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentFactory = void 0;
const entity_1 = require("../entity");
class CommentFactory {
    // create
    create(createCommentDTO, user, post, comment) {
        const newComment = new entity_1.Commment();
        newComment.content = createCommentDTO.content;
        newComment.userId = user._id;
        newComment.postId = post._id;
        newComment.parentsIds = [...comment.parentsIds, comment._id];
        newComment.reactions = [];
        return newComment;
    }
}
exports.CommentFactory = CommentFactory;

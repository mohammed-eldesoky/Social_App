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
        newComment.postId = post._id || comment.postId; //reply 
        newComment.parentsId = comment?._id;
        newComment.reactions = [];
        return newComment;
    }
    // update
    update(updateCommentDTO, post, user, comment) {
        const upateComment = new entity_1.Commment();
        upateComment.content = updateCommentDTO.content;
        upateComment.userId = user._id;
        upateComment.postId = post._id || comment.postId; //reply
        return upateComment;
    }
}
exports.CommentFactory = CommentFactory;

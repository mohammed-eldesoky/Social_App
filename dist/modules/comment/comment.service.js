"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const comments_repository_1 = require("./../../DB/models/commmet/comments.repository");
const utils_1 = require("../../utils");
const post_repository_1 = require("./../../DB/models/post/post.repository");
const index_1 = require("./factory/index");
const react_provider_1 = require("../../utils/common/providers/react.provider");
class CommentService {
    postRepository = new post_repository_1.PostRepository();
    commentRepository = new comments_repository_1.CommentRepository();
    commentFactory = new index_1.CommentFactory();
    //* Implement comment service methods here *//
    //_________________________create comment_________________________//
    createComment = async (req, res, next) => {
        //get data from req
        const { postId, id } = req.params;
        const createCommentDTO = req.body;
        // check if postId exists
        const postExist = await this.postRepository.exist({ _id: postId });
        // fail case
        if (!postExist) {
            throw new utils_1.NotFoundException("post not found to add comment");
        }
        // check if this first comment or reply to another comment
        let commentExist = undefined;
        if (id) {
            commentExist = await this.commentRepository.exist({ _id: id });
            // fail case
            if (!commentExist) {
                throw new utils_1.NotFoundException("comment not found to add reply");
            }
        }
        //prepare data to be added > factory
        const comment = this.commentFactory.create(createCommentDTO, req.user, postExist, commentExist);
        // repository
        const createdComment = await this.commentRepository.create(comment);
        //send res
        return res.status(201).json({
            message: "comment created successfully",
            success: true,
            data: { createdComment },
        });
    };
    // _________________________ get specific comment_________________________//
    getSpecificComment = async (req, res, next) => {
        //get data from req
        const { id } = req.params;
        // check if comment exists
        const commentExist = await this.commentRepository.exist({ _id: id }, {}, {
            populate: [{ path: "replies" }],
        });
        // fail case
        if (!commentExist) {
            throw new utils_1.NotFoundException("comment not found");
        }
        //send res
        return res.status(200).json({
            message: "comment found successfully",
            success: true,
            data: { commentExist },
        });
    };
    // _________________________ delete  comments_________________________//
    deleteComment = async (req, res, next) => {
        //get data from req
        const { id } = req.params;
        // check if comment exists
        const commentExist = await this.commentRepository.exist({ _id: id }, {}, {
            populate: [{ path: "postId", select: "userId" }], // to check if user is owner of post,
        });
        // fail case
        if (!commentExist) {
            throw new utils_1.NotFoundException("comment not found to be deleted");
        }
        //check if user is the owner of the comment
        if (commentExist.userId.toString() != req.user._id.toString() &&
            commentExist.postId.userId.toString() !=
                req.user._id.toString()) {
            throw new utils_1.UnAuthorizedException("you are not allowed to delete this comment");
        }
        // delete comment from db
        const deletedComment = await this.commentRepository.delete({ _id: id });
        //send res
        return res.status(200).json({
            message: "comment deleted successfully",
            success: true,
            data: { deletedComment },
        });
    };
    // _________________________ react to comment_________________________//
    reactComment = async (req, res, next) => {
        //get data from req
        const { id } = req.params;
        const userId = req.user._id;
        const { reaction } = req.body;
        //add or remove reaction
        await (0, react_provider_1.addReactProvider)(this.commentRepository, id, userId, reaction);
        //send res
        return res.sendStatus(204);
    };
    // _________________________ freeze comment_________________________//
    freezeComment = async (req, res, next) => {
        // get data from req
        const { id } = req.params; //comment id
        // check if comment exists
        const commentExist = await this.commentRepository.exist({ _id: id });
        //fail case
        if (!commentExist) {
            throw new utils_1.NotFoundException("comment not found to be frozen");
        }
        // get the post related to this comment
        const post = await this.postRepository.exist({ _id: commentExist.postId });
        // fail case
        if (!post) {
            throw new utils_1.NotFoundException("post not found to be frozen");
        }
        // check if post is frozen
        if (post.isFrozen) {
            throw new utils_1.BadRequestException("Cannot modify a comment on a frozen post");
        }
        //check if user is the owner of the comment
        if (commentExist.userId.toString() != req.user._id.toString()) {
            throw new utils_1.UnAuthorizedException("you are not allowed to freeze this comment");
        }
        // check if comment is  frozen  or not
        const isFrozen = !commentExist.isFrozen;
        // freeze comment from db
        const frozenComment = await this.commentRepository.update({ _id: id }, { isFrozen });
        //send res
        return res.status(200).json({
            message: ` comment ${isFrozen ? "frozen" : "un-frozen"}  successfully`,
            success: true,
            data: { frozenComment },
        });
    };
    //__________________________ update comment_________________________//
    updateComment = async (req, res, next) => {
        //get data from req
        const { id } = req.params; //comment id
        const updateCommentDTO = req.body;
        //check if comment exists
        const commentExist = await this.commentRepository.exist({ _id: id });
        //fail case
        if (!commentExist) {
            throw new utils_1.NotFoundException("comment not found to be updated");
        }
        //check if user is the owner of the comment
        if (commentExist.userId.toString() != req.user._id.toString()) {
            throw new utils_1.UnAuthorizedException("you are not allowed to update this comment");
        }
        //prepare data to be updated
        const comment = this.commentFactory.update(updateCommentDTO, commentExist.id, req.user, commentExist);
        // update comment from db
        const updatedComment = await this.commentRepository.update({ _id: id }, comment);
        //send res
        return res.status(200).json({
            message: "comment updated successfully",
            success: true,
            data: { updatedComment },
        });
    };
}
exports.default = new CommentService();

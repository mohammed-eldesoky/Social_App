"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const comments_repository_1 = require("./../../DB/models/commmet/comments.repository");
const utils_1 = require("../../utils");
const post_repository_1 = require("./../../DB/models/post/post.repository");
const index_1 = require("./factory/index");
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
            populate: [{ path: "replies" }]
        });
        // fail case
        if (!commentExist) {
            throw new utils_1.NotFoundException("comment not found");
        }
        //send res
        return res
            .status(200)
            .json({
            message: "comment found successfully",
            success: true,
            data: { commentExist },
        });
    };
}
exports.default = new CommentService();

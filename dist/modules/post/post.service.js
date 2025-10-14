"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./factory/index");
const post_repository_1 = require("../../DB/models/post/post.repository");
const utils_1 = require("../../utils");
const react_provider_1 = require("../../utils/common/providers/react.provider");
class PostService {
    postRepository = new post_repository_1.PostRepository();
    postFactory = new index_1.postFactory();
    //* create post service
    createPost = async (req, res, next) => {
        // 1-get data from req
        const postDTO = req.body;
        //2- factory>> prepare data>> post entity>> repository
        const post = this.postFactory.createPost(postDTO, req.user);
        //3- repository>> >> post entity>>  save db
        const createdPost = await this.postRepository.create(post);
        //4- send response
        res.status(201).json({
            message: "post created successfully",
            success: true,
            data: { post: createdPost },
        });
    };
    //____________________________ reaction___________________________________//
    reactPost = async (req, res, next) => {
        //1-get data from req
        const { id } = req.params;
        const userId = req.user._id;
        const { reaction } = req.body;
        await (0, react_provider_1.addReactProvider)(this.postRepository, id, userId, reaction);
        //4- send response
        res.sendStatus(204); // no content
    };
    // ___________________________ get specific post ___________________________________//
    getSpecificPost = async (req, res, next) => {
        //Get data from req
        const { id } = req.params; //post id
        //check if post exists
        const postExist = await this.postRepository.getOne({ _id: id }, {}, {
            populate: [
                { path: "userId", select: "fullName firstName lastName " },
                { path: "reactions.userId", select: "fullName firstName lastName " },
                { path: "comments", match: { parentId: null } }, //only first layer comments
            ],
        });
        //fail case
        if (!postExist) {
            throw new utils_1.NotFoundException("post not found");
        }
        //success case
        return res.status(200).json({
            message: "post fetched successfully",
            success: true,
            data: { post: postExist },
        });
    };
    // ___________________________ delete post ___________________________________//
    deletePost = async (req, res, next) => {
        //1-get data from req
        const { id } = req.params; //post id
        //2-check if post exists
        const postExist = await this.postRepository.exist({ _id: id });
        //fail case
        if (!postExist) {
            throw new utils_1.NotFoundException("post not found");
        }
        //check if user is the owner of the post
        if (postExist.userId.toString() != req.user._id.toString()) {
            throw new utils_1.UnAuthorizedException("you are not allowed to delete this post");
        }
        //3-delete post
        await this.postRepository.delete({ _id: id });
        //4- send response
        res.status(204).json({
            message: "post deleted successfully",
            success: true,
        });
    };
    // ___________________________ freeze post ___________________________________//
    freezePost = async (req, res, next) => {
        // get data from req
        const { id } = req.params; //post id
        // check if post exists
        const postExist = await this.postRepository.exist({ _id: id });
        //fail case
        if (!postExist) {
            throw new utils_1.NotFoundException("post not found");
        }
        // check if user is the owner of the post
        if (postExist.userId.toString() != req.user._id.toString()) {
            throw new utils_1.UnAuthorizedException("you are not allowed to freeze this post");
        }
        // check if post is  frozen  or not
        const isFrozen = !postExist.isFrozen;
        // freeze post
        await this.postRepository.update({ _id: id }, { isFrozen });
        // send response
        res.status(200).json({
            message: `post is ${isFrozen ? "frozen" : "un-frozen"} successfully`,
            success: true,
        });
    };
    //__________________________ update post ___________________________________//
    updatePost = async (req, res, next) => {
        //1-get data from req
        const { id } = req.params; //post id
        const postDTO = req.body;
        //2-check if post exists
        const postExist = await this.postRepository.exist({ _id: id });
        //fail case
        if (!postExist) {
            throw new utils_1.NotFoundException("post not found");
        }
        //check if user is the owner of the post
        if (postExist.userId.toString() != req.user._id.toString()) {
            throw new utils_1.UnAuthorizedException("you are not allowed to update this post");
        }
        // check if post is  frozen  or not
        if (postExist.isFrozen) {
            throw new utils_1.BadRequestException("post is frozen you can't update it");
        }
        //prepare data
        const post = this.postFactory.updatePost(postDTO);
        //3-update post
        const updatedPost = await this.postRepository.update({ _id: id }, post);
        //4- send response
        res.status(200).json({
            message: "post updated successfully",
            success: true,
            data: updatedPost,
        });
    };
}
exports.default = new PostService();

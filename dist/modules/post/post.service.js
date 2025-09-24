"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./factory/index");
const post_repository_1 = require("../../DB/models/post/post.repository");
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
        res.status(201).json({ message: "post created successfully", success: true, data: { post: createdPost } });
    };
}
exports.default = new PostService();

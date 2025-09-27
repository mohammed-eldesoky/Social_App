"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./factory/index");
const post_repository_1 = require("../../DB/models/post/post.repository");
const utils_1 = require("../../utils");
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
        //2check if post exists
        const postExist = await this.postRepository.exist({ _id: id });
        //fail case
        if (!postExist) {
            throw new utils_1.NotFoundException("post not found");
        }
        // find if user reacted before
        let userReactionIndex = postExist.reactions.findIndex((ele) => {
            return ele.userId?.toString() === userId.toString();
        });
        if (userReactionIndex == -1) {
            //3- add new reaction
            await this.postRepository.update({ _id: id }, {
                $push: {
                    reactions: {
                        userId,
                        reaction: [null, undefined, ""].includes(reaction)
                            ? utils_1.USER_REACTIONS.like
                            : reaction,
                    },
                },
            });
        }
        // delete reaction
        else if ([undefined, null, ""].includes(reaction)) {
            await this.postRepository.update({ _id: id }, { $pull: { reactions: postExist.reactions[userReactionIndex] } });
            // if user reacted before just update the reaction
        }
        else {
            await this.postRepository.update({
                _id: id,
                "reactions.userId": userId,
            }, { $set: { "reactions.$.reaction": reaction } });
        }
        //4- send response
        res.sendStatus(204); // no content
    };
}
exports.default = new PostService();

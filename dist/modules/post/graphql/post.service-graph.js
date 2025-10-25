"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllposts = exports.getSpecificPost = void 0;
const DB_1 = require("../../../DB");
const utils_1 = require("../../../utils");
const getSpecificPost = async (parent, args) => {
    const postRepositoryost = new DB_1.PostRepository();
    const post = await postRepositoryost.getOne({ _id: args.id }, {}, {
        populate: [{ path: "userId" }],
    });
    //fail case
    if (!post) {
        throw new utils_1.NotFoundException("post not found");
    }
    return {
        message: "done",
        success: true,
        data: post
    }; //{_id, content, ...}
};
exports.getSpecificPost = getSpecificPost;
// ___________________get all posts
const getAllposts = async () => {
    const postRepositoryost = new DB_1.PostRepository();
    const posts = await postRepositoryost.getAll({}, {}, { populate: [{ path: "userId" }] });
    return {
        message: "done",
        success: true,
        data: posts
    }; //{_id, content, ...}
};
exports.getAllposts = getAllposts;

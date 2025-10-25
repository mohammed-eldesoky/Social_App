"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllposts = exports.getSpecificPost = void 0;
const DB_1 = require("../../../DB");
const middleware_1 = require("../../../middleware");
const utils_1 = require("../../../utils");
const post_validation_1 = require("./post.validation");
const getSpecificPost = async (parent, args, context) => {
    //implement auth function> done  or throw error
    await (0, middleware_1.isAuthenticatedGraphql)(context);
    //implement validation function> done  or throw error
    (0, middleware_1.isValidGraph)(post_validation_1.postValidation, args);
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
        data: post,
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
        data: posts,
    }; //{_id, content, ...}
};
exports.getAllposts = getAllposts;

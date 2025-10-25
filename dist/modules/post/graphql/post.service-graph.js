"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSpecificPost = void 0;
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
    return post; //{_id, content, ...}
};
exports.getSpecificPost = getSpecificPost;

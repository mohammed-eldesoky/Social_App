"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addReactProvider = void 0;
const error_1 = require("../../error");
const enum_1 = require("../enum");
/**
 * @param repo = comment | pos
 * @param id = postId | commentId
 * @param userId = logged in user id
 * @param reaction = like | love | haha | wow | sad | angry
 */
const addReactProvider = async (repo, id, userId, reaction) => {
    //check if post exists
    const postExist = await repo.exist({ _id: id });
    //fail case
    if (!postExist) {
        throw new error_1.NotFoundException("post not found");
    }
    // find if user reacted before
    let userReactionIndex = postExist.reactions.findIndex((ele) => {
        return ele.userId?.toString() === userId.toString();
    });
    if (userReactionIndex == -1) {
        //- add new reaction
        await repo.update({ _id: id }, {
            $push: {
                reactions: {
                    userId,
                    reaction: [null, undefined, ""].includes(reaction)
                        ? enum_1.USER_REACTIONS.like
                        : reaction,
                },
            },
        });
    }
    // delete reaction
    else if ([undefined, null, ""].includes(reaction)) {
        await repo.update({ _id: id }, { $pull: { reactions: postExist.reactions[userReactionIndex] } });
        // if user reacted before just update the reaction
    }
    else {
        await repo.update({
            _id: id,
            "reactions.userId": userId,
        }, { $set: { "reactions.$.reaction": reaction } });
    }
};
exports.addReactProvider = addReactProvider;

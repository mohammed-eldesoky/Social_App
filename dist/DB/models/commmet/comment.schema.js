"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentSchema = void 0;
const mongoose_1 = require("mongoose");
const post_schema_1 = require("../post/post.schema");
// ___________comments__________
exports.commentSchema = new mongoose_1.Schema({
    content: {
        type: String,
        //   required: function () {
        //     if (this.attachments.length) {
        //       return false;
        //     }
        //     return true;
        //   },
    },
    // attachments: {
    //   type: [],
    // }, // todo attachments
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    postId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Post",
        required: true,
    },
    parentId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Comment",
    },
    reactions: [post_schema_1.reactionSchema],
    mentions: {
        type: [mongoose_1.Schema.Types.ObjectId],
    },
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } });
exports.commentSchema.virtual("replies", {
    ref: "Comment",
    localField: "_id",
    foreignField: "parentId",
});

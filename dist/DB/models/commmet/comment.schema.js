"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentSchema = void 0;
const mongoose_1 = require("mongoose");
const reaction_schema_1 = require("../common/reaction.schema");
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
    reactions: [reaction_schema_1.reactionSchema],
    mentions: {
        type: [mongoose_1.Schema.Types.ObjectId],
    },
    isFrozen: {
        type: Boolean,
        default: false,
    }
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } });
exports.commentSchema.virtual("replies", {
    ref: "Comment",
    localField: "_id",
    foreignField: "parentId",
});
// hook to delete all replies when delete main comment
exports.commentSchema.pre("deleteOne", async function (next) {
    const filter = typeof this.getFilter == "function" ? this.getFilter() : {};
    const replies = await this.model.find({ parentId: filter._id });
    if (replies.length) {
        for (const reply of replies) {
            await this.model.deleteOne({ _id: reply._id });
        }
    }
    next(); //base case : last one
});

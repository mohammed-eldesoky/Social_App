"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postSchema = void 0;
const mongoose_1 = require("mongoose");
const comment_model_1 = require("../commmet/comment.model");
const reaction_schema_1 = require("../common/reaction.schema");
// post schema
exports.postSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    content: {
        type: String,
        required: function () {
            if (this.attachments && this.attachments.length > 0) {
                return false;
            }
            return true;
        },
        trim: true,
    },
    reactions: [reaction_schema_1.reactionSchema],
    isFrozen: {
        type: Boolean,
        default: false,
    }
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } });
exports.postSchema.virtual("comments", {
    localField: "_id", //post id
    foreignField: "postId", //comment postId
    ref: "Comment", // model name
});
// use hooks to delete comments and replies when delete main post
exports.postSchema.pre("deleteOne", async function (next) {
    //filter
    const filter = typeof this.getFilter() == "function" ? this.getFilter() : {};
    await comment_model_1.Comment.deleteMany({ postId: filter._id }); //any coment and reply have this postId will be deleted
    next();
});

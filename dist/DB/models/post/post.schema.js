"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postSchema = exports.reactionSchema = void 0;
const mongoose_1 = require("mongoose");
const utils_1 = require("../../../utils");
//reaction schema
exports.reactionSchema = new mongoose_1.Schema({
    reaction: {
        type: String,
        enum: utils_1.USER_REACTIONS,
        default: utils_1.USER_REACTIONS.like,
    },
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
}, { timestamps: true });
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
    reactions: [exports.reactionSchema],
}, { timestamps: true });

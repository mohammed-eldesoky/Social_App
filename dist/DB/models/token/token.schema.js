"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenSchema = void 0;
const mongoose_1 = require("mongoose");
const utils_1 = require("../../../utils");
exports.TokenSchema = new mongoose_1.Schema({
    token: String,
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
    },
    type: {
        type: String,
        enum: utils_1.TOKEN_TYPES,
    },
    expiresAt: {
        type: Date,
    },
}, { timestamps: true });
exports.TokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 }); // TTL index to auto-delete expired tokens

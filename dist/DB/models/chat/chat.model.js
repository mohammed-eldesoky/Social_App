"use strict";
//message model
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const chat_schema_1 = require("./chat.schema");
const Chat = (0, mongoose_1.model)("Chat", chat_schema_1.chatSchema);
exports.default = Chat;
